import type { Metadata } from 'next'
import ContatoForm from './ContatoForm'

export const metadata: Metadata = {
  title: 'Contato — Excellentia',
  description: 'Entre em contato com a Excellentia para assuntos de escolas, professores, cursos e suporte operacional.',
}

const contactNotes = [
  {
    label: 'E-mail',
    title: 'atendimento@excellentia-edu.com',
    href: 'mailto:atendimento@excellentia-edu.com',
  },
  {
    label: 'Prazo',
    title: 'Até 24 horas úteis',
  },
  {
    label: 'Base',
    title: 'São Paulo, SP — Brasil',
  },
]

export default function ContatoPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#06101c] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(244,219,118,.18),transparent_28%),radial-gradient(circle_at_12%_36%,rgba(59,130,246,.12),transparent_25%),linear-gradient(145deg,#06101c_0%,#0a2749_48%,#02060b_100%)]" />
        <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(244,219,118,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(244,219,118,.07)_1px,transparent_1px)] [background-size:72px_72px]" />
        <svg className="pointer-events-none absolute inset-x-0 bottom-[-10rem] hidden h-[30rem] w-full opacity-50 lg:block" viewBox="0 0 1440 440" fill="none" aria-hidden="true">
          <path d="M86 292C292 110 506 372 718 212C940 44 1112 150 1328 78" stroke="#f4db76" strokeOpacity=".34" strokeWidth="3" strokeLinecap="round" />
          <path d="M190 372C416 240 582 380 802 260C1006 150 1164 218 1294 166" stroke="#f4db76" strokeOpacity=".14" strokeWidth="2" strokeLinecap="round" />
        </svg>

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-end gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[1fr_.74fr] lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex rounded-full border border-gold-light/30 bg-gold-light/10 px-5 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-gold-light">
              Contato
            </div>
            <h1 className="text-5xl font-black leading-[1.02] tracking-[-0.04em] md:text-7xl">Converse com a Excellentia.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-200 md:text-xl">
              Use este canal para escolas, formações, assinaturas, parcerias ou suporte. Responderemos com o próximo passo objetivo.
            </p>
          </div>

          <div className="rounded-[2.5rem] border border-white/15 bg-white/[0.08] p-7 shadow-2xl backdrop-blur-md">
            <div className="text-xs font-extrabold uppercase tracking-[0.24em] text-gold-light">antes de enviar</div>
            <p className="mt-5 text-2xl font-black leading-tight text-white">
              Se for uma escola, conte o tema, o público e a urgência. Se for professor, indique a formação ou dúvida principal.
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f7f4ec] py-20">
        <div className="absolute left-[-10rem] top-16 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute right-[-8rem] bottom-24 h-80 w-80 rounded-full bg-navy/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
            <aside className="rounded-[2.5rem] bg-navy p-7 text-white shadow-2xl md:p-8">
              <div className="mb-3 text-sm font-black uppercase tracking-[0.24em] text-gold-light">canais</div>
              <h2 className="text-3xl font-black tracking-[-0.03em]">Direto ao ponto.</h2>
              <p className="mt-4 leading-7 text-slate-300">
                O formulário mantém o histórico organizado. Se preferir, escreva direto por e-mail.
              </p>

              <div className="mt-8 space-y-3">
                {contactNotes.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                    <div className="text-[10px] font-black uppercase tracking-[0.22em] text-gold-light">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="mt-2 block break-words font-bold text-white transition hover:text-gold-light">
                        {item.title}
                      </a>
                    ) : (
                      <p className="mt-2 font-bold text-white">{item.title}</p>
                    )}
                  </div>
                ))}
              </div>
            </aside>

            <div className="rounded-[2.5rem] border border-slate-200 bg-white/80 p-3 shadow-2xl shadow-navy/10 backdrop-blur">
              <ContatoForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
