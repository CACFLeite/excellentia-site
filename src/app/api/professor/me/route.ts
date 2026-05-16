import { NextResponse } from 'next/server';
import { getTeacherSessionFromRequest } from '@/lib/teacherAuth';

export async function GET(request: Request) {
  const session = await getTeacherSessionFromRequest(request);
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
