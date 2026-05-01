'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type InviteData = {
  organization: { name: string };
  employee: { fullName: string; email?: string | null } | null;
};

export default function CommunicationClient({ token }: { token?: string }) {
  const [invite, setInvite] = useState<InviteData | null>(null);
  const [formData, setFormData] = useState({ inviteCode: '', message: '', category: 'anonymous', name: '', email: '' });
  const [loading, setLoading] = useState(Boolean(token));
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (!token) return;

    async function loadInvite() {
      const response = await fetch(`/api/escolas/convites/${token}`);
      const data = await response.json();
      if (response.ok) {
        setInvite(data);
        setFormData((previous) => ({
          ...previous,
          name: data.employee?.fullName ?? '',
          email: data.employee?.email ?? '',
        }));
      } else {
        setNotice({ type: 'error', text: data.error ?? 'Convite inválido ou expirado.' });
      }
      setLoading(false);
    }

    loadInvite();
  }, [token]);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setSending(true);
    setNotice(null);

    const payload = token
      ? { inviteToken: token, message: formData.message, category: formData.category, name: formData.name, email: formData.email }
      : formData;

    const response = await fetch('/api/comunicacao', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    if (!response.ok) {
      setNotice({ type: 'error', text: data.error ?? 'Não foi possível enviar.' });
      setSending(false);
      return;
    }

    setNotice({ type: 'success', text: data.message ?? 'Comunicado enviado com sucesso.' });
    setFormData((previous) => ({ ...previous, message: '' }));
    setSending(false);
  }

  if (loading) {
    return <div className="bg-white p-8 rounded-lg shadow-xl text-center text-gray-600">Validando acesso...</div>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl">
      <h1 className="text-3xl font-extrabold text-center text-navy mb-4">Canal de Comunicação Excellentia</h1>
      {invite ? (
        <p className="text-center text-gray-600 mb-8">
          Envio vinculado à escola <strong>{invite.organization.name}</strong>. Você pode optar por se identificar ou preservar sua identidade dos responsáveis da escola.
        </p>
      ) : (
        <p className="text-center text-gray-600 mb-8">Envie sugestões, dúvidas ou comunicados para a direção da escola.</p>
      )}

      {notice && (
        <div className={`py-3 px-6 rounded-md mb-6 text-center ${notice.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {notice.text}
        </div>
      )}

      <form onSubmit={submit} className="space-y-6">
        {!token && (
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Código da escola</span>
            <input value={formData.inviteCode} onChange={(event) => setFormData({ ...formData, inviteCode: event.target.value })} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" required />
          </label>
        )}

        <fieldset>
          <legend className="text-sm font-medium text-gray-700 mb-2">Tipo de envio</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className={`rounded-xl border p-4 cursor-pointer ${formData.category === 'anonymous' ? 'border-gold bg-yellow-50' : 'border-gray-200'}`}>
              <input type="radio" className="sr-only" checked={formData.category === 'anonymous'} onChange={() => setFormData({ ...formData, category: 'anonymous' })} />
              <span className="font-bold text-navy">Anônimo para a escola</span>
              <span className="block text-xs text-gray-600 mt-1">A identidade não aparece para os responsáveis. A plataforma guarda o mínimo necessário para auditoria/antiabuso.</span>
            </label>
            <label className={`rounded-xl border p-4 cursor-pointer ${formData.category === 'identified' ? 'border-gold bg-yellow-50' : 'border-gray-200'}`}>
              <input type="radio" className="sr-only" checked={formData.category === 'identified'} onChange={() => setFormData({ ...formData, category: 'identified' })} />
              <span className="font-bold text-navy">Identificado</span>
              <span className="block text-xs text-gray-600 mt-1">Seu nome/e-mail podem ser encaminhados aos responsáveis pela tratativa.</span>
            </label>
          </div>
        </fieldset>

        {formData.category === 'identified' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Nome</span>
              <input value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" required />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">E-mail</span>
              <input type="email" value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" required />
            </label>
          </div>
        )}

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Mensagem</span>
          <textarea value={formData.message} onChange={(event) => setFormData({ ...formData, message: event.target.value })} className="mt-1 w-full min-h-40 rounded-xl border border-gray-300 p-4 text-sm" required />
        </label>

        <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 text-xs text-blue-950 leading-relaxed">
          Este canal não substitui atendimento emergencial, denúncia a autoridade competente ou medida jurídica urgente. Ele serve para registro e encaminhamento institucional responsável.
        </div>

        <button type="submit" disabled={sending || !formData.message.trim()} className="w-full bg-gold hover:bg-yellow-600 disabled:opacity-50 text-white font-bold py-3 rounded-lg text-sm">
          {sending ? 'Enviando...' : 'Enviar comunicado'}
        </button>
      </form>

      {token && (
        <p className="text-center mt-5 text-sm text-gray-500">
          <Link href={`/cursos/nr1-escolas?convite=${token}`} className="text-gold font-bold hover:underline">Voltar ao curso NR-1</Link>
        </p>
      )}
    </div>
  );
}
