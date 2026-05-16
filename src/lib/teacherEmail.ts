type TeacherLoginEmailInput = {
  to: string;
  loginUrl: string;
  hasActiveSubscription: boolean;
};

function getMailerSendFrom() {
  return {
    email: process.env.MAILERSEND_FROM_EMAIL || process.env.EXCELLENTIA_INVITE_FROM_EMAIL || 'contato@excellentia-edu.com',
    name: process.env.MAILERSEND_FROM_NAME || process.env.EXCELLENTIA_INVITE_FROM_NAME || 'Excellentia',
  };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function sendTeacherLoginEmail(input: TeacherLoginEmailInput) {
  const apiKey = process.env.MAILERSEND_API_KEY;
  if (!apiKey) return { sent: false, skipped: true, error: 'MAILERSEND_API_KEY não configurada.' };

  const safeUrl = escapeHtml(input.loginUrl);
  const subject = input.hasActiveSubscription ? 'Seu acesso aos cursos Excellentia' : 'Acesso Excellentia: assinatura necessária';
  const text = input.hasActiveSubscription
    ? [
        'Olá.',
        '',
        'Use o link abaixo para acessar sua área de cursos Excellentia:',
        input.loginUrl,
        '',
        'O link expira em 30 minutos e só pode ser usado uma vez.',
        '',
        'Excellentia',
      ].join('\n')
    : [
        'Olá.',
        '',
        'Não encontramos uma assinatura ativa para este e-mail.',
        'Você pode consultar os planos em https://excellentia-edu.com/assinatura.',
        '',
        'Se você comprou recentemente, responda este e-mail com o comprovante ou use o mesmo e-mail informado no pagamento.',
        '',
        'Excellentia',
      ].join('\n');

  const title = input.hasActiveSubscription ? 'Seu link de acesso está pronto' : 'Assinatura ativa não encontrada';
  const paragraph = input.hasActiveSubscription
    ? 'Clique no botão abaixo para entrar na área de cursos. O link expira em 30 minutos e só pode ser usado uma vez.'
    : 'Não encontramos uma assinatura ativa para este e-mail. Se você já comprou, confira se informou o mesmo e-mail usado no pagamento.';
  const action = input.hasActiveSubscription
    ? '<a href="' + safeUrl + '" style="display:inline-block;background:#b07908;color:#ffffff;text-decoration:none;font-weight:800;font-size:15px;padding:14px 22px;border-radius:12px;box-shadow:0 6px 16px rgba(176,121,8,.25);">Acessar cursos</a>' +
      '<p style="margin:18px 0 0;font-size:13px;line-height:1.5;color:#64748b;">Se o botão não funcionar, copie e cole este link no navegador:<br><a href="' + safeUrl + '" style="color:#0A66C2;word-break:break-all;">' + safeUrl + '</a></p>'
    : '<a href="https://excellentia-edu.com/assinatura" style="display:inline-block;background:#b07908;color:#ffffff;text-decoration:none;font-weight:800;font-size:15px;padding:14px 22px;border-radius:12px;box-shadow:0 6px 16px rgba(176,121,8,.25);">Ver assinatura</a>';

  const html = '<!doctype html><html lang="pt-BR"><body style="margin:0;padding:0;background:#eaeaea;font-family:Arial,Helvetica,sans-serif;color:#172033;">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eaeaea;padding:28px 12px;"><tr><td align="center">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #d8dee8;box-shadow:0 8px 28px rgba(10,39,73,0.10);">' +
    '<tr><td style="background:#0a2749;padding:24px 28px;"><div style="font-size:24px;font-weight:800;letter-spacing:-0.03em;color:#ffffff;">Excel<span style="color:#f4db76;">lentia</span></div><div style="margin-top:6px;font-size:13px;line-height:1.5;color:#eaeaea;">Área do professor</div></td></tr>' +
    '<tr><td style="padding:30px 28px;"><div style="display:inline-block;background:#f4db76;color:#0a2749;border-radius:999px;padding:6px 12px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;">Acesso seguro</div>' +
    '<h1 style="margin:18px 0 10px;font-size:25px;line-height:1.2;color:#0a2749;">' + title + '</h1>' +
    '<p style="margin:0 0 18px;font-size:16px;line-height:1.6;color:#334155;">' + paragraph + '</p>' + action +
    '</td></tr></table></td></tr></table></body></html>';

  const response = await fetch('https://api.mailersend.com/v1/email', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: getMailerSendFrom(),
      to: [{ email: input.to }],
      subject,
      text,
      html,
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    return { sent: false, error: 'Falha MailerSend ' + response.status + ': ' + body.slice(0, 500) };
  }

  return { sent: true };
}
