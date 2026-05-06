import crypto from 'node:crypto';
import { prisma } from '@/lib/prisma';

const ADMIN_CREDENTIAL_ID = 'primary';
const SCRYPT_KEY_LENGTH = 64;

function hashPassword(password: string, salt = crypto.randomBytes(16).toString('base64url')) {
  const derived = crypto.scryptSync(password, salt, SCRYPT_KEY_LENGTH).toString('base64url');
  return `scrypt:${salt}:${derived}`;
}

function verifyPasswordHash(password: string, storedHash: string) {
  const [scheme, salt, expected] = storedHash.split(':');
  if (scheme !== 'scrypt' || !salt || !expected) return false;
  const derived = crypto.scryptSync(password, salt, SCRYPT_KEY_LENGTH).toString('base64url');
  if (derived.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(derived), Buffer.from(expected));
}

export async function getAdminCredential() {
  return prisma.adminCredential.findUnique({ where: { id: ADMIN_CREDENTIAL_ID } });
}

export async function validateStoredAdminPassword(password: string) {
  const credential = await getAdminCredential();
  if (!credential) return null;
  return verifyPasswordHash(password, credential.passwordHash);
}

export async function rotateStoredAdminPassword(newPassword: string) {
  const credential = await prisma.adminCredential.upsert({
    where: { id: ADMIN_CREDENTIAL_ID },
    create: {
      id: ADMIN_CREDENTIAL_ID,
      passwordHash: hashPassword(newPassword),
      sessionVersion: 1,
      rotatedAt: new Date(),
    },
    update: {
      passwordHash: hashPassword(newPassword),
      sessionVersion: { increment: 1 },
      rotatedAt: new Date(),
    },
    select: { sessionVersion: true, rotatedAt: true },
  });

  return credential;
}
