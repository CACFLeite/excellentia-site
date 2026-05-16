import { NextResponse } from 'next/server';
import { getTeacherSessionFromCookie } from '@/lib/teacherAuth';

export async function GET() {
  const session = await getTeacherSessionFromCookie();
  if (!session) return NextResponse.json({ authenticated: false }, { status: 401 });

  return NextResponse.json({
    authenticated: true,
    subscriber: {
      email: session.subscriber.email,
      fullName: session.subscriber.fullName,
      status: session.subscriber.status,
      currentPeriodEnd: session.subscriber.currentPeriodEnd,
    },
  });
}
