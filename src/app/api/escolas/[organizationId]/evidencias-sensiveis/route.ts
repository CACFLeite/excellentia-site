import { createHash } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { Prisma, SensitiveEvidenceAttachmentType, SensitiveEvidenceVaultStatus } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { assertInternalAccess } from '@/lib/invitations';
import { FILENAME_BY_TYPE, MAX_ATTACHMENT_SIZE_BY_TYPE, MIME_BY_TYPE } from '@/lib/sensitiveEvidenceStorage';
import { logSensitiveEvidenceDeniedAttempt } from '@/lib/sensitiveEvidenceAudit';

const ALLOWED_COURSES = new Set([
  'violencia-escolar-protecao',
  'incendio-escolas',
  'lei-lucas-escolas',
  'nr1-escolas',
  'protecao-digital-dados-escolas',
  'lgpd-escolas',
]);

const VALID_STATUSES: SensitiveEvidenceVaultStatus[] = [
  'intake_pending',
  'metadata_only',
  'stored_externally',
  'archived',
  'deleted_by_policy',
];

const VALID_ATTACHMENT_TYPES: SensitiveEvidenceAttachmentType[] = ['image', 'audio', 'video', 'pdf', 'other_document'];
const VALID_SENSITIVITY = new Set(['restricted', 'highly_sensitive', 'legal_hold', 'child_protection']);
const VALID_RETENTION = new Set([
  'contract-plus-legal-obligation-review',
  'school-defined-retention-review',
  'legal-hold-until-released',
  'archive-after-case-closure-review',
]);

const MAX_TITLE_LENGTH = 180;
const MAX_DOCUMENT_KEY_LENGTH = 80;
const MAX_CASE_REFERENCE_LENGTH = 80;
const MAX_ATTACHMENTS = 10;
const MAX_FILENAME_LENGTH = 160;
const MAX_STORAGE_KEY_LENGTH = 240;
const MAX_METADATA_BYTES = 4_000;


type ValidatedAttachment = {
  type: SensitiveEvidenceAttachmentType;
  originalFilename: string;
  mimeType: string;
  sizeBytes: number;
  storageProvider?: string;
  storageObjectKey?: string;
  checksumSha256?: string;
  metadata?: Prisma.InputJsonObject;
};


function normalizeString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function isSafeIdentifier(value: string, maxLength: number) {
  return value.length > 0 && value.length <= maxLength && /^[a-z0-9][a-z0-9-]*$/.test(value);
}

function isSafeStorageKey(value: string) {
  return value.length > 0 && value.length <= MAX_STORAGE_KEY_LENGTH && /^[A-Za-z0-9][A-Za-z0-9/_=.@:-]*$/.test(value) && !value.includes('..');
}

function jsonByteSize(value: unknown) {
  return Buffer.byteLength(JSON.stringify(value), 'utf8');
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
  return {
    ipHash: hashValue(forwardedFor ?? null),
    userAgentHash: hashValue(userAgent ?? null),
  };
}

function validateMetadata(value: unknown) {
  if (value === undefined || value === null) return null;
  if (typeof value !== 'object' || Array.isArray(value)) return 'metadata deve ser um objeto JSON simples.';
  if (jsonByteSize(value) > MAX_METADATA_BYTES) return 'metadata excede o tamanho máximo permitido.';
  const entries = Object.entries(value as Record<string, unknown>);
  if (entries.length > 40) return 'metadata possui campos demais.';
  for (const [key, child] of entries) {
    if (!/^[A-Za-z0-9][A-Za-z0-9_-]{0,59}$/.test(key)) return `metadata contém campo inválido: ${key}.`;
    if (!['string', 'number', 'boolean'].includes(typeof child) && child !== null) return 'metadata deve conter apenas valores simples.';
    if (typeof child === 'string' && child.length > 600) return 'metadata contém texto longo demais.';
  }
  return null;
}

function validateAttachment(rawAttachment: unknown, index: number) {
  if (!rawAttachment || typeof rawAttachment !== 'object' || Array.isArray(rawAttachment)) {
    return { error: `Anexo ${index + 1} deve conter metadados de arquivo.` };
  }

  const attachment = rawAttachment as Record<string, unknown>;
  const type = normalizeString(attachment.type) as SensitiveEvidenceAttachmentType;
  const originalFilename = normalizeString(attachment.originalFilename);
  const mimeType = normalizeString(attachment.mimeType).toLowerCase();
  const sizeBytes = Number(attachment.sizeBytes);
  const storageProvider = normalizeString(attachment.storageProvider) || undefined;
  const storageObjectKey = normalizeString(attachment.storageObjectKey) || undefined;
  const checksumSha256 = normalizeString(attachment.checksumSha256) || undefined;
  const metadata = attachment.metadata;

  if (!VALID_ATTACHMENT_TYPES.includes(type)) return { error: `Tipo do anexo ${index + 1} inválido.` };
  if (!originalFilename || originalFilename.length > MAX_FILENAME_LENGTH || /[\\/]/.test(originalFilename) || !FILENAME_BY_TYPE[type].test(originalFilename)) {
    return { error: `Nome/extensão do anexo ${index + 1} inválido para o tipo declarado.` };
  }
  if (!MIME_BY_TYPE[type].test(mimeType)) return { error: `MIME type do anexo ${index + 1} incompatível.` };
  if (!Number.isInteger(sizeBytes) || sizeBytes <= 0 || sizeBytes > MAX_ATTACHMENT_SIZE_BY_TYPE[type]) {
    return { error: `Tamanho do anexo ${index + 1} excede o limite permitido para ${type}.` };
  }
  if (storageProvider && !/^[a-z0-9][a-z0-9-]{0,40}$/.test(storageProvider)) return { error: `storageProvider do anexo ${index + 1} inválido.` };
  if (storageObjectKey && !isSafeStorageKey(storageObjectKey)) return { error: `storageObjectKey do anexo ${index + 1} inválido.` };
  if (checksumSha256 && !/^[a-f0-9]{64}$/i.test(checksumSha256)) return { error: `checksumSha256 do anexo ${index + 1} inválido.` };
  const metadataError = validateMetadata(metadata);
  if (metadataError) return { error: `Anexo ${index + 1}: ${metadataError}` };

  return {
    attachment: {
      type,
      originalFilename,
      mimeType,
      sizeBytes,
      storageProvider,
      storageObjectKey,
      checksumSha256,
      metadata: metadata && typeof metadata === 'object' && !Array.isArray(metadata) ? metadata as Prisma.InputJsonObject : undefined,
    },
  };
}

async function ensureOrganizationExists(organizationId: string) {
  const organization = await prisma.organization.findUnique({ where: { id: organizationId }, select: { id: true } });
  return Boolean(organization);
}

function isDatabaseSchemaUnavailable(error: unknown) {
  const code = (error as { code?: string })?.code;
  if (code === 'P2021' || code === 'P2022') return true;

  const message = String((error as Error)?.message ?? error).toLowerCase();
  return (
    message.includes('does not exist') ||
    (message.includes('relation') && message.includes('not exist')) ||
    (message.includes('table') && message.includes('not exist')) ||
    message.includes('no such table')
  );
}

function unavailableResponse(action: 'listar' | 'salvar') {
  return NextResponse.json(
    {
      error: `Cofre sensível ainda indisponível neste ambiente. É necessário aplicar as migrations do banco antes de ${action} registros sensíveis.`,
      featureUnavailable: 'sensitiveEvidenceVault',
    },
    { status: 503 },
  );
}

function serializeItem(item: Prisma.SchoolSensitiveEvidenceVaultItemGetPayload<{ include: { attachments: true; auditEvents: { take: 3; orderBy: { createdAt: 'desc' } } } }>) {
  return {
    id: item.id,
    organizationId: item.organizationId,
    courseSlug: item.courseSlug,
    lessonOrder: item.lessonOrder,
    documentKey: item.documentKey,
    title: item.title,
    caseReference: item.caseReference,
    sensitivity: item.sensitivity,
    status: item.status,
    retentionPolicy: item.retentionPolicy,
    legalHold: item.legalHold,
    archivedAt: item.archivedAt,
    archiveReason: item.archiveReason,
    metadata: item.metadata,
    createdBy: item.createdBy,
    updatedBy: item.updatedBy,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    attachments: item.attachments.map((attachment) => ({
      id: attachment.id,
      type: attachment.type,
      originalFilename: attachment.originalFilename,
      mimeType: attachment.mimeType,
      sizeBytes: attachment.sizeBytes,
      storageProvider: attachment.storageProvider,
      storageObjectKey: attachment.storageObjectKey,
      checksumSha256: attachment.checksumSha256,
      fileStatus: attachment.fileStatus,
      uploadedAt: attachment.uploadedAt,
      lastAccessedAt: attachment.lastAccessedAt,
      deletedAt: attachment.deletedAt,
      metadata: attachment.metadata,
      createdAt: attachment.createdAt,
    })),
    recentAuditEvents: item.auditEvents.map((event) => ({
      id: event.id,
      action: event.action,
      actor: event.actor,
      actorRole: event.actorRole,
      metadata: event.metadata,
      createdAt: event.createdAt,
    })),
  };
}

export async function GET(request: NextRequest, context: { params: Promise<{ organizationId: string }> }) {
  const params = await context.params;

  try {
    assertInternalAccess(request);
    if (!(await ensureOrganizationExists(params.organizationId))) {
      return NextResponse.json({ error: 'Escola/organização não encontrada.' }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const courseSlug = searchParams.get('courseSlug')?.trim();
    const status = searchParams.get('status')?.trim() as SensitiveEvidenceVaultStatus | undefined;

    if (courseSlug && (!isSafeIdentifier(courseSlug, 80) || !ALLOWED_COURSES.has(courseSlug))) {
      return NextResponse.json({ error: 'Curso inválido para cofre sensível.' }, { status: 400 });
    }
    if (status && !VALID_STATUSES.includes(status)) return NextResponse.json({ error: 'Status inválido.' }, { status: 400 });

    const [items] = await prisma.$transaction([
      prisma.schoolSensitiveEvidenceVaultItem.findMany({
        where: { organizationId: params.organizationId, ...(courseSlug ? { courseSlug } : {}), ...(status ? { status } : {}) },
        include: { attachments: true, auditEvents: { take: 3, orderBy: { createdAt: 'desc' } } },
        orderBy: [{ legalHold: 'desc' }, { updatedAt: 'desc' }],
        take: 100,
      }),
      prisma.schoolSensitiveEvidenceAuditEvent.create({
        data: {
          organizationId: params.organizationId,
          action: 'list_vault_items',
          actor: getActor(request),
          actorRole: 'internal',
          metadata: { courseSlug: courseSlug ?? null, status: status ?? null },
          ...getRequestAuditContext(request),
        },
      }),
    ]);

    return NextResponse.json({ items: items.map(serializeItem) });
  } catch (error) {
    if (isDatabaseSchemaUnavailable(error)) return unavailableResponse('listar');

    const status = (error as Error & { status?: number }).status ?? 500;
    if (status === 401) await logSensitiveEvidenceDeniedAttempt({ request, organizationId: params.organizationId, action: 'denied_list_vault_items', reason: (error as Error).message });
    console.error('Erro ao listar cofre de evidências sensíveis:', error);
    return NextResponse.json({ error: status === 500 ? 'Erro interno ao listar cofre sensível.' : (error as Error).message }, { status });
  }
}

export async function POST(request: NextRequest, context: { params: Promise<{ organizationId: string }> }) {
  const params = await context.params;

  try {
    assertInternalAccess(request);
    if (!(await ensureOrganizationExists(params.organizationId))) {
      return NextResponse.json({ error: 'Escola/organização não encontrada.' }, { status: 404 });
    }

    const body = await request.json();
    const courseSlug = normalizeString(body.courseSlug);
    const documentKey = normalizeString(body.documentKey);
    const title = normalizeString(body.title);
    const lessonOrder = body.lessonOrder === undefined || body.lessonOrder === null || body.lessonOrder === '' ? null : Number(body.lessonOrder);
    const caseReference = normalizeString(body.caseReference) || undefined;
    const sensitivity = normalizeString(body.sensitivity) || 'restricted';
    const retentionPolicy = normalizeString(body.retentionPolicy) || 'contract-plus-legal-obligation-review';
    const legalHold = Boolean(body.legalHold);
    const status = (normalizeString(body.status) || 'metadata_only') as SensitiveEvidenceVaultStatus;
    const metadata = body.metadata;
    const attachments = Array.isArray(body.attachments) ? body.attachments : [];

    if (!isSafeIdentifier(courseSlug, 80) || !ALLOWED_COURSES.has(courseSlug)) return NextResponse.json({ error: 'Curso inválido para cofre sensível.' }, { status: 400 });
    if (!isSafeIdentifier(documentKey, MAX_DOCUMENT_KEY_LENGTH) || !title || title.length > MAX_TITLE_LENGTH) return NextResponse.json({ error: 'documentKey e title são obrigatórios e devem respeitar formato/tamanho.' }, { status: 400 });
    if (lessonOrder !== null && (!Number.isInteger(lessonOrder) || lessonOrder <= 0)) return NextResponse.json({ error: 'lessonOrder deve ser inteiro positivo quando informado.' }, { status: 400 });
    if (caseReference && (caseReference.length > MAX_CASE_REFERENCE_LENGTH || !/^[A-Za-z0-9][A-Za-z0-9_.:@-]*$/.test(caseReference))) return NextResponse.json({ error: 'caseReference deve ser uma referência interna curta, sem dados pessoais.' }, { status: 400 });
    if (!VALID_SENSITIVITY.has(sensitivity)) return NextResponse.json({ error: 'Classificação de sensibilidade inválida.' }, { status: 400 });
    if (!VALID_RETENTION.has(retentionPolicy)) return NextResponse.json({ error: 'Política de retenção inválida.' }, { status: 400 });
    if (!VALID_STATUSES.includes(status)) return NextResponse.json({ error: 'Status inválido.' }, { status: 400 });
    if (attachments.length > MAX_ATTACHMENTS) return NextResponse.json({ error: 'Limite de 10 metadados de anexos por registro.' }, { status: 400 });
    const metadataError = validateMetadata(metadata);
    if (metadataError) return NextResponse.json({ error: metadataError }, { status: 400 });

    const validatedAttachments: ValidatedAttachment[] = [];
    for (let index = 0; index < attachments.length; index += 1) {
      const result = validateAttachment(attachments[index], index);
      if ('error' in result) return NextResponse.json({ error: result.error }, { status: 400 });
      validatedAttachments.push(result.attachment);
    }

    const actor = getActor(request);
    const requestAudit = getRequestAuditContext(request);

    const item = await prisma.$transaction(async (transaction) => {
      const created = await transaction.schoolSensitiveEvidenceVaultItem.create({
        data: {
          organizationId: params.organizationId,
          courseSlug,
          lessonOrder,
          documentKey,
          title: title.slice(0, MAX_TITLE_LENGTH),
          caseReference,
          sensitivity,
          status,
          retentionPolicy,
          legalHold,
          createdBy: actor,
          updatedBy: actor,
          metadata: metadata && typeof metadata === 'object' && !Array.isArray(metadata) ? metadata as Prisma.InputJsonObject : undefined,
          attachments: {
            create: validatedAttachments.map((attachment) => ({ ...attachment, organizationId: params.organizationId })),
          },
        },
        include: { attachments: true, auditEvents: { take: 3, orderBy: { createdAt: 'desc' } } },
      });

      await transaction.schoolSensitiveEvidenceAuditEvent.create({
        data: {
          organizationId: params.organizationId,
          vaultItemId: created.id,
          action: 'create_vault_item_metadata',
          actor,
          actorRole: 'internal',
          metadata: {
            courseSlug,
            documentKey,
            sensitivity,
            status,
            legalHold,
            attachmentCount: validatedAttachments.length,
          },
          ...requestAudit,
        },
      });

      return transaction.schoolSensitiveEvidenceVaultItem.findUniqueOrThrow({
        where: { id: created.id },
        include: { attachments: true, auditEvents: { take: 3, orderBy: { createdAt: 'desc' } } },
      });
    });

    return NextResponse.json({ item: serializeItem(item) }, { status: 201 });
  } catch (error) {
    if (isDatabaseSchemaUnavailable(error)) return unavailableResponse('salvar');

    const status = (error as Error & { status?: number }).status ?? 500;
    if (status === 401) await logSensitiveEvidenceDeniedAttempt({ request, organizationId: params.organizationId, action: 'denied_create_vault_item_metadata', reason: (error as Error).message });
    console.error('Erro ao salvar cofre de evidências sensíveis:', error);
    return NextResponse.json({ error: status === 500 ? 'Erro interno ao salvar cofre sensível.' : (error as Error).message }, { status });
  }
}
