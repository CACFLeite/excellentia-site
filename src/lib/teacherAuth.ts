import crypto from 'node:crypto';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

export const TEACHER_SESSION_COOKIE = 'excellentia_teacher_session';

const LOGIN_TOKEN_TTL_MS = 1000 * 60 * 30;
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30;

export function normalizeTeacherEmail(email: string) {
  return email.trim().toLowerCase();
}

export function createTeacherToken() {
  return crypto.randomBytes(32).toString('base64url');
}

export function hashTeacherToken(token: string) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export function getTeacherLoginExpiresAt() {
  return new Date(Date.now() + LOGIN_TOKEN_TTL_MS);
}

export function getTeacherSessionExpiresAt() {
  return new Date(Date.now() + SESSION_TTL_MS);
}

export function isActiveTeacherStatus(status: string) {
  return status === 'active';
}

export async function createTeacherLoginToken(email: string) {
  const normalizedEmail = normalizeTeacherEmail(email);
  const subscriber = await prisma.teacherSubscriber.findUnique({ where: { email: normalizedEmail } });
  const token = createTeacherToken();

  await prisma.teacherLoginToken.create({
    data: {
      email: normalizedEmail,
      subscriberId: subscriber?.id,
      tokenHash: hashTeacherToken(token),
      expiresAt: getTeacherLoginExpiresAt(),
    },
  });

  return { token, subscriber };
}

export async function createTeacherSession(subscriberId: string) {
  const token = createTeacherToken();
  const expiresAt = getTeacherSessionExpiresAt();

  await prisma.teacherSession.create({
    data: {
      subscriberId,
      tokenHash: hashTeacherToken(token),
      expiresAt,
    },
  });

  return { token, expiresAt };
}

export async function getTeacherSessionFromCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get(TEACHER_SESSION_COOKIE)?.value;
  if (!token) return null;

  const session = await prisma.teacherSession.findUnique({
    where: { tokenHash: hashTeacherToken(token) },
    include: { subscriber: true },
  });

  if (!session || session.revokedAt || session.expiresAt <= new Date()) return null;
  return session;
}

export async function revokeTeacherSessionFromCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get(TEACHER_SESSION_COOKIE)?.value;
  if (!token) return;

  await prisma.teacherSession.updateMany({
    where: { tokenHash: hashTeacherToken(token), revokedAt: null },
    data: { revokedAt: new Date() },
  });
}
