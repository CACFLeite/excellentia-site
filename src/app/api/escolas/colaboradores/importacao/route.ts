import crypto from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { assertInternalAccess, createInviteToken, getBaseUrl, hashInviteToken } from '@/lib/invitations';
import { parseSimpleCsv, previewEmployeeRows } from '@/lib/employeeImport';

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
    const mode = body.mode === 'commit' ? 'commit' : 'preview';
    const rows = Array.isArray(body.rows) ? body.rows : typeof body.csv === 'string' ? parseSimpleCsv(body.csv) : [];

    if (!organizationId) {
      return NextResponse.json({ error: 'organizationId é obrigatório.' }, { status: 400 });
    }

    if (!rows.length) {
      return NextResponse.json({ error: 'Informe linhas de colaboradores ou CSV.' }, { status: 400 });
    }

    const preview = previewEmployeeRows(rows);

    if (mode === 'preview') {
      return NextResponse.json(preview);
    }

    const blockingIssues = preview.issues.filter((issue) => issue.field === 'fullName' || issue.field === 'cpf' || issue.field === 'email');
    if (blockingIssues.length) {
      return NextResponse.json({ ...preview, error: 'Corrija os problemas antes de importar.' }, { status: 400 });
    }

    const organization = await prisma.organization.findUnique({ where: { id: organizationId } });
    if (!organization) {
      return NextResponse.json({ error: 'Escola/organização não encontrada.' }, { status: 404 });
    }

    const course = await prisma.course.findUnique({ where: { slug: 'nr1-escolas' } });
    const baseUrl = getBaseUrl(request);
    const expiresInDays = Number(body.expiresInDays ?? 14);

    const imported = await prisma.$transaction(async (tx) => {
      const results = [];

      for (const employeeRow of preview.employees) {
        let unitId: string | undefined;

        if (employeeRow.unitName) {
          const existingUnit = await tx.unit.findFirst({
            where: { organizationId, name: { equals: employeeRow.unitName, mode: 'insensitive' } },
          });
          const unit = existingUnit ?? (await tx.unit.create({ data: { organizationId, name: employeeRow.unitName } }));
          unitId = unit.id;
        }

        const employee = await tx.employee.upsert({
          where: employeeRow.cpf
            ? { organizationId_cpf: { organizationId, cpf: employeeRow.cpf } }
            : { id: `new-${crypto.randomUUID()}` },
          create: {
            organizationId,
            unitId,
            fullName: employeeRow.fullName,
            email: employeeRow.email ?? null,
            cpf: employeeRow.cpf ?? null,
            jobTitle: employeeRow.jobTitle ?? null,
          },
          update: {
            unitId,
            fullName: employeeRow.fullName,
            email: employeeRow.email ?? null,
            jobTitle: employeeRow.jobTitle ?? null,
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
          fullName: employee.fullName,
          email: employee.email,
          invitationUrl: `${baseUrl}/acesso-escolar?convite=${token}`,
        });
      }

      return results;
    });

    return NextResponse.json({ imported, issues: preview.issues }, { status: 201 });
  } catch (error) {
    const status = (error as Error & { status?: number }).status ?? 500;
    console.error('Erro na importação de colaboradores:', error);
    return NextResponse.json({ error: status === 500 ? 'Erro interno na importação.' : (error as Error).message }, { status });
  }
}
