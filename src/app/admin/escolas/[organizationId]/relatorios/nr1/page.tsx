'use client';

import { use, useEffect, useState } from 'react';

type Report = {
  organization: { name: string; slug: string };
  course: { title: string };
  generatedAt: string;
  summary: { employeeCount: number; totalActivities: number; completedCount: number; completionPercent: number; averageProgress: number };
  lessons: Array<{ order: number; title: string; responseCount: number; responsePercent: number; feedbackLevels: Record<string, number> }>;
  employees: Array<{ fullName: string; jobTitle?: string | null; unitName?: string | null; answeredCount: number; totalActivities: number; progressPercent: number; completed: boolean; certificateCode?: string | null }>;
  communications: Array<{ kind: string; status: string; count: number }>;
  institutionalNotes: string[];
};

export default function RelatorioNR1Page({ params }: { params: Promise<{ organizationId: string }> }) {
  const resolvedParams = use(params);
  const [report, setReport] = useState<Report | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    setError(null);
    const response = await fetch(`/api/escolas/${resolvedParams.organizationId}/relatorios/nr1`, {
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.error ?? 'Não foi possível gerar relatório.');
      setLoading(false);
      return;
    }

    setReport(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedParams.organizationId]);

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 print:hidden">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-gold">Área interna Excellentia</p>
            <h1 className="text-3xl font-extrabold text-navy mt-2">Relatório agregado NR-1</h1>
            <p className="text-gray-600 mt-2">Resumo institucional de participação, progresso, certificados, comunicações e pontos de atenção.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={load} disabled={loading} className="bg-navy hover:bg-blue-950 disabled:opacity-50 text-white font-bold px-5 py-2 rounded-lg text-sm">
              {loading ? 'Gerando...' : 'Gerar relatório'}
            </button>
            <button onClick={() => window.print()} disabled={!report} className="bg-gold hover:bg-yellow-600 disabled:opacity-50 text-white font-bold px-5 py-2 rounded-lg text-sm">
              Imprimir/PDF
            </button>
          </div>
        </div>

        {error && <div className="rounded-xl bg-red-50 border border-red-100 text-red-700 p-4 text-sm print:hidden">{error}</div>}

        {report && (
          <article className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden print:shadow-none print:border-0">
            <section className="bg-navy text-white p-8 md:p-10">
              <p className="text-sm font-bold uppercase tracking-wide text-gold mb-3">{report.organization.name}</p>
              <h2 className="text-3xl md:text-4xl font-extrabold">{report.course.title}</h2>
              <p className="text-gray-300 mt-3">Gerado em {new Date(report.generatedAt).toLocaleString('pt-BR')}</p>
            </section>

            <section className="p-8 md:p-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[
                  ['Colaboradores', report.summary.employeeCount],
                  ['Atividades', report.summary.totalActivities],
                  ['Certificados', report.summary.completedCount],
                  ['Conclusão', `${report.summary.completionPercent}%`],
                  ['Progresso médio', `${report.summary.averageProgress}%`],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-gray-50 border border-gray-100 p-5">
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-400">{label}</p>
                    <p className="text-3xl font-extrabold text-navy mt-2">{value}</p>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-xl font-bold text-navy mb-4">Participação por aula</h3>
                <div className="space-y-3">
                  {report.lessons.map((lesson) => (
                    <div key={lesson.order} className="rounded-2xl border border-gray-100 p-5">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <p className="font-bold text-navy">Aula {String(lesson.order).padStart(2, '0')} · {lesson.title}</p>
                        <p className="text-sm text-gray-600">{lesson.responseCount} respostas · {lesson.responsePercent}%</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Feedbacks: {Object.entries(lesson.feedbackLevels).map(([level, count]) => `${level}: ${count}`).join(' · ') || 'sem respostas'}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-navy mb-4">Colaboradores</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="text-left border-b border-gray-200">
                        <th className="py-2 pr-4">Nome</th>
                        <th className="py-2 pr-4">Cargo</th>
                        <th className="py-2 pr-4">Unidade</th>
                        <th className="py-2 pr-4">Progresso</th>
                        <th className="py-2 pr-4">Certificado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {report.employees.map((employee) => (
                        <tr key={employee.fullName} className="border-b border-gray-100">
                          <td className="py-3 pr-4 font-medium text-navy">{employee.fullName}</td>
                          <td className="py-3 pr-4">{employee.jobTitle ?? '-'}</td>
                          <td className="py-3 pr-4">{employee.unitName ?? '-'}</td>
                          <td className="py-3 pr-4">{employee.answeredCount}/{employee.totalActivities} · {employee.progressPercent}%</td>
                          <td className="py-3 pr-4">{employee.certificateCode ? <a href={`/certificados/${employee.certificateCode}`} className="text-gold font-bold hover:underline">{employee.certificateCode}</a> : '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-navy mb-4">Comunicações e denúncias</h3>
                {report.communications.length ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {report.communications.map((item) => (
                      <div key={`${item.kind}-${item.status}`} className="rounded-2xl bg-gray-50 border border-gray-100 p-5">
                        <p className="text-xs font-bold uppercase tracking-wide text-gray-400">{item.kind} · {item.status}</p>
                        <p className="text-3xl font-extrabold text-navy mt-2">{item.count}</p>
                      </div>
                    ))}
                  </div>
                ) : <p className="text-sm text-gray-500">Nenhuma comunicação registrada no período.</p>}
              </div>

              <div className="rounded-2xl bg-blue-50 border border-blue-100 p-5">
                <h3 className="font-bold text-blue-950 mb-2">Notas institucionais</h3>
                <ul className="list-disc pl-5 text-sm text-blue-950 space-y-1">
                  {report.institutionalNotes.map((note) => <li key={note}>{note}</li>)}
                </ul>
              </div>
            </section>
          </article>
        )}
      </div>
    </main>
  );
}
