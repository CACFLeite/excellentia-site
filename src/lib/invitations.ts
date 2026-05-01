import crypto from 'node:crypto';
import { isAdminRequest } from './adminAuth';

export function createInviteToken() {
  return crypto.randomBytes(32).toString('base64url');
}

export function hashInviteToken(token: string) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export function getBaseUrl(request?: Request) {
  const host = request?.headers.get('host');
  const proto = request?.headers.get('x-forwarded-proto') ?? 'https';

  if (host?.includes('vercel.app') || process.env.VERCEL_ENV === 'preview') {
    return `${proto}://${host}`;
  }

  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, '');
  return host ? `${proto}://${host}` : '';
}

export function assertInternalAccess(request: Request) {
  if (isAdminRequest(request)) return;

  const error = new Error('Acesso administrativo não autorizado.');
  (error as Error & { status?: number }).status = 401;
  throw error;
}
