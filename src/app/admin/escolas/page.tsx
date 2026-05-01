'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Organization = {
  id: string;
  name: string;
  legalName?: string | null;
  document?: string | null;
  slug: string;
  status: string;
  employeeLimit?: number | null;
  mainUnit?: { name: string; city?: string | null; state?: string | null } | null;
  counts: { employees: number; communications: number; certificates: number };
  createdAt: string;
};

function formatCnpj(value?: string | null) {
  const digits = (value ?? '').replace(/\D/g, '');
  if (digits.length !== 14) return value ?? '-';
  return digits.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
}

export default function EscolasPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    const response = await fetch(`/api/escolas${search ? `?search=${encodeURIComponent(search)}` : ''}`);
    const data = await response.json();
    if (!response.ok) {
      setError(data.error ?? 'Não foi possível carregar escolas.');
      setLoading(false);
      return;
    }
    setOrganizations(data.organizations ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-gold">Área interna Excellentia</p>
            <h1 className="text-3xl font-extrabold text-navy mt-2">Escolas cadastradas</h1>
            <p className="text-gray-600 mt-2">Encontre escolas já criadas e continue a implantação.</p>
          </div>
          <Link href="/admin/escolas/nova" className="bg-gold hover:bg-yellow-600 text-white font-bold px-5 py-3 rounded-xl text-sm">Cadastrar nova escola</Link>
        </div>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col md:flex-row gap-3">
          <input value={search} onChange={(event) => setSearch(event.target.value)} className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="Buscar por nome, razão social, CNPJ ou slug" />
          <button onClick={load} disabled={loading} className="bg-navy hover:bg-blue-950 disabled:opacity-50 text-white font-bold px-5 py-2 rounded-lg text-sm">{loading ? 'Buscando...' : 'Buscar'}</button>
        </section>

        {error && <div className="rounded-xl bg-red-50 border border-red-100 text-red-700 p-4 text-sm">{error}</div>}

        <section className="space-y-4">
          {organizations.map((organization) => (
            <article key={organization.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-navy">{organization.name}</h2>
                  <p className="text-sm text-gray-500 mt-1">{organization.legalName || 'Sem razão social'} · {formatCnpj(organization.document)}</p>
                  <p className="text-xs text-gray-500 mt-2 font-mono break-all">ID: {organization.id}</p>
                  <p className="text-xs text-gray-500 mt-1">Unidade principal: {organization.mainUnit?.name ?? '-'} {organization.mainUnit?.city ? `· ${organization.mainUnit.city}/${organization.mainUnit.state ?? ''}` : ''}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link href={`/admin/escolas/importacao?organizationId=${organization.id}`} className="bg-navy hover:bg-blue-950 text-white font-bold px-4 py-2 rounded-xl text-sm">Importar</Link>
                  <Link href={`/admin/escolas/${organization.id}/painel`} className="bg-gold hover:bg-yellow-600 text-white font-bold px-4 py-2 rounded-xl text-sm">Painel</Link>
                  <Link href={`/admin/escolas/${organization.id}/comunicacoes`} className="bg-white border border-gray-200 hover:border-gold text-navy font-bold px-4 py-2 rounded-xl text-sm">Comunicados</Link>
                  <Link href={`/admin/escolas/${organization.id}/relatorios/nr1`} className="bg-white border border-gray-200 hover:border-gold text-navy font-bold px-4 py-2 rounded-xl text-sm">Relatório</Link>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
                <div className="rounded-xl bg-gray-50 p-3"><p className="font-bold text-navy">{organization.counts.employees}</p><p className="text-xs text-gray-500">colaboradores</p></div>
                <div className="rounded-xl bg-gray-50 p-3"><p className="font-bold text-navy">{organization.counts.certificates}</p><p className="text-xs text-gray-500">certificados</p></div>
                <div className="rounded-xl bg-gray-50 p-3"><p className="font-bold text-navy">{organization.counts.communications}</p><p className="text-xs text-gray-500">comunicados</p></div>
              </div>
            </article>
          ))}

          {!organizations.length && !loading && <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-gray-500">Nenhuma escola encontrada.</div>}
        </section>
      </div>
    </main>
  );
}
