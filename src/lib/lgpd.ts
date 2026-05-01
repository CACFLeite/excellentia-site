import crypto from 'node:crypto';
import { prisma } from '@/lib/prisma';
import { sendTransactionalEmail } from '@/lib/transactionalEmail';

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function normalizeCpf(cpf?: string | null) {
  return cpf ? cpf.replace(/\D/g, '') : null;
}

export function createSecureToken() {
  return crypto.randomBytes(32).toString('base64url');
}

export function hashToken(token: string) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

function appBaseUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` || 'https://excellentia-edu.com';
}

export async function sendDataSubjectVerificationEmail(input: { to: string; name: string; token: string }) {
  const url = `${appBaseUrl()}/api/lgpd/requests/verify?token=${encodeURIComponent(input.token)}`;
  return sendTransactionalEmail({
    to: input.to,
    name: input.name,
    subject: 'Confirme sua solicitação LGPD — Excellentia',
    text: [
      `Olá, ${input.name}.`,
      '',
      'Recebemos uma solicitação relacionada aos seus dados pessoais na Excellentia.',
      'Para evitar fraude ou envio indevido de dados a terceiros, confirme que este e-mail pertence a você acessando o link abaixo:',
      url,
      '',
      'Se você não fez essa solicitação, ignore esta mensagem.',
      '',
      'Excellentia',
    ].join('\n'),
    html: `<div style="font-family:Arial,sans-serif;line-height:1.5;color:#172033;max-width:620px"><p>Olá, <strong>${input.name}</strong>.</p><p>Recebemos uma solicitação relacionada aos seus dados pessoais na Excellentia.</p><p>Para evitar fraude ou envio indevido de dados a terceiros, confirme que este e-mail pertence a você:</p><p><a href="${url}" style="display:inline-block;background:#C9A227;color:#fff;text-decoration:none;font-weight:700;padding:12px 18px;border-radius:10px">Confirmar solicitação</a></p><p style="font-size:13px;color:#555">Se o botão não funcionar, copie e cole este link no navegador:<br>${url}</p><p style="font-size:13px;color:#8a5a00;background:#fff7e0;padding:10px;border-radius:8px">Se você não fez essa solicitação, ignore esta mensagem.</p><p>Excellentia</p></div>`,
  });
}

export async function buildDataSubjectExport(email: string, cpf?: string | null) {
  const normalizedEmail = normalizeEmail(email);
  const normalizedCpf = normalizeCpf(cpf);

  const employees = await prisma.employee.findMany({
    where: {
      email: { equals: normalizedEmail, mode: 'insensitive' },
      ...(normalizedCpf ? { cpf: normalizedCpf } : {}),
    },
    include: {
      organization: { select: { id: true, name: true, legalName: true, document: true, slug: true, status: true } },
      unit: true,
      enrollments: { include: { course: true } },
      responses: { include: { activity: { include: { lesson: { include: { course: true } } } }, feedback: true } },
      certificates: true,
      invitations: true,
      communications: true,
    },
  });

  const memberships = await prisma.organizationMember.findMany({
    where: { email: { equals: normalizedEmail, mode: 'insensitive' } },
    include: { organization: { include: { pgrDocuments: true, communications: true } } },
  });

  const relatedRequests = await prisma.dataSubjectRequest.findMany({
    where: { email: { equals: normalizedEmail, mode: 'insensitive' } },
    select: { id: true, requestType: true, status: true, createdAt: true, completedAt: true },
    orderBy: { createdAt: 'desc' },
  });

  return {
    generatedAt: new Date().toISOString(),
    scope: 'Dados pessoais localizados nas bases operacionais próprias da plataforma Excellentia/Neon. Dados mantidos em provedores externos, quando existirem, podem exigir complementação operacional conforme o canal e contrato aplicáveis.',
    identityCheck: {
      verifiedEmail: normalizedEmail,
      cpfProvided: Boolean(normalizedCpf),
      exportRule: 'A exportação automática inclui apenas registros vinculados ao e-mail verificado; CPF, quando informado, restringe a busca de colaborador para reduzir risco de fraude.',
    },
    data: {
      employees,
      organizationMemberships: memberships,
      lgpdRequests: relatedRequests,
    },
  };
}

export async function sendDataSubjectExportEmail(input: { to: string; name: string; exportData: unknown }) {
  const json = JSON.stringify(input.exportData, null, 2);
  return sendTransactionalEmail({
    to: input.to,
    name: input.name,
    subject: 'Sua exportação de dados pessoais — Excellentia',
    text: [
      `Olá, ${input.name}.`,
      '',
      'Sua solicitação LGPD foi verificada e a exportação automática dos dados encontrados segue em anexo, em formato JSON.',
      'Se você esperava dados que não aparecem no arquivo, responda pelo canal de atendimento para análise manual/complementar.',
      '',
      'Excellentia',
    ].join('\n'),
    html: `<div style="font-family:Arial,sans-serif;line-height:1.5;color:#172033;max-width:620px"><p>Olá, <strong>${input.name}</strong>.</p><p>Sua solicitação LGPD foi verificada e a exportação automática dos dados encontrados segue em anexo, em formato JSON.</p><p>Se você esperava dados que não aparecem no arquivo, responda pelo canal de atendimento para análise manual/complementar.</p><p>Excellentia</p></div>`,
    attachments: [{
      filename: `excellentia-dados-pessoais-${new Date().toISOString().slice(0, 10)}.json`,
      content: Buffer.from(json, 'utf8').toString('base64'),
      contentType: 'application/json',
    }],
  });
}
