import type { Metadata } from 'next';
import Link from 'next/link';
import PrintButton from '@/components/PrintButton';
import { prisma } from '@/lib/prisma';

type Props = { params: { verificationCode: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Certificado ${params.verificationCode} — Excellentia`,
    description: 'Verificação pública de certificado Excellentia.',
  };
}

export default async function CertificadoPage({ params }: Props) {
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
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-lg w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
          <p className="text-5xl mb-4">⚠️</p>
          <h1 className="text-2xl font-extrabold text-navy mb-3">Certificado não encontrado</h1>
          <p className="text-gray-600 mb-6">O código informado não existe ou o certificado foi revogado.</p>
          <Link href="/" className="inline-block bg-gold hover:bg-yellow-600 text-white font-bold px-6 py-3 rounded-xl">
            Voltar ao site
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <section className="bg-navy text-white p-8 md:p-12 print:bg-white print:text-navy print:border-b print:border-gray-200">
            <p className="text-sm font-bold uppercase tracking-wide text-gold mb-3">Certificado Excellentia</p>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">Certificado de participação e conclusão</h1>
            <p className="text-gray-300 mt-4 max-w-2xl">
              Este certificado comprova a disponibilização do curso, a participação registrada e o envio das atividades previstas na plataforma.
            </p>
          </section>

          <section className="p-8 md:p-12 space-y-8">
            <div className="flex justify-end print:hidden">
              <PrintButton />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">Participante</p>
              <h2 className="text-3xl font-extrabold text-navy">{certificate.employee.fullName}</h2>
              {certificate.employee.jobTitle && <p className="text-gray-600 mt-1">{certificate.employee.jobTitle}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-gray-50 border border-gray-100 p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">Curso</p>
                <p className="font-bold text-navy">{certificate.enrollment.course.title}</p>
              </div>
              <div className="rounded-2xl bg-gray-50 border border-gray-100 p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">Escola/organização</p>
                <p className="font-bold text-navy">{certificate.organization.name}</p>
              </div>
              <div className="rounded-2xl bg-gray-50 border border-gray-100 p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">Emissão</p>
                <p className="font-bold text-navy">{certificate.issuedAt.toLocaleDateString('pt-BR')}</p>
              </div>
              <div className="rounded-2xl bg-gray-50 border border-gray-100 p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">Código de verificação</p>
                <p className="font-bold text-navy">{certificate.verificationCode}</p>
              </div>
            </div>

            <div className="rounded-2xl bg-blue-50 border border-blue-100 p-5 text-sm text-blue-950 leading-relaxed">
              O feedback do curso é formativo e avalia apenas organização e compreensão da resposta. Este certificado não publica nota qualitativa, não substitui documentos legais de SST e não valida a veracidade de fatos individuais narrados nas atividades.
            </div>

            <div className="rounded-2xl border border-gray-100 p-5 text-sm text-gray-600 leading-relaxed">
              Verificação pública: este certificado pode ser conferido pelo código <strong>{certificate.verificationCode}</strong> nesta página. A emissão foi registrada em {certificate.issuedAt.toLocaleDateString('pt-BR')}.
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
