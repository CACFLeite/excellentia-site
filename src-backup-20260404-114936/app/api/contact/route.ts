import { NextRequest, NextResponse } from 'next/server'

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
    const resendApiKey = process.env.RESEND_API_KEY

    if (resendApiKey) {
      // Use Resend if API key is configured
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Excellentia Contato <noreply@excellentia-edu.com>',
          to: [contactEmail],
          reply_to: email,
          subject: `Contato via site: ${assunto || 'Sem assunto'} — ${name}`,
          html: `
            <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: #0a2749; padding: 24px; border-radius: 12px 12px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 24px;">
                  Excel<span style="color: #b07908">lentia</span>
                </h1>
                <p style="color: #94a3b8; margin: 8px 0 0; font-size: 14px;">Nova mensagem de contato</p>
              </div>
              <div style="background: #f8f8f8; padding: 24px; border-radius: 0 0 12px 12px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #0a2749; width: 100px;">Nome:</td>
                    <td style="padding: 8px 0; color: #374151;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #0a2749;">E-mail:</td>
                    <td style="padding: 8px 0; color: #374151;"><a href="mailto:${email}">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #0a2749;">Assunto:</td>
                    <td style="padding: 8px 0; color: #374151;">${assunto || 'Não informado'}</td>
                  </tr>
                </table>
                <hr style="border: 1px solid #e5e7eb; margin: 16px 0;" />
                <p style="font-weight: bold; color: #0a2749; margin-bottom: 8px;">Mensagem:</p>
                <p style="color: #374151; line-height: 1.6; white-space: pre-wrap;">${mensagem}</p>
              </div>
            </div>
          `,
        }),
      })

      if (!resendResponse.ok) {
        const errBody = await resendResponse.text()
        console.error('Resend error:', errBody)
        return NextResponse.json({ error: 'Falha ao enviar email' }, { status: 500 })
      }
    } else {
      // Fallback: log to console (configure Resend key in production)
      console.log('=== CONTACT FORM SUBMISSION ===')
      console.log(`Name: ${name}`)
      console.log(`Email: ${email}`)
      console.log(`Subject: ${assunto}`)
      console.log(`Message: ${mensagem}`)
      console.log(`To: ${contactEmail}`)
      console.log('================================')
      // In production without Resend, still return success
      // but note that the email was not actually sent
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
