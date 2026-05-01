type SendInviteEmailInput = {
  to?: string | null;
  fullName: string;
  organizationName: string;
  invitationUrl: string;
  expiresAt?: Date | string | null;
};

export type SendInviteEmailResult = {
  sent: boolean;
  provider?: 'mailersend' | 'resend';
  skipped?: boolean;
  error?: string;
};

function getMailerSendFrom() {
  return {
    email: process.env.MAILERSEND_FROM_EMAIL || process.env.EXCELLENTIA_INVITE_FROM_EMAIL || 'contato@excellentia-edu.com',
    name: process.env.MAILERSEND_FROM_NAME || process.env.EXCELLENTIA_INVITE_FROM_NAME || 'Excellentia',
  };
}

function getResendFromAddress() {
  return process.env.EXCELLENTIA_INVITE_FROM || process.env.RESEND_FROM || 'Excellentia <contato@excellentia-edu.com>';
}

function buildInviteEmail(input: SendInviteEmailInput) {
  const expiresText = input.expiresAt
    ? new Date(input.expiresAt).toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })
    : null;

  const subject = `Seu acesso ao curso NR-1 da ${input.organizationName}`;
  const text = [
    `Olá, ${input.fullName}.`,
    '',
    `${input.organizationName} liberou seu acesso ao curso NR-1 nas Escolas pela Excellentia.`,
    '',
    'Acesse pelo link individual abaixo:',
    input.invitationUrl,
    '',
    expiresText ? `Este convite está previsto para expirar em ${expiresText}.` : '',
    '',
    'Esse link é individual. Não encaminhe para outras pessoas.',
    '',
    'Excellentia',
  ].filter(Boolean).join('\n');

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#172033;max-width:620px">
      <p>Olá, <strong>${input.fullName}</strong>.</p>
      <p><strong>${input.organizationName}</strong> liberou seu acesso ao curso <strong>NR-1 nas Escolas</strong> pela Excellentia.</p>
      <p><a href="${input.invitationUrl}" style="display:inline-block;background:#C9A227;color:#fff;text-decoration:none;font-weight:700;padding:12px 18px;border-radius:10px">Acessar curso</a></p>
      <p style="font-size:13px;color:#555">Se o botão não funcionar, copie e cole este link no navegador:<br>${input.invitationUrl}</p>
      ${expiresText ? `<p style="font-size:13px;color:#555">Este convite está previsto para expirar em ${expiresText}.</p>` : ''}
      <p style="font-size:13px;color:#8a5a00;background:#fff7e0;padding:10px;border-radius:8px">Esse link é individual. Não encaminhe para outras pessoas.</p>
      <p>Excellentia</p>
    </div>
  `;

  return { subject, text, html };
}

function explainMailerSendError(status: number, body: string) {
  if (body.includes('#MS42225') || body.toLowerCase().includes('unique recipients limit')) {
    return 'A conta atual do MailerSend atingiu o limite de destinatários únicos do período de teste. Para continuar testando envio para novos e-mails, é necessário liberar/alterar o plano no MailerSend ou usar um destinatário que já esteja permitido nessa conta. O convite foi gerado; use Copiar link enquanto isso.';
  }

  if (body.includes('#MS42208') || body.toLowerCase().includes('valid email address')) {
    return 'O e-mail do colaborador não é um endereço válido. Corrija o cadastro ou use Copiar link.';
  }

  return `Falha MailerSend ${status}: ${body.slice(0, 500)}`;
}

async function sendViaMailerSend(input: SendInviteEmailInput): Promise<SendInviteEmailResult> {
  const apiKey = process.env.MAILERSEND_API_KEY;
  const to = input.to?.trim();

  if (!to) return { sent: false, provider: 'mailersend', skipped: true, error: 'Colaborador sem e-mail cadastrado.' };
  if (!/^\S+@\S+\.\S+$/.test(to)) return { sent: false, provider: 'mailersend', skipped: true, error: 'O e-mail do colaborador não é um endereço válido. Corrija o cadastro ou use Copiar link.' };
  if (!apiKey) return { sent: false, provider: 'mailersend', skipped: true, error: 'MAILERSEND_API_KEY não configurada.' };

  const from = getMailerSendFrom();
  const { subject, text, html } = buildInviteEmail(input);

  const response = await fetch('https://api.mailersend.com/v1/email', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [{ email: to, name: input.fullName }],
      subject,
      text,
      html,
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    return { sent: false, provider: 'mailersend', error: explainMailerSendError(response.status, body) };
  }

  return { sent: true, provider: 'mailersend' };
}

async function sendViaResend(input: SendInviteEmailInput): Promise<SendInviteEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = input.to?.trim();

  if (!to) return { sent: false, provider: 'resend', skipped: true, error: 'Colaborador sem e-mail cadastrado.' };
  if (!apiKey) return { sent: false, provider: 'resend', skipped: true, error: 'RESEND_API_KEY não configurada.' };

  const { subject, text, html } = buildInviteEmail(input);

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: getResendFromAddress(), to, subject, text, html }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    return { sent: false, provider: 'resend', error: `Falha Resend ${response.status}: ${body.slice(0, 500)}` };
  }

  return { sent: true, provider: 'resend' };
}

export async function sendInviteEmail(input: SendInviteEmailInput): Promise<SendInviteEmailResult> {
  if (process.env.MAILERSEND_API_KEY) return sendViaMailerSend(input);
  return sendViaResend(input);
}
