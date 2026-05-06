import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashInviteToken } from '@/lib/invitations';

type MetadataRecord = Record<string, unknown>;

function metadataObject(value: unknown): MetadataRecord {
  return value && typeof value === 'object' && !Array.isArray(value) ? (value as MetadataRecord) : {};
}

export async function GET(request: NextRequest, context: { params: Promise<{ courseSlug: string }> }) {
  const params = await context.params;
  const token = request.nextUrl.searchParams.get('convite');
  const courseSlug = params.courseSlug;

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

  const course = await prisma.course.findUnique({
    where: { slug: courseSlug },
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

  if (!course || course.status !== 'published') {
    return NextResponse.json({ error: 'Curso não encontrado ou ainda não publicado.' }, { status: 404 });
  }

  const enrollment = await prisma.enrollment.findFirst({
    where: { employeeId: invitation.employeeId, courseId: course.id },
    include: { certificate: true },
  });

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
        const lessonMetadata = metadataObject(lesson.metadata);

        return {
          id: lesson.id,
          order: lesson.order,
          title: lesson.title,
          duration: typeof lessonMetadata.duration === 'string' ? lessonMetadata.duration : undefined,
          embedUrl: lesson.videoUrl ?? (typeof lessonMetadata.embedUrl === 'string' ? lessonMetadata.embedUrl : undefined),
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
