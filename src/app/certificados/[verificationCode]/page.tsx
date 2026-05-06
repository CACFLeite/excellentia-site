import type { Metadata } from 'next';
import Link from 'next/link';
import PrintButton from '@/components/PrintButton';
import { prisma } from '@/lib/prisma';

type Props = { params: Promise<{ verificationCode: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;

  return {
    title: `Certificado ${resolvedParams.verificationCode} — Excellentia`,
    description: 'Verificação pública de certificado Excellentia.',
  };
}

export default async function CertificadoPage({ params }: Props) {
  const resolvedParams = await params;
  const verificationCode = resolvedParams.verificationCode.trim().toUpperCase();
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
    <main className="min-h-screen bg-gray-50 py-8 px-4 print:bg-white print:py-0 print:px-0">
      <div className="max-w-4xl mx-auto print:max-w-none">
        <div className="mb-4 flex flex-col sm:flex-row justify-between gap-3 print:hidden">
          <Link href="/" className="text-sm font-bold text-navy hover:text-gold">← Voltar para a home</Link>
          {certificate.enrollment.course.slug === 'nr1-escolas' && (
            <Link href="/cursos/nr1-escolas" className="text-sm font-bold text-navy hover:text-gold">Voltar para o curso</Link>
          )}
        </div>
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <section className="bg-navy text-white p-6 md:p-8 print:bg-white print:text-navy print:border-b print:border-gray-200 print:p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-gold mb-2">Certificado Excellentia</p>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight print:text-3xl">Certificado de participação e conclusão</h1>
            <p className="text-gray-300 mt-3 max-w-2xl print:text-gray-700 print:text-sm">
              Este certificado comprova a disponibilização do curso, a participação registrada e o envio das atividades previstas na plataforma.
            </p>
          </section>

          <section className="p-6 md:p-8 space-y-5 print:p-5 print:space-y-4">
            <div className="flex justify-end print:hidden">
              <PrintButton />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">Participante</p>
              <h2 className="text-3xl font-extrabold text-navy print:text-2xl">{certificate.employee.fullName}</h2>
              {certificate.employee.jobTitle && <p className="text-gray-600 mt-1">{certificate.employee.jobTitle}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:grid-cols-2 print:gap-3">
              <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4 print:p-3">
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">Curso</p>
                <p className="font-bold text-navy">{certificate.enrollment.course.title}</p>
              </div>
              <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4 print:p-3">
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">Escola/organização</p>
                <p className="font-bold text-navy">{certificate.organization.name}</p>
              </div>
              <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4 print:p-3">
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">Emissão</p>
                <p className="font-bold text-navy">{certificate.issuedAt.toLocaleDateString('pt-BR')}</p>
              </div>
              <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4 print:p-3">
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">Código de verificação</p>
                <p className="font-bold text-navy">{certificate.verificationCode}</p>
              </div>
            </div>

            <div className="rounded-2xl bg-blue-50 border border-blue-100 p-4 text-sm text-blue-950 leading-relaxed print:p-3 print:text-xs">
              O feedback do curso é formativo e avalia apenas organização e compreensão da resposta. Este certificado não publica nota qualitativa, não substitui documentos legais de SST e não valida a veracidade de fatos individuais narrados nas atividades.
            </div>

            <div className="rounded-2xl border border-gray-100 p-4 text-sm text-gray-600 leading-relaxed print:p-3 print:text-xs">
              Verificação pública: este certificado pode ser conferido pelo código <strong>{certificate.verificationCode}</strong> nesta página. A emissão foi registrada em {certificate.issuedAt.toLocaleDateString('pt-BR')}.
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
