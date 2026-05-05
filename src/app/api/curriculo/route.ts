import { NextRequest, NextResponse } from 'next/server'
import { getCurriculoLeadsGroupId, subscribeToMailerLite } from '@/lib/mailerlite'
import { sendTransactionalEmail } from '@/lib/transactionalEmail'

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

    // 2. Enviar notificação transacional via MailerSend
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

    const result = await sendTransactionalEmail({
      to: process.env.CURRICULO_NOTIFICATION_EMAIL || process.env.CONTACT_EMAIL || 'atendimento@excellentia-edu.com',
      subject: `[Currículo Professor] ${nome}`,
      text: emailBody,
    })

    if (!result.sent) {
      console.warn('[curriculo] notificação MailerSend não enviada:', result.error)
    }

    return NextResponse.json({ ok: true, notificationSent: result.sent })
  } catch (err) {
    console.error('[curriculo] Erro na API:', err)
    return NextResponse.json({ ok: false, error: 'Erro interno' }, { status: 500 })
  }
}
