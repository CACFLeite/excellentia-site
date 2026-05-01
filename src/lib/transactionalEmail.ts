export type TransactionalEmailAttachment = {
  filename: string;
  content: string;
  disposition?: 'attachment' | 'inline';
  contentType?: string;
};

export type TransactionalEmailInput = {
  to: string;
  name?: string | null;
  subject: string;
  text: string;
  html?: string;
  attachments?: TransactionalEmailAttachment[];
};

export type TransactionalEmailResult = {
  sent: boolean;
  provider?: 'mailersend' | 'resend';
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

export async function sendTransactionalEmail(input: TransactionalEmailInput): Promise<TransactionalEmailResult> {
  const to = input.to.trim().toLowerCase();
  if (!/^\S+@\S+\.\S+$/.test(to)) return { sent: false, error: 'E-mail inválido.' };

  if (process.env.MAILERSEND_API_KEY) {
    const response = await fetch('https://api.mailersend.com/v1/email', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.MAILERSEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: getMailerSendFrom(),
        to: [{ email: to, name: input.name || undefined }],
        subject: input.subject,
        text: input.text,
        html: input.html,
        attachments: input.attachments?.map((attachment) => ({
          filename: attachment.filename,
          content: attachment.content,
          disposition: attachment.disposition || 'attachment',
          content_type: attachment.contentType,
        })),
      }),
    });

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      return { sent: false, provider: 'mailersend', error: `Falha MailerSend ${response.status}: ${body.slice(0, 500)}` };
    }

    return { sent: true, provider: 'mailersend' };
  }

  if (process.env.RESEND_API_KEY) {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: getResendFromAddress(),
        to,
        subject: input.subject,
        text: input.text,
        html: input.html,
        attachments: input.attachments?.map((attachment) => ({
          filename: attachment.filename,
          content: attachment.content,
        })),
      }),
    });

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      return { sent: false, provider: 'resend', error: `Falha Resend ${response.status}: ${body.slice(0, 500)}` };
    }

    return { sent: true, provider: 'resend' };
  }

  return { sent: false, error: 'Nenhum provedor de e-mail transacional configurado.' };
}
