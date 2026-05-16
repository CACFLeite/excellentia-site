import { NextResponse } from 'next/server';
import { createTeacherSession, hashTeacherToken, TEACHER_SESSION_COOKIE } from '@/lib/teacherAuth';
import { prisma } from '@/lib/prisma';

function mobileRedirect(path: string, params: Record<string, string>) {
  const url = new URL('excellentia://' + path);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  return NextResponse.redirect(url);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');
  const isMobileClient = url.searchParams.get('client') === 'mobile';

  if (!token) {
    if (isMobileClient) return mobileRedirect('auth/error', { reason: 'token' });
    return NextResponse.redirect(new URL('/acesso-professor?erro=token', request.url));
  }

  const loginToken = await prisma.teacherLoginToken.findUnique({
    where: { tokenHash: hashTeacherToken(token) },
    include: { subscriber: true },
  });

  if (!loginToken || loginToken.usedAt || loginToken.expiresAt <= new Date() || !loginToken.subscriber) {
    if (isMobileClient) return mobileRedirect('auth/error', { reason: 'expirado' });
    return NextResponse.redirect(new URL('/acesso-professor?erro=expirado', request.url));
  }

  if (loginToken.subscriber.status !== 'active') {
    if (isMobileClient) return mobileRedirect('auth/error', { reason: 'assinatura' });
    return NextResponse.redirect(new URL('/assinatura', request.url));
  }

  await prisma.teacherLoginToken.update({
    where: { id: loginToken.id },
    data: { usedAt: new Date() },
  });

  const session = await createTeacherSession(loginToken.subscriber.id);
  if (isMobileClient) {
    return mobileRedirect('auth/teacher', {
      session: session.token,
      expiresAt: session.expiresAt.toISOString(),
    });
  }

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
