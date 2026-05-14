import { createHash } from 'node:crypto';
import type { NextRequest } from 'next/server';
import { prisma } from './prisma';

function normalizeString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function hashValue(value: string | null) {
  if (!value) return undefined;
  return createHash('sha256').update(value).digest('hex');
}

export function getSensitiveEvidenceActor(request: NextRequest) {
  return normalizeString(request.headers.get('x-excellentia-actor')) || 'internal-admin';
}

export function getSensitiveEvidenceRequestAuditContext(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? request.headers.get('x-real-ip');
  const userAgent = request.headers.get('user-agent');
  return { ipHash: hashValue(forwardedFor ?? null), userAgentHash: hashValue(userAgent ?? null) };
}

export async function logSensitiveEvidenceDeniedAttempt(input: {
  request: NextRequest;
  organizationId: string;
  vaultItemId?: string;
  action: string;
  reason: string;
}) {
  try {
    await prisma.schoolSensitiveEvidenceAuditEvent.create({
      data: {
        organizationId: input.organizationId,
        vaultItemId: input.vaultItemId,
        action: input.action,
        actor: getSensitiveEvidenceActor(input.request),
        actorRole: 'unauthorized_or_insufficient',
        metadata: { reason: input.reason },
        ...getSensitiveEvidenceRequestAuditContext(input.request),
      },
    });
  } catch (auditError) {
    console.error('Falha ao auditar tentativa negada no cofre sensível:', auditError);
  }
}
