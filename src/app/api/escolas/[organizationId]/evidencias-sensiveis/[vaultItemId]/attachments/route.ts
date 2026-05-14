import { NextRequest, NextResponse } from 'next/server';
import { Prisma, SensitiveEvidenceAttachmentType } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { assertInternalAccess } from '@/lib/invitations';
import {
  SENSITIVE_EVIDENCE_STORAGE_PROVIDER,
  buildSensitiveEvidenceObjectKey,
  sha256Hex,
  validateSensitiveEvidenceFile,
  writeSensitiveEvidenceFile,
} from '@/lib/sensitiveEvidenceStorage';
import { logSensitiveEvidenceDeniedAttempt } from '@/lib/sensitiveEvidenceAudit';
import { createHash } from 'node:crypto';

export const runtime = 'nodejs';

const VALID_ATTACHMENT_TYPES: SensitiveEvidenceAttachmentType[] = ['image', 'audio', 'video', 'pdf', 'other_document'];
const VALID_PARENT_STATUSES = new Set(['intake_pending', 'metadata_only', 'stored_externally']);

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

function validateMetadata(value: unknown): Prisma.InputJsonObject | undefined {
  if (!value || typeof value !== 'string') return undefined;
  const parsed = JSON.parse(value);
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('metadata deve ser um objeto JSON simples.');
  if (Buffer.byteLength(JSON.stringify(parsed), 'utf8') > 4_000) throw new Error('metadata excede o tamanho máximo permitido.');
  for (const [key, child] of Object.entries(parsed as Record<string, unknown>)) {
    if (!/^[A-Za-z0-9][A-Za-z0-9_-]{0,59}$/.test(key)) throw new Error(`metadata contém campo inválido: ${key}.`);
    if (!['string', 'number', 'boolean'].includes(typeof child) && child !== null) throw new Error('metadata deve conter apenas valores simples.');
    if (typeof child === 'string' && child.length > 600) throw new Error('metadata contém texto longo demais.');
  }
  return parsed as Prisma.InputJsonObject;
}

export async function POST(request: NextRequest, context: { params: Promise<{ organizationId: string; vaultItemId: string }> }) {
  const params = await context.params;

  try {
    assertInternalAccess(request);

    const formData = await request.formData();
    const rawFile = formData.get('file');
    const type = normalizeString(formData.get('type')) as SensitiveEvidenceAttachmentType;
    const metadata = validateMetadata(formData.get('metadata'));

    if (!VALID_ATTACHMENT_TYPES.includes(type)) return NextResponse.json({ error: 'Tipo de anexo inválido.' }, { status: 400 });
    if (!(rawFile instanceof File)) return NextResponse.json({ error: 'Arquivo obrigatório.' }, { status: 400 });

    const originalFilename = rawFile.name;
    const mimeType = rawFile.type.toLowerCase();
    const sizeBytes = rawFile.size;
    const fileError = validateSensitiveEvidenceFile({ type, originalFilename, mimeType, sizeBytes });
    if (fileError) return NextResponse.json({ error: fileError }, { status: 400 });

    const vaultItem = await prisma.schoolSensitiveEvidenceVaultItem.findFirst({
      where: { id: params.vaultItemId, organizationId: params.organizationId },
      include: { attachments: { select: { id: true } } },
    });
    if (!vaultItem) return NextResponse.json({ error: 'Registro sensível não encontrado.' }, { status: 404 });
    if (!VALID_PARENT_STATUSES.has(vaultItem.status)) return NextResponse.json({ error: 'Registro sensível não aceita novos arquivos neste status.' }, { status: 409 });
    if (vaultItem.attachments.length >= 10) return NextResponse.json({ error: 'Limite de 10 anexos por registro sensível.' }, { status: 400 });

    const bytes = Buffer.from(await rawFile.arrayBuffer());
    if (bytes.byteLength !== sizeBytes) return NextResponse.json({ error: 'Tamanho do arquivo inconsistente.' }, { status: 400 });
    const checksumSha256 = sha256Hex(bytes);
    const storageObjectKey = buildSensitiveEvidenceObjectKey(params.organizationId, params.vaultItemId, originalFilename);
    await writeSensitiveEvidenceFile(storageObjectKey, bytes, mimeType);

    const actor = getActor(request);
    const requestAudit = getRequestAuditContext(request);
    const attachment = await prisma.$transaction(async (transaction) => {
      const created = await transaction.schoolSensitiveEvidenceAttachment.create({
        data: {
          organizationId: params.organizationId,
          vaultItemId: params.vaultItemId,
          type,
          originalFilename,
          mimeType,
          sizeBytes,
          storageProvider: SENSITIVE_EVIDENCE_STORAGE_PROVIDER,
          storageObjectKey,
          checksumSha256,
          fileStatus: 'stored',
          uploadedAt: new Date(),
          metadata: { ...(metadata ?? {}), intake: SENSITIVE_EVIDENCE_STORAGE_PROVIDER === 'cloudflare-r2' ? 'cloudflare-r2-upload' : 'local-private-upload' },
        },
      });

      await transaction.schoolSensitiveEvidenceVaultItem.update({
        where: { id: params.vaultItemId },
        data: { status: 'stored_externally', updatedBy: actor },
      });

      await transaction.schoolSensitiveEvidenceAuditEvent.create({
        data: {
          organizationId: params.organizationId,
          vaultItemId: params.vaultItemId,
          action: 'upload_attachment',
          actor,
          actorRole: 'internal',
          metadata: { attachmentId: created.id, type, mimeType, sizeBytes, checksumSha256, storageProvider: SENSITIVE_EVIDENCE_STORAGE_PROVIDER },
          ...requestAudit,
        },
      });

      return created;
    });

    return NextResponse.json({ attachment }, { status: 201 });
  } catch (error) {
    const status = (error as Error & { status?: number }).status ?? 500;
    if (status === 401) await logSensitiveEvidenceDeniedAttempt({ request, organizationId: params.organizationId, vaultItemId: params.vaultItemId, action: 'denied_upload_attachment', reason: (error as Error).message });
    console.error('Erro no upload de evidência sensível:', error);
    return NextResponse.json({ error: status === 500 ? 'Erro interno no upload sensível.' : (error as Error).message }, { status });
  }
}
