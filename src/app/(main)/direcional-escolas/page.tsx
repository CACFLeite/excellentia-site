import type { Metadata } from 'next'
import Link from 'next/link'
import DirecionalLeadForm from './DirecionalLeadForm'

const renataWhatsApp = 'https://wa.me/5511952133049?text=Ol%C3%A1%2C%20Renata.%20Vi%20a%20Excellentia%20na%20Direcional%20Escolas%20e%20gostaria%20de%20conversar%20sobre%20governan%C3%A7a%20escolar.'

export const metadata: Metadata = {
  title: 'Governança escolar para proteger sua instituição | Excellentia',
  description: 'Governança escolar, formação e evidências para escolas que precisam organizar conformidade, registros e proteção institucional.',
}

const flowSteps = [
  {
    label: 'Diagnóstico',
    title: 'Leitura inicial da escola',
    text: 'Identificamos prioridades de governança, riscos sensíveis e pontos que exigem registro institucional.',
  },
  {
    label: 'Formação',
    title: 'Trilhas para a equipe',
    text: 'Transformamos temas obrigatórios e críticos em jornadas claras para direção, coordenação e colaboradores.',
  },
  {
    label: 'Evidências',
    title: 'Registros e comprovação',
    text: 'Organizamos certificados, respostas, documentos e indicadores para sustentar decisões da gestão.',
  },
  {
    label: 'Gestão',
    title: 'Acompanhamento contínuo',
    text: 'A escola passa a enxergar lacunas, próximos passos e rotinas de proteção com mais previsibilidade.',
  },
]

const capabilities = [
  {
    title: 'Formação aplicada',
    text: 'Trilhas para temas obrigatórios e sensíveis da rotina escolar, com linguagem clara para equipes reais.',
  },
  {
    title: 'Evidências organizadas',
    text: 'Registros, certificados e respostas deixam de ficar dispersos e passam a compor lastro institucional.',
  },
  {
    title: 'Leitura de governança',
    text: 'A direção enxerga prioridades, lacunas e próximos passos sem depender de improviso documental.',
  },
]

const tracks = [
  'NR-1 e riscos psicossociais',
  'Lei Lucas e protocolos de emergência',
  'LGPD escolar e proteção de dados',
  'Bullying, cyberbullying e violência escolar',
  'Proteção integral e salvaguarda institucional',
  'Evidências, certificados e relatórios gerenciais',
]

function ExcellentiaFlow() {
  return (
    <div className="relative min-h-[560px] overflow-hidden rounded-[2.5rem] border border-white/15 bg-white/[0.075] p-5 shadow-2xl backdrop-blur md:p-7">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(244,219,118,.18),transparent_34%),linear-gradient(145deg,rgba(255,255,255,.08),rgba(255,255,255,.025))]" />
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-70" viewBox="0 0 620 620" fill="none" aria-hidden="true">
        <path className="excellentia-flow-path" d="M92 344C164 166 320 252 394 128C470 204 438 316 528 402C394 474 256 410 128 516" />
        <path d="M132 182C238 88 342 232 474 158" stroke="#f4db76" strokeOpacity=".18" strokeWidth="2" strokeLinecap="round" />
        <path d="M96 468C238 364 366 502 528 386" stroke="#f4db76" strokeOpacity=".18" strokeWidth="2" strokeLinecap="round" />
      </svg>

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-extrabold uppercase tracking-[0.28em] text-gold-light">fluxo excellentia</div>
          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-300">Governança aplicada à rotina da escola.</p>
        </div>
        <div className="rounded-full border border-gold-light/30 bg-gold-light/10 px-3 py-1 text-xs font-black text-gold-light">4 etapas</div>
      </div>

      <div className="relative mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {flowSteps.map((step, index) => (
          <div
            key={step.label}
            className="relative min-h-[190px] rounded-[1.7rem] border border-white/10 bg-[#071d38]/75 p-5 shadow-xl transition duration-300 hover:-translate-y-1 hover:border-gold-light/35 hover:bg-[#0a2749]/85"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-light text-sm font-black text-navy shadow-[0_0_24px_rgba(244,219,118,.18)]">
              {index + 1}
            </span>
            <div className="mt-7 text-xs font-black uppercase tracking-[0.22em] text-gold-light">{step.label}</div>
            <h3 className="mt-2 text-xl font-black text-white">{step.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">{step.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
export default function DirecionalEscolasPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#06101c] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_8%,rgba(244,219,118,.20),transparent_30%),radial-gradient(circle_at_14%_82%,rgba(59,130,246,.14),transparent_28%),linear-gradient(145deg,#06101c_0%,#0a2749_52%,#02060b_100%)]" />
        <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(244,219,118,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(244,219,118,.07)_1px,transparent_1px)] [background-size:82px_82px]" />
        <svg className="pointer-events-none absolute left-0 top-12 hidden h-[780px] w-full opacity-60 lg:block" viewBox="0 0 1440 780" fill="none" aria-hidden="true">
          <path className="excellentia-flow-path" d="M92 352C294 114 486 438 684 244C896 36 1116 258 1302 124C1372 352 1138 520 940 638C734 762 514 650 326 704" />
          <path d="M154 456C344 306 540 510 744 374C942 242 1084 384 1248 300" stroke="#f4db76" strokeOpacity=".18" strokeWidth="2" strokeLinecap="round" />
        </svg>

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 px-4 pb-20 pt-16 sm:px-6 md:pt-24 lg:grid-cols-[.96fr_1.04fr] lg:px-8 lg:pb-28">
          <div className="lg:pt-8">
            <div className="mb-6 inline-flex rounded-full border border-gold-light/30 bg-gold-light/10 px-5 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-gold-light">
              Governança escolar integrada
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.035em] md:text-6xl">
              Governança escolar, formação e evidências para proteger sua instituição.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-200 md:text-xl">
              A Excellentia ajuda escolas privadas a transformar obrigações, cursos, registros e riscos institucionais em uma rotina clara de governança.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href={renataWhatsApp} target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-gold px-8 py-4 text-center text-lg font-extrabold text-white shadow-2xl shadow-gold/20 transition hover:bg-yellow-600">
                Agende sua consultoria
              </a>
            </div>
            <p className="mt-5 text-sm font-semibold text-slate-300">WhatsApp direto: (11) 95213-3049</p>
          </div>

          <div id="diagnostico" className="relative">
            <div className="absolute inset-8 rounded-full bg-gold-light/10 blur-3xl" />
            <DirecionalLeadForm />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#06101c] py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_0%,rgba(244,219,118,.12),transparent_28%),linear-gradient(180deg,#06101c_0%,#0a2749_100%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-light/50 to-transparent" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[.85fr_1.15fr] lg:px-8">
          <div>
            <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-gold-light">como funciona</div>
            <h2 className="text-3xl font-black tracking-[-0.025em] md:text-5xl">
              Da obrigação ao lastro institucional.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              O trabalho não começa por um arquivo isolado. Começa por uma leitura de risco, passa pela formação da equipe, organiza evidências e devolve clareza para a direção.
            </p>
          </div>

          <ExcellentiaFlow />
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#06101c] py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_0%,rgba(244,219,118,.10),transparent_26%),linear-gradient(180deg,#0a2749_0%,#06101c_100%)]" />
        <svg className="pointer-events-none absolute inset-x-0 top-[-5rem] hidden h-[24rem] w-full opacity-45 lg:block" viewBox="0 0 1440 420" fill="none" aria-hidden="true">
          <path className="excellentia-flow-path" d="M85 252C316 92 490 330 716 188C936 50 1118 160 1320 72" />
        </svg>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
            <div>
              <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-gold-light">o problema real</div>
              <h2 className="text-3xl font-black tracking-[-0.025em] md:text-5xl">
                A escola não precisa apenas cumprir normas. Precisa demonstrar governança.
              </h2>
            </div>
            <p className="text-lg leading-8 text-slate-300">
              NR-1, Lei Lucas, LGPD, proteção integral, convivência e riscos psicossociais não funcionam bem como ações isoladas. A direção precisa formar pessoas, registrar evidências, acompanhar lacunas e organizar respostas antes da urgência.
            </p>
          </div>

          <div className="mt-14 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.055] shadow-2xl backdrop-blur">
            <div className="grid grid-cols-1 md:grid-cols-3">
              {capabilities.map((item, index) => (
                <div key={item.title} className="relative min-h-[250px] border-white/10 p-7 transition duration-300 hover:bg-white/[0.07] md:border-l md:first:border-l-0">
                  <div className="absolute right-7 top-7 text-5xl font-black tracking-[-0.08em] opacity-[0.08]">0{index + 1}</div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-light text-sm font-black text-navy">{index + 1}</span>
                  <h3 className="mt-8 text-2xl font-black text-white">{item.title}</h3>
                  <p className="mt-4 leading-7 text-slate-300">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#06101c] py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_24%,rgba(244,219,118,.10),transparent_30%),linear-gradient(180deg,#06101c_0%,#0a2749_48%,#06101c_100%)]" />
        <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(244,219,118,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(244,219,118,.06)_1px,transparent_1px)] [background-size:76px_76px]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
          <div>
            <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-gold-light">frentes cobertas</div>
            <h2 className="text-3xl font-black tracking-[-0.025em] md:text-5xl">
              Uma base para formar, registrar e decidir.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Sua escola passa a tratar obrigações como um ecossistema documental, não como arquivos separados: uma organização formativa e documental que ajuda a sustentar decisões.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {tracks.map((track, index) => (
              <div key={track} className="group rounded-2xl border border-white/10 bg-white/[0.06] p-5 font-bold text-white shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-gold-light/40 hover:bg-white/[0.09] hover:shadow-xl">
                <span className="mb-4 block text-xs font-black uppercase tracking-[0.18em] text-gold-light">0{index + 1}</span>
                {track}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#06101c] py-16 text-white">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-gold-light">Excellentia</p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.025em] md:text-5xl">
            Governança escolar não se improvisa quando o problema aparece.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Ela se estrutura com formação, evidências e uma rotina clara de decisão.
          </p>
          <div className="mt-8">
            <Link href="/escolas" className="font-bold text-gold-light transition hover:text-white">
              Conhecer a frente de escolas da Excellentia
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
