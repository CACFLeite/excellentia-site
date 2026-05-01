'use client';

import { useState } from 'react';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.error ?? 'Não foi possível entrar.');
      setLoading(false);
      return;
    }

    window.location.href = '/admin';
  }

  return (
    <main className="min-h-screen bg-navy flex items-center justify-center px-4 py-12">
      <form onSubmit={submit} className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <p className="text-sm font-bold uppercase tracking-wide text-gold mb-2">Excellentia</p>
        <h1 className="text-2xl font-extrabold text-navy mb-2">Acesso administrativo</h1>
        <p className="text-sm text-gray-600 mb-6">Entre para operar escolas, colaboradores, relatórios e comunicados.</p>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Senha administrativa</span>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" autoFocus required />
        </label>

        {error && <p className="mt-4 rounded-xl bg-red-50 border border-red-100 text-red-700 p-3 text-sm">{error}</p>}

        <button disabled={loading} className="mt-6 w-full bg-gold hover:bg-yellow-600 disabled:opacity-50 text-white font-bold py-3 rounded-lg text-sm">
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </main>
  );
}
