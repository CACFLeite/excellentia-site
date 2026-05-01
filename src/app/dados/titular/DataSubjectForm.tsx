"use client";

import { useState } from 'react';

export default function DataSubjectForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch('/api/lgpd/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(form.entries())),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Erro ao enviar solicitação.');
      setMessage({ type: 'success', text: data.message || 'Solicitação enviada. Confira seu e-mail.' });
      event.currentTarget.reset();
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Erro ao enviar solicitação.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      {message && (
        <div className={`rounded-xl border p-4 text-sm ${message.type === 'success' ? 'border-green-100 bg-green-50 text-green-950' : 'border-red-100 bg-red-50 text-red-950'}`}>
          {message.text}
        </div>
      )}
      <div>
        <label className="block text-sm font-semibold text-slate-800" htmlFor="name">Nome completo</label>
        <input required minLength={3} id="name" name="name" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-800" htmlFor="email">E-mail a verificar</label>
        <input required type="email" id="email" name="email" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-800" htmlFor="cpf">CPF, se aplicável</label>
        <input id="cpf" name="cpf" inputMode="numeric" maxLength={14} placeholder="Opcional; ajuda a restringir a busca" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-800" htmlFor="requestType">Tipo de solicitação</label>
        <select required id="requestType" name="requestType" defaultValue="acesso" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2">
          <option value="acesso">Acesso/exportação dos dados</option>
          <option value="correcao">Correção de dados</option>
          <option value="exclusao">Exclusão, quando juridicamente aplicável</option>
          <option value="portabilidade">Portabilidade</option>
          <option value="informacao">Informações sobre tratamento</option>
          <option value="revogacao">Revogação de consentimento, quando aplicável</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-800" htmlFor="details">Detalhes adicionais</label>
        <textarea id="details" name="details" rows={5} maxLength={2000} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
      </div>
      <button disabled={loading} className="rounded-xl bg-gold px-5 py-3 font-bold text-white hover:bg-gold/90 disabled:opacity-60" type="submit">
        {loading ? 'Enviando...' : 'Enviar solicitação segura'}
      </button>
    </form>
  );
}
