import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';
import { createSecureToken, hashToken, normalizeCpf, normalizeEmail, sendDataSubjectVerificationEmail } from '@/lib/lgpd';

const requestTypes = new Set(['acesso', 'correcao', 'exclusao', 'portabilidade', 'informacao', 'revogacao']);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = String(body.name || '').trim();
    const email = normalizeEmail(String(body.email || ''));
    const cpf = normalizeCpf(body.cpf);
    const requestType = String(body.requestType || 'acesso');
    const details = typeof body.details === 'string' ? body.details.slice(0, 2000) : undefined;

    if (!name || name.length < 3) return NextResponse.json({ error: 'Informe seu nome completo.' }, { status: 400 });
    if (!/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ error: 'Informe um e-mail válido.' }, { status: 400 });
    if (!requestTypes.has(requestType)) return NextResponse.json({ error: 'Tipo de solicitação inválido.' }, { status: 400 });
    if (cpf && cpf.length !== 11) return NextResponse.json({ error: 'CPF deve conter 11 dígitos.' }, { status: 400 });

    const recentPending = await prisma.dataSubjectRequest.findFirst({
      where: {
        email,
        status: 'pending_verification',
        verificationExpiresAt: { gt: new Date() },
        createdAt: { gt: new Date(Date.now() - 10 * 60 * 1000) },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (recentPending) {
      return NextResponse.json({ success: true, message: 'Já existe uma solicitação recente aguardando verificação. Confira seu e-mail.' });
    }

    const token = createSecureToken();
    const lgpdRequest = await prisma.dataSubjectRequest.create({
      data: {
        name,
        email,
        cpf,
        requestType,
        details,
        verificationTokenHash: hashToken(token),
        verificationExpiresAt: new Date(Date.now() + 60 * 60 * 1000),
        auditLog: [{ at: new Date().toISOString(), event: 'created', channel: 'public_form' }],
      },
    });

    const emailResult = await sendDataSubjectVerificationEmail({ to: email, name, token });
    await prisma.dataSubjectRequest.update({
      where: { id: lgpdRequest.id },
      data: {
        deliveryEmail: email,
        auditLog: [
          { at: lgpdRequest.createdAt.toISOString(), event: 'created', channel: 'public_form' },
          { at: new Date().toISOString(), event: 'verification_email_sent', provider: emailResult.provider, sent: emailResult.sent, error: emailResult.error },
        ],
      },
    });

    if (!emailResult.sent) {
      return NextResponse.json({ error: emailResult.error || 'Não foi possível enviar o e-mail de verificação.' }, { status: 502 });
    }

    return NextResponse.json({ success: true, message: 'Solicitação recebida. Enviamos um link de verificação para seu e-mail.' }, { status: 201 });
  } catch (error) {
    console.error('[lgpd request] error:', error);
    return NextResponse.json({ error: 'Erro interno ao registrar solicitação.' }, { status: 500 });
  }
}
