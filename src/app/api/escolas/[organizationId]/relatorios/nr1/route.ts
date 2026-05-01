import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { assertInternalAccess } from '@/lib/invitations';

export async function GET(request: NextRequest, { params }: { params: { organizationId: string } }) {
  try {
    assertInternalAccess(request);
    const organizationId = params.organizationId;

    const organization = await prisma.organization.findUnique({
      where: { id: organizationId },
      select: { id: true, name: true, slug: true },
    });

    if (!organization) {
      return NextResponse.json({ error: 'Escola/organização não encontrada.' }, { status: 404 });
    }

    const course = await prisma.course.findUnique({
      where: { slug: 'nr1-escolas' },
      include: { lessons: { orderBy: { order: 'asc' }, include: { activities: true } } },
    });

    if (!course) {
      return NextResponse.json({ error: 'Curso NR-1 não encontrado.' }, { status: 404 });
    }

    const employees = await prisma.employee.findMany({
      where: { organizationId },
      include: {
        unit: true,
        responses: {
          where: { activity: { lesson: { courseId: course.id } } },
          include: { activity: { include: { lesson: true } }, feedback: true },
        },
        enrollments: { where: { courseId: course.id }, include: { certificate: true } },
      },
      orderBy: { fullName: 'asc' },
    });

    const totalActivities = course.lessons.reduce((sum, lesson) => sum + lesson.activities.length, 0);
    const lessonSummaries = course.lessons.map((lesson) => {
      const activityIds = lesson.activities.map((activity) => activity.id);
      const responses = employees.flatMap((employee) => employee.responses.filter((response) => activityIds.includes(response.activityId)));
      const levels = responses.reduce<Record<string, number>>((acc, response) => {
        const level = response.feedback?.level ?? 'sem_feedback';
        acc[level] = (acc[level] ?? 0) + 1;
        return acc;
      }, {});

      return {
        order: lesson.order,
        title: lesson.title,
        responseCount: responses.length,
        responsePercent: employees.length ? Math.round((responses.length / employees.length) * 100) : 0,
        feedbackLevels: levels,
      };
    });

    const employeeSummaries = employees.map((employee) => {
      const enrollment = employee.enrollments[0];
      return {
        fullName: employee.fullName,
        jobTitle: employee.jobTitle,
        unitName: employee.unit?.name ?? null,
        answeredCount: employee.responses.length,
        totalActivities,
        progressPercent: totalActivities ? Math.round((employee.responses.length / totalActivities) * 100) : 0,
        completed: enrollment?.status === 'completed',
        certificateCode: enrollment?.certificate?.verificationCode ?? null,
      };
    });

    const completedCount = employeeSummaries.filter((employee) => employee.completed).length;
    const averageProgress = employeeSummaries.length
      ? Math.round(employeeSummaries.reduce((sum, employee) => sum + employee.progressPercent, 0) / employeeSummaries.length)
      : 0;

    const communications = await prisma.communication.groupBy({
      by: ['kind', 'status'],
      where: { organizationId },
      _count: { _all: true },
    });

    return NextResponse.json({
      organization,
      course: { title: course.title, slug: course.slug },
      generatedAt: new Date(),
      summary: {
        employeeCount: employees.length,
        totalActivities,
        completedCount,
        completionPercent: employees.length ? Math.round((completedCount / employees.length) * 100) : 0,
        averageProgress,
      },
      lessons: lessonSummaries,
      employees: employeeSummaries,
      communications: communications.map((item) => ({ kind: item.kind, status: item.status, count: item._count._all })),
      institutionalNotes: [
        'Relatório agregado para acompanhamento institucional.',
        'Não valida fatos individuais narrados nas respostas.',
        'Feedbacks são formativos e não constituem nota pública qualitativa.',
        'Dados do canal anônimo devem ser tratados sem exposição de identidade aos responsáveis da escola.',
      ],
    });
  } catch (error) {
    const status = (error as Error & { status?: number }).status ?? 500;
    console.error('Erro ao gerar relatório NR-1:', error);
    return NextResponse.json({ error: status === 500 ? 'Erro interno ao gerar relatório.' : (error as Error).message }, { status });
  }
}
