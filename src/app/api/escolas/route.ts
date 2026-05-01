import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { assertInternalAccess } from '@/lib/invitations';

function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function isValidCnpj(value?: string) {
  if (!value) return true;
  const cnpj = value.replace(/\D/g, '');
  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

  const calc = (base: string, weights: number[]) => {
    const sum = weights.reduce((acc, weight, index) => acc + Number(base[index]) * weight, 0);
    const mod = sum % 11;
    return mod < 2 ? 0 : 11 - mod;
  };

  const digit1 = calc(cnpj.slice(0, 12), [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const digit2 = calc(cnpj.slice(0, 13), [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  return digit1 === Number(cnpj[12]) && digit2 === Number(cnpj[13]);
}

export async function GET(request: NextRequest) {
  try {
    assertInternalAccess(request);
    const search = request.nextUrl.searchParams.get('search')?.trim();

    const organizations = await prisma.organization.findMany({
      where: search
        ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { legalName: { contains: search, mode: 'insensitive' } },
              { document: { contains: search.replace(/\D/g, '') } },
              { slug: { contains: search.toLowerCase(), mode: 'insensitive' } },
            ],
          }
        : undefined,
      include: {
        units: { orderBy: [{ isMain: 'desc' }, { name: 'asc' }] },
        _count: { select: { employees: true, communications: true, certificates: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    return NextResponse.json({
      organizations: organizations.map((organization) => ({
        id: organization.id,
        name: organization.name,
        legalName: organization.legalName,
        document: organization.document,
        slug: organization.slug,
        status: organization.status,
        employeeLimit: organization.employeeLimit,
        mainUnit: organization.units[0] ?? null,
        counts: organization._count,
        createdAt: organization.createdAt,
      })),
    });
  } catch (error) {
    const status = (error as Error & { status?: number }).status ?? 500;
    console.error('Erro ao listar escolas:', error);
    return NextResponse.json({ error: status === 500 ? 'Erro interno ao listar escolas.' : (error as Error).message }, { status });
  }
}

export async function POST(request: NextRequest) {
  try {
    assertInternalAccess(request);
    const body = await request.json();
    const name = String(body.name ?? '').trim();
    const legalName = String(body.legalName ?? '').trim() || undefined;
    const document = String(body.document ?? '').replace(/\D/g, '') || undefined;
    const employeeLimit = body.employeeLimit ? Number(body.employeeLimit) : undefined;
    const responsibleName = String(body.responsibleName ?? '').trim();
    const responsibleEmail = String(body.responsibleEmail ?? '').trim();
    const mainUnitName = String(body.mainUnitName ?? '').trim() || 'Unidade principal';
    const city = String(body.city ?? '').trim() || undefined;
    const state = String(body.state ?? '').trim() || undefined;
    const billingEmail = String(body.billingEmail ?? '').trim() || responsibleEmail || undefined;
    const billingAddress = String(body.billingAddress ?? '').trim() || undefined;
    const rawSlug = String(body.slug ?? '').trim();

    if (!name) {
      return NextResponse.json({ error: 'Nome da escola é obrigatório.' }, { status: 400 });
    }

    if (document && !isValidCnpj(document)) {
      return NextResponse.json({ error: 'CNPJ inválido. Confira o número antes de criar a escola.' }, { status: 400 });
    }

    const baseSlug = slugify(rawSlug || name);
    if (!baseSlug) {
      return NextResponse.json({ error: 'Não foi possível gerar slug da escola.' }, { status: 400 });
    }

    let slug = baseSlug;
    let suffix = 2;
    while (await prisma.organization.findUnique({ where: { slug }, select: { id: true } })) {
      slug = `${baseSlug}-${suffix}`;
      suffix += 1;
    }

    const organization = await prisma.organization.create({
      data: {
        name,
        legalName,
        document,
        slug,
        status: 'onboarding',
        employeeLimit: Number.isFinite(employeeLimit) ? employeeLimit : undefined,
        metadata: {
          billing: {
            legalName,
            document,
            billingEmail,
            billingAddress,
            invoiceUse: 'Dados preparados para emissão de NF/checkout, integração fiscal final pendente.',
          },
        },
        units: { create: { name: mainUnitName, city, state, isMain: true } },
        members:
          responsibleName && responsibleEmail
            ? {
                create: {
                  name: responsibleName,
                  email: responsibleEmail,
                  role: 'owner',
                  receivesCommunications: true,
                  managesPgr: true,
                },
              }
            : undefined,
      },
      include: { units: true, members: true },
    });

    return NextResponse.json({ organization }, { status: 201 });
  } catch (error) {
    const status = (error as Error & { status?: number }).status ?? 500;
    console.error('Erro ao criar escola:', error);
    return NextResponse.json({ error: status === 500 ? 'Erro interno ao criar escola.' : (error as Error).message }, { status });
  }
}
