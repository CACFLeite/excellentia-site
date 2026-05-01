import crypto from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashInviteToken } from '@/lib/invitations';

function verificationCode() {
  return `EXC-NR1-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const token = String(body.convite ?? '');

    if (!token) {
      return NextResponse.json({ error: 'Convite obrigatório.' }, { status: 400 });
    }

    const invitation = await prisma.employeeInvitation.findUnique({
      where: { tokenHash: hashInviteToken(token) },
      include: { employee: true, organization: true },
    });

    if (!invitation || invitation.status === 'revoked' || invitation.expiresAt.getTime() < Date.now() || !invitation.employeeId) {
      return NextResponse.json({ error: 'Convite inválido ou expirado.' }, { status: 404 });
    }

    const course = await prisma.course.findUnique({
      where: { slug: 'nr1-escolas' },
      include: { lessons: { include: { activities: true } } },
    });

    if (!course) {
      return NextResponse.json({ error: 'Curso NR-1 não encontrado.' }, { status: 404 });
    }

    const activityIds = course.lessons.flatMap((lesson) => lesson.activities.map((activity) => activity.id));
    const answeredCount = await prisma.activityResponse.count({
      where: { employeeId: invitation.employeeId, activityId: { in: activityIds } },
    });

    if (answeredCount < activityIds.length) {
      return NextResponse.json(
        { error: 'O certificado só pode ser emitido após responder todas as atividades.', answeredCount, total: activityIds.length },
        { status: 400 },
      );
    }

    const certificate = await prisma.$transaction(async (tx) => {
      const enrollment = await tx.enrollment.upsert({
        where: { employeeId_courseId: { employeeId: invitation.employeeId!, courseId: course.id } },
        create: {
          organizationId: invitation.organizationId,
          employeeId: invitation.employeeId!,
          courseId: course.id,
          status: 'completed',
          startedAt: invitation.acceptedAt ?? invitation.createdAt,
          completedAt: new Date(),
        },
        update: { status: 'completed', completedAt: new Date() },
      });

      const existing = await tx.certificate.findUnique({ where: { enrollmentId: enrollment.id } });
      if (existing) return existing;

      return tx.certificate.create({
        data: {
          organizationId: invitation.organizationId,
          employeeId: invitation.employeeId!,
          enrollmentId: enrollment.id,
          verificationCode: verificationCode(),
          metadata: {
            courseSlug: course.slug,
            courseTitle: course.title,
            employeeName: invitation.employee?.fullName,
            organizationName: invitation.organization.name,
            evidence: 'Curso ofertado e respostas enviadas. Feedback formativo sem nota pública qualitativa.',
          },
        },
      });
    });

    return NextResponse.json({
      certificate: {
        id: certificate.id,
        verificationCode: certificate.verificationCode,
        issuedAt: certificate.issuedAt,
        status: certificate.status,
      },
    });
  } catch (error) {
    console.error('Erro ao emitir certificado NR-1:', error);
    return NextResponse.json({ error: 'Erro interno ao emitir certificado.' }, { status: 500 });
  }
}
