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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function buildInviteEmail(input: SendInviteEmailInput) {
  const expiresText = input.expiresAt
    ? new Date(input.expiresAt).toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })
    : null;

  const safeName = escapeHtml(input.fullName);
  const safeOrganization = escapeHtml(input.organizationName);
  const safeUrl = escapeHtml(input.invitationUrl);
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

  const html = `<!doctype html>
<html lang="pt-BR">
  <body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;color:#172033;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      ${safeOrganization} liberou seu acesso ao curso NR-1 nas Escolas pela Excellentia.
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e7ebf0;box-shadow:0 8px 28px rgba(15,23,42,0.08);">
            <tr>
              <td style="background:#0A2749;padding:24px 28px;">
                <div style="font-size:24px;font-weight:800;letter-spacing:-0.03em;color:#ffffff;">Excel<span style="color:#C9A227;">lentia</span></div>
                <div style="margin-top:6px;font-size:13px;line-height:1.5;color:#cbd5e1;">Formação e conformidade para escolas</div>
              </td>
            </tr>
            <tr>
              <td style="padding:30px 28px 8px;">
                <div style="display:inline-block;background:#fff7df;color:#8a5a00;border-radius:999px;padding:6px 12px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;">Convite individual</div>
                <h1 style="margin:18px 0 10px;font-size:25px;line-height:1.2;color:#0A2749;">Seu acesso ao curso NR-1 está liberado</h1>
                <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#334155;">Olá, <strong>${safeName}</strong>.</p>
                <p style="margin:0;font-size:16px;line-height:1.6;color:#334155;"><strong>${safeOrganization}</strong> liberou seu acesso ao curso <strong>NR-1 nas Escolas</strong> pela Excellentia.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 28px 12px;">
                <a href="${safeUrl}" style="display:inline-block;background:#C9A227;color:#ffffff;text-decoration:none;font-weight:800;font-size:15px;padding:14px 22px;border-radius:12px;box-shadow:0 6px 16px rgba(201,162,39,.25);">Acessar curso</a>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 28px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;">
                  <tr>
                    <td style="padding:16px 18px;">
                      <p style="margin:0 0 8px;font-size:13px;line-height:1.5;color:#64748b;">Se o botão não funcionar, copie e cole este link no navegador:</p>
                      <a href="${safeUrl}" style="font-size:13px;line-height:1.5;color:#0A66C2;word-break:break-all;">${safeUrl}</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 28px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fff8e8;border:1px solid #f3dfac;border-radius:14px;">
                  <tr>
                    <td style="padding:14px 16px;font-size:13px;line-height:1.55;color:#76510b;">
                      <strong>Importante:</strong> este link é individual e não deve ser encaminhado para outras pessoas.${expiresText ? ` O convite está previsto para expirar em <strong>${expiresText}</strong>.` : ''}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 28px 30px;font-size:13px;line-height:1.6;color:#64748b;">
                <p style="margin:0;">Se você não reconhece este convite, ignore esta mensagem ou avise a escola responsável.</p>
                <p style="margin:18px 0 0;color:#0A2749;font-weight:700;">Excellentia</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

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
