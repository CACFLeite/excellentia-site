import { NextRequest, NextResponse } from 'next/server'
import { subscribeToMailerLite } from '@/lib/mailerlite'
import { prisma } from '@/lib/prisma'
import { sendTransactionalEmail } from '@/lib/transactionalEmail'

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function clean(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const name = clean(body.name)
    const email = clean(body.email).toLowerCase()
    const phone = clean(body.phone)
    const school = clean(body.school)
    const role = clean(body.role)
    const priority = clean(body.priority)

    if (!name || !email || !phone || !school) {
      return NextResponse.json({ error: 'Nome, e-mail, WhatsApp e escola são obrigatórios.' }, { status: 400 })
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: 'Informe um e-mail válido.' }, { status: 400 })
    }

    const campaignLead = await prisma.campaignLead.create({
      data: {
        campaign: 'direcional-escolas',
        source: 'Direcional Escolas',
        name,
        email,
        phone,
        school,
        role: role || null,
        priority: priority || null,
        metadata: {
          landingPath: '/direcional-escolas',
          whatsappDestination: '5511952133049',
        },
      },
    })

    const groupId = process.env.MAILERLITE_DIRECIONAL_ESCOLAS_GROUP_ID
    if (groupId) {
      const mailerLiteResult = await subscribeToMailerLite({
        email,
        name,
        phone,
        groups: [groupId],
      })

      if (!mailerLiteResult.ok && !mailerLiteResult.skipped) {
        console.error('[direcional-lead] MailerLite failed:', mailerLiteResult)
      }
    } else {
      console.warn('[direcional-lead] MAILERLITE_DIRECIONAL_ESCOLAS_GROUP_ID não configurado; lead enviado apenas por e-mail interno.')
    }

    const notifyEmail = process.env.EXCELLENTIA_DIRECIONAL_NOTIFY_EMAIL || process.env.CONTACT_EMAIL || 'atendimento@excellentia-edu.com'
    const safe = {
      name: escapeHtml(name),
      email: escapeHtml(email),
      phone: escapeHtml(phone),
      school: escapeHtml(school),
      role: escapeHtml(role || 'Não informado'),
      priority: escapeHtml(priority || 'Não informada'),
    }

    const source = 'Direcional Escolas'
    const text = [
      'Novo lead da campanha Direcional Escolas',
      '',
      `ID: ${campaignLead.id}`,
      `Nome: ${name}`,
      `E-mail: ${email}`,
      `WhatsApp: ${phone}`,
      `Escola: ${school}`,
      `Cargo: ${role || 'Não informado'}`,
      `Prioridade: ${priority || 'Não informada'}`,
      `Origem: ${source}`,
    ].join('\n')

    const emailResult = await sendTransactionalEmail({
      to: notifyEmail,
      subject: `Lead Direcional Escolas — ${school}`,
      text,
      html: `
        <div style="font-family:'IBM Plex Sans',Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;color:#172033;">
          <div style="background:#0a2749;color:#fff;padding:24px;border-radius:14px 14px 0 0;">
            <div style="font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#f4db76;">Excellentia</div>
            <h1 style="margin:10px 0 0;font-size:24px;">Novo lead da campanha Direcional Escolas</h1>
          </div>
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-top:0;padding:24px;border-radius:0 0 14px 14px;">
            <p><strong>ID interno:</strong> ${campaignLead.id}</p>
            <p><strong>Nome:</strong> ${safe.name}</p>
            <p><strong>E-mail:</strong> <a href="mailto:${safe.email}">${safe.email}</a></p>
            <p><strong>WhatsApp:</strong> ${safe.phone}</p>
            <p><strong>Escola:</strong> ${safe.school}</p>
            <p><strong>Cargo:</strong> ${safe.role}</p>
            <p><strong>Prioridade:</strong> ${safe.priority}</p>
            <p><strong>Origem:</strong> ${source}</p>
          </div>
        </div>
      `,
    })

    if (!emailResult.sent) {
      console.error('[direcional-lead] notify email failed:', emailResult.error)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[direcional-lead] error:', error)
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  }
}
