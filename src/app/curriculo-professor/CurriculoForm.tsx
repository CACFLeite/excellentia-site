'use client'

import { useState } from 'react'

export default function CurriculoForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experiencia: '',
    area: '',
    escola: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setStatus('success')
        setMessage('Recebemos seus dados! Entraremos em contato em até 24 horas.')
      } else {
        throw new Error('Erro')
      }
    } catch {
      setStatus('error')
      setMessage('Erro ao enviar. Tente novamente ou entre em contato por email.')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-10 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-2xl font-bold text-navy mb-3">Dados recebidos!</h3>
        <p className="text-gray-600">{message}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 space-y-6">
      <div>
        <label className="block text-sm font-semibold text-navy mb-2">Nome completo *</label>
        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="Seu nome completo"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-navy mb-2">E-mail *</label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="seu@email.com"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-navy mb-2">Tempo de experiência como professor *</label>
        <select
          name="experiencia"
          required
          value={formData.experiencia}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent bg-white"
        >
          <option value="">Selecione</option>
          <option value="menos-1">Menos de 1 ano</option>
          <option value="1-3">1 a 3 anos</option>
          <option value="3-7">3 a 7 anos</option>
          <option value="7-15">7 a 15 anos</option>
          <option value="mais-15">Mais de 15 anos</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-navy mb-2">Área/Disciplina que leciona *</label>
        <input
          type="text"
          name="area"
          required
          value={formData.area}
          onChange={handleChange}
          placeholder="Ex: Matemática, Português, História..."
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-navy mb-2">Escola desejada (tipo ou nome)</label>
        <input
          type="text"
          name="escola"
          value={formData.escola}
          onChange={handleChange}
          placeholder="Ex: Escola bilíngue, Colégio tradicional, Sistema de apostila..."
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
        />
      </div>

      {status === 'error' && (
        <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{message}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-gold hover:bg-yellow-600 disabled:opacity-60 text-white font-bold px-6 py-4 rounded-lg text-lg transition-colors"
      >
        {status === 'loading' ? 'Enviando...' : 'Quero meu currículo profissional →'}
      </button>

      <p className="text-center text-xs text-gray-400">
        Seus dados estão seguros. Não enviamos spam.
      </p>
    </form>
  )
}
