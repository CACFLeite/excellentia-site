import type { Metadata } from 'next'
import ContatoForm from './ContatoForm'

export const metadata: Metadata = {
  title: 'Contato — Excellentia',
  description: 'Entre em contato com a Excellentia para assuntos de escolas, professores, cursos e suporte operacional.',
}

const channels = [
  {
    label: 'E-mail',
    title: 'atendimento@excellentia-edu.com',
    href: 'mailto:atendimento@excellentia-edu.com',
  },
  {
    label: 'WhatsApp',
    title: 'Falar com a equipe',
    href: 'https://wa.me/5511952133049?text=Olá!%20Vim%20pelo%20site%20da%20Excellentia',
  },
  {
    label: 'Prazo',
    title: 'Até 24 horas úteis',
  },
]

export default function ContatoPage() {
  return (
    <section className="relative isolate overflow-hidden bg-[#06101c] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_10%,rgba(244,219,118,.18),transparent_28%),radial-gradient(circle_at_8%_38%,rgba(59,130,246,.11),transparent_26%),linear-gradient(145deg,#06101c_0%,#0a2749_58%,#f7f4ec_58.2%,#f7f4ec_100%)] lg:bg-[radial-gradient(circle_at_78%_10%,rgba(244,219,118,.18),transparent_28%),radial-gradient(circle_at_8%_38%,rgba(59,130,246,.11),transparent_26%),linear-gradient(145deg,#06101c_0%,#0a2749_55%,#f7f4ec_55.2%,#f7f4ec_100%)]" />
      <div className="absolute inset-x-0 top-0 h-[54rem] opacity-35 [background-image:linear-gradient(rgba(244,219,118,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(244,219,118,.07)_1px,transparent_1px)] [background-size:72px_72px]" />
      <svg className="pointer-events-none absolute left-0 top-20 hidden h-[760px] w-full opacity-65 lg:block" viewBox="0 0 1440 760" fill="none" aria-hidden="true">
        <path d="M110 390C340 210 528 472 744 318C950 172 1128 254 1302 430" stroke="#f4db76" strokeOpacity=".28" strokeWidth="3" strokeLinecap="round" />
        <path d="M176 500C414 354 596 520 792 410C1005 292 1130 374 1258 520" stroke="#f4db76" strokeOpacity=".14" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <div className="absolute left-[-10rem] bottom-24 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />
      <div className="absolute right-[-8rem] top-[36rem] h-80 w-80 rounded-full bg-navy/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[.92fr_1.08fr] lg:items-stretch">
          <div className="flex min-h-[620px] flex-col justify-between pb-2 lg:pb-10">
            <div>
              <div className="mb-6 inline-flex rounded-full border border-gold-light/30 bg-gold-light/10 px-5 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-gold-light">
                Contato
              </div>
              <h1 className="max-w-3xl text-4xl font-black leading-[1.02] tracking-[-0.04em] md:text-6xl lg:text-7xl">
                Conte o contexto. A Excellentia responde pelo escopo certo.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-200 md:text-xl">
                Formações, assinaturas, parcerias ou suporte: envie o essencial e retornaremos com o encaminhamento adequado.
              </p>
            </div>

            <div className="mt-12 max-w-2xl lg:mt-0">
              <div className="border-l border-gold-light/45 pl-6">
                <div className="text-xs font-black uppercase tracking-[0.24em] text-gold-light">para acelerar a resposta</div>
                <p className="mt-4 text-2xl font-black leading-tight text-white">
                  Indique tema, público e urgência. No retorno, organizamos o próximo passo.
                </p>
              </div>
            </div>
          </div>

          <div className="relative rounded-[3rem] border border-white/15 bg-white/[0.08] p-3 shadow-2xl shadow-navy/25 backdrop-blur-md">
            <div className="absolute -left-8 top-16 hidden h-px w-16 bg-gradient-to-r from-transparent to-gold-light/70 lg:block" />
            <div className="overflow-hidden rounded-[2.45rem] bg-[#f7f4ec]/95 text-navy shadow-inner shadow-white/30">
              <div className="grid grid-cols-1 lg:grid-cols-[.43fr_.57fr]">
                <aside className="relative overflow-hidden bg-navy p-6 text-white md:p-8 lg:min-h-full">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(244,219,118,.18),transparent_30%),linear-gradient(180deg,#0a2749_0%,#06101c_100%)]" />
                  <div className="relative">
                    <div className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-gold-light">canais</div>
                    <h2 className="text-3xl font-black tracking-[-0.03em]">Canal direto, demanda registrada.</h2>
                    <p className="mt-4 text-sm leading-6 text-slate-300">
                      O formulário preserva o contexto. Se preferir, escreva por e-mail ou WhatsApp.
                    </p>

                    <div className="mt-9 space-y-5">
                      {channels.map((item, index) => (
                        <div key={item.label} className="relative border-l border-gold-light/35 pl-5">
                          <div className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-gold-light shadow-[0_0_18px_rgba(244,219,118,.45)]" />
                          <div className="text-[10px] font-black uppercase tracking-[0.22em] text-gold-light">0{index + 1} · {item.label}</div>
                          {item.href ? (
                            <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="mt-2 block break-words text-sm font-extrabold text-white transition hover:text-gold-light">
                              {item.title} →
                            </a>
                          ) : (
                            <p className="mt-2 text-sm font-extrabold text-white">{item.title}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </aside>

                <div className="p-5 md:p-8">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-gold/60 to-transparent" />
                    <div className="text-[10px] font-black uppercase tracking-[0.24em] text-gold">mensagem</div>
                  </div>
                  <ContatoForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
