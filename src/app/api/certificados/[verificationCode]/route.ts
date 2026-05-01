import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_request: Request, { params }: { params: { verificationCode: string } }) {
  const verificationCode = params.verificationCode.trim().toUpperCase();

  const certificate = await prisma.certificate.findUnique({
    where: { verificationCode },
    include: {
      employee: { select: { fullName: true, jobTitle: true } },
      organization: { select: { name: true } },
      enrollment: { include: { course: { select: { title: true, slug: true } } } },
    },
  });

  if (!certificate || certificate.status !== 'issued') {
    return NextResponse.json({ error: 'Certificado não encontrado ou revogado.' }, { status: 404 });
  }

  return NextResponse.json({
    verificationCode: certificate.verificationCode,
    issuedAt: certificate.issuedAt,
    status: certificate.status,
    employee: certificate.employee,
    organization: certificate.organization,
    course: certificate.enrollment.course,
    evidence:
      'Este certificado comprova que o curso foi ofertado e que as respostas foram enviadas. O feedback é formativo e não representa nota pública qualitativa.',
  });
}
