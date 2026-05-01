'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const operatingFlow = [
  'Diagnóstico',
  'Trilhas',
  'Evidências',
  'Documentos',
  'Relatórios',
]

const workstreams = [
  {
    title: 'Soluções para escolas',
    description: 'Treinamentos obrigatórios, PGR, certificados, relatórios e documentação operacional para reduzir improviso e exposição institucional.',
    href: '/escolas',
    cta: 'Conhecer soluções para escolas',
  },
  {
    title: 'Desenvolvimento para professores',
    description: 'Cursos, currículo, processos seletivos, carreira, direitos e saúde profissional para docentes que querem crescer com consistência.',
    href: '/assinatura',
    cta: 'Ver planos para professores',
  },
]

const fronts = [
  'Formação obrigatória e trilhas regulatórias',
  'PGR/GRO e documentação de risco ocupacional',
  'Certificados verificáveis e evidências de conclusão',
  'Canal seguro para comunicação e solicitações LGPD',
  'Desenvolvimento de carreira docente',
]

export default function Home() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name: '' }),
      })
      if (res.ok) {
        setStatus('success')
        setMessage('Cadastro recebido. Avisaremos quando houver nova etapa do app.')
        setEmail('')
      } else {
        throw new Error('Erro ao cadastrar')
      }
    } catch {
      setStatus('error')
      setMessage('Erro ao cadastrar. Tente novamente.')
    }
  }

  return (
    <>
      <section className="bg-navy text-white py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/hero-bg.jpg" alt="" fill className="object-cover object-center" priority />
          <div className="absolute inset-0 bg-navy opacity-[0.88]" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/40" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative grid grid-cols-1 lg:grid-cols-[1.08fr_.92fr] gap-12 items-center">
          <div>
            <div className="inline-block bg-gold-light text-navy text-sm font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wide">
              Educação privada com método, evidência e continuidade
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Formação, carreira e conformidade para a educação privada.
            </h1>
            <p className="text-xl text-gray-200 mb-10 leading-relaxed max-w-3xl">
              A Excellentia conecta desenvolvimento profissional docente, treinamentos obrigatórios e documentação operacional para escolas que querem reduzir improviso e elevar seu padrão institucional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/escolas" className="bg-gold hover:bg-gold-dark text-white font-bold px-8 py-4 rounded-lg text-lg transition-colors text-center">
                Soluções para escolas
              </Link>
              <Link href="/assinatura" className="border-2 border-white text-white hover:bg-white hover:text-navy font-bold px-8 py-4 rounded-lg text-lg transition-colors text-center">
                Planos para professores
              </Link>
            </div>
          </div>

          <div className="bg-white/10 border border-white/20 rounded-3xl p-6 backdrop-blur-sm shadow-2xl">
            <div className="text-sm uppercase tracking-[0.22em] text-gold-light font-bold mb-5">Fluxo operacional</div>
            <div className="space-y-4">
              {operatingFlow.map((step, index) => (
                <div key={step} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold-light text-navy font-extrabold flex items-center justify-center shadow-lg animate-pulse" style={{ animationDelay: `${index * 180}ms`, animationDuration: '2.6s' }}>
                    {index + 1}
                  </div>
                  <div className="flex-1 bg-white/10 border border-white/15 rounded-xl px-4 py-3">
                    <div className="font-bold text-white">{step}</div>
                    <div className="h-1 mt-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gold-light rounded-full" style={{ width: `${42 + index * 12}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-300 mt-6 leading-relaxed">
              Uma plataforma para transformar obrigações e desenvolvimento docente em processos rastreáveis.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {workstreams.map((item) => (
            <div key={item.title} className="rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow bg-white">
              <h2 className="text-2xl font-bold text-navy mb-3">{item.title}</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{item.description}</p>
              <Link href={item.href} className="inline-flex text-gold font-bold hover:text-gold-dark transition-colors">
                {item.cta} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-block bg-gold/10 text-gold font-semibold text-sm px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
              Frentes de atuação
            </div>
            <h2 className="section-title text-left">O que a Excellentia estrutura</h2>
            <p className="section-subtitle text-left">
              A plataforma foi desenhada para integrar formação, conformidade e carreira sem transformar obrigações educacionais em burocracia solta.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {fronts.map((front, index) => (
              <div key={front} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="text-xs text-gold font-bold uppercase tracking-widest mb-3">0{index + 1}</div>
                <p className="text-navy font-semibold leading-snug">{front}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-navy text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-gold-light text-navy text-sm font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wide">
            Plataforma em evolução
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">O app Excellentia está em preparação</h2>
          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
            A próxima etapa reunirá trilhas, evidências, cursos e recursos de desenvolvimento profissional em uma experiência mais contínua para professores e escolas.
          </p>
          {status === 'success' ? (
            <div className="bg-gold/20 border border-gold rounded-xl p-6 max-w-md mx-auto">
              <p className="text-gold-light font-semibold text-lg">{message}</p>
            </div>
          ) : (
            <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Seu melhor e-mail" className="flex-1 px-4 py-3 rounded-lg text-navy placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold" />
              <button type="submit" disabled={status === 'loading'} className="bg-gold hover:bg-gold-dark disabled:opacity-60 text-white font-bold px-6 py-3 rounded-lg transition-colors whitespace-nowrap">
                {status === 'loading' ? 'Enviando...' : 'Quero ser avisado'}
              </button>
            </form>
          )}
          {status === 'error' && <p className="text-red-400 mt-3 text-sm">{message}</p>}
        </div>
      </section>

      <section className="py-20 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Escolas e professores operando com mais clareza.
          </h2>
          <p className="text-gray-600 text-lg mb-10">
            Escolha a porta de entrada mais adequada ao seu momento: estrutura institucional para escolas ou desenvolvimento de carreira para professores.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/escolas" className="bg-navy hover:bg-navy-dark text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors inline-block">
              Soluções para escolas
            </Link>
            <Link href="/assinatura" className="bg-gold hover:bg-gold-dark text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors inline-block">
              Assinatura docente
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
