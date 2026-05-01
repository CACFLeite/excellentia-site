import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashInviteToken } from '@/lib/invitations';

const videoByOrder: Record<number, { duration: string; embedUrl: string }> = {
  1: { duration: '1min30', embedUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=6460138d-6f63-4e61-b7c0-4fbc29bd291f' },
  2: { duration: '1min19', embedUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=5ef32733-81f9-41e0-bd0b-0a3aebb790db' },
  3: { duration: '2min27', embedUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=33ab495e-1366-45b9-8d40-993c298c60f6' },
  4: { duration: '1min39', embedUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=d925b726-25b8-4c07-a327-29d4260cdc6d' },
  5: { duration: '1min29', embedUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=5669f8fc-b290-4aad-9722-8227a838049b' },
  6: { duration: '1min43', embedUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=adbc0945-6581-4491-95cc-bcc34ba0fc35' },
  7: { duration: '2min27', embedUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=513d6a80-dc03-44f1-9af3-383f003b2abf' },
  8: { duration: '2min01', embedUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=cc1d3ddf-5375-4803-8a9e-f6d5c22a4444' },
};

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('convite');

  if (!token) {
    return NextResponse.json({ error: 'Convite obrigatório.' }, { status: 400 });
  }

  const invitation = await prisma.employeeInvitation.findUnique({
    where: { tokenHash: hashInviteToken(token) },
    include: {
      organization: { select: { id: true, name: true, slug: true } },
      employee: { select: { id: true, fullName: true, email: true, jobTitle: true } },
    },
  });

  if (!invitation || invitation.status === 'revoked' || invitation.expiresAt.getTime() < Date.now() || !invitation.employeeId) {
    return NextResponse.json({ error: 'Convite inválido ou expirado.' }, { status: 404 });
  }

  if (invitation.status !== 'accepted') {
    return NextResponse.json({ error: 'Antes de iniciar o curso, confirme seus dados no link de acesso.' }, { status: 403 });
  }

  const enrollment = await prisma.enrollment.findFirst({
    where: { employeeId: invitation.employeeId, course: { slug: 'nr1-escolas' } },
    include: { certificate: true },
  });

  const course = await prisma.course.findUnique({
    where: { slug: 'nr1-escolas' },
    include: {
      lessons: {
        orderBy: { order: 'asc' },
        include: {
          activities: {
            take: 1,
            include: {
              responses: {
                where: { employeeId: invitation.employeeId },
                include: { feedback: true },
              },
            },
          },
        },
      },
    },
  });

  if (!course) {
    return NextResponse.json({ error: 'Curso NR-1 ainda não foi publicado no banco.' }, { status: 404 });
  }

  return NextResponse.json({
    organization: invitation.organization,
    employee: invitation.employee,
    certificate: enrollment?.certificate
      ? {
          id: enrollment.certificate.id,
          verificationCode: enrollment.certificate.verificationCode,
          issuedAt: enrollment.certificate.issuedAt,
          status: enrollment.certificate.status,
        }
      : null,
    course: {
      id: course.id,
      slug: course.slug,
      title: course.title,
      description: course.description,
      lessons: course.lessons.map((lesson) => {
        const activity = lesson.activities[0];
        const response = activity?.responses[0];
        return {
          id: lesson.id,
          order: lesson.order,
          title: lesson.title,
          duration: videoByOrder[lesson.order]?.duration,
          embedUrl: videoByOrder[lesson.order]?.embedUrl,
          activity: activity
            ? {
                id: activity.id,
                prompt: activity.prompt,
                response: response
                  ? {
                      id: response.id,
                      answer: response.answer,
                      status: response.status,
                      submittedAt: response.submittedAt,
                      feedback: response.feedback
                        ? {
                            level: response.feedback.level,
                            summary: response.feedback.summary,
                            strengths: response.feedback.strengths,
                            nextSteps: response.feedback.nextSteps,
                          }
                        : null,
                    }
                  : null,
              }
            : null,
        };
      }),
    },
  });
}
