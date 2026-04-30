import { NextRequest, NextResponse } from 'next/server'
import { getCurriculoLeadsGroupId, subscribeToMailerLite } from '@/lib/mailerlite'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, experiencia, area, escola } = body

    if (!email) {
      return NextResponse.json({ error: 'E-mail é obrigatório' }, { status: 400 })
    }

    const mailerLiteResult = await subscribeToMailerLite({
      email,
      name,
      groups: [getCurriculoLeadsGroupId()],
    })

    if (!mailerLiteResult.ok && !mailerLiteResult.skipped) {
      // Não falha a resposta pública: a pessoa já demonstrou interesse, e a falha fica logada para correção operacional.
      console.error('MailerLite subscribe failed:', mailerLiteResult)
    }

    return NextResponse.json(
      { success: true, message: 'Cadastrado com sucesso!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Waitlist error:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
