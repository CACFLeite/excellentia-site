'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type InviteData = {
  invitationId: string;
  status: string;
  organization: { id: string; name: string; slug: string };
  employee: { id: string; fullName: string; email?: string | null; cpf?: string | null; jobTitle?: string | null } | null;
  expiresAt: string;
};

function formatCpf(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  return digits
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1-$2');
}

export default function InviteActivation({ token }: { token?: string }) {
  const [invite, setInvite] = useState<InviteData | null>(null);
  const [form, setForm] = useState({ fullName: '', email: '', cpf: '', jobTitle: '', privacyAccepted: false });
  const [loading, setLoading] = useState(Boolean(token));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    async function loadInvite() {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/escolas/convites/${token}`);
      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? 'Convite inválido ou expirado.');
        setLoading(false);
        return;
      }

      setInvite(data);
      setForm({
        fullName: data.employee?.fullName ?? '',
        email: data.employee?.email ?? '',
        cpf: data.employee?.cpf ? formatCpf(data.employee.cpf) : '',
        jobTitle: data.employee?.jobTitle ?? '',
        privacyAccepted: false,
      });
      setLoading(false);
    }

    loadInvite();
  }, [token]);

  async function activate() {
    if (!token) return;
    setSaving(true);
    setError(null);

    const response = await fetch(`/api/escolas/convites/${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.error ?? 'Não foi possível ativar o convite.');
      setSaving(false);
      return;
    }

    window.location.href = `/cursos/nr1-escolas?convite=${encodeURIComponent(token)}`;
  }

  if (!token) return null;

  if (loading) {
    return <div className="bg-white rounded-2xl p-8 shadow-xl text-center text-gray-600">Validando convite...</div>;
  }

  if (error || !invite) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-xl">
        <h2 className="text-navy font-bold text-lg mb-3">Não conseguimos validar seu convite</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">{error}</p>
        <button onClick={() => window.history.back()} className="block w-full bg-navy hover:bg-blue-950 text-white font-bold py-3 rounded-lg text-center transition-colors text-sm mb-3">
          Voltar
        </button>
        <Link href="/contato" className="block w-full bg-gold hover:bg-yellow-600 text-white font-bold py-3 rounded-lg text-center transition-colors text-sm">
          Pedir ajuda
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl">
      <p className="text-xs font-bold uppercase tracking-wide text-gold mb-2">Convite encontrado</p>
      <h2 className="text-navy font-bold text-xl mb-2">{invite.organization.name}</h2>
      <p className="text-gray-600 text-sm leading-relaxed mb-6">
        Confirme seus dados para liberar o curso NR-1. O certificado usará essas informações.
      </p>

      {invite.status === 'accepted' ? (
        <Link href={`/cursos/nr1-escolas?convite=${encodeURIComponent(token)}`} className="block w-full bg-gold hover:bg-yellow-600 text-white font-bold py-3 rounded-lg text-center transition-colors text-sm mb-6">
          Continuar curso
        </Link>
      ) : null}

      {invite.status !== 'accepted' && <div className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Nome completo</span>
          <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" required />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-gray-700">E-mail</span>
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-gray-700">CPF</span>
          <input value={form.cpf} onChange={(e) => setForm({ ...form, cpf: formatCpf(e.target.value) })} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" inputMode="numeric" placeholder="000.000.000-00" required />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Função/cargo</span>
          <input value={form.jobTitle} onChange={(e) => setForm({ ...form, jobTitle: e.target.value })} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
        </label>
        <label className="flex gap-3 rounded-xl bg-gray-50 border border-gray-100 p-4 text-sm text-gray-700 leading-relaxed">
          <input type="checkbox" checked={form.privacyAccepted} onChange={(e) => setForm({ ...form, privacyAccepted: e.target.checked })} className="mt-1 h-4 w-4 text-gold border-gray-300 rounded" />
          <span>
            Declaro que li e compreendi que meus dados serão tratados para liberar acesso ao curso, registrar progresso, respostas e emitir certificado, conforme a <Link href="/privacidade" className="text-gold font-bold hover:underline" target="_blank">Política de Privacidade</Link>. O link de acesso é individual e sensível.
          </span>
        </label>
      </div>}

      {error && <p className="text-sm text-red-600 mt-4">{error}</p>}

      {invite.status !== 'accepted' && <button onClick={activate} disabled={saving || !form.fullName.trim() || form.cpf.replace(/\D/g, '').length !== 11 || !form.privacyAccepted} className="mt-6 block w-full bg-gold hover:bg-yellow-600 disabled:opacity-50 text-white font-bold py-3 rounded-lg text-center transition-colors text-sm">
        {saving ? 'Ativando...' : 'Ativar acesso e iniciar curso'}
      </button>}

      <button type="button" onClick={() => window.history.back()} className="mt-3 block w-full bg-white border border-gray-200 hover:border-gold text-navy font-bold py-3 rounded-lg text-center transition-colors text-sm">
        Voltar
      </button>
    </div>
  );
}
