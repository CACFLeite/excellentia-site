import { NextResponse } from 'next/server';
import { getTeacherSessionFromRequest } from '@/lib/teacherAuth';
import { prisma } from '@/lib/prisma';

function metadataText(metadata: unknown, key: string) {
  if (!metadata || typeof metadata !== 'object' || Array.isArray(metadata)) return null;
  const value = (metadata as Record<string, unknown>)[key];
  return typeof value === 'string' ? value : null;
}

export async function GET(
  request: Request,
  context: { params: Promise<{ courseSlug: string }> },
) {
  const session = await getTeacherSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 });
  }

  const { courseSlug } = await context.params;
  const access = await prisma.teacherCourseAccess.findFirst({
    where: {
      subscriberId: session.subscriberId,
      course: { slug: courseSlug, status: 'published' },
    },
    include: {
      course: {
        include: {
          lessons: {
            orderBy: { order: 'asc' },
            include: { activities: { orderBy: { createdAt: 'asc' } } },
          },
        },
      },
    },
  });

  if (!access) {
    return NextResponse.json({ error: 'Curso não encontrado ou sem acesso.' }, { status: 404 });
  }

  const course = access.course;

  return NextResponse.json({
    subscriber: {
      email: session.subscriber.email,
      fullName: session.subscriber.fullName,
      status: session.subscriber.status,
      currentPeriodEnd: session.subscriber.currentPeriodEnd,
    },
    course: {
      id: course.id,
      slug: course.slug,
      title: course.title,
      description: course.description,
      status: course.status,
      lessons: course.lessons.map((lesson) => ({
        id: lesson.id,
        order: lesson.order,
        title: lesson.title,
        videoUrl: lesson.videoUrl,
        transcript: lesson.transcript,
        module: metadataText(lesson.metadata, 'module'),
        summary: metadataText(lesson.metadata, 'summary'),
        contentStatus: metadataText(lesson.metadata, 'contentStatus'),
        activities: lesson.activities.map((activity) => ({
          id: activity.id,
          prompt: activity.prompt,
          rubric: activity.rubric,
        })),
      })),
    },
  });
}
