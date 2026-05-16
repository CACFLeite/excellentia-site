import { NextResponse } from 'next/server';
import { createTeacherSession, hashTeacherToken, TEACHER_SESSION_COOKIE } from '@/lib/teacherAuth';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');

  if (!token) {
    return NextResponse.redirect(new URL('/acesso-professor?erro=token', request.url));
  }

  const loginToken = await prisma.teacherLoginToken.findUnique({
    where: { tokenHash: hashTeacherToken(token) },
    include: { subscriber: true },
  });

  if (!loginToken || loginToken.usedAt || loginToken.expiresAt <= new Date() || !loginToken.subscriber) {
    return NextResponse.redirect(new URL('/acesso-professor?erro=expirado', request.url));
  }

  if (loginToken.subscriber.status !== 'active') {
    return NextResponse.redirect(new URL('/assinatura', request.url));
  }

  await prisma.teacherLoginToken.update({
    where: { id: loginToken.id },
    data: { usedAt: new Date() },
  });

  const session = await createTeacherSession(loginToken.subscriber.id);
  const response = NextResponse.redirect(new URL('/professor/cursos', request.url));
  response.cookies.set(TEACHER_SESSION_COOKIE, session.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: session.expiresAt,
  });

  return response;
}
