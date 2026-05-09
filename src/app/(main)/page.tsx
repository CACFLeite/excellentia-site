'use client'

import Link from 'next/link'
import { useState } from 'react'

const maturitySteps = [
  {
    number: '01',
    label: 'Diagnóstico',
    title: 'Risco disperso',
    description: 'Exigências legais, formações, evidências e responsabilidades deixam de ficar espalhadas pela rotina da escola.',
  },
  {
    number: '02',
    label: 'Método',
    title: 'Formação conectada',
    description: 'Trilhas regulatórias, protocolos e certificações passam a seguir uma jornada compreensível para gestão e equipe.',
  },
  {
    number: '03',
    label: 'Governança',
    title: 'Evidência visível',
    description: 'Direção e coordenação ganham leitura de progresso, lacunas e próximos passos para agir com mais segurança.',
  },
]

const operatingSignals = [
  'NR-1',
  'Lei Lucas',
  'LGPD',
  'PGR/GRO',
]

const fronts = [
  {
    title: 'Formações',
    eyebrow: 'aprender',
    description: 'Trilhas de conformidade e desenvolvimento com linguagem aplicável à rotina escolar.',
    href: '/formacoes',
  },
  {
    title: 'Escolas',
    eyebrow: 'comprovar',
    description: 'Certificados, registros, relatórios e documentação para sustentar decisões institucionais.',
    href: '/escolas',
  },
  {
    title: 'Inteligência Educacional',
    eyebrow: 'orientar',
    description: 'Análises e guias para transformar legislação, risco e gestão em leitura estratégica.',
    href: '/inteligencia-educacional',
  },
]

const evidenceRows = [
  { label: 'Trilhas regulatórias', value: '78%' },
  { label: 'Evidências registradas', value: '64%' },
  { label: 'Protocolos orientados', value: '86%' },
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
      <section className="relative overflow-hidden bg-[#06101c] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(244,219,118,0.18),transparent_28%),radial-gradient(circle_at_12%_72%,rgba(59,130,246,0.14),transparent_26%),linear-gradient(135deg,#06101c_0%,#0a2749_48%,#02060b_100%)]" />
        <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(244,219,118,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(244,219,118,.07)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute left-[7%] top-[30rem] hidden h-[75rem] w-[5px] rounded-full bg-gradient-to-b from-gold-light via-gold to-transparent opacity-70 lg:block" />
        <div className="absolute left-[7%] top-[30rem] hidden h-5 w-5 -translate-x-2 rounded-full bg-gold-light shadow-[0_0_36px_rgba(244,219,118,.9)] lg:block" />

        <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6 lg:px-8 lg:pb-32 lg:pt-28">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_.92fr]">
            <div>
              <div className="mb-6 inline-flex rounded-full border border-gold-light/30 bg-gold-light/10 px-5 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-gold-light">
                Não é mais um catálogo de cursos. É uma operação.
              </div>
              <h1 className="max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.04em] md:text-6xl lg:text-7xl">
                Governança e compliance para escolas de excelência.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-200 md:text-xl">
                Formações, protocolos, evidências e leitura estratégica conectados em uma rotina institucional clara para escolas que precisam formar, comprovar e proteger.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link href="/escolas" className="rounded-2xl bg-gold px-8 py-4 text-center text-lg font-extrabold text-white shadow-2xl shadow-gold/20 transition hover:bg-yellow-600">
                  Conhecer escolas
                </Link>
                <Link href="/formacoes" className="rounded-2xl border-2 border-white/55 px-8 py-4 text-center text-lg font-extrabold text-white transition hover:bg-white hover:text-navy">
                  Ver formações
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-[3rem] bg-gold-light/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.075] p-6 shadow-2xl backdrop-blur-md md:p-8">
                <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-6">
                  <div>
                    <div className="text-xs font-extrabold uppercase tracking-[0.28em] text-gold-light">Sistema de maturidade escolar</div>
                    <p className="mt-2 text-sm leading-6 text-slate-300">Leitura visual da escola: formação, risco, evidência e acompanhamento.</p>
                  </div>
                  <div className="rounded-2xl bg-emerald-400/15 px-4 py-2 text-sm font-bold text-emerald-200">ativo</div>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-[.72fr_1fr]">
                  <div className="flex aspect-square items-center justify-center rounded-full border border-gold-light/35 bg-gold-light/10 shadow-[inset_0_0_40px_rgba(244,219,118,.08)]">
                    <div className="text-center">
                      <div className="text-5xl font-black text-gold-light">72%</div>
                      <div className="mt-1 text-xs font-bold uppercase tracking-[0.24em] text-slate-300">evidências</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {evidenceRows.map((row, index) => (
                      <div key={row.label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="font-semibold text-slate-100">{row.label}</span>
                          <span className="font-extrabold text-gold-light">{row.value}</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-white/10">
                          <div className="h-full rounded-full bg-gold-light transition-all duration-700" style={{ width: row.value, opacity: 0.74 + index * 0.08 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {operatingSignals.map((signal) => (
                    <div key={signal} className="rounded-2xl border border-white/10 bg-navy/40 px-4 py-4 text-center text-sm font-extrabold text-white">
                      {signal}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-20 grid grid-cols-1 gap-5 lg:ml-20 lg:grid-cols-3">
            {maturitySteps.map((step, index) => (
              <div key={step.title} className={`relative rounded-[2rem] border p-7 shadow-2xl transition duration-500 hover:-translate-y-1 ${index === 0 ? 'border-white/12 bg-white/[0.08] text-white' : 'border-slate-200 bg-white text-navy'}`}>
                <div className="mb-5 flex items-center justify-between">
                  <span className={`text-xs font-black uppercase tracking-[0.24em] ${index === 0 ? 'text-gold-light' : 'text-gold'}`}>{step.label}</span>
                  <span className={`text-2xl font-black ${index === 0 ? 'text-white/30' : 'text-navy/15'}`}>{step.number}</span>
                </div>
                <h2 className="text-2xl font-black">{step.title}</h2>
                <p className={`mt-4 leading-7 ${index === 0 ? 'text-slate-300' : 'text-slate-600'}`}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f7f4ec] py-24">
        <div className="absolute left-[7%] top-0 hidden h-full w-[5px] rounded-full bg-gradient-to-b from-gold via-gold/60 to-navy/20 opacity-60 lg:block" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl lg:ml-20">
            <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-gold">As frentes não ficam isoladas</div>
            <h2 className="text-3xl font-black tracking-[-0.03em] text-navy md:text-5xl">
              Formações, escolas e inteligência aparecem como partes do mesmo sistema.
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Em vez de uma vitrine genérica de serviços, a home apresenta uma engrenagem: aprender, comprovar, orientar e amadurecer a gestão escolar.
            </p>
          </div>

          <div className="relative mt-16 rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-2xl md:p-10 lg:ml-20">
            <div className="absolute left-[11%] right-[11%] top-[7.2rem] hidden h-[3px] bg-gradient-to-r from-gold/10 via-gold to-gold/10 md:block" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {fronts.map((front, index) => (
                <Link key={front.title} href={front.href} className="group relative rounded-[2rem] border border-slate-100 bg-slate-50 p-7 transition duration-300 hover:-translate-y-1 hover:border-gold/35 hover:bg-white hover:shadow-xl">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-navy text-2xl font-black text-gold-light shadow-lg">
                    {index + 1}
                  </div>
                  <div className="text-xs font-black uppercase tracking-[0.24em] text-gold">{front.eyebrow}</div>
                  <h3 className="mt-3 text-2xl font-black text-navy">{front.title}</h3>
                  <p className="mt-4 leading-7 text-slate-600">{front.description}</p>
                  <span className="mt-6 inline-flex font-extrabold text-gold transition group-hover:translate-x-1">Entrar →</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy py-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(244,219,118,.18),transparent_30%)]" />
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
          <div>
            <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-gold-light">Plataforma em evolução</div>
            <h2 className="text-3xl font-black tracking-[-0.03em] md:text-5xl">A sofisticação está no fluxo, não no enfeite.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              A Excellentia organiza formação, evidência e leitura institucional para que a escola avance por etapas — sem transformar compliance em burocracia solta.
            </p>
          </div>
          <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.07] p-8 shadow-2xl backdrop-blur">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {['Formar equipes', 'Registrar evidências', 'Orientar decisões', 'Reduzir improviso'].map((item, index) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                  <div className="mb-4 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-gold-light" style={{ width: `${55 + index * 12}%` }} />
                  </div>
                  <p className="font-bold">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-gold">Próximas etapas</div>
          <h2 className="text-3xl font-black tracking-[-0.03em] text-navy md:text-5xl">Receba novidades da Excellentia.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            A próxima etapa reunirá formações, evidências e recursos de gestão em uma experiência mais contínua para escolas e professores.
          </p>
          {status === 'success' ? (
            <div className="mx-auto mt-10 max-w-md rounded-2xl border border-gold bg-gold/10 p-6">
              <p className="text-lg font-bold text-navy">{message}</p>
            </div>
          ) : (
            <form onSubmit={handleWaitlist} className="mx-auto mt-10 flex max-w-lg flex-col gap-3 sm:flex-row">
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Seu melhor e-mail" className="flex-1 rounded-2xl border border-slate-200 px-5 py-4 text-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold" />
              <button type="submit" disabled={status === 'loading'} className="rounded-2xl bg-gold px-7 py-4 font-black text-white transition hover:bg-yellow-600 disabled:opacity-60">
                {status === 'loading' ? 'Enviando...' : 'Quero ser avisado'}
              </button>
            </form>
          )}
          {status === 'error' && <p className="mt-3 text-sm text-red-600">{message}</p>}
        </div>
      </section>
    </>
  )
}
