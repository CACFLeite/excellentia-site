import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Área do Professor — Excellentia',
  description:
    'Entrada para professores acessarem cursos Excellentia, assinatura individual, convites institucionais e formações disponíveis.',
}

const accessCards = [
  {
    title: 'Acessar cursos',
    description: 'Entrada para professor com assinatura, convite institucional ou link autorizado.',
    href: '/acesso-professor',
    label: 'Entrar nos cursos',
    featured: true,
  },
  {
    title: 'Assinatura individual',
    description: 'Planos para professores que desejam acesso próprio aos cursos, certificados e materiais da Excellentia.',
    href: '/assinatura',
    label: 'Ver planos',
  },
  {
    title: 'Tenho convite institucional',
    description: 'Entrada para professores vinculados a uma escola ou organização que já recebeu convite de acesso.',
    href: '/acesso-escolar',
    label: 'Ativar convite',
  },
]

export default function ProfessoresPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#06101c] py-20 text-white md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(244,219,118,.20),transparent_28%),radial-gradient(circle_at_9%_35%,rgba(59,130,246,.13),transparent_25%),linear-gradient(145deg,#06101c_0%,#0a2749_48%,#02060b_100%)]" />
        <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(244,219,118,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(244,219,118,.07)_1px,transparent_1px)] [background-size:72px_72px]" />
        <svg className="pointer-events-none absolute left-0 top-24 hidden h-[760px] w-full opacity-60 lg:block" viewBox="0 0 1440 760" fill="none" aria-hidden="true">
          <path className="excellentia-flow-path" d="M120 250C352 92 528 342 736 220C960 90 1152 220 1274 440" />
          <path d="M170 340C418 190 582 438 800 318C1012 196 1138 342 1206 500" stroke="#f4db76" strokeOpacity=".18" strokeWidth="2" strokeLinecap="round" />
        </svg>

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_.9fr] lg:px-8">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-gold-light/30 bg-gold-light/10 px-5 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-gold-light">
              Área do Professor
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.04em] md:text-6xl lg:text-7xl">
              Cursos, assinatura e acesso autorizado em um só lugar.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-200 md:text-xl">
              Esta é a entrada correta para professores: consulte as formações disponíveis, escolha uma assinatura individual ou ative um convite recebido por uma escola.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/formacoes" className="rounded-2xl bg-gold px-8 py-4 text-center text-lg font-extrabold text-white shadow-2xl shadow-gold/20 transition hover:bg-yellow-600">
                Ver cursos disponíveis
              </Link>
              <Link href="/assinatura" className="rounded-2xl border-2 border-white/55 px-8 py-4 text-center text-lg font-extrabold text-white transition hover:bg-white hover:text-navy">
                Assinar acesso individual
              </Link>
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-white/15 bg-white/[0.07] p-7 shadow-2xl backdrop-blur-md md:p-8">
            <div className="text-xs font-extrabold uppercase tracking-[0.28em] text-gold-light">como funciona</div>
            <div className="mt-8 space-y-5">
              {['Catálogo público para conhecer os cursos', 'Assinatura para acesso individual', 'Convite institucional para cursos contratados por escolas'].map((item, index) => (
                <div key={item} className="flex gap-4 rounded-2xl border border-white/10 bg-navy/45 p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-light text-sm font-black text-navy">{index + 1}</span>
                  <p className="self-center text-sm font-bold leading-6 text-slate-100">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_0%,rgba(244,219,118,.13),transparent_28%),linear-gradient(180deg,#0a2749_0%,#071d38_100%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-gold-light">entrada certa</div>
            <h2 className="text-3xl font-black tracking-[-0.03em] md:text-5xl">Escolha o tipo de acesso.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              A área restrita depende de assinatura, convite institucional ou link autorizado. O catálogo público continua separado para consulta antes do acesso.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {accessCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className={`group rounded-[2rem] border p-7 transition hover:-translate-y-1 ${card.featured ? 'border-gold-light/45 bg-gold-light/10 shadow-2xl shadow-gold/10' : 'border-white/10 bg-white/[0.05]'}`}
              >
                <h3 className="text-2xl font-black text-white">{card.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">{card.description}</p>
                <span className="mt-7 inline-flex text-sm font-extrabold text-gold-light transition group-hover:translate-x-1">{card.label} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
