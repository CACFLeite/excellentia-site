'use client'

import Link from 'next/link'
import { useState } from 'react'

const journeyCards = [
  {
    number: '01',
    eyebrow: 'entrada',
    title: 'Risco disperso',
    description: 'Exigências legais, formações, documentos e responsabilidades deixam de competir entre si na rotina da escola.',
    tone: 'dark',
  },
  {
    number: '02',
    eyebrow: 'método',
    title: 'Formação conectada',
    description: 'Trilhas, protocolos e registros passam a seguir uma jornada compreensível para gestão, coordenação e equipe.',
    tone: 'light',
  },
  {
    number: '03',
    eyebrow: 'saída',
    title: 'Governança visível',
    description: 'A escola enxerga lacunas, próximos passos e evidências sem depender de improviso ou memória informal.',
    tone: 'light',
  },
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

            <div className="relative min-h-[520px]">
              <div className="absolute inset-4 rounded-[3.5rem] bg-gold-light/10 blur-3xl" />
              <div className="excellentia-float absolute right-2 top-0 w-[92%] rounded-[2.5rem] border border-white/15 bg-white/[0.07] p-6 shadow-2xl backdrop-blur-md md:p-8">
                <div className="text-xs font-extrabold uppercase tracking-[0.28em] text-gold-light">fluxo de governança educacional</div>
                <p className="mt-2 max-w-md text-sm leading-6 text-slate-300">Da exigência à formação, da formação à evidência, da evidência à decisão.</p>
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
                <p className="mt-3 text-sm leading-6 text-slate-300">Representação visual de método. Sem métrica simulada, sem dado fictício.</p>
              </div>
            </div>
          </div>

          <div className="mt-24 lg:ml-20">
            <div className="mb-8 max-w-5xl">
              <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-gold-light">a página passa a ter um eixo</div>
              <h2 className="max-w-5xl text-3xl font-black tracking-[-0.03em] text-white md:text-5xl">
                O visitante acompanha uma escola saindo do risco difuso para uma operação clara.
              </h2>
            </div>

            <div className="relative min-h-[560px] lg:min-h-[340px]">
              {journeyCards.map((card, index) => {
                const dark = card.tone === 'dark'
                const positions = [
                  'lg:absolute lg:left-0 lg:top-8',
                  'lg:absolute lg:left-[31%] lg:top-36',
                  'lg:absolute lg:right-0 lg:top-0',
                ]
                return (
                  <div key={card.title} className={`mb-6 w-full rounded-[2rem] border p-8 shadow-2xl transition duration-500 hover:-translate-y-1 lg:mb-0 lg:w-[31rem] ${positions[index]} ${dark ? 'border-white/12 bg-white/[0.08] text-white backdrop-blur' : 'border-slate-200 bg-white text-navy'}`}>
                    <div className="mb-6 flex items-center justify-between">
                      <span className={`text-xs font-black uppercase tracking-[0.24em] ${dark ? 'text-gold-light' : 'text-gold'}`}>{card.eyebrow}</span>
                      <span className={`text-3xl font-black ${dark ? 'text-white/25' : 'text-navy/15'}`}>{card.number}</span>
                    </div>
                    <h3 className="text-3xl font-black">{card.title}</h3>
                    <p className={`mt-5 leading-7 ${dark ? 'text-slate-300' : 'text-slate-600'}`}>{card.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f7f4ec] py-24">
        <div className="absolute left-[7%] top-0 hidden h-full w-[5px] rounded-full bg-gradient-to-b from-gold via-gold/60 to-navy/20 opacity-60 lg:block" />
        <div className="absolute right-[-8rem] top-20 h-80 w-80 rounded-full bg-gold/20 blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl lg:ml-20">
            <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-gold">As três frentes não ficam isoladas</div>
            <h2 className="text-3xl font-black tracking-[-0.03em] text-navy md:text-5xl">
              Formações, escolas e inteligência aparecem como partes do mesmo sistema.
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Em vez de “cards de serviços”, a página mostra uma engrenagem: aprender, comprovar, orientar e amadurecer.
            </p>
          </div>

          <div className="relative mt-16 rounded-[2.75rem] border border-slate-200 bg-white p-6 shadow-2xl md:p-10 lg:ml-20">
            <div className="absolute left-[12%] right-[12%] top-[7.55rem] hidden h-[3px] bg-gradient-to-r from-gold/10 via-gold to-gold/10 md:block" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {fronts.map((front, index) => (
                <Link key={front.title} href={front.href} className={`group relative rounded-[2rem] border border-slate-100 bg-slate-50 p-7 transition duration-300 hover:-translate-y-1 hover:border-gold/35 hover:bg-white hover:shadow-xl ${index === 1 ? 'md:translate-y-10' : ''}`}>
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
            <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-gold-light">direção final</div>
            <h2 className="text-3xl font-black tracking-[-0.03em] md:text-5xl">Menos “landing page bonita”. Mais operação institucional em movimento.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              A Excellentia organiza formação, evidência e leitura institucional para que a escola avance por etapas — sem transformar compliance em burocracia solta.
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
