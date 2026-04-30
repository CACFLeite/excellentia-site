import { NextRequest, NextResponse } from 'next/server'

// Backup histórico: integração antiga de captura de leads removida por decisão operacional.
// A implementação ativa usa MailerLite em src/lib/mailerlite.ts.

export async function POST(_req: NextRequest) {
  return NextResponse.json(
    { error: 'Backup histórico desativado. Use a rota ativa em src/app/api.' },
    { status: 410 }
  )
}
