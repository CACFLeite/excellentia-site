'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function AdminSecurityPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const response = await fetch('/api/admin/password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
    });
    const data = await response.json().catch(() => ({}));

    setLoading(false);

    if (!response.ok) {
      setError(data.error ?? 'Não foi possível trocar a senha.');
      return;
    }

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setSuccess('Senha administrativa alterada. Use a nova senha nos próximos acessos.');
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <Link href="/admin" className="text-sm font-bold text-gold hover:text-yellow-700">← Voltar ao painel</Link>

        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-gold">Segurança</p>
          <h1 className="text-3xl font-extrabold text-navy mt-2">Trocar senha administrativa</h1>
          <p className="text-gray-600 mt-2 leading-relaxed">
            Use esta tela para rotacionar a senha do painel sem mexer diretamente nas variáveis do Vercel.
            A senha nova passa a valer para os próximos logins.
          </p>
        </div>

        <form onSubmit={submit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Senha atual</span>
            <input type="password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" required autoComplete="current-password" />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Nova senha</span>
            <input type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" required minLength={16} autoComplete="new-password" />
            <span className="block text-xs text-gray-500 mt-1">Mínimo de 16 caracteres, com maiúsculas, minúsculas e números.</span>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Confirmar nova senha</span>
            <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" required minLength={16} autoComplete="new-password" />
          </label>

          {error && <p className="rounded-xl bg-red-50 border border-red-100 text-red-700 p-3 text-sm">{error}</p>}
          {success && <p className="rounded-xl bg-green-50 border border-green-100 text-green-700 p-3 text-sm">{success}</p>}

          <button disabled={loading} className="w-full bg-gold hover:bg-yellow-600 disabled:opacity-50 text-white font-bold py-3 rounded-lg text-sm">
            {loading ? 'Alterando...' : 'Trocar senha'}
          </button>
        </form>

        <section className="rounded-2xl bg-amber-50 border border-amber-100 p-5 text-sm text-amber-950 leading-relaxed">
          Observação: esta rotação altera a senha operacional armazenada no banco. O segredo de sessão do Vercel continua sendo uma camada separada; se houver suspeita de sessão comprometida, ainda vale rotacionar também o segredo de sessão no Vercel.
        </section>
      </div>
    </main>
  );
}
