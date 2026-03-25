'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

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
        setMessage('Ótimo! Você está na lista. Avisaremos quando o app for lançado.')
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
      {/* Hero Section */}
      <section className="bg-navy text-white py-20 md:py-32 relative overflow-hidden">
        {/* Imagem de fundo com opacidade */}
        <div className="absolute inset-0">
          <Image
            src="/hero-bg.jpg"
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
          {/* Overlay navy com opacidade para legibilidade */}
          <div className="absolute inset-0 bg-navy opacity-80" />
          {/* Gradiente sutil para reforçar o lado do texto */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/70 to-transparent" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <div className="inline-block bg-gold text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wide">
              Para professores e escolas que levam a educação a sério
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Profissionalizar{' '}
              <span className="text-gold-light">a educação.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              Para professores que querem crescer. Para escolas que querem parar de improvisar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/assinatura"
                className="bg-gold hover:bg-yellow-600 text-white font-bold px-8 py-4 rounded-lg text-lg transition-colors text-center"
              >
                Começar agora — R$69/mês
              </Link>
              <Link
                href="/cursos"
                className="border-2 border-white text-white hover:bg-white hover:text-navy font-bold px-8 py-4 rounded-lg text-lg transition-colors text-center"
              >
                Ver cursos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title">O que você vai encontrar aqui</h2>
            <p className="section-subtitle">
              Três pilares que nenhuma licenciatura ensina — mas que todo professor precisa dominar.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎯',
                title: 'Carreira',
                description:
                  'Currículo profissional, processos seletivos, entrevistas, aula teste. Como se posicionar e conquistar as melhores escolas.',
                color: 'border-gold',
              },
              {
                icon: '⚖️',
                title: 'Direitos',
                description:
                  'NR1, Lei Lucas, Política de Salvaguarda. O que a escola é obrigada a cumprir — e o que você precisa saber para se proteger.',
                color: 'border-navy',
              },
              {
                icon: '🧠',
                title: 'Saúde',
                description:
                  'Saúde emocional do professor: burnout, limites, autocuidado. Ensinar bem começa por cuidar de si mesmo.',
                color: 'border-gold',
              },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className={`bg-white border-t-4 ${pillar.color} rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow`}
              >
                <div className="text-5xl mb-4">{pillar.icon}</div>
                <h3 className="text-2xl font-bold text-navy mb-3">{pillar.title}</h3>
                <p className="text-gray-600 leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Caio Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-block bg-gold/10 text-gold font-semibold text-sm px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
                Quem está por trás da Excellentia
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
                17 anos dentro da sala de aula
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Sou <strong className="text-navy">Caio Leite</strong>, professor há 17 anos na rede privada de São Paulo. Vi de perto tudo o que nenhuma faculdade te prepara: processos seletivos, currículos errados, professores sem direitos básicos, saúde emocional esgotada.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                Criei a Excellentia porque o professor merece ser tratado como profissional — com ferramentas, conhecimento e suporte real para construir uma carreira sólida.
              </p>
              <Link
                href="/sobre"
                className="border-2 border-navy text-navy hover:bg-navy hover:text-white font-semibold px-6 py-3 rounded-lg transition-colors inline-block"
              >
                Conhecer minha história
              </Link>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative w-72 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/caio-hero.jpg"
                  alt="Caio Leite — Fundador da Excellentia"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 288px, 320px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Waitlist Section */}
      <section className="py-20 bg-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-gold text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wide">
            🚀 Em breve
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            O app está chegando
          </h2>
          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
            O aplicativo Excellentia vai trazer todo o conteúdo no seu celular, com trilhas personalizadas, conquistas e comunidade de professores. Cadastre-se para ser avisado em primeira mão.
          </p>
          {status === 'success' ? (
            <div className="bg-gold/20 border border-gold rounded-xl p-6 max-w-md mx-auto">
              <p className="text-gold-light font-semibold text-lg">✓ {message}</p>
            </div>
          ) : (
            <form
              onSubmit={handleWaitlist}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu melhor e-mail"
                className="flex-1 px-4 py-3 rounded-lg text-navy placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-gold hover:bg-yellow-600 disabled:opacity-60 text-white font-bold px-6 py-3 rounded-lg transition-colors whitespace-nowrap"
              >
                {status === 'loading' ? 'Enviando...' : 'Quero ser avisado'}
              </button>
            </form>
          )}
          {status === 'error' && (
            <p className="text-red-400 mt-3 text-sm">{message}</p>
          )}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Pronto para dar o próximo passo na sua carreira?
          </h2>
          <p className="text-gray-600 text-lg mb-10">
            Acesse todos os cursos, conteúdos e recursos por apenas R$69/mês. Cancele quando quiser.
          </p>
          <Link
            href="/assinatura"
            className="bg-gold hover:bg-yellow-600 text-white font-extrabold px-10 py-5 rounded-xl text-xl transition-colors inline-block shadow-lg hover:shadow-xl"
          >
            Assinar agora — R$69/mês
          </Link>
          <p className="text-sm text-gray-400 mt-4">Garantia de 7 dias. Sem fidelidade.</p>
        </div>
      </section>
    </>
  )
}
