'use client';

import { use, useEffect, useMemo, useState } from 'react';

type Communication = {
  id: string;
  kind: string;
  category?: string | null;
  message: string;
  status: string;
  identitySealed: boolean;
  hasProtectedIdentity: boolean;
  createdAt: string;
  employee?: null | { fullName: string; email?: string | null; jobTitle?: string | null };
};

const statusOptions = [
  { value: 'new', label: 'Novo' },
  { value: 'triaged', label: 'Triado' },
  { value: 'in_review', label: 'Em análise' },
  { value: 'closed', label: 'Encerrado' },
  { value: 'archived', label: 'Arquivado' },
];

const statusLabels = Object.fromEntries(statusOptions.map((item) => [item.value, item.label]));

export default function ComunicacoesAdminPage({ params }: { params: Promise<{ organizationId: string }> }) {
  const resolvedParams = use(params);
  const [communications, setCommunications] = useState<Communication[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const summary = useMemo(() => {
    return communications.reduce(
      (acc, item) => {
        acc.total += 1;
        if (item.identitySealed) acc.anonymous += 1;
        if (item.status !== 'closed' && item.status !== 'archived') acc.open += 1;
        return acc;
      },
      { total: 0, anonymous: 0, open: 0 },
    );
  }, [communications]);

  async function load() {
    setLoading(true);
    setError(null);
    const response = await fetch(`/api/escolas/${resolvedParams.organizationId}/comunicacoes`, {
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error ?? 'Não foi possível carregar comunicações.');
      setLoading(false);
      return;
    }
    setCommunications(data.communications);
    setLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    const response = await fetch(`/api/escolas/${resolvedParams.organizationId}/comunicacoes`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    if (response.ok) await load();
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedParams.organizationId]);

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-gold">Área interna Excellentia</p>
            <h1 className="text-3xl font-extrabold text-navy mt-2">Comunicados da escola</h1>
            <p className="text-gray-600 mt-2">Triagem de comunicados identificados e anônimos, com proteção de identidade.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={load} disabled={loading} className="bg-navy hover:bg-blue-950 disabled:opacity-50 text-white font-bold px-5 py-2 rounded-lg text-sm">
              {loading ? 'Carregando...' : 'Atualizar'}
            </button>
          </div>
        </div>

        {error && <div className="rounded-xl bg-red-50 border border-red-100 text-red-700 p-4 text-sm">{error}</div>}

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            ['Total', summary.total],
            ['Em aberto', summary.open],
            ['Anônimos/protegidos', summary.anonymous],
          ].map(([label, value]) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-gray-400">{label}</p>
              <p className="text-3xl font-extrabold text-navy mt-2">{value}</p>
            </div>
          ))}
        </section>

        <div className="rounded-2xl bg-blue-50 border border-blue-100 p-5 text-sm text-blue-950 leading-relaxed">
          Relatos marcados como anônimos devem ser tratados sem tentativa de identificação pela escola. Quando houver vínculo interno protegido, ele serve apenas para auditoria, segurança e prevenção de abuso pela operação Excellentia.
        </div>

        <section className="space-y-4">
          {communications.map((item) => (
            <article key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                    {item.kind === 'anonymous' ? 'Anônimo para a escola' : 'Identificado'} · {new Date(item.createdAt).toLocaleString('pt-BR')}
                  </p>
                  <h2 className="text-lg font-bold text-navy mt-2">
                    {item.identitySealed ? 'Identidade protegida' : item.employee?.fullName ?? 'Remetente identificado'}
                  </h2>
                  {item.hasProtectedIdentity && <p className="text-xs text-blue-700 mt-1">Há vínculo interno protegido para auditoria/antiabuso, não exibido aos responsáveis.</p>}
                  {!item.identitySealed && item.employee && <p className="text-xs text-gray-500 mt-1">{item.employee.email} · {item.employee.jobTitle}</p>}
                </div>
                <div className="flex flex-col items-start md:items-end gap-2">
                  <span className="rounded-full bg-gray-100 text-gray-700 px-3 py-1 text-xs font-bold">{statusLabels[item.status] ?? item.status}</span>
                  <select value={item.status} onChange={(event) => updateStatus(item.id, event.target.value)} className="rounded-lg border border-gray-300 px-3 py-2 text-sm">
                    {statusOptions.map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}
                  </select>
                </div>
              </div>
              <p className="mt-5 text-gray-800 leading-relaxed whitespace-pre-line">{item.message}</p>
            </article>
          ))}
          {!communications.length && <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-gray-500">Nenhum comunicado carregado.</div>}
        </section>
      </div>
    </main>
  );
}
