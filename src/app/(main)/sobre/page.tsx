import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sobre — Excellentia',
  description: 'Conheça a Excellentia: formações, governança educacional, compliance escolar e desenvolvimento profissional para professores e escolas.'
}

const professorServices = [
  'Formações para carreira docente, processos seletivos, currículo, entrevista e aula teste.',
  'Conteúdos sobre rotina profissional, posicionamento, direitos, saúde emocional e limites de trabalho.',
  'Certificação nas formações aplicáveis e acesso individual conforme plano contratado.',
]

const schoolServices = [
  'Formações institucionais para colaboradores, coordenação e gestão escolar.',
  'Apoio à organização de certificados, registros, relatórios e evidências de participação.',
  'Frentes de governança escolar ligadas a NR-1, Lei Lucas, LGPD, proteção integral, bullying, segurança e riscos institucionais.',
]

const expectations = [
  {
    title: 'Linguagem aplicável à escola',
    description: 'Os serviços traduzem temas jurídicos, operacionais e formativos para situações que fazem parte da rotina escolar.',
  },
  {
    title: 'Formação com registro',
    description: 'Quando o escopo envolve escola, a formação pode ser acompanhada por certificados, evidências e relatórios institucionais.',
  },
  {
    title: 'Limites responsáveis',
    description: 'A Excellentia organiza formação, leitura e documentação sem substituir profissionais técnicos, jurídicos ou de saúde quando eles forem exigidos.',
  },
]

const fronts = [
  'Carreira e desenvolvimento docente',
  'Governança e compliance escolar',
  'Protocolos, evidências e documentação',
  'Inteligência educacional para decisão institucional',
]

export default function SobrePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#06101c] py-20 text-white md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(244,219,118,.20),transparent_30%),radial-gradient(circle_at_12%_36%,rgba(59,130,246,.13),transparent_25%),linear-gradient(145deg,#06101c_0%,#0a2749_48%,#02060b_100%)]" />
        <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(244,219,118,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(244,219,118,.07)_1px,transparent_1px)] [background-size:72px_72px]" />
        <svg className="pointer-events-none absolute inset-x-0 bottom-[-10rem] hidden h-[30rem] w-full opacity-60 lg:block" viewBox="0 0 1440 440" fill="none" aria-hidden="true">
          <path d="M86 292C292 110 506 372 718 212C940 44 1112 150 1328 78" stroke="#f4db76" strokeOpacity=".42" strokeWidth="3" strokeLinecap="round" />
          <path d="M190 372C416 240 582 380 802 260C1006 150 1164 218 1294 166" stroke="#f4db76" strokeOpacity=".16" strokeWidth="2" strokeLinecap="round" />
        </svg>

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-end gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_.78fr] lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex rounded-full border border-gold-light/30 bg-gold-light/10 px-5 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-gold-light">
              Sobre a Excellentia
            </div>
            <h1 className="text-5xl font-black leading-[1.02] tracking-[-0.04em] md:text-7xl">Formação, evidência e governança para a rotina escolar.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-200 md:text-xl">
              A Excellentia desenvolve formações e recursos para organizar carreira docente, compliance escolar, registros e decisões.
            </p>
          </div>

          <div className="rounded-[2.5rem] border border-white/15 bg-white/[0.08] p-7 shadow-2xl backdrop-blur-md">
            <div className="text-xs font-extrabold uppercase tracking-[0.24em] text-gold-light">o que fazemos</div>
            <div className="mt-7 space-y-4">
              {fronts.map((front, index) => (
                <div key={front} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-light text-sm font-black text-navy">{index + 1}</span>
                  <p className="font-bold leading-6 text-white">{front}</p>
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
          <div className="mb-14 max-w-4xl">
            <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-gold">atuação</div>
            <h2 className="text-3xl font-black tracking-[-0.03em] text-navy md:text-5xl">Professores e escolas em camadas complementares.</h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Para professores, carreira. Para escolas, formação de equipes, evidências, relatórios e governança.
            </p>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
            <div className="flex h-full flex-col rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-2xl md:p-10">
              <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-gold">professores</div>
              <h3 className="text-3xl font-black text-navy">Desenvolvimento profissional docente.</h3>
              <p className="mt-5 leading-8 text-slate-600">
                A assinatura individual reúne formações para carreira, processos seletivos e vida profissional em escolas.
              </p>
              <ul className="mt-7 space-y-4">
                {professorServices.map((item) => (
                  <li key={item} className="flex gap-3 text-slate-700">
                    <span className="mt-1 text-gold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/formacoes" className="mt-auto inline-flex w-fit rounded-2xl bg-navy px-7 py-4 font-black text-white transition hover:bg-slate-900">
                Ver formações
              </Link>
            </div>

            <div className="flex h-full flex-col rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-2xl md:p-10">
              <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-gold">escolas</div>
              <h3 className="text-3xl font-black text-navy">Governança escolar com formação e evidência.</h3>
              <p className="mt-5 leading-8 text-slate-600">
                Para instituições, organizamos trilhas, participação, registros e leitura de temas sensíveis.
              </p>
              <ul className="mt-7 space-y-4">
                {schoolServices.map((item) => (
                  <li key={item} className="flex gap-3 text-slate-700">
                    <span className="mt-1 text-gold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/escolas" className="mt-auto inline-flex w-fit rounded-2xl bg-gold px-7 py-4 font-black text-white transition hover:bg-yellow-600">
                Conhecer escolas
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-4xl">
            <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-gold">o que esperar</div>
            <h2 className="text-3xl font-black tracking-[-0.03em] text-navy md:text-5xl">Serviços para sair do improviso.</h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              A proposta não é acumular cursos soltos: é conectar formação, registro e leitura institucional.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {expectations.map((item, index) => (
              <div key={item.title} className={`rounded-[2rem] border border-slate-200 bg-[#f7f4ec] p-7 shadow-xl ${index === 1 ? 'md:mt-10' : ''}`}>
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-lg font-black text-gold-light">{index + 1}</div>
                <h3 className="text-2xl font-black text-navy">{item.title}</h3>
                <p className="mt-4 leading-7 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f4ec] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-navy p-8 text-white shadow-2xl md:p-10">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="mb-3 text-sm font-black uppercase tracking-[0.24em] text-gold-light">próximo passo</div>
              <h2 className="text-3xl font-black tracking-[-0.03em] md:text-4xl">Converse sobre o melhor formato.</h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-300">
                Professores podem começar pelas formações individuais; escolas, por uma conversa de escopo.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link href="/formacoes" className="rounded-2xl border border-white/40 px-8 py-4 text-center font-black text-white transition hover:bg-white hover:text-navy">
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
