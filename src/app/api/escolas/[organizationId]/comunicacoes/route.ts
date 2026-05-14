import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { assertInternalAccess } from '@/lib/invitations';

const allowedCommunicationStatuses = ['new', 'triaged', 'in_review', 'closed', 'archived'] as const;
type CommunicationStatusValue = (typeof allowedCommunicationStatuses)[number];

function isCommunicationStatus(status: string): status is CommunicationStatusValue {
  return allowedCommunicationStatuses.includes(status as CommunicationStatusValue);
}

export async function GET(request: NextRequest, context: { params: Promise<{ organizationId: string }> }) {
  const params = await context.params;

  try {
    assertInternalAccess(request);
    const communications = await prisma.communication.findMany({
      where: { organizationId: params.organizationId },
      orderBy: { createdAt: 'desc' },
      include: { employee: { select: { fullName: true, email: true, jobTitle: true } } },
    });

    return NextResponse.json({
      communications: communications.map((item) => ({
        id: item.id,
        kind: item.kind,
        category: item.category,
        message: item.message,
        status: item.status,
        identitySealed: item.identitySealed,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        employee: item.identitySealed ? null : item.employee,
        hasProtectedIdentity: Boolean(item.employeeId && item.identitySealed),
      })),
    });
  } catch (error) {
    const status = (error as Error & { status?: number }).status ?? 500;
    console.error('Erro ao listar comunicações:', error);
    return NextResponse.json({ error: status === 500 ? 'Erro interno ao listar comunicações.' : (error as Error).message }, { status });
  }
}

export async function PATCH(request: NextRequest, context: { params: Promise<{ organizationId: string }> }) {
  const params = await context.params;

  try {
    assertInternalAccess(request);
    const body = await request.json();
    const id = String(body.id ?? '');
    const status = String(body.status ?? '');

    if (!id || !isCommunicationStatus(status)) {
      return NextResponse.json({ error: 'ID e status válido são obrigatórios.' }, { status: 400 });
    }

    const result = await prisma.communication.updateMany({
      where: { id, organizationId: params.organizationId },
      data: { status },
    });

    if (!result.count) {
      return NextResponse.json({ error: 'Comunicado não encontrado para esta escola.' }, { status: 404 });
    }

    const updated = await prisma.communication.findUnique({
      where: { id },
      include: { employee: { select: { fullName: true, email: true, jobTitle: true } } },
    });

    if (!updated || updated.organizationId !== params.organizationId) {
      return NextResponse.json({ error: 'Comunicado não encontrado para esta escola.' }, { status: 404 });
    }

    return NextResponse.json({
      communication: {
        id: updated.id,
        kind: updated.kind,
        category: updated.category,
        message: updated.message,
        status: updated.status,
        identitySealed: updated.identitySealed,
        createdAt: updated.createdAt,
        updatedAt: updated.updatedAt,
        employee: updated.identitySealed ? null : updated.employee,
        hasProtectedIdentity: Boolean(updated.employeeId && updated.identitySealed),
      },
    });
  } catch (error) {
    const status = (error as Error & { status?: number }).status ?? 500;
    console.error('Erro ao atualizar comunicação:', error);
    return NextResponse.json({ error: status === 500 ? 'Erro interno ao atualizar comunicação.' : (error as Error).message }, { status });
  }
}
