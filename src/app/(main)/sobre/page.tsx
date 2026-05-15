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
            <h1 className="text-5xl font-black leading-[1.02] tracking-[-0.04em] md:text-7xl">Formação escolar com prova e responsabilidade.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-200 md:text-xl">
              A Excellentia organiza formação e leitura institucional para professores e escolas que precisam agir com responsabilidade.
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
        <div className="absolute left-[-10rem] top-20 h-96 w-96 rounded-full bg-gold/15 blur-3xl" />
        <div className="absolute right-[-8rem] bottom-16 h-80 w-80 rounded-full bg-navy/8 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2.75rem] border border-navy/10 bg-white shadow-2xl shadow-navy/10">
            <div className="grid gap-8 border-b border-navy/10 bg-[#fbf8f0] p-8 md:p-10 lg:grid-cols-[.82fr_1fr] lg:items-end">
              <div>
                <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-gold">atuação</div>
                <h2 className="text-3xl font-black tracking-[-0.03em] text-navy md:text-5xl">Dois públicos. A mesma exigência de rigor.</h2>
              </div>
              <p className="max-w-2xl text-lg leading-8 text-slate-600 lg:justify-self-end">
                Para educadores, formação aplicável. Para instituições, formação, certificado, evidência e repertório no mesmo fluxo.
              </p>
            </div>

            <div className="relative p-5 md:p-8">
              <div className="absolute left-1/2 top-8 hidden h-[calc(100%-4rem)] w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent lg:block" />
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
                {audiences.map((audience) => (
                  <Link key={audience.label} href={audience.href} className="group flex min-h-[320px] flex-col rounded-[2rem] border border-navy/10 bg-[#f7f4ec] p-7 text-navy transition duration-300 hover:-translate-y-1 hover:border-gold/50 hover:bg-white md:p-9">
                    <div className="mb-5 text-sm font-black uppercase tracking-[0.24em] text-gold">{audience.label}</div>
                    <h3 className="max-w-xl text-4xl font-black tracking-[-0.04em]">{audience.title}</h3>
                    <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">{audience.description}</p>
                    <span className="mt-auto inline-flex font-black text-gold transition group-hover:translate-x-1">{audience.cta} →</span>
                  </Link>
                ))}
              </div>

              <div className="mt-5 rounded-[1.75rem] border border-gold/25 bg-gold/10 px-6 py-5 md:px-8">
                <div className="grid grid-cols-1 items-center gap-4 lg:grid-cols-[1fr_auto]">
                  <div>
                    <div className="mb-2 text-xs font-black uppercase tracking-[0.24em] text-gold">inteligência educacional</div>
                    <p className="text-xl font-black leading-tight text-navy md:text-2xl">Repertório só vale quando orienta a rotina.</p>
                    <p className="mt-2 max-w-3xl leading-7 text-slate-600">
                      As análises públicas aproximam risco, norma e prática escolar da decisão cotidiana.
                    </p>
                  </div>
                  <Link href="/inteligencia-educacional" className="rounded-2xl border border-navy/20 px-7 py-3 text-center font-black text-navy transition hover:bg-navy hover:text-white">
                    Ler análises
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#06101c] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-8 shadow-2xl backdrop-blur-md md:p-10">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="mb-3 text-sm font-black uppercase tracking-[0.24em] text-gold-light">próximo passo</div>
              <h2 className="text-3xl font-black tracking-[-0.03em] md:text-4xl">Comece pelo escopo certo.</h2>
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
