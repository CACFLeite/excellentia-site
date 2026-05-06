import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { assertInternalAccess, createInviteToken, getBaseUrl, hashInviteToken } from '@/lib/invitations';
import { sendInviteEmail } from '@/lib/inviteEmail';

function addDays(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

export async function POST(request: NextRequest, context: { params: Promise<{ organizationId: string; employeeId: string }> }) {
  const params = await context.params;

  try {
    assertInternalAccess(request);
    const body = await request.json().catch(() => ({}));
    const expiresInDays = Number(body.expiresInDays ?? 14);
    const shouldSendEmail = body.sendEmail === true;

    const employee = await prisma.employee.findFirst({
      where: { id: params.employeeId, organizationId: params.organizationId },
      select: { id: true, fullName: true, email: true, organizationId: true, organization: { select: { name: true } } },
    });

    if (!employee) {
      return NextResponse.json({ error: 'Colaborador não encontrado.' }, { status: 404 });
    }

    const course = await prisma.course.findUnique({ where: { slug: 'nr1-escolas' } });
    const token = createInviteToken();

    const invitation = await prisma.$transaction(async (tx) => {
      if (course) {
        await tx.enrollment.upsert({
          where: { employeeId_courseId: { employeeId: employee.id, courseId: course.id } },
          create: { organizationId: employee.organizationId, employeeId: employee.id, courseId: course.id },
          update: {},
        });
      }

      return tx.employeeInvitation.create({
        data: {
          organizationId: employee.organizationId,
          employeeId: employee.id,
          email: employee.email,
          tokenHash: hashInviteToken(token),
          expiresAt: addDays(Number.isFinite(expiresInDays) ? expiresInDays : 14),
        },
      });
    });

    const invitationUrl = `${getBaseUrl(request)}/acesso-escolar?convite=${token}`;
    let emailResult: { sent: boolean; skipped?: boolean; error?: string } | null = null;

    if (shouldSendEmail) {
      emailResult = await sendInviteEmail({
        to: employee.email,
        fullName: employee.fullName,
        organizationName: employee.organization.name,
        invitationUrl,
        expiresAt: invitation.expiresAt,
      });

      await prisma.employeeInvitation.update({
        where: { id: invitation.id },
        data: emailResult.sent
          ? { lastSentAt: new Date(), sendCount: { increment: 1 }, lastSendError: null }
          : { lastSendError: emailResult.error ?? 'Falha ao enviar convite.' },
      });
    }

    return NextResponse.json({
      employeeId: employee.id,
      invitationId: invitation.id,
      fullName: employee.fullName,
      email: employee.email,
      invitationUrl,
      expiresAt: invitation.expiresAt,
      emailResult,
    }, { status: 201 });
  } catch (error) {
    const status = (error as Error & { status?: number }).status ?? 500;
    console.error('Erro ao reenviar convite:', error);
    return NextResponse.json({ error: status === 500 ? 'Erro interno ao reenviar convite.' : (error as Error).message }, { status });
  }
}
