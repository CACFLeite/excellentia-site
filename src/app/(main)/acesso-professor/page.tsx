import type { Metadata } from 'next'
import Link from 'next/link'
import TeacherAccessForm from './TeacherAccessForm'

export const metadata: Metadata = {
  title: 'Acesso do Professor — Excellentia',
  description:
    'Entrada para professores acessarem cursos Excellentia por assinatura individual, convite institucional ou link autorizado.',
}

export default function AcessoProfessorPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#06101c] py-20 text-white md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(244,219,118,.20),transparent_28%),radial-gradient(circle_at_9%_35%,rgba(59,130,246,.13),transparent_25%),linear-gradient(145deg,#06101c_0%,#0a2749_48%,#02060b_100%)]" />
        <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(244,219,118,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(244,219,118,.07)_1px,transparent_1px)] [background-size:72px_72px]" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex rounded-full border border-gold-light/30 bg-gold-light/10 px-5 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-gold-light">
              Acesso do Professor
            </div>
            <h1 className="text-4xl font-black leading-[1.02] tracking-[-0.04em] md:text-6xl">
              Entre nos cursos pelo caminho correto.
            </h1>
            <p className="mt-7 text-lg leading-8 text-slate-200 md:text-xl">
              Professores acessam os cursos por link autorizado, convite institucional ou assinatura individual. O catálogo público fica separado da área de acesso.
            </p>
            <TeacherAccessForm />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_0%,rgba(244,219,118,.13),transparent_28%),linear-gradient(180deg,#0a2749_0%,#071d38_100%)]" />
        <div className="relative mx-auto grid max-w-5xl grid-cols-1 gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div className="rounded-[2rem] border border-gold-light/45 bg-gold-light/10 p-7 shadow-2xl shadow-gold/10">
            <h2 className="text-2xl font-black">Já tenho link de acesso</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Use o link recebido por e-mail ou pela escola. Ele abre o curso com o token autorizado.
            </p>
            <Link href="/acesso-escolar" className="mt-7 inline-flex rounded-2xl bg-gold px-6 py-4 font-black text-white transition hover:bg-yellow-600">
              Ativar convite
            </Link>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-7">
            <h2 className="text-2xl font-black">Quero comprar acesso</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Consulte os planos individuais para professores e finalize a assinatura pela Stripe.
            </p>
            <Link href="/assinatura" className="mt-7 inline-flex rounded-2xl bg-gold px-6 py-4 font-black text-white transition hover:bg-yellow-600">
              Ver assinatura
            </Link>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-7">
            <h2 className="text-2xl font-black">Ver cursos disponíveis</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Abra o catálogo público para conhecer as formações antes do acesso autorizado.
            </p>
            <Link href="/formacoes" className="mt-7 inline-flex rounded-2xl bg-gold px-6 py-4 font-black text-white transition hover:bg-yellow-600">
              Abrir catálogo
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
