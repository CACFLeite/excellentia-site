import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generatePgrDocument } from '@/lib/pgr';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { formData, orgId, organizationId, organizationSlug, signedBy } = body;

    if (!formData || typeof formData !== 'object') {
      return NextResponse.json({ error: 'Dados do formulário são obrigatórios.' }, { status: 400 });
    }

    const resolvedOrgId = orgId || organizationId;

    const organization = resolvedOrgId
      ? await prisma.organization.findUnique({ where: { id: String(resolvedOrgId) }, select: { id: true } })
      : organizationSlug
        ? await prisma.organization.findUnique({ where: { slug: String(organizationSlug) }, select: { id: true } })
        : null;

    if (!organization) {
      return NextResponse.json({ error: 'Escola/organização não encontrada.' }, { status: 404 });
    }

    const generated = generatePgrDocument(formData);

    const pgr = await prisma.pgrDocument.create({
      data: {
        organizationId: organization.id,
        status: 'draft',
        formData,
        generatedBody: generated.body,
        metadata: generated.metadata,
        signedBy: typeof signedBy === 'string' ? signedBy : undefined,
      },
    });

    return NextResponse.json(
      {
        message: 'Rascunho do Programa de Gerenciamento de Riscos salvo com sucesso.',
        pgrId: pgr.id,
        riskCount: generated.metadata.riskCount,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Erro ao salvar Programa de Gerenciamento de Riscos:', error);
    return NextResponse.json({ error: 'Erro interno ao salvar PGR.' }, { status: 500 });
  }
}
