import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'excellentia_admin_session';

function getSecret() {
  return process.env.EXCELLENTIA_ADMIN_SESSION_SECRET || process.env.NEXTAUTH_SECRET || process.env.INTERNAL_API_KEY || 'local-dev-secret';
}

function base64urlToUint8Array(value: string) {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(value.length / 4) * 4, '=');
  return Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));
}

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let index = 0; index < a.length; index += 1) result |= a.charCodeAt(index) ^ b.charCodeAt(index);
  return result === 0;
}

async function sign(payload: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(getSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
  const bytes = new Uint8Array(signature);
  let binary = '';
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

async function hasValidSession(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;

  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;

  const expected = await sign(payload);
  if (!timingSafeEqual(signature, expected)) return false;

  try {
    const json = JSON.parse(new TextDecoder().decode(base64urlToUint8Array(payload))) as { role?: string; exp?: number };
    return json.role === 'admin' && typeof json.exp === 'number' && json.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

async function isAllowed(request: NextRequest) {
  if (await hasValidSession(request)) return true;

  const expected = process.env.EXCELLENTIA_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || process.env.INTERNAL_API_KEY || process.env.ADMIN_API_KEY;
  const received = request.headers.get('x-internal-api-key') ?? request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (!expected && process.env.NODE_ENV !== 'production') return true;
  return Boolean(expected && received === expected);
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname === '/admin/login' ||
    pathname.startsWith('/api/admin/') ||
    pathname.startsWith('/api/escolas/convites/')
  ) {
    return NextResponse.next();
  }

  if (await isAllowed(request)) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'Acesso administrativo não autorizado.' }, { status: 401 });
  }

  const loginUrl = new URL('/admin/login', request.url);
  loginUrl.searchParams.set('next', pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/admin/:path*', '/api/escolas/:path*', '/api/pgr/:path*', '/pgr/formulario/:path*'],
};
