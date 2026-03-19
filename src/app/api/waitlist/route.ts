import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, experiencia, area, escola } = body

    if (!email) {
      return NextResponse.json({ error: 'E-mail é obrigatório' }, { status: 400 })
    }

    const apiKey = process.env.KIT_API_KEY || 'yjKDVn1i9myc2cljJgH9tQ'
    const tagId = process.env.KIT_TAG_ID || '17671416'

    // Subscribe via Kit v3 tag endpoint (also creates subscriber if needed)
    const kitResponse = await fetch(
      `https://api.convertkit.com/v3/tags/${tagId}/subscribe?api_key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          first_name: name || '',
          fields: {
            experiencia: experiencia || '',
            area: area || '',
            escola_desejada: escola || '',
          },
        }),
      }
    )

    if (!kitResponse.ok) {
      const errorText = await kitResponse.text()
      console.error('Kit API error:', errorText)
      // Don't fail the user-facing response even if Kit fails
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
