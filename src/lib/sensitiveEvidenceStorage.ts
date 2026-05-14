import { createHash, createHmac, randomUUID } from 'node:crypto';
import { mkdir, readFile, stat, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { SensitiveEvidenceAttachmentType } from '@prisma/client';

export type SensitiveEvidenceStorageProvider = 'local-private' | 'cloudflare-r2';

const configuredProvider = process.env.SENSITIVE_EVIDENCE_STORAGE_PROVIDER?.trim().toLowerCase();
export const SENSITIVE_EVIDENCE_STORAGE_PROVIDER: SensitiveEvidenceStorageProvider = configuredProvider === 'cloudflare-r2' || configuredProvider === 'r2'
  ? 'cloudflare-r2'
  : 'local-private';

export const SENSITIVE_EVIDENCE_STORAGE_ROOT = path.resolve(
  process.env.SENSITIVE_EVIDENCE_VAULT_DIR ?? path.join(process.cwd(), '.private-storage', 'sensitive-evidence-vault'),
);

export const MAX_ATTACHMENT_SIZE_BY_TYPE: Record<SensitiveEvidenceAttachmentType, number> = {
  image: 15 * 1024 * 1024,
  audio: 50 * 1024 * 1024,
  video: 250 * 1024 * 1024,
  pdf: 30 * 1024 * 1024,
  other_document: 15 * 1024 * 1024,
};

export const MIME_BY_TYPE: Record<SensitiveEvidenceAttachmentType, RegExp> = {
  image: /^image\/(png|jpe?g|webp|heic)$/i,
  audio: /^audio\/(mpeg|mp3|mp4|m4a|aac|wav|ogg|webm)$/i,
  video: /^video\/(mp4|quicktime|webm|x-m4v)$/i,
  pdf: /^application\/pdf$/i,
  other_document: /^(application\/(vnd\.openxmlformats-officedocument\.wordprocessingml\.document|msword)|text\/plain)$/i,
};

export const FILENAME_BY_TYPE: Record<SensitiveEvidenceAttachmentType, RegExp> = {
  image: /\.(png|jpe?g|webp|heic)$/i,
  audio: /\.(mp3|m4a|aac|wav|ogg|webm)$/i,
  video: /\.(mp4|mov|webm|m4v)$/i,
  pdf: /\.pdf$/i,
  other_document: /\.(docx?|txt)$/i,
};

export function sanitizeSensitiveEvidenceFilename(filename: string) {
  const base = path.basename(filename).normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
  return base.replace(/[^A-Za-z0-9._-]/g, '-').replace(/-+/g, '-').slice(0, 120) || 'evidencia';
}

export function validateSensitiveEvidenceFile(input: { type: SensitiveEvidenceAttachmentType; originalFilename: string; mimeType: string; sizeBytes: number }) {
  if (!MAX_ATTACHMENT_SIZE_BY_TYPE[input.type]) return 'Tipo de anexo inválido.';
  if (!input.originalFilename || input.originalFilename.length > 160 || /[\\/]/.test(input.originalFilename) || !FILENAME_BY_TYPE[input.type].test(input.originalFilename)) {
    return 'Nome/extensão do arquivo incompatível com o tipo declarado.';
  }
  if (!MIME_BY_TYPE[input.type].test(input.mimeType)) return 'MIME type incompatível com o tipo declarado.';
  if (!Number.isInteger(input.sizeBytes) || input.sizeBytes <= 0 || input.sizeBytes > MAX_ATTACHMENT_SIZE_BY_TYPE[input.type]) {
    return `Arquivo excede o limite permitido para ${input.type}.`;
  }
  return null;
}

export function buildSensitiveEvidenceObjectKey(organizationId: string, vaultItemId: string, originalFilename: string) {
  const safeFilename = sanitizeSensitiveEvidenceFilename(originalFilename);
  return `${organizationId}/${vaultItemId}/${randomUUID()}-${safeFilename}`;
}

function assertSafeObjectKey(objectKey: string) {
  if (!/^[A-Za-z0-9][A-Za-z0-9/_=.@:-]*$/.test(objectKey) || objectKey.includes('..')) {
    throw new Error('Chave de storage inválida.');
  }
}

export function resolveSensitiveEvidencePath(objectKey: string) {
  assertSafeObjectKey(objectKey);
  const resolved = path.resolve(SENSITIVE_EVIDENCE_STORAGE_ROOT, objectKey);
  if (!resolved.startsWith(`${SENSITIVE_EVIDENCE_STORAGE_ROOT}${path.sep}`)) {
    throw new Error('Chave de storage fora do cofre privado.');
  }
  return resolved;
}

type R2Config = {
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
  endpoint: string;
};

function getR2Config(): R2Config {
  const accountId = process.env.CLOUDFLARE_R2_ACCOUNT_ID ?? process.env.CLOUDFLARE_ACCOUNT_ID;
  const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID ?? process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY ?? process.env.R2_SECRET_ACCESS_KEY;
  const bucket = process.env.CLOUDFLARE_R2_SENSITIVE_EVIDENCE_BUCKET ?? process.env.CLOUDFLARE_R2_BUCKET ?? process.env.R2_SENSITIVE_EVIDENCE_BUCKET;
  const endpoint = process.env.CLOUDFLARE_R2_ENDPOINT ?? (accountId ? `https://${accountId}.r2.cloudflarestorage.com` : undefined);

  if (!accountId || !accessKeyId || !secretAccessKey || !bucket || !endpoint) {
    throw new Error('Cloudflare R2 não configurado: defina CLOUDFLARE_R2_ACCOUNT_ID/CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_R2_ACCESS_KEY_ID, CLOUDFLARE_R2_SECRET_ACCESS_KEY e CLOUDFLARE_R2_SENSITIVE_EVIDENCE_BUCKET.');
  }

  if (!/^[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$/.test(bucket)) throw new Error('Nome de bucket R2 inválido.');
  return { accountId, accessKeyId, secretAccessKey, bucket, endpoint: endpoint.replace(/\/$/, '') };
}

function hmac(key: Buffer | string, value: string) {
  return createHmac('sha256', key).update(value).digest();
}

function hexSha256(value: string | Buffer) {
  return createHash('sha256').update(value).digest('hex');
}

function encodeS3PathPart(value: string) {
  return encodeURIComponent(value).replace(/[!'()*]/g, (char) => `%${char.charCodeAt(0).toString(16).toUpperCase()}`);
}

function buildCanonicalUri(bucket: string, objectKey: string) {
  return `/${encodeS3PathPart(bucket)}/${objectKey.split('/').map(encodeS3PathPart).join('/')}`;
}

function awsDate(now = new Date()) {
  const iso = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
  return { amzDate: iso, shortDate: iso.slice(0, 8) };
}

function signR2Request(input: { method: 'GET' | 'PUT' | 'DELETE'; objectKey: string; body?: Buffer; contentType?: string }) {
  const config = getR2Config();
  assertSafeObjectKey(input.objectKey);

  const { amzDate, shortDate } = awsDate();
  const endpoint = new URL(config.endpoint);
  const canonicalUri = buildCanonicalUri(config.bucket, input.objectKey);
  const payloadHash = hexSha256(input.body ?? '');
  const headers: Record<string, string> = {
    host: endpoint.host,
    'x-amz-content-sha256': payloadHash,
    'x-amz-date': amzDate,
  };
  if (input.contentType) headers['content-type'] = input.contentType;

  const sortedHeaderNames = Object.keys(headers).sort();
  const canonicalHeaders = sortedHeaderNames.map((name) => `${name}:${headers[name].trim()}\n`).join('');
  const signedHeaders = sortedHeaderNames.join(';');
  const canonicalRequest = [input.method, canonicalUri, '', canonicalHeaders, signedHeaders, payloadHash].join('\n');
  const credentialScope = `${shortDate}/auto/s3/aws4_request`;
  const stringToSign = ['AWS4-HMAC-SHA256', amzDate, credentialScope, hexSha256(canonicalRequest)].join('\n');
  const signingKey = hmac(hmac(hmac(hmac(`AWS4${config.secretAccessKey}`, shortDate), 'auto'), 's3'), 'aws4_request');
  const signature = createHmac('sha256', signingKey).update(stringToSign).digest('hex');

  return {
    url: `${config.endpoint}${canonicalUri}`,
    headers: {
      ...headers,
      Authorization: `AWS4-HMAC-SHA256 Credential=${config.accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`,
    },
  };
}

async function assertR2Ok(response: Response, action: string) {
  if (response.ok) return;
  const body = await response.text().catch(() => '');
  throw new Error(`Falha R2 ao ${action}: HTTP ${response.status}${body ? ` ${body.slice(0, 300)}` : ''}`);
}

async function writeLocalSensitiveEvidenceFile(objectKey: string, bytes: Buffer) {
  const targetPath = resolveSensitiveEvidencePath(objectKey);
  await mkdir(path.dirname(targetPath), { recursive: true, mode: 0o700 });
  await writeFile(targetPath, bytes, { mode: 0o600 });
}

async function readLocalSensitiveEvidenceFile(objectKey: string) {
  const targetPath = resolveSensitiveEvidencePath(objectKey);
  const [bytes, fileStat] = await Promise.all([readFile(targetPath), stat(targetPath)]);
  return { bytes, sizeBytes: fileStat.size };
}

async function deleteLocalSensitiveEvidenceFile(objectKey: string) {
  try {
    await unlink(resolveSensitiveEvidencePath(objectKey));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
  }
}

async function writeR2SensitiveEvidenceFile(objectKey: string, bytes: Buffer, contentType = 'application/octet-stream') {
  const signed = signR2Request({ method: 'PUT', objectKey, body: bytes, contentType });
  const arrayBuffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
  const body = new Blob([arrayBuffer], { type: contentType });
  const response = await fetch(signed.url, { method: 'PUT', headers: signed.headers, body });
  await assertR2Ok(response, 'gravar evidência sensível');
}

async function readR2SensitiveEvidenceFile(objectKey: string) {
  const signed = signR2Request({ method: 'GET', objectKey });
  const response = await fetch(signed.url, { method: 'GET', headers: signed.headers });
  await assertR2Ok(response, 'ler evidência sensível');
  const bytes = Buffer.from(await response.arrayBuffer());
  return { bytes, sizeBytes: bytes.byteLength };
}

async function deleteR2SensitiveEvidenceFile(objectKey: string) {
  const signed = signR2Request({ method: 'DELETE', objectKey });
  const response = await fetch(signed.url, { method: 'DELETE', headers: signed.headers });
  await assertR2Ok(response, 'excluir evidência sensível');
}

export async function writeSensitiveEvidenceFile(objectKey: string, bytes: Buffer, contentType?: string) {
  if (SENSITIVE_EVIDENCE_STORAGE_PROVIDER === 'cloudflare-r2') return writeR2SensitiveEvidenceFile(objectKey, bytes, contentType);
  return writeLocalSensitiveEvidenceFile(objectKey, bytes);
}

export async function readSensitiveEvidenceFile(objectKey: string) {
  if (SENSITIVE_EVIDENCE_STORAGE_PROVIDER === 'cloudflare-r2') return readR2SensitiveEvidenceFile(objectKey);
  return readLocalSensitiveEvidenceFile(objectKey);
}

export async function deleteSensitiveEvidenceFile(objectKey: string) {
  if (SENSITIVE_EVIDENCE_STORAGE_PROVIDER === 'cloudflare-r2') return deleteR2SensitiveEvidenceFile(objectKey);
  return deleteLocalSensitiveEvidenceFile(objectKey);
}

export function sha256Hex(bytes: Buffer) {
  return createHash('sha256').update(bytes).digest('hex');
}
