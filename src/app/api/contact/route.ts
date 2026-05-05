import { NextRequest, NextResponse } from 'next/server'
import { sendTransactionalEmail } from '@/lib/transactionalEmail'

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, assunto, mensagem } = body

    if (!name || !email || !mensagem) {
      return NextResponse.json(
        { error: 'Nome, e-mail e mensagem são obrigatórios' },
        { status: 400 }
      )
    }

    const contactEmail = process.env.CONTACT_EMAIL || 'atendimento@excellentia-edu.com'
    const safeName = escapeHtml(String(name))
    const safeEmail = escapeHtml(String(email))
    const safeAssunto = escapeHtml(String(assunto || 'Sem assunto'))
    const safeMensagem = escapeHtml(String(mensagem))

    const result = await sendTransactionalEmail({
      to: contactEmail,
      subject: `Contato via site: ${assunto || 'Sem assunto'} — ${name}`,
      text: [`Nome: ${name}`, `E-mail: ${email}`, `Assunto: ${assunto || 'Sem assunto'}`, '', String(mensagem)].join('\n'),
      html: `
        <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0a2749; padding: 24px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Excel<span style="color: #b07908">lentia</span></h1>
            <p style="color: #94a3b8; margin: 8px 0 0; font-size: 14px;">Nova mensagem de contato</p>
          </div>
          <div style="background: #f8f8f8; padding: 24px; border-radius: 0 0 12px 12px;">
            <p><strong>Nome:</strong> ${safeName}</p>
            <p><strong>E-mail:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
            <p><strong>Assunto:</strong> ${safeAssunto}</p>
            <hr style="border: 1px solid #e5e7eb; margin: 16px 0;" />
            <p style="white-space: pre-wrap;">${safeMensagem}</p>
          </div>
        </div>
      `,
    })

    if (!result.sent) {
      console.error('[contact] MailerSend error:', result.error)
      return NextResponse.json({ error: 'Falha ao enviar email' }, { status: 500 })
    }

    return NextResponse.json(
      { success: true, message: 'Mensagem enviada com sucesso!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact route error:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
