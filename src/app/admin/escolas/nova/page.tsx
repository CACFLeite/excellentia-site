'use client';

import { useState } from 'react';
import Link from 'next/link';

type CreatedOrganization = {
  id: string;
  name: string;
  slug: string;
};

function formatCnpj(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 14);
  return digits
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');
}

function isValidCnpj(value: string) {
  const cnpj = value.replace(/\D/g, '');
  if (!cnpj) return true;
  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;
  const calc = (base: string, weights: number[]) => {
    const sum = weights.reduce((acc, weight, index) => acc + Number(base[index]) * weight, 0);
    const mod = sum % 11;
    return mod < 2 ? 0 : 11 - mod;
  };
  return (
    calc(cnpj.slice(0, 12), [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]) === Number(cnpj[12]) &&
    calc(cnpj.slice(0, 13), [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]) === Number(cnpj[13])
  );
}

export default function NovaEscolaPage() {
  const [form, setForm] = useState({
    name: '',
    legalName: '',
    document: '',
    employeeLimit: '',
    mainUnitName: 'Sede',
    city: '',
    state: '',
    billingEmail: '',
    billingAddress: '',
    responsibleName: '',
    responsibleEmail: '',
  });
  const [created, setCreated] = useState<CreatedOrganization | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setCreated(null);

    if (!isValidCnpj(form.document)) {
      setError('CNPJ inválido. Confira o número antes de criar a escola.');
      setLoading(false);
      return;
    }

    const response = await fetch('/api/escolas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.error ?? 'Não foi possível criar escola.');
      setLoading(false);
      return;
    }

    setCreated(data.organization);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-gold">Área interna Excellentia</p>
            <h1 className="text-3xl font-extrabold text-navy mt-2">Cadastrar escola</h1>
            <p className="text-gray-600 mt-2">Cria a organização, sede/unidade principal, responsável e dados fiscais para NF.</p>
          </div>
          <Link href="/admin/escolas" className="text-sm font-bold text-gold hover:underline">Ver escolas cadastradas</Link>
        </div>

        <form onSubmit={submit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
          <section>
            <h2 className="text-lg font-bold text-navy mb-4">Dados comerciais e fiscais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block md:col-span-2">
                <span className="text-sm font-medium text-gray-700">Nome comercial da escola</span>
                <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" required />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Razão social para NF</span>
                <input value={form.legalName} onChange={(event) => setForm({ ...form, legalName: event.target.value })} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">CNPJ</span>
                <input value={form.document} onChange={(event) => setForm({ ...form, document: formatCnpj(event.target.value) })} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="00.000.000/0000-00" inputMode="numeric" />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">E-mail financeiro/NF</span>
                <input type="email" value={form.billingEmail} onChange={(event) => setForm({ ...form, billingEmail: event.target.value })} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Limite/faixa de colaboradores</span>
                <input type="number" value={form.employeeLimit} onChange={(event) => setForm({ ...form, employeeLimit: event.target.value })} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
              </label>
              <label className="block md:col-span-2">
                <span className="text-sm font-medium text-gray-700">Endereço fiscal para NF</span>
                <input value={form.billingAddress} onChange={(event) => setForm({ ...form, billingAddress: event.target.value })} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="Rua, número, bairro, cidade/UF, CEP" />
              </label>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy mb-4">Sede/unidade principal</h2>
            <p className="text-sm text-gray-600 mb-4">Isso é relevante para escolas com mais de uma unidade e para separar colaboradores por local. Se for uma escola única, use “Sede”.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Nome da unidade</span>
                <input value={form.mainUnitName} onChange={(event) => setForm({ ...form, mainUnitName: event.target.value })} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Cidade</span>
                <input value={form.city} onChange={(event) => setForm({ ...form, city: event.target.value })} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">UF</span>
                <input value={form.state} onChange={(event) => setForm({ ...form, state: event.target.value.toUpperCase().slice(0, 2) })} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" maxLength={2} />
              </label>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy mb-4">Responsável inicial</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Nome</span>
                <input value={form.responsibleName} onChange={(event) => setForm({ ...form, responsibleName: event.target.value })} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">E-mail</span>
                <input type="email" value={form.responsibleEmail} onChange={(event) => setForm({ ...form, responsibleEmail: event.target.value })} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
              </label>
            </div>
          </section>

          {error && <p className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl p-3">{error}</p>}

          <button disabled={loading} className="bg-gold hover:bg-yellow-600 disabled:opacity-50 text-white font-bold px-5 py-3 rounded-xl text-sm">
            {loading ? 'Criando...' : 'Criar escola'}
          </button>
        </form>

        {created && (
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <p className="text-xs font-bold uppercase tracking-wide text-gold mb-2">Escola criada</p>
            <h2 className="text-2xl font-extrabold text-navy">{created.name}</h2>
            <div className="mt-4 rounded-xl bg-gray-50 border border-gray-100 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-1">ID da escola/organização</p>
              <p className="font-mono text-sm text-navy break-all">{created.id}</p>
            </div>
            <p className="text-sm text-gray-500 mt-3">slug: {created.slug}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={`/admin/escolas/importacao?organizationId=${created.id}`} className="bg-navy hover:bg-blue-950 text-white font-bold px-5 py-3 rounded-xl text-sm">Importar colaboradores</Link>
              <Link href={`/admin/escolas/${created.id}/painel`} className="bg-gold hover:bg-yellow-600 text-white font-bold px-5 py-3 rounded-xl text-sm">Abrir painel</Link>
              <Link href="/admin/escolas" className="bg-white border border-gray-200 hover:border-gold text-navy font-bold px-5 py-3 rounded-xl text-sm">Ver escolas</Link>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
