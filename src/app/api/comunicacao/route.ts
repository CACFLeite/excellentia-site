import crypto from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashInviteToken } from '@/lib/invitations';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { inviteCode, inviteToken, message, category, name, email } = body;

    if (!message?.trim()) {
      return NextResponse.json({ error: 'Mensagem é obrigatória.' }, { status: 400 });
    }

    const kind = category === 'identified' ? 'identified' : 'anonymous';
    let organizationId: string | undefined;
    let employeeId: string | undefined;

    if (inviteToken) {
      const invitation = await prisma.employeeInvitation.findUnique({
        where: { tokenHash: hashInviteToken(String(inviteToken)) },
        include: { employee: true },
      });

      if (!invitation || invitation.status === 'revoked' || invitation.expiresAt.getTime() < Date.now()) {
        return NextResponse.json({ error: 'Convite inválido ou expirado.' }, { status: 404 });
      }

      organizationId = invitation.organizationId;
      employeeId = invitation.employeeId ?? undefined;
    } else if (inviteCode) {
      const organization = await prisma.organization.findFirst({
        where: { slug: String(inviteCode).trim() },
        select: { id: true },
      });

      if (!organization) {
        return NextResponse.json({ error: 'Código da escola inválido.' }, { status: 404 });
      }

      organizationId = organization.id;
    }

    if (!organizationId) {
      return NextResponse.json({ error: 'Código ou convite da escola é obrigatório.' }, { status: 400 });
    }

    await prisma.communication.create({
      data: {
        organizationId,
        employeeId: kind === 'anonymous' ? employeeId : employeeId,
        kind,
        category: typeof category === 'string' ? category : undefined,
        message: String(message).trim(),
        recipientRole: 'director',
        identitySealed: kind === 'anonymous',
        auditHash: crypto
          .createHash('sha256')
          .update(`${organizationId}:${employeeId ?? email ?? name ?? 'anonymous'}:${Date.now()}`)
          .digest('hex'),
        metadata:
          kind === 'identified'
            ? {
                name: typeof name === 'string' ? name.trim() : null,
                email: typeof email === 'string' ? email.trim() : null,
              }
            : undefined,
      },
    });

    return NextResponse.json({ message: 'Comunicado enviado com sucesso.' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao enviar comunicado:', error);
    return NextResponse.json({ error: 'Erro interno ao enviar comunicado.' }, { status: 500 });
  }
}
