import { NextRequest, NextResponse } from 'next/server';
import { createAdminSessionToken, getAdminCookieName, validateAdminPassword } from '@/lib/adminAuth';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const password = String(body.password ?? '');

  if (!validateAdminPassword(password)) {
    return NextResponse.json({ error: 'Senha administrativa inválida.' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(getAdminCookieName(), createAdminSessionToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8,
  });
  return response;
}
