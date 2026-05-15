'use client'

import { useState } from 'react'

export default function ContatoForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    assunto: '',
    mensagem: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setStatus('success')
        setMessage('Mensagem enviada com sucesso! Responderemos em até 24 horas úteis.')
        setFormData({ name: '', email: '', assunto: '', mensagem: '' })
      } else {
        throw new Error('Erro')
      }
    } catch {
      setStatus('error')
      setMessage('Erro ao enviar. Tente novamente ou envie direto para atendimento@excellentia-edu.com')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-[2rem] border border-gold/25 bg-white/70 p-8 text-center shadow-sm shadow-navy/5">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold-light text-sm font-extrabold text-navy">OK</div>
        <h3 className="mb-3 text-2xl font-black text-navy">Mensagem enviada</h3>
        <p className="text-slate-600">{message}</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 font-extrabold text-gold transition-colors hover:text-gold-dark"
        >
          Enviar outra mensagem
        </button>
      </div>
    )
  }

  const fieldClass = 'w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-navy shadow-sm shadow-navy/5 outline-none transition focus:border-gold focus:ring-4 focus:ring-gold/15'
  const labelClass = 'mb-2 block text-sm font-extrabold text-navy'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Nome *</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Seu nome"
            className={fieldClass}
          />
        </div>
        <div>
          <label className={labelClass}>E-mail *</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="seu@email.com"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Assunto *</label>
        <select
          name="assunto"
          required
          value={formData.assunto}
          onChange={handleChange}
          className={fieldClass}
        >
          <option value="">Selecione o assunto</option>
          <option value="duvida-curso">Dúvida sobre cursos</option>
          <option value="assinatura">Assinatura e pagamento</option>
          <option value="curriculo">Serviço de currículo</option>
          <option value="parceria">Parceria ou colaboração</option>
          <option value="outro">Outro</option>
        </select>
      </div>

      <div>
        <label className={labelClass}>Mensagem *</label>
        <textarea
          name="mensagem"
          required
          value={formData.mensagem}
          onChange={handleChange}
          rows={5}
          placeholder="Escreva sua mensagem..."
          className={`${fieldClass} resize-y`}
        />
      </div>

      {status === 'error' && (
        <p className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{message}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full rounded-2xl bg-gold px-6 py-4 text-lg font-black text-white shadow-xl shadow-gold/15 transition hover:bg-yellow-600 disabled:opacity-60"
      >
        {status === 'loading' ? 'Enviando...' : 'Enviar mensagem →'}
      </button>
    </form>
  )
}
