import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Escolas — Governança e Compliance Educacional | Excellentia',
  description: 'Formações, protocolos, evidências, relatórios e inteligência educacional para escolas que precisam organizar governança, compliance e proteção institucional.',
}

const governancePillars = [
  {
    label: 'Formar',
    title: 'Trilhas obrigatórias e institucionais',
    text: 'NR-1, Lei Lucas, LGPD, proteção escolar e convivência em jornadas aplicáveis à rotina da escola.',
  },
  {
    label: 'Comprovar',
    title: 'Certificados e registros em ordem',
    text: 'Evidências de participação, esforço formativo e documentação reunidas para gestão e prestação de contas.',
  },
  {
    label: 'Operar',
    title: 'Protocolos contra improviso',
    text: 'Convite, formação, registro, acompanhamento e orientação deixam de depender de controles soltos.',
  },
  {
    label: 'Decidir',
    title: 'Leitura gerencial do risco',
    text: 'Relatórios e conteúdo técnico ajudam direção e coordenação a priorizar os próximos passos.',
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
  'Mapear obrigações',
  'Planejar calendário',
  'Convidar equipes',
  'Registrar evidências',
  'Orientar decisões',
]

const audiences = [
  {
    title: 'Direção e mantenedores',
    text: 'Risco, previsibilidade e lastro documental para decisões institucionais.',
  },
  {
    title: 'Coordenação e RH escolar',
    text: 'Convites, formações, comunicação e pendências em um fluxo mais legível.',
  },
  {
    title: 'Professores e colaboradores',
    text: 'Conteúdo direto, aplicável e conectado aos dilemas reais da escola.',
  },
]

export default function EscolasPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#06101c] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_8%,rgba(244,219,118,.22),transparent_30%),radial-gradient(circle_at_10%_80%,rgba(59,130,246,.12),transparent_28%),linear-gradient(145deg,#06101c_0%,#0a2749_50%,#02060b_100%)]" />
        <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(244,219,118,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(244,219,118,.07)_1px,transparent_1px)] [background-size:86px_86px]" />
        <svg className="pointer-events-none absolute left-0 top-24 hidden h-[980px] w-full opacity-75 lg:block" viewBox="0 0 1440 980" fill="none" aria-hidden="true">
          <path className="excellentia-flow-path" d="M92 430C264 238 486 492 684 332C900 158 1104 330 1288 214C1370 468 1112 604 935 742C760 878 548 798 376 902" />
          <path d="M168 510C358 360 544 560 744 428C940 300 1086 440 1244 366" stroke="#f4db76" strokeOpacity=".18" strokeWidth="2" strokeLinecap="round" />
        </svg>

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 pb-24 pt-20 sm:px-6 md:pt-28 lg:grid-cols-[1.02fr_.98fr] lg:px-8 lg:pb-32">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-gold-light/30 bg-gold-light/10 px-5 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-gold-light">
              Governança escolar integrada
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.045em] md:text-6xl">
              Formação, evidência e decisão em uma única operação escolar.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-200 md:text-xl">
              A Excellentia organiza o compliance escolar dentro da rotina: menos planilhas soltas, mais lastro institucional.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/contato" className="rounded-2xl bg-gold px-8 py-4 text-center text-lg font-extrabold text-white shadow-2xl shadow-gold/20 transition hover:bg-yellow-600">
                Falar com a Excellentia
              </Link>
              <Link href="/formacoes" className="rounded-2xl border-2 border-white/55 px-8 py-4 text-center text-lg font-extrabold text-white transition hover:bg-white hover:text-navy">
                Ver formações
              </Link>
            </div>
          </div>

          <div className="relative flex min-h-[520px] flex-col justify-center gap-6 lg:min-h-[560px]">
            <div className="absolute inset-8 rounded-full bg-gold-light/10 blur-3xl" />
            <div className="excellentia-float relative ml-auto w-full rounded-[2.75rem] border border-white/15 bg-white/[0.075] p-6 shadow-2xl backdrop-blur-md md:w-[94%] md:p-8">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="text-xs font-extrabold uppercase tracking-[0.28em] text-gold-light">central da escola</div>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-slate-300">Obrigação, formação, evidência e gestão conectadas.</p>
                </div>
                <div className="hidden rounded-full border border-gold-light/30 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-gold-light sm:block">integrado</div>
              </div>

              <div className="relative mt-9 min-h-[300px]">
                <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-light/30 bg-gold-light/10 shadow-[inset_0_0_56px_rgba(244,219,118,.08),0_0_48px_rgba(244,219,118,.11)]" />
                <div className="absolute left-1/2 top-1/2 h-[3px] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-gold-light/80 to-transparent" />
                <div className="absolute left-1/2 top-1/2 h-[86%] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-transparent via-gold-light/55 to-transparent" />

                <div className="relative grid grid-cols-2 gap-4">
                  {['Obrigação', 'Formação', 'Evidência', 'Gestão'].map((node, index) => (
                    <div key={node} className="group flex min-h-[128px] flex-col justify-between rounded-3xl border border-white/10 bg-navy/55 p-5 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-gold-light/35 hover:bg-navy/70">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-light text-sm font-black text-navy shadow-[0_0_24px_rgba(244,219,118,.22)]">{index + 1}</span>
                      <span className="text-base font-extrabold text-white">{node}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="excellentia-float-slow relative ml-0 mt-2 w-[76%] rounded-[2rem] border border-white/12 bg-[#06101c]/85 p-6 shadow-2xl backdrop-blur-md md:ml-4">
              <div className="text-xs font-black uppercase tracking-[0.22em] text-gold-light">sem urgência cega</div>
              <p className="mt-3 text-sm leading-6 text-slate-300">A escola enxerga o que precisa formar, provar e corrigir.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f7f4ec] py-20">
        <div className="absolute right-[-10rem] top-8 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-navy/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[.78fr_1.22fr] lg:items-end">
            <div>
              <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-gold">o que muda</div>
              <h2 className="text-3xl font-black tracking-[-0.035em] text-navy md:text-5xl">
                Compliance escolar deixa de ser arquivo. Vira sistema.
              </h2>
            </div>
            <p className="max-w-3xl text-lg leading-8 text-slate-600 lg:pb-2">
              A proposta não é empilhar cursos. É manter uma camada contínua: formação certa, evidência acessível e gestão com contexto.
            </p>
          </div>

          <div className="mt-14 overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-white/70 shadow-xl backdrop-blur">
            <div className="grid grid-cols-1 lg:grid-cols-4">
              {governancePillars.map((pillar, index) => (
                <div key={pillar.title} className={`group relative min-h-[270px] border-slate-200/80 p-8 transition duration-300 hover:bg-[#fbf8ef] lg:border-l ${index === 0 ? 'border-l-0 bg-navy text-white hover:bg-navy' : 'text-navy'}`}>
                  <div className={`mb-10 text-xs font-black uppercase tracking-[0.24em] ${index === 0 ? 'text-gold-light' : 'text-gold'}`}>{pillar.label}</div>
                  <div className="absolute right-8 top-8 text-5xl font-black tracking-[-0.08em] opacity-[0.08]">0{index + 1}</div>
                  <h3 className="max-w-xs text-2xl font-black leading-tight">{pillar.title}</h3>
                  <p className={`mt-5 leading-7 ${index === 0 ? 'text-slate-300' : 'text-slate-600'}`}>{pillar.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mx-auto mt-20 grid max-w-7xl grid-cols-1 gap-14 border-t border-navy/10 px-4 pt-16 sm:px-6 lg:grid-cols-[.78fr_1.22fr] lg:px-8">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-gold">inteligência educacional</div>
            <h2 className="text-3xl font-black tracking-[-0.035em] text-navy md:text-5xl">Frentes críticas, uma leitura institucional.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Cada tema aponta risco, protocolo e evidência — sem repetir a home, sem tratar a escola como checklist genérico.
            </p>
          </div>

          <div className="relative rounded-[2.5rem] border border-slate-200/80 bg-white/60 p-4 shadow-xl backdrop-blur md:p-6">
            <div className="absolute left-10 top-12 hidden h-[calc(100%-6rem)] w-px bg-gradient-to-b from-gold via-gold/60 to-transparent md:block" />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {formationTracks.map((item, index) => (
                <Link key={item.title} href={item.href} className="group rounded-[1.6rem] border border-slate-100 bg-white/85 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-gold/40 hover:bg-white hover:shadow-md">
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-light text-xs font-black text-navy">{String(index + 1).padStart(2, '0')}</span>
                    <span className="text-sm font-extrabold text-gold opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100">Ler →</span>
                  </div>
                  <p className="font-bold leading-snug text-navy">{item.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_18%,rgba(244,219,118,.18),transparent_30%)]" />
        <div className="absolute inset-x-0 top-20 hidden h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent md:block" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[.86fr_1.14fr] lg:items-center">
            <div>
              <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-gold-light">operação</div>
              <h2 className="text-3xl font-black tracking-[-0.035em] md:text-5xl">Previsibilidade para temas que não toleram improviso.</h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                O ciclo é simples: identificar, formar, comprovar e ajustar. A força está na continuidade.
              </p>
            </div>

            <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.07] p-5 shadow-xl backdrop-blur md:p-7">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
                {operatingFlow.map((item, index) => (
                  <div key={item} className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 transition duration-300 hover:-translate-y-1 hover:border-gold-light/30">
                    <div className="mb-10 flex h-10 w-10 items-center justify-center rounded-full bg-gold-light text-sm font-black text-navy">{index + 1}</div>
                    <p className="font-bold leading-snug">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 border-t border-white/10 pt-12 lg:grid-cols-[.72fr_1.28fr] lg:items-start">
            <div>
              <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-gold-light">para quem precisa funcionar</div>
              <h2 className="text-3xl font-black tracking-[-0.035em] md:text-5xl">A mesma governança, lida por papéis diferentes.</h2>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {audiences.map((audience, index) => (
                <div key={audience.title} className="rounded-3xl border border-white/10 bg-white/[0.055] p-6">
                  <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-full bg-gold-light text-sm font-black text-navy">0{index + 1}</div>
                  <div>
                    <h3 className="text-xl font-black text-white">{audience.title}</h3>
                    <p className="mt-3 leading-7 text-slate-300">{audience.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy pb-20 text-white">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-8 text-center shadow-2xl backdrop-blur md:p-12">
            <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-gold-light">próximo passo</div>
            <h2 className="text-3xl font-black tracking-[-0.035em] md:text-5xl">Organize antes da urgência.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Escolha o risco prioritário e avance com formação, evidência e leitura institucional.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/contato" className="rounded-2xl bg-gold px-8 py-4 text-lg font-black text-white transition hover:bg-yellow-600">
                Falar com a Excellentia
              </Link>
              <Link href="/admin/login" className="rounded-2xl border-2 border-white/60 px-8 py-4 text-lg font-black text-white transition hover:bg-white hover:text-navy">
                Acessar painel da escola
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
