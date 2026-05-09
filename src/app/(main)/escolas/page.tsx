import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Escolas — Governança e Compliance Educacional | Excellentia',
  description: 'Formações, protocolos, evidências, relatórios e inteligência educacional para escolas que precisam organizar governança, compliance e proteção institucional.',
}

const governancePillars = [
  {
    label: 'Formações',
    title: 'Trilhas obrigatórias e institucionais',
    text: 'NR-1, Lei Lucas, LGPD, proteção escolar, convivência, segurança e temas sensíveis organizados em jornadas formativas.',
  },
  {
    label: 'Evidências',
    title: 'Certificados, registros e relatórios',
    text: 'A escola deixa de depender de controles soltos e passa a reunir sinais de esforço formativo, participação e documentação.',
  },
  {
    label: 'Protocolos',
    title: 'Rotinas para reduzir improviso',
    text: 'Conformidade vira processo: convite, formação, registro, orientação e acompanhamento de lacunas.',
  },
  {
    label: 'Inteligência',
    title: 'Leitura gerencial e próximos passos',
    text: 'Conteúdo e relatórios ajudam direção e coordenação a enxergar riscos, prioridades e decisões institucionais.',
  },
]

const formationTracks = [
  {
    title: 'Riscos psicossociais e saúde do trabalho escolar',
    href: '/inteligencia-educacional/riscos-psicossociais-escolas',
  },
  {
    title: 'PGR/GRO como governança, não arquivo morto',
    href: '/inteligencia-educacional/pgr-gro-governanca-escolar',
  },
  {
    title: 'Lei Lucas: protocolo, evidência e limite da formação online',
    href: '/inteligencia-educacional/lei-lucas-protocolo-evidencias',
  },
  {
    title: 'LGPD escolar, privacidade e solicitações de titulares',
    href: '/inteligencia-educacional/lgpd-escolar-privacidade',
  },
  {
    title: 'Bullying, cyberbullying e violência no ambiente escolar',
    href: '/inteligencia-educacional/bullying-cyberbullying-violencia-escolar',
  },
  {
    title: 'Proteção integral, ECA e salvaguarda institucional',
    href: '/inteligencia-educacional/protecao-integral-eca-salvaguarda',
  },
  {
    title: 'Incêndio, evacuação e cultura preventiva',
    href: '/inteligencia-educacional/incendio-evacuacao-cultura-preventiva',
  },
  {
    title: 'Formações personalizadas e matriz de risco da escola',
    href: '/inteligencia-educacional/formacoes-personalizadas-matriz-risco',
  },
]

const operatingFlow = [
  'Mapear obrigações e prioridades',
  'Distribuir formações no calendário',
  'Convidar equipes e acompanhar adesão',
  'Registrar certificados e evidências',
  'Orientar decisões e próximos passos',
]

const audiences = [
  {
    title: 'Direção e mantenedores',
    text: 'Visão de risco, previsibilidade, lastro documental e clareza para decisões institucionais.',
  },
  {
    title: 'Coordenação e RH escolar',
    text: 'Fluxo para organizar convites, formações, comunicação com equipes e acompanhamento de pendências.',
  },
  {
    title: 'Professores e colaboradores',
    text: 'Formações com linguagem aplicável à rotina escolar, sem transformar compliance em burocracia incompreensível.',
  },
]

export default function EscolasPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#06101c] py-20 text-white md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_12%,rgba(244,219,118,.20),transparent_28%),radial-gradient(circle_at_12%_70%,rgba(59,130,246,.13),transparent_26%),linear-gradient(145deg,#06101c_0%,#0a2749_48%,#02060b_100%)]" />
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(244,219,118,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(244,219,118,.07)_1px,transparent_1px)] [background-size:72px_72px]" />
        <svg className="pointer-events-none absolute left-0 top-28 hidden h-[860px] w-full opacity-70 lg:block" viewBox="0 0 1440 860" fill="none" aria-hidden="true">
          <path className="excellentia-flow-path" d="M116 455C305 290 490 520 695 386C920 238 1150 420 1248 636" />
          <path d="M178 545C380 390 545 630 760 498C955 380 1114 515 1194 690" stroke="#f4db76" strokeOpacity=".18" strokeWidth="2" strokeLinecap="round" />
        </svg>

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_.92fr] lg:px-8">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-gold-light/30 bg-gold-light/10 px-5 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-gold-light">
              Governança escolar, compliance e evidências
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.04em] md:text-6xl">
              Uma operação de conformidade para escolas que precisam formar, comprovar e proteger.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-200 md:text-xl">
              A Excellentia organiza formações, protocolos, certificados, relatórios e inteligência educacional em uma rotina contínua de governança — não apenas em uma resposta pontual à NR-1.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/contato" className="rounded-2xl bg-gold px-8 py-4 text-center text-lg font-extrabold text-white shadow-2xl shadow-gold/20 transition hover:bg-yellow-600">
                Solicitar proposta
              </Link>
              <Link href="/formacoes" className="rounded-2xl border-2 border-white/55 px-8 py-4 text-center text-lg font-extrabold text-white transition hover:bg-white hover:text-navy">
                Ver formações
              </Link>
            </div>
          </div>

          <div className="relative min-h-[520px]">
            <div className="absolute inset-4 rounded-[3.5rem] bg-gold-light/10 blur-3xl" />
            <div className="excellentia-float absolute right-2 top-0 w-[92%] rounded-[2.5rem] border border-white/15 bg-white/[0.07] p-6 shadow-2xl backdrop-blur-md md:p-8">
              <div className="text-xs font-extrabold uppercase tracking-[0.28em] text-gold-light">central de governança escolar</div>
              <p className="mt-2 max-w-md text-sm leading-6 text-slate-300">Representação visual do fluxo: obrigação, formação, evidência, orientação e decisão.</p>
              <div className="relative mt-10 min-h-[260px]">
                <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-light/30 bg-gold-light/10 shadow-[inset_0_0_52px_rgba(244,219,118,.08),0_0_42px_rgba(244,219,118,.10)]" />
                <div className="absolute left-1/2 top-1/2 h-3 w-[84%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-gold-light/70 to-transparent" />
                <div className="relative grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {['Obrigação', 'Formação', 'Evidência', 'Gestão'].map((node, index) => (
                    <div key={node} className={`group flex min-h-[132px] flex-col items-center justify-between rounded-2xl border border-white/10 bg-navy/45 p-4 text-center shadow-lg transition duration-300 hover:-translate-y-1 hover:border-gold-light/35 hover:bg-navy/65 ${index % 2 ? 'translate-y-12' : ''}`}>
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-light text-sm font-black text-navy shadow-[0_0_24px_rgba(244,219,118,.22)]">{index + 1}</span>
                      <span className="text-sm font-extrabold text-white">{node}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="excellentia-float-slow absolute bottom-0 left-0 w-[66%] rounded-[2rem] border border-white/12 bg-[#06101c]/80 p-6 shadow-2xl backdrop-blur-md">
              <div className="text-xs font-black uppercase tracking-[0.22em] text-gold-light">arquitetura ampla</div>
              <p className="mt-3 text-sm leading-6 text-slate-300">A escola reúne frentes diferentes de cuidado, formação, registro e decisão institucional.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f7f4ec] py-24">
        <div className="absolute right-[-8rem] top-10 h-80 w-80 rounded-full bg-gold/20 blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-gold">o que a escola passa a operar</div>
            <h2 className="text-3xl font-black tracking-[-0.03em] text-navy md:text-5xl">
              Governança educacional não é um curso isolado. É um sistema de rotina, evidência e decisão.
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              A página anterior explicava bem a urgência da NR-1, mas deixava escondido o principal: a Excellentia estrutura uma camada permanente de compliance escolar.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {governancePillars.map((pillar, index) => (
              <div key={pillar.title} className={`rounded-[2rem] border p-7 shadow-xl transition duration-300 hover:-translate-y-1 ${index === 0 ? 'border-navy bg-navy text-white' : 'border-slate-200 bg-white text-navy'}`}>
                <div className={`mb-5 text-xs font-black uppercase tracking-[0.24em] ${index === 0 ? 'text-gold-light' : 'text-gold'}`}>{pillar.label}</div>
                <h3 className="text-2xl font-black">{pillar.title}</h3>
                <p className={`mt-4 leading-7 ${index === 0 ? 'text-slate-300' : 'text-slate-600'}`}>{pillar.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-4 sm:px-6 lg:grid-cols-[.82fr_1.18fr] lg:px-8">
          <div>
            <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-gold">frentes de formação e proteção</div>
            <h2 className="text-3xl font-black tracking-[-0.03em] text-navy md:text-5xl">A escola precisa de uma agenda viva de governança e proteção.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Cada frente abaixo deve abrir uma conversa de inteligência educacional: por que importa, que risco organiza, quais evidências produz e como a escola pode amadurecer sem improviso.
            </p>
          </div>
          <div className="relative rounded-[2.5rem] border border-slate-200 bg-slate-50 p-6 shadow-2xl md:p-8">
            <div className="absolute left-10 top-12 hidden h-[calc(100%-6rem)] w-[3px] rounded-full bg-gradient-to-b from-gold via-gold/60 to-transparent md:block" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {formationTracks.map((item, index) => (
                <Link key={item.title} href={item.href} className={`group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-md ${index % 2 ? 'sm:translate-y-6' : ''}`}>
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-gold-light text-xs font-black text-navy">{String(index + 1).padStart(2, '0')}</div>
                  <p className="font-bold leading-snug text-navy">{item.title}</p>
                  <span className="mt-4 inline-flex text-sm font-extrabold text-gold transition group-hover:translate-x-1">Ler análise →</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy py-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_20%,rgba(244,219,118,.18),transparent_30%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-gold-light">como a operação se organiza</div>
            <h2 className="text-3xl font-black tracking-[-0.03em] md:text-5xl">A escola não compra apenas conteúdo. Compra previsibilidade operacional.</h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              O valor está em transformar temas sensíveis em uma rotina possível de gestão: prioridade, calendário, participação, comprovação e acompanhamento.
            </p>
          </div>

          <div className="relative mt-14 rounded-[2.5rem] border border-white/10 bg-white/[0.07] p-6 shadow-2xl backdrop-blur md:p-10">
            <div className="absolute left-[11%] right-[11%] top-[5.9rem] hidden h-[3px] bg-gradient-to-r from-gold/10 via-gold to-gold/10 md:block" />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-5">
              {operatingFlow.map((item, index) => (
                <div key={item} className={`rounded-2xl border border-white/10 bg-white/[0.06] p-5 transition duration-300 hover:-translate-y-1 hover:border-gold-light/30 ${index % 2 ? 'md:translate-y-10' : ''}`}>
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-gold-light text-sm font-black text-navy">{index + 1}</div>
                  <p className="font-bold leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f4ec] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-gold">para quem isso precisa funcionar</div>
            <h2 className="text-3xl font-black tracking-[-0.03em] text-navy md:text-5xl">A mesma governança precisa ser legível para funções diferentes dentro da escola.</h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {audiences.map((audience, index) => (
              <div key={audience.title} className={`rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl ${index === 1 ? 'md:translate-y-8' : ''}`}>
                <div className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-gold">0{index + 1}</div>
                <h3 className="text-2xl font-black text-navy">{audience.title}</h3>
                <p className="mt-4 leading-7 text-slate-600">{audience.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-gold">próximo passo</div>
          <h2 className="text-3xl font-black tracking-[-0.03em] text-navy md:text-5xl">Estruture a governança educacional da sua escola antes que ela vire urgência.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            A Excellentia ajuda a escola a começar por onde há maior risco e avançar para uma rotina mais madura de formação, evidência e decisão.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/contato" className="rounded-2xl bg-gold px-8 py-4 text-lg font-black text-white transition hover:bg-yellow-600">
              Falar com a Excellentia
            </Link>
            <Link href="/admin/login" className="rounded-2xl border-2 border-navy px-8 py-4 text-lg font-black text-navy transition hover:bg-navy hover:text-white">
              Acessar painel da escola
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
