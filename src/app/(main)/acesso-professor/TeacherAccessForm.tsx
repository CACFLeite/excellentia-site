'use client'

import { useState } from 'react'

export default function TeacherAccessForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setMessage(null)
    setError(null)

    const response = await fetch('/api/professor/auth/request-link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    const payload = await response.json().catch(() => ({}))
    setLoading(false)

    if (!response.ok) {
      setError(payload.error ?? 'Não foi possível solicitar o acesso.')
      return
    }

    setMessage('Se houver assinatura ativa para este e-mail, enviaremos um link de acesso. Confira também spam e promoções.')
  }

  return (
    <form onSubmit={submit} className="mt-8 rounded-[2rem] border border-gold-light/35 bg-white/[0.07] p-6 shadow-2xl backdrop-blur-md">
      <label htmlFor="teacher-email" className="text-sm font-black uppercase tracking-[0.2em] text-gold-light">
        Já sou assinante
      </label>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          id="teacher-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="seu@email.com"
          className="min-h-14 flex-1 rounded-2xl border border-white/15 bg-white px-4 text-base font-semibold text-navy outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/40"
        />
        <button
          type="submit"
          disabled={loading}
          className="min-h-14 rounded-2xl bg-gold px-7 font-black text-white transition hover:bg-yellow-600 disabled:opacity-60"
        >
          {loading ? 'Enviando...' : 'Enviar link de acesso'}
        </button>
      </div>
      {message && <p className="mt-4 text-sm font-semibold leading-6 text-gold-light">{message}</p>}
      {error && <p className="mt-4 text-sm font-semibold leading-6 text-red-200">{error}</p>}
    </form>
  )
}
