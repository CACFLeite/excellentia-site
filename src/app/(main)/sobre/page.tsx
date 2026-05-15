import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sobre — Excellentia',
  description: 'Conheça a Excellentia: formações, governança educacional, compliance escolar e desenvolvimento profissional para professores e escolas.'
}

const audiences = [
  {
    label: 'Professores',
    title: 'Carreira docente com direção.',
    description: 'Formações para currículo, processo seletivo, aula teste, rotina profissional e posicionamento em escolas.',
    href: '/formacoes',
    cta: 'Ver formações',
  },
  {
    label: 'Escolas',
    title: 'Governança com rastro.',
    description: 'Trilhas, certificados, registros e leitura de temas sensíveis para equipes, coordenação e gestão.',
    href: '/escolas',
    cta: 'Conhecer escolas',
    featured: true,
  },
]

const principles = [
  'Linguagem aplicável à rotina escolar',
  'Formação conectada a evidências',
  'Limites responsáveis entre educação, técnica e cuidado',
]

export default function SobrePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#06101c] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(244,219,118,.20),transparent_30%),radial-gradient(circle_at_12%_36%,rgba(59,130,246,.13),transparent_25%),linear-gradient(145deg,#06101c_0%,#0a2749_48%,#02060b_100%)]" />
        <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(244,219,118,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(244,219,118,.07)_1px,transparent_1px)] [background-size:72px_72px]" />
        <svg className="pointer-events-none absolute inset-x-0 bottom-[-10rem] hidden h-[30rem] w-full opacity-55 lg:block" viewBox="0 0 1440 440" fill="none" aria-hidden="true">
          <path d="M86 292C292 110 506 372 718 212C940 44 1112 150 1328 78" stroke="#f4db76" strokeOpacity=".38" strokeWidth="3" strokeLinecap="round" />
          <path d="M190 372C416 240 582 380 802 260C1006 150 1164 218 1294 166" stroke="#f4db76" strokeOpacity=".14" strokeWidth="2" strokeLinecap="round" />
        </svg>

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-end gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[1fr_.78fr] lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex rounded-full border border-gold-light/30 bg-gold-light/10 px-5 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-gold-light">
              Sobre a Excellentia
            </div>
            <h1 className="text-5xl font-black leading-[1.02] tracking-[-0.04em] md:text-7xl">Formação, evidência e decisão escolar.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-200 md:text-xl">
              A Excellentia organiza conhecimento educacional para que professores avancem e escolas comprovem o que fazem.
            </p>
          </div>

          <div className="rounded-[2.5rem] border border-white/15 bg-white/[0.08] p-7 shadow-2xl backdrop-blur-md">
            <div className="text-xs font-extrabold uppercase tracking-[0.24em] text-gold-light">posição</div>
            <p className="mt-5 text-2xl font-black leading-tight text-white">
              Não somos uma biblioteca de cursos soltos. Somos uma camada de formação e leitura institucional.
            </p>
            <div className="mt-7 grid gap-3">
              {principles.map((principle, index) => (
                <div key={principle} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-light text-sm font-black text-navy">{index + 1}</span>
                  <p className="font-bold leading-6 text-white">{principle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f7f4ec] py-20">
        <div className="absolute left-[-10rem] top-20 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute right-[-8rem] bottom-16 h-80 w-80 rounded-full bg-navy/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 grid gap-6 lg:grid-cols-[.8fr_1fr] lg:items-end">
            <div>
              <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-gold">atuação</div>
              <h2 className="text-3xl font-black tracking-[-0.03em] text-navy md:text-5xl">Duas entradas. Uma lógica.</h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-slate-600 lg:justify-self-end">
              Para educadores, desenvolvimento profissional. Para instituições, governança visível: formação, certificado, evidência e repertório no mesmo fluxo.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {audiences.map((audience) => (
              <Link key={audience.label} href={audience.href} className={`group flex min-h-[360px] flex-col rounded-[2.5rem] border p-8 shadow-2xl transition duration-300 hover:-translate-y-1 md:p-10 ${audience.featured ? 'border-navy bg-navy text-white' : 'border-slate-200 bg-white text-navy'}`}>
                <div className={`mb-5 text-sm font-black uppercase tracking-[0.24em] ${audience.featured ? 'text-gold-light' : 'text-gold'}`}>{audience.label}</div>
                <h3 className="max-w-xl text-4xl font-black tracking-[-0.04em]">{audience.title}</h3>
                <p className={`mt-6 max-w-xl text-lg leading-8 ${audience.featured ? 'text-slate-300' : 'text-slate-600'}`}>{audience.description}</p>
                <span className={`mt-auto inline-flex font-black transition group-hover:translate-x-1 ${audience.featured ? 'text-gold-light' : 'text-gold'}`}>{audience.cta} →</span>
              </Link>
            ))}
          </div>

          <div className="mt-16 overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-xl md:p-10">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_auto]">
              <div>
                <div className="mb-3 text-sm font-black uppercase tracking-[0.24em] text-gold">inteligência educacional</div>
                <h2 className="text-3xl font-black tracking-[-0.03em] text-navy md:text-4xl">O repertório sustenta a operação.</h2>
                <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                  As análises públicas da Excellentia ajudam a traduzir risco, norma e prática escolar em decisões mais claras.
                </p>
              </div>
              <Link href="/inteligencia-educacional" className="rounded-2xl border border-navy/20 px-8 py-4 text-center font-black text-navy transition hover:bg-navy hover:text-white">
                Ler análises
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#06101c] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-8 shadow-2xl backdrop-blur-md md:p-10">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="mb-3 text-sm font-black uppercase tracking-[0.24em] text-gold-light">próximo passo</div>
              <h2 className="text-3xl font-black tracking-[-0.03em] md:text-4xl">Comece pelo caminho certo.</h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-300">
                Professores podem iniciar pelas formações. Escolas, por uma conversa de escopo.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/formacoes" className="rounded-2xl border border-white/35 px-8 py-4 text-center font-black text-white transition hover:bg-white hover:text-navy">
                Ver formações
              </Link>
              <Link href="/contato" className="rounded-2xl bg-gold px-8 py-4 text-center font-black text-white transition hover:bg-yellow-600">
                Falar com a Excellentia
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
