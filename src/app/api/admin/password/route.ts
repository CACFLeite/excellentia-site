import { NextRequest, NextResponse } from 'next/server';
import { createAdminSessionToken, getAdminCookieName, isAdminRequest, validateAdminPassword } from '@/lib/adminAuth';
import { rotateStoredAdminPassword } from '@/lib/adminCredential';

const MIN_PASSWORD_LENGTH = 16;

function validateNewPassword(password: string) {
  if (password.length < MIN_PASSWORD_LENGTH) return `A nova senha precisa ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`;
  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
    return 'Use uma senha com letras maiúsculas, minúsculas e números.';
  }
  return null;
}

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const currentPassword = String(body.currentPassword ?? '');
  const newPassword = String(body.newPassword ?? '');
  const confirmPassword = String(body.confirmPassword ?? '');

  if (!currentPassword || !newPassword || !confirmPassword) {
    return NextResponse.json({ error: 'Informe a senha atual, a nova senha e a confirmação.' }, { status: 400 });
  }

  if (newPassword !== confirmPassword) {
    return NextResponse.json({ error: 'A confirmação não confere com a nova senha.' }, { status: 400 });
  }

  const passwordError = validateNewPassword(newPassword);
  if (passwordError) {
    return NextResponse.json({ error: passwordError }, { status: 400 });
  }

  if (!(await validateAdminPassword(currentPassword))) {
    return NextResponse.json({ error: 'Senha atual inválida.' }, { status: 401 });
  }

  const credential = await rotateStoredAdminPassword(newPassword);
  const response = NextResponse.json({ ok: true, rotatedAt: credential.rotatedAt, sessionVersion: credential.sessionVersion });

  response.cookies.set(getAdminCookieName(), createAdminSessionToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8,
  });

  return response;
}
