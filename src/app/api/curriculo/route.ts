import { NextRequest, NextResponse } from 'next/server'
import { getCurriculoLeadsGroupId, subscribeToMailerLite } from '@/lib/mailerlite'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    const {
      nome, email, telefone, cidadeBairro, disciplinas,
      segmentos, experiencia, escolas, formacao, cursosRelevantes,
      q1PraticaPedagogica, q2GestaoEmocional, q3Salvaguarda,
      q4Interdisciplinaridade, q5Socioemocionais,
    } = data

    // 1. Salvar lead no MailerLite
    if (email) {
      await subscribeToMailerLite({
        email,
        name: nome,
        phone: telefone,
        city: cidadeBairro,
        groups: [getCurriculoLeadsGroupId()],
      })
    }

    // 2. Enviar email de notificação
    const emailBody = `
Novo currículo solicitado via LP!

━━━ DADOS PROFISSIONAIS ━━━
Nome: ${nome}
Email: ${email}
Telefone: ${telefone}
Cidade/Bairro: ${cidadeBairro}
Disciplinas: ${disciplinas}
Segmentos: ${Array.isArray(segmentos) ? segmentos.join(', ') : segmentos}
Experiência: ${experiencia}

Escolas:
${escolas}

Formação acadêmica:
${formacao}

Cursos e formação continuada:
${cursosRelevantes || '(não informado)'}

━━━ PERGUNTAS SITUACIONAIS ━━━

1. Preparação de sequência didática:
${q1PraticaPedagogica}

2. Turma desafiadora:
${q2GestaoEmocional}

3. Situação de vulnerabilidade:
${q3Salvaguarda}

4. Projeto além da disciplina:
${q4Interdisciplinaridade}

5. Comportamento fora do padrão:
${q5Socioemocionais}
    `.trim()

    const resendKey = process.env.RESEND_API_KEY
    if (resendKey) {
      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: 'Excellentia <noreply@excellentia-edu.com>',
          to: ['atendimento@excellentia-edu.com'],
          subject: `[Currículo Professor] ${nome}`,
          text: emailBody,
        }),
      })
      if (!emailRes.ok) {
        const errText = await emailRes.text()
        console.error('[curriculo] Resend error:', errText)
      }
    } else {
      console.log('[curriculo] RESEND_API_KEY não configurada. Dados do formulário:')
      console.log(emailBody)
    }

    // 3. Notificação Telegram
    const tgToken = process.env.TELEGRAM_BOT_TOKEN
    const tgChatId = process.env.TELEGRAM_ADMIN_CHAT_ID || '6893152608'
    if (tgToken) {
      const tgMsg = [
        '🎓 Novo currículo solicitado!',
        '',
        `Nome: ${nome}`,
        `Email: ${email}`,
        `Telefone: ${telefone || '—'}`,
        `Cidade: ${cidadeBairro || '—'}`,
        `Disciplinas: ${disciplinas || '—'}`,
        `Segmentos: ${Array.isArray(segmentos) ? segmentos.join(', ') : segmentos || '—'}`,
        `Experiência: ${experiencia || '—'}`,
        '',
        'Responda ao professor em até 24h.',
      ].join('\n')

      fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: tgChatId, text: tgMsg }),
      }).catch((err) => console.error('[curriculo] Telegram notify error:', err))
    } else {
      console.warn('[curriculo] TELEGRAM_BOT_TOKEN não configurado')
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[curriculo] Erro na API:', err)
    return NextResponse.json({ ok: false, error: 'Erro interno' }, { status: 500 })
  }
}
