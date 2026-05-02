import crypto from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { assertInternalAccess, createInviteToken, getBaseUrl, hashInviteToken } from '@/lib/invitations';
import { normalizeCpf, normalizeJobTitle, normalizePersonName } from '@/lib/employeeImport';

type EmployeeInput = {
  fullName: string;
  email?: string;
  cpf?: string;
  jobTitle?: string;
  unitId?: string;
  unitName?: string;
};

function addDays(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

export async function POST(request: NextRequest) {
  try {
    assertInternalAccess(request);
    const body = await request.json();
    const organizationId = String(body.organizationId ?? '');
    const courseSlug = String(body.courseSlug ?? 'nr1-escolas');
    const employees = Array.isArray(body.employees) ? (body.employees as EmployeeInput[]) : [];
    const expiresInDays = Number(body.expiresInDays ?? 14);

    if (!organizationId) {
      return NextResponse.json({ error: 'organizationId é obrigatório.' }, { status: 400 });
    }

    if (!employees.length) {
      return NextResponse.json({ error: 'Informe ao menos um colaborador.' }, { status: 400 });
    }

    const organization = await prisma.organization.findUnique({ where: { id: organizationId } });
    if (!organization) {
      return NextResponse.json({ error: 'Escola/organização não encontrada.' }, { status: 404 });
    }

    const course = await prisma.course.findUnique({ where: { slug: courseSlug } });
    const baseUrl = getBaseUrl(request);

    const created = await prisma.$transaction(async (tx) => {
      const results = [];

      for (const input of employees) {
        const fullName = normalizePersonName(input.fullName);
        const cpf = normalizeCpf(input.cpf);
        const email = input.email?.trim().toLowerCase() || null;
        const jobTitle = normalizeJobTitle(input.jobTitle) ?? null;

        if (!fullName) {
          throw new Error('Todos os colaboradores precisam de nome completo.');
        }

        let unitId = input.unitId;
        const unitName = input.unitName?.trim();
        if (!unitId && unitName) {
          const existingUnit = await tx.unit.findFirst({ where: { organizationId, name: { equals: unitName, mode: 'insensitive' } } });
          const unit = existingUnit ?? await tx.unit.create({ data: { organizationId, name: unitName } });
          unitId = unit.id;
        }

        const employee = await tx.employee.upsert({
          where: cpf
            ? { organizationId_cpf: { organizationId, cpf } }
            : { id: `new-${crypto.randomUUID()}` },
          create: {
            organizationId,
            unitId,
            fullName,
            email,
            cpf: cpf || null,
            jobTitle,
          },
          update: {
            unitId,
            fullName,
            email,
            jobTitle,
          },
        });

        if (course) {
          await tx.enrollment.upsert({
            where: { employeeId_courseId: { employeeId: employee.id, courseId: course.id } },
            create: { organizationId, employeeId: employee.id, courseId: course.id },
            update: {},
          });
        }

        const token = createInviteToken();
        const invitation = await tx.employeeInvitation.create({
          data: {
            organizationId,
            employeeId: employee.id,
            email: employee.email,
            tokenHash: hashInviteToken(token),
            expiresAt: addDays(Number.isFinite(expiresInDays) ? expiresInDays : 14),
          },
        });

        results.push({
          employeeId: employee.id,
          invitationId: invitation.id,
          email: employee.email,
          fullName: employee.fullName,
          courseAttached: Boolean(course),
          invitationUrl: `${baseUrl}/acesso-escolar?convite=${token}&curso=${encodeURIComponent(courseSlug)}`,
        });
      }

      return results;
    });

    return NextResponse.json({ invitations: created }, { status: 201 });
  } catch (error) {
    const status = (error as Error & { status?: number }).status ?? 500;
    console.error('Erro ao criar convites escolares:', error);
    return NextResponse.json({ error: status === 500 ? 'Erro interno ao criar convites.' : (error as Error).message }, { status });
  }
}
