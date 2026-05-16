import { NextResponse } from 'next/server';
import { revokeTeacherSessionFromCookie, TEACHER_SESSION_COOKIE } from '@/lib/teacherAuth';

export async function POST() {
  await revokeTeacherSessionFromCookie();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(TEACHER_SESSION_COOKIE, '', { path: '/', maxAge: 0 });
  return response;
}
