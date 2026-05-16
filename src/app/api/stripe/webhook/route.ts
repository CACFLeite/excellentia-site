import crypto from 'node:crypto';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function verifyStripeSignature(payload: string, signatureHeader: string | null, secret: string) {
  if (!signatureHeader) return false;
  const parts = Object.fromEntries(signatureHeader.split(',').map((part) => {
    const [key, value] = part.split('=');
    return [key, value];
  }));
  const timestamp = parts.t;
  const signature = parts.v1;
  if (!timestamp || !signature) return false;

  const signedPayload = timestamp + '.' + payload;
  const expected = crypto.createHmac('sha256', secret).update(signedPayload).digest('hex');
  if (signature.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

function getCustomerEmail(object: Record<string, unknown>) {
  const customerDetails = object.customer_details as { email?: string; name?: string } | undefined;
  return String(customerDetails?.email || object.customer_email || '').trim().toLowerCase();
}

function getCustomerName(object: Record<string, unknown>) {
  const customerDetails = object.customer_details as { name?: string } | undefined;
  return customerDetails?.name || null;
}

function isTeacherCheckout(object: Record<string, unknown>) {
  const metadata = object.metadata as { product?: string } | undefined;
  if (metadata?.product === 'teacher_subscription') return true;

  const paymentLink = typeof object.payment_link === 'string' ? object.payment_link : null;
  const allowedPaymentLinks = (process.env.STRIPE_TEACHER_PAYMENT_LINK_IDS || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

  return Boolean(paymentLink && allowedPaymentLinks.includes(paymentLink));
}

function stripeDate(value: unknown) {
  return typeof value === 'number' ? new Date(value * 1000) : null;
}

async function grantPublishedTeacherCourses(subscriberId: string) {
  const courses = await prisma.course.findMany({
    where: {
      status: 'published',
      OR: [
        { metadata: { path: ['audience'], equals: 'teacher_subscriber' } },
        { metadata: { path: ['teacherSubscriber'], equals: true } },
      ],
    },
    select: { id: true },
  });

  await Promise.all(courses.map((course) => prisma.teacherCourseAccess.upsert({
    where: { subscriberId_courseId: { subscriberId, courseId: course.id } },
    update: {},
    create: { subscriberId, courseId: course.id, grantedBy: 'stripe_subscription' },
  })));
}

async function handleCheckoutCompleted(object: Record<string, unknown>) {
  if (!isTeacherCheckout(object)) return;

  const email = getCustomerEmail(object);
  if (!email) return;

  const customerId = typeof object.customer === 'string' ? object.customer : null;
  const subscriptionId = typeof object.subscription === 'string' ? object.subscription : null;
  const fullName = getCustomerName(object);

  const subscriber = await prisma.teacherSubscriber.upsert({
    where: { email },
    update: {
      fullName,
      status: 'active',
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscriptionId,
    },
    create: {
      email,
      fullName,
      status: 'active',
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscriptionId,
    },
  });

  await grantPublishedTeacherCourses(subscriber.id);
}

async function handleSubscriptionUpdated(object: Record<string, unknown>) {
  const subscriptionId = typeof object.id === 'string' ? object.id : null;
  const customerId = typeof object.customer === 'string' ? object.customer : null;
  if (!subscriptionId && !customerId) return;

  const stripeStatus = String(object.status ?? '');
  const status = stripeStatus === 'active' || stripeStatus === 'trialing'
    ? 'active'
    : stripeStatus === 'past_due'
      ? 'past_due'
      : stripeStatus === 'canceled'
        ? 'canceled'
        : 'pending';

  const subscriber = await prisma.teacherSubscriber.updateMany({
    where: {
      OR: [
        subscriptionId ? { stripeSubscriptionId: subscriptionId } : {},
        customerId ? { stripeCustomerId: customerId } : {},
      ],
    },
    data: {
      status,
      stripeSubscriptionId: subscriptionId ?? undefined,
      stripeCustomerId: customerId ?? undefined,
      currentPeriodEnd: stripeDate(object.current_period_end) ?? undefined,
    },
  });

  if (subscriber.count > 0 && status === 'active') {
    const record = await prisma.teacherSubscriber.findFirst({
      where: {
        OR: [
          subscriptionId ? { stripeSubscriptionId: subscriptionId } : {},
          customerId ? { stripeCustomerId: customerId } : {},
        ],
      },
    });
    if (record) await grantPublishedTeacherCourses(record.id);
  }
}

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const payload = await request.text();

  if (!secret && process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'STRIPE_WEBHOOK_SECRET não configurado.' }, { status: 500 });
  }

  if (secret && !verifyStripeSignature(payload, request.headers.get('stripe-signature'), secret)) {
    return NextResponse.json({ error: 'Invalid Stripe signature.' }, { status: 400 });
  }

  const event = JSON.parse(payload) as { type?: string; data?: { object?: Record<string, unknown> } };
  const object = event.data?.object ?? {};

  if (event.type === 'checkout.session.completed') await handleCheckoutCompleted(object);
  if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.deleted') await handleSubscriptionUpdated(object);

  return NextResponse.json({ received: true });
}
