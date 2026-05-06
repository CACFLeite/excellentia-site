import crypto from 'node:crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'excellentia_admin_session';
const SESSION_TTL_SECONDS = 60 * 60 * 8;

type SessionPayload = {
  role: 'admin';
  exp: number;
};

function secret() {
  return process.env.EXCELLENTIA_ADMIN_SESSION_SECRET || process.env.NEXTAUTH_SECRET || process.env.INTERNAL_API_KEY || 'local-dev-secret';
}

function adminPassword() {
  return process.env.EXCELLENTIA_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || process.env.INTERNAL_API_KEY || process.env.ADMIN_API_KEY;
}

function base64url(input: Buffer | string) {
  return Buffer.from(input).toString('base64url');
}

function sign(payload: string) {
  return crypto.createHmac('sha256', secret()).update(payload).digest('base64url');
}

export function createAdminSessionToken() {
  const payload: SessionPayload = { role: 'admin', exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS };
  const encoded = base64url(JSON.stringify(payload));
  return `${encoded}.${sign(encoded)}`;
}

export function verifyAdminSessionToken(token?: string | null) {
  if (!token) return false;
  const [encoded, signature] = token.split('.');
  if (!encoded || !signature) return false;
  const expected = sign(encoded);
  if (signature.length !== expected.length) return false;
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false;

  try {
    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')) as SessionPayload;
    return payload.role === 'admin' && payload.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export function validateAdminPassword(password: string) {
  const expected = adminPassword();
  if (!expected) return process.env.NODE_ENV !== 'production';
  if (password.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(password), Buffer.from(expected));
}

export function getAdminCookieName() {
  return COOKIE_NAME;
}

export async function hasAdminSessionFromCookieStore() {
  const cookieStore = await cookies();
  return verifyAdminSessionToken(cookieStore.get(COOKIE_NAME)?.value);
}

export function isAdminRequest(request: Request) {
  const cookieHeader = request.headers.get('cookie') ?? '';
  const token = cookieHeader
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE_NAME}=`))
    ?.slice(COOKIE_NAME.length + 1);

  if (verifyAdminSessionToken(token)) return true;

  const expected = adminPassword();
  const received = request.headers.get('x-internal-api-key') ?? request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (!expected && process.env.NODE_ENV !== 'production') return true;
  return Boolean(expected && received === expected);
}
