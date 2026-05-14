import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  assertInternalAccess,
  createInviteToken,
  getBaseUrl,
  hashInviteToken,
} from "@/lib/invitations";
import { getCatalogCourseDefinitions } from "@/lib/courses/definitions";

const emergencyRolesMapFields = [
  "preventionResponsible",
  "preventionSubstitute",
  "preventionEvidence",
  "preventionGaps",
  "alertResponsible",
  "alertSubstitute",
  "alertEvidence",
  "alertGaps",
  "evacuationResponsible",
  "evacuationSubstitute",
  "evacuationEvidence",
  "evacuationGaps",
  "communicationResponsible",
  "communicationSubstitute",
  "communicationEvidence",
  "communicationGaps",
] as const;

type EmergencyRolesMapField = (typeof emergencyRolesMapFields)[number];

const fireRiskWalkthroughFields = [
  "areasVisited",
  "findingsLog",
  "simpleCorrectionsPlan",
  "technicalReferrals",
  "suspendedAreas",
  "photoEvidenceNotes",
  "reviewResponsible",
] as const;

type FireRiskWalkthroughField = (typeof fireRiskWalkthroughFields)[number];

function normalizeNullableText(value: unknown) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed.slice(0, 4000) : null;
}

function addDays(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

function normalizeSlug(value: unknown) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function normalizeStringArray(value: unknown) {
  return Array.isArray(value)
    ? value.map((item) => String(item ?? "").trim()).filter(Boolean)
    : [];
}

function metadataRecord(value: unknown) {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function isDatabaseSchemaUnavailable(error: unknown) {
  const code = (error as { code?: string })?.code;
  if (code === "P2021" || code === "P2022") return true;

  const message = String((error as Error)?.message ?? error).toLowerCase();
  return (
    message.includes("does not exist") ||
    message.includes("relation") && message.includes("not exist") ||
    message.includes("table") && message.includes("not exist") ||
    message.includes("no such table")
  );
}

async function loadOptionalSchoolEvidenceMaps(organizationId: string) {
  try {
    const [emergencyRolesMap, fireRiskWalkthrough] = await Promise.all([
      prisma.schoolEmergencyRolesMap.findUnique({
        where: {
          organizationId_courseSlug_lessonOrder: {
            organizationId,
            courseSlug: "incendio-escolas",
            lessonOrder: 1,
          },
        },
      }),
      prisma.schoolFireRiskWalkthrough.findUnique({
        where: {
          organizationId_courseSlug_lessonOrder: {
            organizationId,
            courseSlug: "incendio-escolas",
            lessonOrder: 2,
          },
        },
      }),
    ]);

    return { emergencyRolesMap, fireRiskWalkthrough, available: true };
  } catch (error) {
    if (!isDatabaseSchemaUnavailable(error)) throw error;
    console.warn(
      "Tabelas de evidências formativas indisponíveis para o painel da escola; seguindo em modo degradado.",
      error,
    );
    return {
      emergencyRolesMap: null,
      fireRiskWalkthrough: null,
      available: false,
    };
  }
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ organizationId: string }> },
) {
  const params = await context.params;

  try {
    assertInternalAccess(request);
    const organizationId = params.organizationId;

    const organization = await prisma.organization.findUnique({
      where: { id: organizationId },
      include: {
        units: { orderBy: { name: "asc" } },
        members: { orderBy: { name: "asc" } },
      },
    });

    if (!organization) {
      return NextResponse.json(
        { error: "Escola/organização não encontrada." },
        { status: 404 },
      );
    }

    const schoolCourseDefinitions = getCatalogCourseDefinitions().filter(
      (definition) => definition.audience === "school_employee",
    );
    const schoolCourseSlugs = schoolCourseDefinitions.map(
      (definition) => definition.slug,
    );
    const dbCourses = await prisma.course.findMany({
      where: { slug: { in: schoolCourseSlugs } },
      include: { lessons: { include: { activities: true } } },
    });
    const dbCourseBySlug = new Map(dbCourses.map((item) => [item.slug, item]));
    const course = dbCourseBySlug.get("nr1-escolas");

    const activityIds =
      course?.lessons.flatMap((lesson) =>
        lesson.activities.map((activity) => activity.id),
      ) ?? [];
    const totalActivities = activityIds.length;

    const employees = await prisma.employee.findMany({
      where: { organizationId },
      include: {
        unit: true,
        invitations: { orderBy: { createdAt: "desc" }, take: 1 },
        responses: totalActivities
          ? {
              where: { activityId: { in: activityIds } },
              include: { feedback: true },
            }
          : { include: { feedback: true } },
        enrollments: {
          where: { course: { slug: { in: schoolCourseSlugs } } },
          include: {
            certificate: true,
            course: { select: { slug: true, title: true } },
          },
        },
      },
      orderBy: { fullName: "asc" },
    });

    const communications = await prisma.communication.findMany({
      where: { organizationId },
      orderBy: { createdAt: "desc" },
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
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        signedAt: true,
        signedBy: true,
      },
    });

    const {
      emergencyRolesMap,
      fireRiskWalkthrough,
      available: schoolEvidenceMapsAvailable,
    } = await loadOptionalSchoolEvidenceMaps(organizationId);

    const employeeSummaries = employees.map((employee) => {
      const answeredCount = employee.responses.length;
      const enrollment = employee.enrollments.find(
        (item) => item.course.slug === "nr1-escolas",
      );
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
        progressPercent: totalActivities
          ? Math.round((answeredCount / totalActivities) * 100)
          : 0,
        courseStatus: enrollment?.status ?? "not_started",
        completedAt: enrollment?.completedAt ?? null,
        courseEnrollments: employee.enrollments.map((item) => ({
          courseSlug: item.course.slug,
          courseTitle: item.course.title,
          status: item.status,
          completedAt: item.completedAt,
          certificateCode: item.certificate?.verificationCode ?? null,
        })),
        certificate: enrollment?.certificate
          ? {
              verificationCode: enrollment.certificate.verificationCode,
              issuedAt: enrollment.certificate.issuedAt,
              status: enrollment.certificate.status,
            }
          : null,
      };
    });

    const completedCount = employeeSummaries.filter(
      (employee) => employee.courseStatus === "completed",
    ).length;
    const activeCount = employeeSummaries.filter(
      (employee) => employee.status === "active",
    ).length;
    const invitedCount = employeeSummaries.filter(
      (employee) => employee.invitationStatus === "pending",
    ).length;

    const jobTitles = Array.from(
      new Set(
        employeeSummaries
          .map((employee) => employee.jobTitle)
          .filter(Boolean) as string[],
      ),
    ).sort((a, b) => a.localeCompare(b, "pt-BR"));

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
        completionPercent: employees.length
          ? Math.round((completedCount / employees.length) * 100)
          : 0,
        totalActivities,
        communicationCount: communications.length,
        pgrCount: pgrDocuments.length,
      },
      employees: employeeSummaries,
      communications,
      pgrDocuments,
      emergencyRolesMap,
      fireRiskWalkthrough,
      members: organization.members.map((member) => ({
        id: member.id,
        name: member.name,
        email: member.email,
        role: member.role,
        receivesCommunications: member.receivesCommunications,
        managesPgr: member.managesPgr,
      })),
      units: organization.units.map((unit) => ({
        id: unit.id,
        name: unit.name,
        city: unit.city,
        state: unit.state,
      })),
      jobTitles,
      featureAvailability: {
        schoolEvidenceMaps: schoolEvidenceMapsAvailable,
      },
      courses: schoolCourseDefinitions.map((definition) => {
        const dbCourse = dbCourseBySlug.get(definition.slug);
        const metadata = metadataRecord(definition.metadata);
        const enrolledCount = employees.filter((employee) =>
          employee.enrollments.some(
            (enrollment) => enrollment.course.slug === definition.slug,
          ),
        ).length;
        return {
          slug: definition.slug,
          title: dbCourse?.title ?? definition.title,
          shortTitle: definition.shortTitle,
          status: dbCourse?.status ?? definition.status,
          availability: definition.availability,
          area: definition.area,
          targetAudience:
            typeof metadata.targetAudience === "string"
              ? metadata.targetAudience
              : (definition.publicPage.cards.find((card) =>
                  card.title.toLowerCase().includes("equipe"),
                )?.description ?? definition.description),
          suggestedProfiles: Array.isArray(metadata.suggestedProfiles)
            ? metadata.suggestedProfiles
            : [],
          enrolledCount,
          lessonsCount:
            dbCourse?.lessons.length ??
            definition.lessonsCount ??
            definition.lessons.length,
          canAssign: Boolean(dbCourse && dbCourse.status === "published"),
        };
      }),
    });
  } catch (error) {
    const status = (error as Error & { status?: number }).status ?? 500;
    console.error("Erro ao carregar painel da escola:", error);
    return NextResponse.json(
      {
        error:
          status === 500
            ? "Erro interno ao carregar painel."
            : (error as Error).message,
      },
      { status },
    );
  }
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ organizationId: string }> },
) {
  const params = await context.params;

  try {
    assertInternalAccess(request);
    const organizationId = params.organizationId;
    const body = await request.json();
    const courseSlug = normalizeSlug(body?.courseSlug);
    const employeeIds = Array.from(
      new Set(normalizeStringArray(body?.employeeIds)),
    );
    const expiresInDays = Number(body?.expiresInDays ?? 14);

    if (!courseSlug || !employeeIds.length) {
      return NextResponse.json(
        { error: "Selecione um curso e ao menos um colaborador." },
        { status: 400 },
      );
    }

    const allowedCourseSlugs = new Set(
      getCatalogCourseDefinitions()
        .filter((definition) => definition.audience === "school_employee")
        .map((definition) => definition.slug),
    );
    if (!allowedCourseSlugs.has(courseSlug)) {
      return NextResponse.json(
        { error: "Curso inválido para atribuição escolar." },
        { status: 400 },
      );
    }

    const [organization, course, employees] = await Promise.all([
      prisma.organization.findUnique({
        where: { id: organizationId },
        select: { id: true, name: true },
      }),
      prisma.course.findUnique({
        where: { slug: courseSlug },
        select: { id: true, slug: true, title: true, status: true },
      }),
      prisma.employee.findMany({
        where: { organizationId, id: { in: employeeIds } },
        select: { id: true, fullName: true, email: true, jobTitle: true },
        orderBy: { fullName: "asc" },
      }),
    ]);

    if (!organization)
      return NextResponse.json(
        { error: "Escola/organização não encontrada." },
        { status: 404 },
      );
    if (!course || course.status !== "published")
      return NextResponse.json(
        { error: "Curso não encontrado ou ainda não publicado no banco." },
        { status: 404 },
      );
    if (!employees.length)
      return NextResponse.json(
        { error: "Nenhum colaborador válido encontrado para esta escola." },
        { status: 400 },
      );

    const baseUrl = getBaseUrl(request);
    const created = await prisma.$transaction(async (tx) => {
      const results = [];
      for (const employee of employees) {
        await tx.enrollment.upsert({
          where: {
            employeeId_courseId: {
              employeeId: employee.id,
              courseId: course.id,
            },
          },
          create: {
            organizationId,
            employeeId: employee.id,
            courseId: course.id,
          },
          update: {},
        });

        const token = createInviteToken();
        const invitation = await tx.employeeInvitation.create({
          data: {
            organizationId,
            employeeId: employee.id,
            email: employee.email,
            tokenHash: hashInviteToken(token),
            expiresAt: addDays(
              Number.isFinite(expiresInDays) ? expiresInDays : 14,
            ),
          },
        });

        results.push({
          employeeId: employee.id,
          invitationId: invitation.id,
          fullName: employee.fullName,
          email: employee.email,
          courseSlug: course.slug,
          courseTitle: course.title,
          invitationUrl: `${baseUrl}/acesso-escolar?convite=${token}&curso=${encodeURIComponent(course.slug)}`,
        });
      }
      return results;
    });

    return NextResponse.json(
      {
        course,
        assigned: created,
        skippedEmployeeIds: employeeIds.filter(
          (id) => !employees.some((employee) => employee.id === id),
        ),
      },
      { status: 201 },
    );
  } catch (error) {
    const status = (error as Error & { status?: number }).status ?? 500;
    console.error("Erro ao atribuir curso escolar:", error);
    return NextResponse.json(
      {
        error:
          status === 500
            ? "Erro interno ao atribuir curso."
            : (error as Error).message,
      },
      { status },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ organizationId: string }> },
) {
  const params = await context.params;

  try {
    assertInternalAccess(request);
    const organizationId = params.organizationId;
    const body = await request.json();
    const rolesInput = body?.emergencyRolesMap;
    const walkthroughInput = body?.fireRiskWalkthrough;

    const organization = await prisma.organization.findUnique({
      where: { id: organizationId },
      select: { id: true },
    });
    if (!organization) {
      return NextResponse.json(
        { error: "Escola/organização não encontrada." },
        { status: 404 },
      );
    }

    const response: Record<string, unknown> = {};

    if (rolesInput) {
      const data = emergencyRolesMapFields.reduce(
        (accumulator, field) => {
          accumulator[field] = normalizeNullableText(rolesInput[field]);
          return accumulator;
        },
        {} as Record<EmergencyRolesMapField, string | null>,
      );

      response.emergencyRolesMap = await prisma.schoolEmergencyRolesMap.upsert({
        where: {
          organizationId_courseSlug_lessonOrder: {
            organizationId,
            courseSlug: "incendio-escolas",
            lessonOrder: 1,
          },
        },
        create: {
          organizationId,
          courseSlug: "incendio-escolas",
          lessonOrder: 1,
          ...data,
        },
        update: data,
      });
    }

    if (walkthroughInput) {
      const data = fireRiskWalkthroughFields.reduce(
        (accumulator, field) => {
          accumulator[field] = normalizeNullableText(walkthroughInput[field]);
          return accumulator;
        },
        {} as Record<FireRiskWalkthroughField, string | null>,
      );

      response.fireRiskWalkthrough =
        await prisma.schoolFireRiskWalkthrough.upsert({
          where: {
            organizationId_courseSlug_lessonOrder: {
              organizationId,
              courseSlug: "incendio-escolas",
              lessonOrder: 2,
            },
          },
          create: {
            organizationId,
            courseSlug: "incendio-escolas",
            lessonOrder: 2,
            ...data,
          },
          update: data,
        });
    }

    if (!rolesInput && !walkthroughInput) {
      return NextResponse.json(
        { error: "Nenhum documento enviado para salvar." },
        { status: 400 },
      );
    }

    return NextResponse.json(response);
  } catch (error) {
    if (isDatabaseSchemaUnavailable(error)) {
      return NextResponse.json(
        {
          error:
            "Evidências formativas ainda indisponíveis neste ambiente. É necessário aplicar as migrations do banco antes de salvar estes documentos.",
          featureUnavailable: "schoolEvidenceMaps",
        },
        { status: 503 },
      );
    }

    const status = (error as Error & { status?: number }).status ?? 500;
    console.error("Erro ao salvar mapa de papéis de emergência:", error);
    return NextResponse.json(
      {
        error:
          status === 500
            ? "Erro interno ao salvar mapa de papéis."
            : (error as Error).message,
      },
      { status },
    );
  }
}
