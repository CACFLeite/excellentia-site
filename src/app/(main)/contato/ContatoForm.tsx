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
      <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-10 text-center">
        <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-green-100 text-green-700 font-extrabold flex items-center justify-center">OK</div>
        <h3 className="text-2xl font-bold text-navy mb-3">Mensagem enviada</h3>
        <p className="text-gray-600">{message}</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 text-gold hover:text-gold-dark font-semibold transition-colors"
        >
          Enviar outra mensagem
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-navy mb-2">Nome *</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Seu nome"
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
      </div>

      <div>
        <label className="block text-sm font-semibold text-navy mb-2">Assunto *</label>
        <select
          name="assunto"
          required
          value={formData.assunto}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent bg-white"
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
        <label className="block text-sm font-semibold text-navy mb-2">Mensagem *</label>
        <textarea
          name="mensagem"
          required
          value={formData.mensagem}
          onChange={handleChange}
          rows={5}
          placeholder="Escreva sua mensagem..."
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent resize-vertical"
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
        {status === 'loading' ? 'Enviando...' : 'Enviar mensagem →'}
      </button>
    </form>
  )
}
