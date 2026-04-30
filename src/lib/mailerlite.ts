type MailerLiteSubscriberInput = {
  email: string
  name?: string
  phone?: string
  city?: string
  groups?: string[]
}

export async function subscribeToMailerLite(input: MailerLiteSubscriberInput) {
  const apiKey = process.env.MAILERLITE_API_KEY

  if (!apiKey) {
    console.warn('[mailerlite] MAILERLITE_API_KEY não configurada')
    return { ok: false, skipped: true }
  }

  const groups = input.groups?.filter(Boolean)

  const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      email: input.email,
      fields: {
        ...(input.name ? { name: input.name } : {}),
        ...(input.phone ? { phone: input.phone } : {}),
        ...(input.city ? { city: input.city } : {}),
      },
      ...(groups && groups.length > 0 ? { groups } : {}),
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('[mailerlite] API error:', errorText)
    return { ok: false, skipped: false, status: response.status, error: errorText }
  }

  return { ok: true, skipped: false, status: response.status }
}

export function getCurriculoLeadsGroupId() {
  return process.env.MAILERLITE_CURRICULO_GROUP_ID || '183684901612029007'
}
