import Link from 'next/link'

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
    title: 'Professores',
    eyebrow: 'camada 01',
    role: 'Onde acessam os cursos',
    description: 'Cursos e trilhas para prática docente, carreira, processo seletivo e rotina profissional.',
    href: '/professores',
    linkLabel: 'Acessar cursos',
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
    linkLabel: 'Ler análises',
  },
]

const operatingNodes = ['Exigência', 'Formação', 'Evidência', 'Decisão']
export default function Home() {
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
                Compliance escolar com rastro institucional.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-200 md:text-xl">
                Formação, registro e leitura de risco para escolas que precisam proteger a rotina e comprovar o que fizeram.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link href="/escolas" className="rounded-2xl bg-gold px-8 py-4 text-center text-lg font-extrabold text-white shadow-2xl shadow-gold/20 transition hover:bg-yellow-600">
                  Soluções para escolas
                </Link>
                <Link href="/professores" className="rounded-2xl border-2 border-white/55 px-8 py-4 text-center text-lg font-extrabold text-white transition hover:bg-white hover:text-navy">
                  Cursos para professores
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
                Quando obrigação, formação, registro e gestão falam a mesma língua, a escola ganha lastro.
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

      <section className="relative overflow-hidden bg-[#06101c] py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_0%,rgba(244,219,118,.13),transparent_28%),linear-gradient(180deg,#06101c_0%,#0a2749_100%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-[.95fr_1.05fr] lg:items-end">
            <div>
              <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-gold-light">entradas excellentia</div>
              <h2 className="max-w-3xl text-3xl font-black tracking-[-0.03em] md:text-5xl">
                Entre pelo escopo certo.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                Para gestores, o ponto de entrada é a escola. Para professores, a área de cursos organiza formação, prática e desenvolvimento profissional.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
              <Link href="/escolas" className="rounded-2xl bg-gold px-8 py-4 text-center text-lg font-black text-white shadow-2xl shadow-gold/20 transition hover:bg-yellow-600">
                Soluções para escolas
              </Link>
              <Link href="/professores" className="rounded-2xl border border-white/25 px-8 py-4 text-center text-lg font-extrabold text-white transition hover:bg-white hover:text-navy">
                Cursos para professores
              </Link>
            </div>
          </div>

          <div className="relative mt-14 grid grid-cols-1 gap-5 border-t border-white/10 pt-8 md:grid-cols-3">
            {fronts.map((front) => (
              <Link key={front.title} href={front.href} className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-gold-light/35 hover:bg-white/[0.08]">
                <div className="text-[10px] font-black uppercase tracking-[0.22em] text-gold-light">{front.eyebrow}</div>
                <h3 className="mt-3 text-xl font-black text-white">{front.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{front.description}</p>
                <span className="mt-5 inline-flex text-sm font-extrabold text-gold-light transition group-hover:translate-x-1">{front.linkLabel} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
