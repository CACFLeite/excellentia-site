import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import DirecionalLeadForm from './DirecionalLeadForm'

const renataWhatsApp = 'https://wa.me/5511952133049?text=Ol%C3%A1%2C%20Renata.%20Vi%20a%20Excellentia%20na%20Direcional%20Escolas%20e%20gostaria%20de%20conversar%20sobre%20governan%C3%A7a%20escolar.'

export const metadata: Metadata = {
  title: 'Governança escolar para proteger sua instituição | Excellentia',
  description: 'Governança escolar, formação e evidências para escolas que precisam organizar conformidade, registros e proteção institucional.',
}

const capabilities = [
  {
    title: 'Formação aplicada',
    text: 'Trilhas para temas obrigatórios e sensíveis da rotina escolar, com linguagem clara para equipes reais.',
  },
  {
    title: 'Evidencias organizadas',
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
  'Bullying, cyberbullying e violencia escolar',
  'Protecao integral e salvaguarda institucional',
  'Evidencias, certificados e relatórios gerenciais',
]

export default function DirecionalEscolasPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#06101c] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_8%,rgba(244,219,118,.20),transparent_30%),radial-gradient(circle_at_14%_82%,rgba(59,130,246,.14),transparent_28%),linear-gradient(145deg,#06101c_0%,#0a2749_52%,#02060b_100%)]" />
        <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(244,219,118,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(244,219,118,.07)_1px,transparent_1px)] [background-size:82px_82px]" />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 pb-20 pt-16 sm:px-6 md:pt-24 lg:grid-cols-[1.02fr_.98fr] lg:px-8 lg:pb-28">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-gold-light/30 bg-gold-light/10 px-5 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-gold-light">
              Para escolas que vieram pela Direcional
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.035em] md:text-6xl">
              Governança escolar, formação e evidências para proteger sua instituição.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-200 md:text-xl">
              A Excellentia ajuda escolas privadas a transformar obrigações, cursos, registros e riscos institucionais em uma rotina clara de governança.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href={renataWhatsApp} target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-gold px-8 py-4 text-center text-lg font-extrabold text-white shadow-2xl shadow-gold/20 transition hover:bg-yellow-600">
                Falar com Renata
              </a>
              <a href="#diagnostico" className="rounded-2xl border border-white/25 bg-white/10 px-8 py-4 text-center text-lg font-extrabold text-white transition hover:bg-white/15">
                Solicitar diagnóstico
              </a>
            </div>
            <p className="mt-5 text-sm font-semibold text-slate-300">WhatsApp direto: (11) 95213-3049</p>
          </div>

          <div className="relative">
            <div className="absolute inset-8 rounded-full bg-gold-light/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/15 bg-white/[0.075] shadow-2xl backdrop-blur">
              <div className="relative h-[420px]">
                <Image
                  src="/caio-editorial.jpg"
                  alt="Caio Leite, fundador da Excellentia"
                  fill
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06101c] via-[#06101c]/25 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <div className="text-xs font-black uppercase tracking-[0.24em] text-gold-light">Excellentia</div>
                  <p className="mt-2 max-w-md text-2xl font-black leading-tight text-white">
                    Leitura jurídico-pedagógica para decisões que a escola precisa comprovar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#06101c] py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_0%,rgba(244,219,118,.12),transparent_28%),linear-gradient(180deg,#06101c_0%,#0a2749_100%)]" />
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

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {capabilities.map((item, index) => (
              <div key={item.title} className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 shadow-xl backdrop-blur">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-light text-sm font-black text-navy">{index + 1}</span>
                <h3 className="mt-8 text-2xl font-black text-white">{item.title}</h3>
                <p className="mt-4 leading-7 text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f8fafc] py-20 text-navy">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
          <div>
            <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-gold">frentes cobertas</div>
            <h2 className="text-3xl font-black tracking-[-0.025em] md:text-5xl">
              Uma base para formar, registrar e decidir.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-700">
              A proposta não é tratar cada obrigação como um arquivo separado. É organizar uma operação formativa e documental que ajude a escola a sustentar suas decisões.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {tracks.map((track) => (
              <div key={track} className="rounded-2xl border border-slate-200 bg-white p-5 font-bold text-navy shadow-sm">
                {track}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="diagnostico" className="relative overflow-hidden bg-navy py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(244,219,118,.13),transparent_30%),linear-gradient(180deg,#0a2749_0%,#06101c_100%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[.82fr_1.18fr] lg:px-8">
          <div>
            <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-gold-light">próximo passo</div>
            <h2 className="text-3xl font-black tracking-[-0.025em] md:text-5xl">
              Comece por uma conversa objetiva sobre a sua escola.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              A Renata conduz o primeiro contato comercial e encaminha a leitura adequada para a realidade da instituição.
            </p>
            <div className="mt-8 rounded-[2rem] border border-white/12 bg-white/[0.07] p-6">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-gold-light">canal direto</p>
              <p className="mt-3 text-2xl font-black text-white">(11) 95213-3049</p>
              <a href={renataWhatsApp} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex rounded-2xl bg-gold px-6 py-3 font-black text-white transition hover:bg-yellow-600">
                Abrir WhatsApp
              </a>
            </div>
          </div>

          <DirecionalLeadForm />
        </div>
      </section>

      <section className="bg-[#06101c] py-16 text-white">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-gold-light">Excellentia</p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.025em] md:text-5xl">
            Governanca escolar nao se improvisa quando o problema aparece.
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
