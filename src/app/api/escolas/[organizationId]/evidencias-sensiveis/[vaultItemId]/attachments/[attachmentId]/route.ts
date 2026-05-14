import { createHash } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { assertInternalAccess } from '@/lib/invitations';
import { SENSITIVE_EVIDENCE_STORAGE_PROVIDER, deleteSensitiveEvidenceFile, readSensitiveEvidenceFile } from '@/lib/sensitiveEvidenceStorage';
import { logSensitiveEvidenceDeniedAttempt } from '@/lib/sensitiveEvidenceAudit';

export const runtime = 'nodejs';

function normalizeString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function hashValue(value: string | null) {
  if (!value) return undefined;
  return createHash('sha256').update(value).digest('hex');
}

function getActor(request: NextRequest) {
  return normalizeString(request.headers.get('x-excellentia-actor')) || 'internal-admin';
}

function getRequestAuditContext(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? request.headers.get('x-real-ip');
  const userAgent = request.headers.get('user-agent');
  return { ipHash: hashValue(forwardedFor ?? null), userAgentHash: hashValue(userAgent ?? null) };
}

function attachmentDisposition(filename: string) {
  const fallback = filename.replace(/[^A-Za-z0-9._-]/g, '_').slice(0, 120) || 'evidencia';
  return `attachment; filename="${fallback}"; filename*=UTF-8''${encodeURIComponent(filename)}`;
}

async function findAttachment(organizationId: string, vaultItemId: string, attachmentId: string) {
  return prisma.schoolSensitiveEvidenceAttachment.findFirst({
    where: { id: attachmentId, organizationId, vaultItemId },
    include: { vaultItem: { select: { id: true, legalHold: true, retentionPolicy: true, status: true } } },
  });
}

export async function GET(request: NextRequest, context: { params: Promise<{ organizationId: string; vaultItemId: string; attachmentId: string }> }) {
  const params = await context.params;

  try {
    assertInternalAccess(request);
    const attachment = await findAttachment(params.organizationId, params.vaultItemId, params.attachmentId);
    if (!attachment) return NextResponse.json({ error: 'Anexo sensível não encontrado.' }, { status: 404 });
    if (attachment.fileStatus === 'deleted_by_policy' || attachment.deletedAt) return NextResponse.json({ error: 'Anexo sensível removido por política.' }, { status: 410 });
    if (attachment.storageProvider !== SENSITIVE_EVIDENCE_STORAGE_PROVIDER || !attachment.storageObjectKey) {
      return NextResponse.json({ error: 'Anexo não está disponível no storage privado configurado.' }, { status: 409 });
    }

    const { bytes, sizeBytes } = await readSensitiveEvidenceFile(attachment.storageObjectKey);
    if (attachment.checksumSha256) {
      const checksum = createHash('sha256').update(bytes).digest('hex');
      if (checksum !== attachment.checksumSha256) return NextResponse.json({ error: 'Checksum do arquivo sensível não confere.' }, { status: 409 });
    }

    await prisma.$transaction([
      prisma.schoolSensitiveEvidenceAttachment.update({ where: { id: attachment.id }, data: { lastAccessedAt: new Date() } }),
      prisma.schoolSensitiveEvidenceAuditEvent.create({
        data: {
          organizationId: params.organizationId,
          vaultItemId: params.vaultItemId,
          action: 'download_attachment',
          actor: getActor(request),
          actorRole: 'internal',
          metadata: { attachmentId: attachment.id, type: attachment.type, mimeType: attachment.mimeType, sizeBytes },
          ...getRequestAuditContext(request),
        },
      }),
    ]);

    return new NextResponse(bytes, {
      status: 200,
      headers: {
        'Content-Type': attachment.mimeType,
        'Content-Length': String(sizeBytes),
        'Content-Disposition': attachmentDisposition(attachment.originalFilename),
        'Cache-Control': 'no-store, private, max-age=0',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    const status = (error as Error & { status?: number }).status ?? 500;
    if (status === 401) await logSensitiveEvidenceDeniedAttempt({ request, organizationId: params.organizationId, vaultItemId: params.vaultItemId, action: 'denied_download_attachment', reason: (error as Error).message });
    console.error('Erro no download de evidência sensível:', error);
    return NextResponse.json({ error: status === 500 ? 'Erro interno no download sensível.' : (error as Error).message }, { status });
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ organizationId: string; vaultItemId: string; attachmentId: string }> }) {
  const params = await context.params;

  try {
    assertInternalAccess(request);
    const attachment = await findAttachment(params.organizationId, params.vaultItemId, params.attachmentId);
    if (!attachment) return NextResponse.json({ error: 'Anexo sensível não encontrado.' }, { status: 404 });
    if (attachment.vaultItem.legalHold || attachment.vaultItem.retentionPolicy === 'legal-hold-until-released') {
      return NextResponse.json({ error: 'Legal hold ativo: exclusão bloqueada até liberação responsável.' }, { status: 409 });
    }
    if (attachment.fileStatus === 'deleted_by_policy' || attachment.deletedAt) return NextResponse.json({ ok: true, alreadyDeleted: true });

    if (attachment.storageProvider === SENSITIVE_EVIDENCE_STORAGE_PROVIDER && attachment.storageObjectKey) {
      await deleteSensitiveEvidenceFile(attachment.storageObjectKey);
    }

    const actor = getActor(request);
    await prisma.$transaction([
      prisma.schoolSensitiveEvidenceAttachment.update({
        where: { id: attachment.id },
        data: { fileStatus: 'deleted_by_policy', deletedAt: new Date(), deletedBy: actor },
      }),
      prisma.schoolSensitiveEvidenceAuditEvent.create({
        data: {
          organizationId: params.organizationId,
          vaultItemId: params.vaultItemId,
          action: 'delete_attachment_by_policy',
          actor,
          actorRole: 'internal',
          metadata: { attachmentId: attachment.id, storageProvider: attachment.storageProvider, checksumSha256: attachment.checksumSha256 },
          ...getRequestAuditContext(request),
        },
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (error) {
    const status = (error as Error & { status?: number }).status ?? 500;
    if (status === 401) await logSensitiveEvidenceDeniedAttempt({ request, organizationId: params.organizationId, vaultItemId: params.vaultItemId, action: 'denied_delete_attachment_by_policy', reason: (error as Error).message });
    console.error('Erro na exclusão de evidência sensível:', error);
    return NextResponse.json({ error: status === 500 ? 'Erro interno na exclusão sensível.' : (error as Error).message }, { status });
  }
}
