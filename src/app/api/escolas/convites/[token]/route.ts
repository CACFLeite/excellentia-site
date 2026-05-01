import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashInviteToken } from '@/lib/invitations';

function isExpired(date: Date) {
  return date.getTime() < Date.now();
}

export async function GET(_request: NextRequest, { params }: { params: { token: string } }) {
  const invitation = await prisma.employeeInvitation.findUnique({
    where: { tokenHash: hashInviteToken(params.token) },
    include: {
      organization: { select: { id: true, name: true, slug: true } },
      employee: { select: { id: true, fullName: true, email: true, cpf: true, jobTitle: true, status: true } },
    },
  });

  if (!invitation || invitation.status === 'revoked' || isExpired(invitation.expiresAt)) {
    return NextResponse.json({ error: 'Convite inválido ou expirado.' }, { status: 404 });
  }

  return NextResponse.json({
    invitationId: invitation.id,
    status: invitation.status,
    organization: invitation.organization,
    employee: invitation.employee,
    expiresAt: invitation.expiresAt,
  });
}

export async function POST(request: NextRequest, { params }: { params: { token: string } }) {
  try {
    const body = await request.json().catch(() => ({}));
    const tokenHash = hashInviteToken(params.token);

    const accepted = await prisma.$transaction(async (tx) => {
      const invitation = await tx.employeeInvitation.findUnique({
        where: { tokenHash },
        include: { employee: true },
      });

      if (!invitation || invitation.status !== 'pending' || isExpired(invitation.expiresAt) || !invitation.employeeId) {
        throw Object.assign(new Error('Convite inválido ou expirado.'), { status: 404 });
      }

      const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : '';
      const email = typeof body.email === 'string' ? body.email.trim() : '';
      const cpf = typeof body.cpf === 'string' ? body.cpf.replace(/\D/g, '') : '';
      if (!fullName) throw Object.assign(new Error('Nome completo é obrigatório.'), { status: 400 });
      if (!cpf || cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) throw Object.assign(new Error('CPF é obrigatório para emissão do certificado.'), { status: 400 });
      if (body.privacyAccepted !== true) throw Object.assign(new Error('É necessário confirmar a ciência sobre tratamento de dados para ativar o acesso.'), { status: 400 });

      const employee = await tx.employee.update({
        where: { id: invitation.employeeId },
        data: {
          status: 'active',
          fullName,
          email: email || invitation.employee?.email,
          cpf,
          jobTitle: typeof body.jobTitle === 'string' && body.jobTitle.trim() ? body.jobTitle.trim() : invitation.employee?.jobTitle,
          metadata: {
            ...((invitation.employee?.metadata && typeof invitation.employee.metadata === 'object' && !Array.isArray(invitation.employee.metadata)) ? invitation.employee.metadata : {}),
            privacyAcceptedAt: new Date().toISOString(),
            privacyAcceptedVersion: 'excellentia-privacy-2026-05-01',
            privacyContext: 'nr1-school-invite-activation',
          },
        },
      });

      await tx.employeeInvitation.update({
        where: { id: invitation.id },
        data: { status: 'accepted', acceptedAt: new Date() },
      });

      return employee;
    });

    return NextResponse.json({ employeeId: accepted.id, status: accepted.status });
  } catch (error) {
    const status = (error as Error & { status?: number }).status ?? 500;
    console.error('Erro ao aceitar convite escolar:', error);
    return NextResponse.json({ error: status === 500 ? 'Erro interno ao aceitar convite.' : (error as Error).message }, { status });
  }
}
