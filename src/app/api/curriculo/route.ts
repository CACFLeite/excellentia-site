import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    const {
      nome, email, telefone, cidadeBairro, disciplinas,
      segmentos, experiencia, escolas, formacao, cursosRelevantes,
      q1PraticaPedagogica, q2GestaoEmocional, q3Salvaguarda,
      q4Interdisciplinaridade, q5Socioemocionais,
    } = data

    // 1. Salvar no Kit (ConvertKit)
    const ckKey = process.env.CONVERTKIT_API_KEY
    if (ckKey) {
      await fetch(`https://api.convertkit.com/v3/tags/17407005/subscribe?api_key=${ckKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          first_name: nome?.split(' ')[0] || nome,
          fields: {
            telefone: telefone || '',
            cidade_bairro: cidadeBairro || '',
            disciplinas: disciplinas || '',
            segmentos: Array.isArray(segmentos) ? segmentos.join(', ') : '',
            experiencia: experiencia || '',
          },
        }),
      })
    } else {
      console.warn('[curriculo] CONVERTKIT_API_KEY não configurada')
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

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[curriculo] Erro na API:', err)
    return NextResponse.json({ ok: false, error: 'Erro interno' }, { status: 500 })
  }
}
