'use client';

import { useEffect, useState } from 'react';

type Dashboard = {
  organization: { id: string; name: string; slug: string; status: string; employeeLimit?: number | null };
  summary: {
    employeeCount: number;
    activeCount: number;
    invitedCount: number;
    completedCount: number;
    completionPercent: number;
    totalActivities: number;
    communicationCount: number;
    pgrCount: number;
  };
  employees: Array<{
    id: string;
    fullName: string;
    email?: string | null;
    jobTitle?: string | null;
    unitName?: string | null;
    status: string;
    invitationStatus?: string | null;
    answeredCount: number;
    totalActivities: number;
    progressPercent: number;
    courseStatus: string;
    certificate?: null | { verificationCode: string; issuedAt: string; status: string };
  }>;
  communications: Array<{ id: string; kind: string; category?: string | null; message: string; status: string; createdAt: string }>;
  pgrDocuments: Array<{ id: string; status: string; createdAt: string; updatedAt: string; signedAt?: string | null; signedBy?: string | null }>;
};

export default function PainelEscolaPage({ params }: { params: { organizationId: string } }) {
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [inviteLinks, setInviteLinks] = useState<Record<string, string>>({});
  const [inviteMessages, setInviteMessages] = useState<Record<string, string>>({});

  async function load() {
    setLoading(true);
    setError(null);
    const response = await fetch(`/api/escolas/${params.organizationId}/painel`, {
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.error ?? 'Não foi possível carregar o painel.');
      setLoading(false);
      return;
    }

    setDashboard(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.organizationId]);

  function hasValidEmail(email?: string | null) {
    return Boolean(email && /^\S+@\S+\.\S+$/.test(email));
  }

  async function resendInvite(employeeId: string, sendEmail = false) {
    setError(null);
    setInviteMessages((current) => ({ ...current, [employeeId]: sendEmail ? 'Enviando e-mail...' : 'Gerando link...' }));
    const response = await fetch(`/api/escolas/${params.organizationId}/convites/${employeeId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sendEmail }),
    });
    const data = await response.json();
    if (!response.ok) {
      const message = data.error ?? 'Não foi possível gerar novo convite.';
      setError(message);
      setInviteMessages((current) => ({ ...current, [employeeId]: message }));
      return;
    }
    setInviteLinks((current) => ({ ...current, [employeeId]: data.invitationUrl }));
    if (sendEmail) {
      const message = data.emailResult?.sent
        ? 'E-mail enviado.'
        : (data.emailResult?.error ?? 'Convite gerado, mas o e-mail não foi enviado.');
      setInviteMessages((current) => ({ ...current, [employeeId]: message }));
      if (!data.emailResult?.sent) setError(message);
    } else {
      setInviteMessages((current) => ({ ...current, [employeeId]: 'Link gerado.' }));
    }
    await load();
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-gold">Área interna Excellentia</p>
            <h1 className="text-3xl font-extrabold text-navy mt-2">Painel da escola</h1>
            <p className="text-gray-600 mt-2">Acompanhamento inicial de colaboradores, NR-1, comunicados e PGR.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => window.history.back()} className="bg-white border border-gray-200 hover:border-gold text-navy font-bold px-5 py-2 rounded-lg text-sm">
              Voltar
            </button>
            <button onClick={load} disabled={loading} className="bg-navy hover:bg-blue-950 disabled:opacity-50 text-white font-bold px-5 py-2 rounded-lg text-sm">
              {loading ? 'Carregando...' : 'Atualizar painel'}
            </button>
          </div>
        </div>

        {error && <div className="rounded-xl bg-red-50 border border-red-100 text-red-700 p-4 text-sm">{error}</div>}

        {dashboard && (
          <>
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-navy">{dashboard.organization.name}</h2>
                  <p className="text-sm text-gray-500 mt-1">{dashboard.organization.slug} · {dashboard.organization.status}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a href={`/admin/escolas/importacao?organizationId=${dashboard.organization.id}`} className="bg-white border border-gray-200 hover:border-gold text-navy font-bold px-4 py-2 rounded-lg text-sm">Colaboradores</a>
                  <a href={`/admin/escolas/${dashboard.organization.id}/relatorios/nr1`} className="bg-white border border-gray-200 hover:border-gold text-navy font-bold px-4 py-2 rounded-lg text-sm">Relatório NR-1</a>
                  <a href={`/admin/escolas/${dashboard.organization.id}/comunicacoes`} className="bg-white border border-gray-200 hover:border-gold text-navy font-bold px-4 py-2 rounded-lg text-sm">Comunicações</a>
                  <a href={`/pgr/formulario?organizationId=${dashboard.organization.id}`} className="bg-gold hover:bg-yellow-600 text-white font-bold px-4 py-2 rounded-lg text-sm">Criar PGR</a>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                ['Colaboradores', dashboard.summary.employeeCount],
                ['Ativos', dashboard.summary.activeCount],
                ['Convites pendentes', dashboard.summary.invitedCount],
                ['Concluíram NR-1', dashboard.summary.completedCount],
                ['Conclusão', `${dashboard.summary.completionPercent}%`],
              ].map(([label, value]) => (
                <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400">{label}</p>
                  <p className="text-3xl font-extrabold text-navy mt-2">{value}</p>
                </div>
              ))}
            </section>

            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-xl font-bold text-navy mb-4">Colaboradores</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left border-b border-gray-200">
                      <th className="py-2 pr-4">Nome</th>
                      <th className="py-2 pr-4">Cargo</th>
                      <th className="py-2 pr-4">Unidade</th>
                      <th className="py-2 pr-4">Convite</th>
                      <th className="py-2 pr-4">NR-1</th>
                      <th className="py-2 pr-4">Certificado</th>
                      <th className="py-2 pr-4">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboard.employees.map((employee) => (
                      <tr key={employee.id} className="border-b border-gray-100">
                        <td className="py-3 pr-4">
                          <p className="font-medium text-navy">{employee.fullName}</p>
                          <p className="text-xs text-gray-500">{employee.email}</p>
                        </td>
                        <td className="py-3 pr-4">{employee.jobTitle}</td>
                        <td className="py-3 pr-4">{employee.unitName}</td>
                        <td className="py-3 pr-4">{employee.invitationStatus ?? '-'}</td>
                        <td className="py-3 pr-4">{employee.answeredCount}/{employee.totalActivities} · {employee.progressPercent}%</td>
                        <td className="py-3 pr-4">
                          {employee.certificate ? <a href={`/certificados/${employee.certificate.verificationCode}`} className="text-gold font-bold hover:underline">{employee.certificate.verificationCode}</a> : '-'}
                        </td>
                        <td className="py-3 pr-4 min-w-64">
                          <div className="flex flex-wrap gap-2">
                            <button onClick={() => resendInvite(employee.id)} className="bg-white border border-gray-200 hover:border-gold text-navy font-bold px-3 py-2 rounded-lg text-xs">Gerar link</button>
                            <button onClick={() => resendInvite(employee.id, true)} disabled={!hasValidEmail(employee.email)} title={!hasValidEmail(employee.email) ? 'Cadastre um e-mail válido para enviar.' : undefined} className="bg-navy hover:bg-blue-950 disabled:opacity-50 text-white font-bold px-3 py-2 rounded-lg text-xs">Enviar por e-mail</button>
                            {inviteLinks[employee.id] && (
                              <button onClick={() => navigator.clipboard?.writeText(inviteLinks[employee.id])} className="bg-gold hover:bg-yellow-600 text-white font-bold px-3 py-2 rounded-lg text-xs">Copiar link</button>
                            )}
                          </div>
                          {inviteMessages[employee.id] && <p className="mt-2 text-xs text-gray-600">{inviteMessages[employee.id]}</p>}
                          {!hasValidEmail(employee.email) && <p className="mt-2 text-xs text-red-700">E-mail inválido ou ausente. Gere/copiei o link ou corrija o cadastro.</p>}
                          {inviteLinks[employee.id] && <a href={inviteLinks[employee.id]} className="block mt-2 text-xs text-gold break-all hover:underline">{inviteLinks[employee.id]}</a>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-xl font-bold text-navy mb-4">Comunicados recentes</h2>
                <div className="space-y-3">
                  {dashboard.communications.length ? dashboard.communications.map((item) => (
                    <div key={item.id} className="border border-gray-100 rounded-xl p-4">
                      <p className="text-xs font-bold uppercase tracking-wide text-gray-400">{item.kind} · {item.status}</p>
                      <p className="text-sm text-gray-700 mt-2 line-clamp-3">{item.message}</p>
                    </div>
                  )) : <p className="text-sm text-gray-500">Nenhum comunicado ainda.</p>}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-navy">PGR</h2>
                    <p className="text-xs text-gray-500 mt-1">Inventário de riscos e plano de ação NR-1.</p>
                  </div>
                  {dashboard && (
                    <a href={`/pgr/formulario?organizationId=${dashboard.organization.id}`} className="bg-gold hover:bg-yellow-600 text-white font-bold px-3 py-2 rounded-lg text-xs whitespace-nowrap">Criar PGR</a>
                  )}
                </div>
                <div className="space-y-3">
                  {dashboard.pgrDocuments.length ? dashboard.pgrDocuments.map((item) => (
                    <div key={item.id} className="border border-gray-100 rounded-xl p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-medium text-navy">{item.status}</p>
                        <a href={`/admin/pgr/${item.id}`} className="text-xs font-bold text-gold hover:underline">Abrir</a>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Atualizado em {new Date(item.updatedAt).toLocaleString('pt-BR')}</p>
                    </div>
                  )) : <p className="text-sm text-gray-500">Nenhum PGR salvo ainda.</p>}
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
