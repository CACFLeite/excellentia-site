import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { assertInternalAccess } from '@/lib/invitations';

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

    if (!id || !['new', 'triaged', 'in_review', 'closed', 'archived'].includes(status)) {
      return NextResponse.json({ error: 'ID e status válido são obrigatórios.' }, { status: 400 });
    }

    const updated = await prisma.communication.update({
      where: { id, organizationId: params.organizationId },
      data: { status: status as 'new' | 'triaged' | 'in_review' | 'closed' | 'archived' },
    });

    return NextResponse.json({ communication: updated });
  } catch (error) {
    const status = (error as Error & { status?: number }).status ?? 500;
    console.error('Erro ao atualizar comunicação:', error);
    return NextResponse.json({ error: status === 500 ? 'Erro interno ao atualizar comunicação.' : (error as Error).message }, { status });
  }
}
