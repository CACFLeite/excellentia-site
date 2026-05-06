import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { assertInternalAccess } from '@/lib/invitations';

export async function GET(request: NextRequest, context: { params: Promise<{ organizationId: string }> }) {
  const params = await context.params;

  try {
    assertInternalAccess(request);
    const organizationId = params.organizationId;

    const organization = await prisma.organization.findUnique({
      where: { id: organizationId },
      include: {
        units: { orderBy: { name: 'asc' } },
        members: { orderBy: { name: 'asc' } },
      },
    });

    if (!organization) {
      return NextResponse.json({ error: 'Escola/organização não encontrada.' }, { status: 404 });
    }

    const course = await prisma.course.findUnique({
      where: { slug: 'nr1-escolas' },
      include: { lessons: { include: { activities: true } } },
    });

    const activityIds = course?.lessons.flatMap((lesson) => lesson.activities.map((activity) => activity.id)) ?? [];
    const totalActivities = activityIds.length;

    const employees = await prisma.employee.findMany({
      where: { organizationId },
      include: {
        unit: true,
        invitations: { orderBy: { createdAt: 'desc' }, take: 1 },
        responses: totalActivities
          ? { where: { activityId: { in: activityIds } }, include: { feedback: true } }
          : { include: { feedback: true } },
        enrollments: { where: { course: { slug: 'nr1-escolas' } }, include: { certificate: true } },
      },
      orderBy: { fullName: 'asc' },
    });

    const communications = await prisma.communication.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
      take: 20,
      select: {
        id: true,
        kind: true,
        category: true,
        message: true,
        status: true,
        identitySealed: true,
        createdAt: true,
      },
    });

    const pgrDocuments = await prisma.pgrDocument.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: { id: true, status: true, createdAt: true, updatedAt: true, signedAt: true, signedBy: true },
    });

    const employeeSummaries = employees.map((employee) => {
      const answeredCount = employee.responses.length;
      const enrollment = employee.enrollments[0];
      const latestInvitation = employee.invitations[0];

      return {
        id: employee.id,
        fullName: employee.fullName,
        email: employee.email,
        cpf: employee.cpf,
        jobTitle: employee.jobTitle,
        unitName: employee.unit?.name ?? null,
        status: employee.status,
        invitationStatus: latestInvitation?.status ?? null,
        invitationExpiresAt: latestInvitation?.expiresAt ?? null,
        answeredCount,
        totalActivities,
        progressPercent: totalActivities ? Math.round((answeredCount / totalActivities) * 100) : 0,
        courseStatus: enrollment?.status ?? 'not_started',
        completedAt: enrollment?.completedAt ?? null,
        certificate: enrollment?.certificate
          ? {
              verificationCode: enrollment.certificate.verificationCode,
              issuedAt: enrollment.certificate.issuedAt,
              status: enrollment.certificate.status,
            }
          : null,
      };
    });

    const completedCount = employeeSummaries.filter((employee) => employee.courseStatus === 'completed').length;
    const activeCount = employeeSummaries.filter((employee) => employee.status === 'active').length;
    const invitedCount = employeeSummaries.filter((employee) => employee.invitationStatus === 'pending').length;

    const jobTitles = Array.from(new Set(employeeSummaries.map((employee) => employee.jobTitle).filter(Boolean) as string[])).sort((a, b) => a.localeCompare(b, 'pt-BR'));

    return NextResponse.json({
      organization: {
        id: organization.id,
        name: organization.name,
        slug: organization.slug,
        status: organization.status,
        employeeLimit: organization.employeeLimit,
      },
      summary: {
        employeeCount: employees.length,
        activeCount,
        invitedCount,
        completedCount,
        completionPercent: employees.length ? Math.round((completedCount / employees.length) * 100) : 0,
        totalActivities,
        communicationCount: communications.length,
        pgrCount: pgrDocuments.length,
      },
      employees: employeeSummaries,
      communications,
      pgrDocuments,
      members: organization.members.map((member) => ({
        id: member.id,
        name: member.name,
        email: member.email,
        role: member.role,
        receivesCommunications: member.receivesCommunications,
        managesPgr: member.managesPgr,
      })),
      units: organization.units.map((unit) => ({ id: unit.id, name: unit.name, city: unit.city, state: unit.state })),
      jobTitles,
    });
  } catch (error) {
    const status = (error as Error & { status?: number }).status ?? 500;
    console.error('Erro ao carregar painel da escola:', error);
    return NextResponse.json({ error: status === 500 ? 'Erro interno ao carregar painel.' : (error as Error).message }, { status });
  }
}
