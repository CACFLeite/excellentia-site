'use client'

import Link from 'next/link'
import { useState } from 'react'

const governanceFlow = [
  {
    number: '01',
    eyebrow: 'exigência',
    title: 'Exigência mapeada',
    description: 'Obrigações e riscos deixam de ficar soltos.',
  },
  {
    number: '02',
    eyebrow: 'formação',
    title: 'Formação ativada',
    description: 'Equipes entram em trilhas ligadas à rotina.',
  },
  {
    number: '03',
    eyebrow: 'evidência',
    title: 'Evidência registrada',
    description: 'Certificados e atividades viram rastro auditável.',
  },
  {
    number: '04',
    eyebrow: 'decisão',
    title: 'Decisão orientada',
    description: 'A gestão enxerga lacunas e prioridades.',
  },
  {
    number: '05',
    eyebrow: 'resultado',
    title: 'Governança Visível',
    description: 'Formação, prova e decisão no mesmo fluxo.',
    result: true,
  },
]

const fronts = [
  {
    title: 'Formações',
    eyebrow: 'camada 01',
    role: 'O que a escola implementa',
    description: 'Trilhas e protocolos transformam exigências em prática comum.',
    href: '/formacoes',
    linkLabel: 'Ver formações',
  },
  {
    title: 'Painel da escola',
    eyebrow: 'camada 02',
    role: 'Onde acompanha e comprova',
    description: 'Certificados, atividades e relatórios organizam evidências por escola.',
    href: '/escolas',
    linkLabel: 'Conhecer escolas',
    featured: true,
  },
  {
    title: 'Inteligência Educacional',
    eyebrow: 'camada 03',
    role: 'O repertório que sustenta decisões',
    description: 'Análises curtas ajudam a ler risco, lei e prioridade institucional.',
    href: '/inteligencia-educacional',
    linkLabel: 'Ler inteligência',
  },
]

const operatingNodes = ['Exigência', 'Formação', 'Evidência', 'Decisão']
const governanceLayers = ['Formar equipes', 'Registrar evidências', 'Orientar decisões', 'Reduzir improviso']

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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(244,219,118,.20),transparent_28%),radial-gradient(circle_at_9%_35%,rgba(59,130,246,.13),transparent_25%),linear-gradient(145deg,#06101c_0%,#0a2749_44%,#02060b_100%)]" />
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(244,219,118,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(244,219,118,.07)_1px,transparent_1px)] [background-size:72px_72px]" />
        <svg className="pointer-events-none absolute left-0 top-36 hidden h-[1280px] w-full opacity-70 lg:block" viewBox="0 0 1440 1280" fill="none" aria-hidden="true">
          <path className="excellentia-flow-path" d="M105 470C350 305 525 575 725 440C970 275 1168 435 1260 650C1390 960 1030 1100 835 1225" />
          <path d="M160 555C410 395 560 650 780 520C990 395 1120 550 1175 700" stroke="#f4db76" strokeOpacity=".18" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <div className="absolute left-[7%] top-[31rem] hidden h-[56rem] w-[5px] rounded-full bg-gradient-to-b from-gold-light via-gold to-transparent opacity-60 lg:block" />
        <div className="absolute left-[7%] top-[31rem] hidden h-5 w-5 -translate-x-2 rounded-full bg-gold-light shadow-[0_0_36px_rgba(244,219,118,.9)] lg:block" />

        <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6 lg:px-8 lg:pb-40 lg:pt-28">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1fr_.9fr]">
            <div>
              <div className="mb-6 inline-flex rounded-full border border-gold-light/30 bg-gold-light/10 px-5 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-gold-light">
                Formação, evidência e governança escolar
              </div>
              <h1 className="max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.04em] md:text-6xl lg:text-7xl">
                Governança e compliance para escolas de excelência.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-200 md:text-xl">
                Formação, evidência e leitura estratégica em uma rotina clara para escolas que precisam proteger e comprovar.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link href="/escolas" className="rounded-2xl bg-gold px-8 py-4 text-center text-lg font-extrabold text-white shadow-2xl shadow-gold/20 transition hover:bg-yellow-600">
                  Soluções para escolas
                </Link>
                <Link href="/formacoes" className="rounded-2xl border-2 border-white/55 px-8 py-4 text-center text-lg font-extrabold text-white transition hover:bg-white hover:text-navy">
                  Formações para professores
                </Link>
              </div>
            </div>

            <div className="relative min-h-[520px]">
              <div className="absolute inset-4 rounded-[3.5rem] bg-gold-light/10 blur-3xl" />
              <div className="excellentia-float absolute right-2 top-0 w-[92%] rounded-[2.5rem] border border-white/15 bg-white/[0.07] p-6 shadow-2xl backdrop-blur-md md:p-8">
                <div className="text-xs font-extrabold uppercase tracking-[0.28em] text-gold-light">fluxo de governança educacional</div>
                <p className="mt-2 max-w-md text-sm leading-6 text-slate-300">Exigência, formação, evidência e decisão.</p>
                <div className="relative mt-10 min-h-[260px]">
                  <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-light/30 bg-gold-light/10 shadow-[inset_0_0_52px_rgba(244,219,118,.08),0_0_42px_rgba(244,219,118,.10)]" />
                  <div className="absolute left-1/2 top-1/2 h-3 w-[84%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-gold-light/70 to-transparent" />
                  <div className="relative grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {operatingNodes.map((node, index) => (
                      <div key={node} className={`group flex min-h-[132px] flex-col items-center justify-between rounded-2xl border border-white/10 bg-navy/45 p-4 text-center shadow-lg transition duration-300 hover:-translate-y-1 hover:border-gold-light/35 hover:bg-navy/65 ${index % 2 ? 'translate-y-12' : ''}`}>
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-light text-sm font-black text-navy shadow-[0_0_24px_rgba(244,219,118,.22)]">{index + 1}</span>
                        <span className="text-sm font-extrabold text-white">{node}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="excellentia-float-slow absolute bottom-0 left-0 w-[62%] rounded-[2rem] border border-white/12 bg-[#06101c]/80 p-6 shadow-2xl backdrop-blur-md">
                <div className="text-xs font-black uppercase tracking-[0.22em] text-gold-light">jornada conectada</div>
                <p className="mt-3 text-sm leading-6 text-slate-300">Prioridades, formação e comprovação em uma só leitura.</p>
              </div>
            </div>
          </div>

          <div className="mt-24 lg:ml-20">
            <div className="mb-10 max-w-5xl">
              <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-gold-light">governança em movimento</div>
              <h2 className="max-w-5xl text-3xl font-black tracking-[-0.03em] text-white md:text-5xl">
                Da exigência dispersa à Governança Visível.
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 md:text-lg">
                Uma esteira única: exigência, formação, evidência e decisão passam a revelar a mesma operação.
              </p>
            </div>

            <div className="relative py-4 md:py-8 lg:py-12">
              <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-gold-light/0 via-gold-light/70 to-gold-light/0 lg:block" />
              <div className="pointer-events-none absolute left-6 top-0 h-full w-px bg-gradient-to-b from-gold-light/0 via-gold-light/65 to-gold-light/0 lg:hidden" />
              <div className="pointer-events-none absolute right-0 top-8 hidden h-32 w-80 rounded-full bg-gold-light/10 blur-3xl lg:block" />

              <div className="relative grid grid-cols-1 gap-10 pl-16 lg:grid-cols-5 lg:gap-8 lg:pl-0">
                {governanceFlow.map((step) => {
                  const isResult = step.result
                  return (
                    <div key={step.title} className="relative lg:min-h-[220px]">
                      <div className={`absolute -left-16 top-0 flex h-12 w-12 items-center justify-center rounded-full border text-xs font-black shadow-[0_0_28px_rgba(244,219,118,.18)] lg:static lg:mb-8 lg:h-14 lg:w-14 ${isResult ? 'border-gold-light bg-gold-light text-navy' : 'border-white/18 bg-[#06101c] text-gold-light'}`}>
                        {step.number}
                      </div>

                      <div className="max-w-xs lg:max-w-[13rem]">
                        <div className={`text-[10px] font-black uppercase tracking-[0.22em] ${isResult ? 'text-gold-light' : 'text-slate-400'}`}>{step.eyebrow}</div>
                        <h3 className={`mt-3 font-black leading-tight tracking-[-0.03em] ${isResult ? 'text-2xl text-white' : 'text-xl text-white'}`}>{step.title}</h3>
                        <p className="mt-3 text-sm leading-6 text-slate-300">{step.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f7f4ec] py-24">
        <div className="absolute left-[7%] top-0 hidden h-full w-[5px] rounded-full bg-gradient-to-b from-gold via-gold/60 to-navy/20 opacity-60 lg:block" />
        <div className="absolute right-[-8rem] top-20 h-80 w-80 rounded-full bg-gold/20 blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl lg:ml-20">
            <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-gold">ecossistema excellentia</div>
            <h2 className="text-3xl font-black tracking-[-0.03em] text-navy md:text-5xl">
              Uma plataforma, três camadas integradas.
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              A escola não precisa escolher entre aprender, comprovar ou decidir melhor. As três camadas operam juntas.
            </p>
          </div>

          <div className="relative mt-16 overflow-hidden rounded-[2.75rem] border border-slate-200 bg-white p-6 shadow-2xl md:p-10 lg:ml-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(244,219,118,.16),transparent_34%),linear-gradient(135deg,rgba(10,39,73,.04),transparent_45%)]" />
            <div className="absolute left-8 top-16 hidden h-[calc(100%-8rem)] w-px bg-gradient-to-b from-gold/10 via-gold/60 to-gold/10 md:left-1/2 md:block lg:left-10 lg:right-10 lg:top-[8.8rem] lg:h-px lg:w-auto lg:bg-gradient-to-r" />

            <div className="relative grid grid-cols-1 gap-5 md:gap-7 lg:grid-cols-3">
              {fronts.map((front, index) => {
                const featured = front.featured
                return (
                  <div key={front.title} className={`relative rounded-[2rem] border p-7 transition duration-300 ${featured ? 'border-gold/40 bg-navy text-white shadow-2xl shadow-navy/20 lg:-translate-y-4' : 'border-slate-100 bg-slate-50/80 text-navy'}`}>
                    <div className={`mb-7 flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-black shadow-lg ${featured ? 'bg-gold-light text-navy' : 'bg-white text-gold ring-1 ring-slate-200'}`}>
                      {index + 1}
                    </div>
                    <div className={`text-xs font-black uppercase tracking-[0.24em] ${featured ? 'text-gold-light' : 'text-gold'}`}>{front.eyebrow}</div>
                    <h3 className={`mt-3 text-2xl font-black ${featured ? 'text-white' : 'text-navy'}`}>{front.title}</h3>
                    <p className={`mt-2 text-sm font-extrabold ${featured ? 'text-slate-200' : 'text-slate-500'}`}>{front.role}</p>
                    <p className={`mt-5 leading-7 ${featured ? 'text-slate-300' : 'text-slate-600'}`}>{front.description}</p>
                    <Link href={front.href} className={`mt-7 inline-flex text-sm font-extrabold transition hover:translate-x-1 ${featured ? 'text-gold-light' : 'text-gold'}`}>
                      {front.linkLabel} →
                    </Link>
                  </div>
                )
              })}
            </div>

            <div className="relative mt-12 flex flex-col items-start justify-between gap-5 rounded-[2rem] border border-gold/20 bg-[#f7f4ec] p-6 md:flex-row md:items-center">
              <div>
                <div className="text-xs font-black uppercase tracking-[0.24em] text-gold">caminho principal</div>
                <p className="mt-2 max-w-2xl text-lg font-black leading-7 text-navy">
                  Para gestores, o ponto de entrada é a escola: dali vêm formação, evidência e leitura institucional.
                </p>
              </div>
              <Link href="/escolas" className="w-full rounded-2xl bg-gold px-7 py-4 text-center font-black text-white shadow-xl shadow-gold/20 transition hover:bg-yellow-600 md:w-auto">
                Conhecer solução para escolas
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy py-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(244,219,118,.18),transparent_30%)]" />
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
          <div>
            <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-gold-light">operação institucional</div>
            <h2 className="text-3xl font-black tracking-[-0.03em] md:text-5xl">Presença digital alinhada à operação real.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Formação, evidência e leitura institucional para avançar sem burocracia solta.
            </p>
          </div>
          <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.07] p-8 shadow-2xl backdrop-blur">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {governanceLayers.map((item, index) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 transition duration-300 hover:-translate-y-1 hover:border-gold-light/30">
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-gold-light text-sm font-black text-navy">{index + 1}</div>
                  <p className="font-bold">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-gold">acompanhe a Excellentia</div>
          <h2 className="text-3xl font-black tracking-[-0.03em] text-navy md:text-5xl">Receba atualizações da Excellentia.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Novidades sobre formações, governança escolar e inteligência institucional.
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
