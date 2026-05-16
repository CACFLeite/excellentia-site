import { NextResponse } from 'next/server';
import { createTeacherLoginToken, isActiveTeacherStatus, normalizeTeacherEmail } from '@/lib/teacherAuth';
import { prisma } from '@/lib/prisma';
import { sendTeacherLoginEmail } from '@/lib/teacherEmail';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = normalizeTeacherEmail(String(body.email ?? ''));
  const client = String(body.client ?? '').toLowerCase();

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: 'Informe um e-mail válido.' }, { status: 400 });
  }

  const subscriber = await prisma.teacherSubscriber.findUnique({ where: { email } });
  const hasActiveSubscription = Boolean(subscriber && isActiveTeacherStatus(subscriber.status));
  let loginUrl = new URL('/assinatura', request.url).toString();

  if (hasActiveSubscription) {
    const login = await createTeacherLoginToken(email);
    const callbackUrl = new URL('/api/professor/auth/callback', request.url);
    callbackUrl.searchParams.set('token', login.token);
    if (client === 'mobile') callbackUrl.searchParams.set('client', 'mobile');
    loginUrl = callbackUrl.toString();
  }

  await sendTeacherLoginEmail({ to: email, loginUrl, hasActiveSubscription });

  return NextResponse.json({ ok: true });
}
