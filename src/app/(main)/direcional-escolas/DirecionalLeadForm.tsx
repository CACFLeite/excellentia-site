'use client'

import { FormEvent, useState } from 'react'

type FormState = {
  name: string
  email: string
  phone: string
  school: string
  role: string
  priority: string
}

const initialState: FormState = {
  name: '',
  email: '',
  phone: '',
  school: '',
  role: '',
  priority: '',
}

const priorityOptions = [
  'Governança e evidências institucionais',
  'NR-1 e riscos psicossociais',
  'Formações obrigatórias',
  'LGPD, proteção e registros',
  'Ainda quero entender o melhor caminho',
]

export default function DirecionalLeadForm() {
  const [form, setForm] = useState<FormState>(initialState)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/campaigns/direcional-escolas/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const payload = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(payload.error || 'Não foi possível enviar seus dados.')

      setStatus('success')
      setMessage('Recebemos seus dados. A Renata pode seguir a conversa diretamente com a escola.')
      setForm(initialState)
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Não foi possível enviar seus dados.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/12 bg-white/[0.07] p-6 shadow-2xl backdrop-blur md:p-8">
      <div className="mb-6">
        <div className="text-xs font-black uppercase tracking-[0.24em] text-gold-light">diagnóstico inicial</div>
        <h2 className="mt-3 text-2xl font-black text-white md:text-3xl">Converse sobre a governança da sua escola.</h2>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          Envie os dados principais para a Excellentia entender o contexto e indicar o próximo passo.
        </p>
        <p className="mt-2 text-xs leading-5 text-slate-400">
          Os dados ficam registrados para a campanha Direcional e geram aviso interno para acompanhamento comercial.
        </p>
      </div>

      <div className="grid gap-4">
        <label className="grid gap-2 text-sm font-bold text-white">
          Nome
          <input
            required
            value={form.name}
            onChange={(event) => update('name', event.target.value)}
            className="min-h-12 rounded-2xl border border-white/14 bg-white/10 px-4 text-white outline-none transition placeholder:text-slate-400 focus:border-gold-light/70"
            placeholder="Seu nome"
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-white">
            E-mail
            <input
              required
              type="email"
              value={form.email}
              onChange={(event) => update('email', event.target.value)}
              className="min-h-12 rounded-2xl border border-white/14 bg-white/10 px-4 text-white outline-none transition placeholder:text-slate-400 focus:border-gold-light/70"
              placeholder="nome@escola.com.br"
            />
          </label>

          <label className="grid gap-2 text-sm font-bold text-white">
            WhatsApp
            <input
              required
              value={form.phone}
              onChange={(event) => update('phone', event.target.value)}
              className="min-h-12 rounded-2xl border border-white/14 bg-white/10 px-4 text-white outline-none transition placeholder:text-slate-400 focus:border-gold-light/70"
              placeholder="(00) 00000-0000"
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-white">
            Escola
            <input
              required
              value={form.school}
              onChange={(event) => update('school', event.target.value)}
              className="min-h-12 rounded-2xl border border-white/14 bg-white/10 px-4 text-white outline-none transition placeholder:text-slate-400 focus:border-gold-light/70"
              placeholder="Nome da instituição"
            />
          </label>

          <label className="grid gap-2 text-sm font-bold text-white">
            Cargo
            <input
              value={form.role}
              onChange={(event) => update('role', event.target.value)}
              className="min-h-12 rounded-2xl border border-white/14 bg-white/10 px-4 text-white outline-none transition placeholder:text-slate-400 focus:border-gold-light/70"
              placeholder="Direção, mantenedora, coordenação..."
            />
          </label>
        </div>

        <label className="grid gap-2 text-sm font-bold text-white">
          Principal prioridade agora
          <select
            value={form.priority}
            onChange={(event) => update('priority', event.target.value)}
            className="min-h-12 rounded-2xl border border-white/14 bg-[#102f52] px-4 text-white outline-none transition focus:border-gold-light/70"
          >
            <option value="">Selecione uma opção</option>
            {priorityOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="mt-6 min-h-12 w-full rounded-2xl bg-gold px-5 py-3 text-base font-black text-white shadow-lg shadow-gold/20 transition hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'loading' ? 'Enviando...' : 'Solicitar conversa institucional'}
      </button>

      {message && (
        <p className={`mt-4 rounded-2xl border px-4 py-3 text-sm font-semibold ${status === 'success' ? 'border-emerald-300/30 bg-emerald-400/10 text-emerald-100' : 'border-red-300/30 bg-red-400/10 text-red-100'}`}>
          {message}
        </p>
      )}
    </form>
  )
}
