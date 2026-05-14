import { NextRequest, NextResponse } from 'next/server';
import { Prisma, SchoolCourseEvidenceDocumentStatus } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { assertInternalAccess } from '@/lib/invitations';

const VALID_STATUSES: SchoolCourseEvidenceDocumentStatus[] = [
  'draft',
  'submitted',
  'reviewed',
  'approved',
  'archived',
];

const ALLOWED_COURSES = new Set([
  'incendio-escolas',
  'lei-lucas-escolas',
  'nr1-escolas',
  'violencia-escolar-protecao',
  'protecao-digital-dados-escolas',
  'lgpd-escolas',
]);

const MAX_SLUG_LENGTH = 80;
const MAX_TITLE_LENGTH = 160;
const MAX_DOCUMENT_KEY_LENGTH = 80;
const MAX_CONTENT_BYTES = 24_000;
const MAX_METADATA_BYTES = 6_000;
const MAX_STRING_LENGTH = 2_000;
const MAX_JSON_DEPTH = 5;
const MAX_JSON_KEYS = 80;

const BLOCKED_KEY_PATTERN = /(anexo|attachment|arquivo|file|upload|base64|imagem|image|foto|photo|documentoDigital|raw|binario|binary)/i;
const BLOCKED_STRING_PATTERN = /(data:[^;]+;base64,|https?:\/\/\S+\.(?:pdf|docx?|xlsx?|png|jpe?g|webp|heic|zip)\b)/i;
const IDENTIFIER_PATTERN = /\b(?:\d{3}\.?\d{3}\.?\d{3}-?\d{2}|\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2})\b/;
const SENSITIVE_VIOLENCE_TERMS = /\b(?:abuso sexual|viol[eê]ncia sexual|estupro|automutila[cç][aã]o|suic[ií]dio|laudo|prontu[aá]rio|boletim de ocorr[eê]ncia|conselho tutelar)\b/i;

function parseOptionalPositiveInt(value: string | null) {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

function normalizeString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function isSafeIdentifier(value: string, maxLength: number) {
  return value.length > 0 && value.length <= maxLength && /^[a-z0-9][a-z0-9-]*$/.test(value);
}

function isSafeJsonField(value: string, maxLength: number) {
  return value.length > 0 && value.length <= maxLength && /^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(value);
}

function jsonByteSize(value: unknown) {
  return Buffer.byteLength(JSON.stringify(value), 'utf8');
}

function validateJsonObject(value: unknown, label: 'content' | 'metadata', options: { maxBytes: number }) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return `${label} deve ser um objeto JSON.`;
  }

  if (jsonByteSize(value) > options.maxBytes) {
    return `${label} excede o tamanho máximo permitido.`;
  }

  const visit = (node: unknown, depth: number): string | null => {
    if (depth > MAX_JSON_DEPTH) return `${label} excede a profundidade máxima permitida.`;
    if (Array.isArray(node)) return `${label} não deve conter listas; use campos textuais estruturados.`;
    if (!node || typeof node !== 'object') {
      if (typeof node === 'string') {
        if (node.length > MAX_STRING_LENGTH) return `${label} contém texto longo demais em um campo.`;
        if (BLOCKED_STRING_PATTERN.test(node)) return `${label} não deve armazenar links de anexos, imagens ou arquivos. Guarde apenas referência interna mínima.`;
        if (IDENTIFIER_PATTERN.test(node) || SENSITIVE_VIOLENCE_TERMS.test(node)) {
          return `${label} contém dados identificáveis ou material sensível demais para este registro. Use descrições mínimas, codinomes internos e encaminhamento seguro fora da plataforma.`;
        }
      }
      if (typeof node === 'number' && !Number.isFinite(node)) return `${label} contém número inválido.`;
      if (['string', 'number', 'boolean'].includes(typeof node) || node === null) return null;
      return `${label} contém tipo de dado inválido.`;
    }

    const entries = Object.entries(node as Record<string, unknown>);
    if (entries.length > MAX_JSON_KEYS) return `${label} possui campos demais.`;

    for (const [key, child] of entries) {
      if (!isSafeJsonField(key, 60)) return `${label} contém nome de campo inválido: ${key}.`;
      if (BLOCKED_KEY_PATTERN.test(key)) return `${label} não deve conter anexos, imagens, arquivos ou conteúdo bruto.`;
      const error = visit(child, depth + 1);
      if (error) return error;
    }

    return null;
  };

  return visit(value, 1);
}

function normalizeJsonObject(value: unknown) {
  return value as Prisma.InputJsonObject;
}

function serializeDocument(document: {
  id: string;
  organizationId: string;
  courseSlug: string;
  lessonOrder: number;
  documentKey: string;
  title: string;
  status: SchoolCourseEvidenceDocumentStatus;
  content: Prisma.JsonValue;
  metadata: Prisma.JsonValue | null;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: document.id,
    organizationId: document.organizationId,
    courseSlug: document.courseSlug,
    lessonOrder: document.lessonOrder,
    documentKey: document.documentKey,
    title: document.title,
    status: document.status,
    content: document.content,
    metadata: document.metadata,
    createdAt: document.createdAt,
    updatedAt: document.updatedAt,
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
      error: `Evidências formativas ainda indisponíveis neste ambiente. É necessário aplicar as migrations do banco antes de ${action} estes documentos.`,
      featureUnavailable: 'courseEvidenceDocuments',
    },
    { status: 503 },
  );
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
    const lessonOrder = parseOptionalPositiveInt(searchParams.get('lessonOrder'));
    const documentKey = searchParams.get('documentKey')?.trim();
    const status = searchParams.get('status')?.trim() as SchoolCourseEvidenceDocumentStatus | undefined;

    if (courseSlug && (!isSafeIdentifier(courseSlug, MAX_SLUG_LENGTH) || !ALLOWED_COURSES.has(courseSlug))) {
      return NextResponse.json({ error: 'Curso inválido para evidências.' }, { status: 400 });
    }

    if (documentKey && !isSafeIdentifier(documentKey, MAX_DOCUMENT_KEY_LENGTH)) {
      return NextResponse.json({ error: 'documentKey inválido.' }, { status: 400 });
    }

    if (lessonOrder === null) {
      return NextResponse.json({ error: 'lessonOrder deve ser um número inteiro positivo.' }, { status: 400 });
    }

    if (status && !VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: 'Status inválido.' }, { status: 400 });
    }

    const documents = await prisma.schoolCourseEvidenceDocument.findMany({
      where: {
        organizationId: params.organizationId,
        ...(courseSlug ? { courseSlug } : {}),
        ...(lessonOrder ? { lessonOrder } : {}),
        ...(documentKey ? { documentKey } : {}),
        ...(status ? { status } : {}),
      },
      orderBy: [{ courseSlug: 'asc' }, { lessonOrder: 'asc' }, { documentKey: 'asc' }],
    });

    return NextResponse.json({ documents: documents.map(serializeDocument) });
  } catch (error) {
    if (isDatabaseSchemaUnavailable(error)) return unavailableResponse('listar');

    const status = (error as Error & { status?: number }).status ?? 500;
    console.error('Erro ao listar evidências do curso:', error);
    return NextResponse.json({ error: status === 500 ? 'Erro interno ao listar evidências.' : (error as Error).message }, { status });
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
    const lessonOrder = Number(body.lessonOrder);
    const status = (normalizeString(body.status) || 'draft') as SchoolCourseEvidenceDocumentStatus;
    const content = body.content;
    const metadata = body.metadata;

    if (!isSafeIdentifier(courseSlug, MAX_SLUG_LENGTH) || !ALLOWED_COURSES.has(courseSlug)) {
      return NextResponse.json({ error: 'Curso inválido para evidências.' }, { status: 400 });
    }

    if (!isSafeIdentifier(documentKey, MAX_DOCUMENT_KEY_LENGTH) || !title || title.length > MAX_TITLE_LENGTH || !Number.isInteger(lessonOrder) || lessonOrder <= 0) {
      return NextResponse.json(
        { error: 'courseSlug, lessonOrder, documentKey e title são obrigatórios e devem respeitar os limites de formato.' },
        { status: 400 },
      );
    }

    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: 'Status inválido.' }, { status: 400 });
    }

    const contentError = validateJsonObject(content, 'content', { maxBytes: MAX_CONTENT_BYTES });
    if (contentError) return NextResponse.json({ error: contentError }, { status: 400 });

    if (metadata !== undefined && metadata !== null) {
      const metadataError = validateJsonObject(metadata, 'metadata', { maxBytes: MAX_METADATA_BYTES });
      if (metadataError) return NextResponse.json({ error: metadataError }, { status: 400 });
    }

    const privacyMetadata = {
      classification: courseSlug === 'violencia-escolar-protecao' ? 'restricted-sensitive-school-evidence' : 'internal-school-evidence',
      retention: 'contract-or-legal-obligation-review',
      minimization: 'no-attachments-no-raw-sensitive-identifiers',
      updatedBy: 'admin',
      ...(metadata && typeof metadata === 'object' && !Array.isArray(metadata) ? metadata : {}),
    };

    const document = await prisma.schoolCourseEvidenceDocument.upsert({
      where: {
        organizationId_courseSlug_lessonOrder_documentKey: {
          organizationId: params.organizationId,
          courseSlug,
          lessonOrder,
          documentKey,
        },
      },
      create: {
        organizationId: params.organizationId,
        courseSlug,
        lessonOrder,
        documentKey,
        title: title.slice(0, MAX_TITLE_LENGTH),
        status,
        content: normalizeJsonObject(content),
        metadata: normalizeJsonObject(privacyMetadata),
      },
      update: {
        title: title.slice(0, MAX_TITLE_LENGTH),
        status,
        content: normalizeJsonObject(content),
        metadata: normalizeJsonObject(privacyMetadata),
      },
    });

    return NextResponse.json({ document: serializeDocument(document) });
  } catch (error) {
    if (isDatabaseSchemaUnavailable(error)) return unavailableResponse('salvar');

    const status = (error as Error & { status?: number }).status ?? 500;
    console.error('Erro ao salvar evidência do curso:', error);
    return NextResponse.json({ error: status === 500 ? 'Erro interno ao salvar evidência.' : (error as Error).message }, { status });
  }
}
