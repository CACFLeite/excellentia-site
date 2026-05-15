import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Inteligência Educacional — Excellentia',
  description: 'Análises sobre governança educacional, compliance escolar, carreira docente, direitos dos professores e saúde emocional.',
}

const posts = [
  {
    slug: 'riscos-psicossociais-escolas',
    featured: true,
    title: 'Riscos psicossociais nas escolas: por onde a governança começa',
    excerpt:
      'Pressão, conflito, registro e saúde do trabalho já fazem parte da rotina. A governança começa quando a escola deixa de tratar isso como evento isolado.',
    date: '9 de maio de 2026',
    readTime: '7 min',
    category: 'Governança',
    categoryColor: 'bg-navy text-white',
  },
  {
    slug: 'pgr-gro-governanca-escolar',
    title: 'PGR/GRO na escola: documento técnico ou instrumento de governança?',
    excerpt:
      'O PGR ganha valor quando responsabilidades, calendário, formação e revisão da prática começam a se comunicar.',
    date: '9 de maio de 2026',
    readTime: '6 min',
    category: 'Compliance',
    categoryColor: 'bg-gold text-white',
  },
  {
    slug: 'lei-lucas-protocolo-evidencias',
    title: 'Lei Lucas: protocolo, evidência e o limite da formação online',
    excerpt:
      'A camada digital prepara, organiza e documenta — sem substituir a prática presencial em primeiros socorros.',
    date: '9 de maio de 2026',
    readTime: '7 min',
    category: 'Segurança',
    categoryColor: 'bg-navy text-white',
  },
  {
    slug: 'lgpd-escolar-privacidade',
    title: 'LGPD escolar: privacidade, titulares e rotina administrativa',
    excerpt:
      'Privacidade escolar se constrói em documentos, imagens, laudos, mensagens, plataformas e respostas a famílias.',
    date: '9 de maio de 2026',
    readTime: '6 min',
    category: 'LGPD',
    categoryColor: 'bg-gold text-white',
  },
  {
    slug: 'bullying-cyberbullying-violencia-escolar',
    title: 'Bullying e cyberbullying: quando convivência vira governança',
    excerpt:
      'O tema atravessa proteção, registro, comunicação, proporcionalidade e cuidado com exposição indevida.',
    date: '9 de maio de 2026',
    readTime: '8 min',
    category: 'Proteção escolar',
    categoryColor: 'bg-navy text-white',
  },
  {
    slug: 'protecao-integral-eca-salvaguarda',
    title: 'Proteção integral, ECA e salvaguarda: o que a escola precisa organizar',
    excerpt:
      'Papéis claros para observar, registrar, encaminhar e comunicar diante de sinais ambíguos.',
    date: '9 de maio de 2026',
    readTime: '7 min',
    category: 'Proteção escolar',
    categoryColor: 'bg-gold text-white',
  },
  {
    slug: 'incendio-evacuacao-cultura-preventiva',
    title: 'Incêndio e evacuação: cultura preventiva além do extintor',
    excerpt:
      'Segurança depende de orientação, simulação, definição de papéis, registro e revisão de falhas.',
    date: '9 de maio de 2026',
    readTime: '5 min',
    category: 'Segurança',
    categoryColor: 'bg-navy text-white',
  },
  {
    slug: 'formacoes-personalizadas-matriz-risco',
    title: 'Formações personalizadas: a matriz de risco de cada escola',
    excerpt:
      'Personalizar exige partir da exposição real, da maturidade institucional e da ordem de prioridade.',
    date: '9 de maio de 2026',
    readTime: '6 min',
    category: 'Estratégia',
    categoryColor: 'bg-gold text-white',
  },
  {
    slug: 'como-se-preparar-para-processos-seletivos',
    title: 'Como se preparar para processos seletivos em escolas particulares',
    excerpt:
      'Currículo, entrevista e aula teste com mais intenção, repertório e leitura da escola.',
    date: '15 de março de 2026',
    readTime: '8 min',
    category: 'Carreira',
    categoryColor: 'bg-gold text-white',
  },
  {
    slug: 'nr1-nas-escolas',
    title: 'NR1 nas escolas: o que todo gestor escolar precisa saber',
    excerpt:
      'A gestão de riscos psicossociais exige organização, evidência e leitura institucional contínua.',
    date: '8 de março de 2026',
    readTime: '6 min',
    category: 'Direitos',
    categoryColor: 'bg-navy text-white',
  },
]

export default function BlogPage() {
  const featuredPost = posts.find((post) => post.featured) ?? posts[0]
  const remainingPosts = posts.filter((post) => post.slug !== featuredPost.slug)
  const essentialPosts = remainingPosts.slice(0, 3)
  const archivePosts = remainingPosts.slice(3)

  return (
    <>
      <section className="relative overflow-hidden bg-[#06101c] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(244,219,118,.20),transparent_28%),radial-gradient(circle_at_9%_35%,rgba(59,130,246,.13),transparent_25%),linear-gradient(145deg,#06101c_0%,#0a2749_44%,#02060b_100%)]" />
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(244,219,118,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(244,219,118,.07)_1px,transparent_1px)] [background-size:72px_72px]" />
        <svg className="pointer-events-none absolute inset-x-0 bottom-[-8rem] hidden h-[30rem] w-full opacity-60 lg:block" viewBox="0 0 1440 420" fill="none" aria-hidden="true">
          <path d="M90 280C304 96 480 364 700 198C936 20 1128 160 1328 76" stroke="#f4db76" strokeOpacity=".36" strokeWidth="3" strokeLinecap="round" />
          <path d="M214 356C424 220 586 374 805 248C1018 126 1165 204 1292 150" stroke="#f4db76" strokeOpacity=".14" strokeWidth="2" strokeLinecap="round" />
        </svg>

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 md:pb-24 md:pt-28 lg:px-8">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[.74fr_1fr] lg:items-end">
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex rounded-full border border-gold-light/30 bg-gold-light/10 px-5 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-gold-light">
                Curadoria Excellentia
              </div>
              <h1 className="text-5xl font-black leading-[1.02] tracking-[-0.04em] md:text-7xl">Análises para ler a escola com mais lastro.</h1>
              <p className="mt-7 text-lg leading-8 text-slate-200 md:text-xl">
                Uma seleção curta sobre risco, norma e rotina escolar — sem repertório em excesso.
              </p>
            </div>

            <Link href={`/inteligencia-educacional/${featuredPost.slug}`} className="group relative overflow-hidden rounded-[2.75rem] border border-white/15 bg-white/[0.08] p-7 shadow-2xl backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-gold-light/45 md:p-9">
              <div className="absolute right-[-5rem] top-[-5rem] h-56 w-56 rounded-full bg-gold-light/15 blur-3xl" />
              <div className="relative">
                <div className="mb-10 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-gold-light px-4 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-navy">leitura recomendada</span>
                  <span className={`rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-[0.18em] ${featuredPost.categoryColor}`}>{featuredPost.category}</span>
                  <span className="text-sm text-slate-300">{featuredPost.readTime}</span>
                </div>
                <h2 className="max-w-3xl text-3xl font-black leading-tight tracking-[-0.03em] text-white md:text-5xl">{featuredPost.title}</h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{featuredPost.excerpt}</p>
                <div className="mt-9 flex items-center gap-4 border-t border-white/10 pt-6">
                  <span className="font-extrabold text-gold-light transition group-hover:translate-x-1">Ler análise →</span>
                  <span className="text-sm text-slate-400">{featuredPost.date}</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy py-20 text-white md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_0%,rgba(244,219,118,.13),transparent_28%),linear-gradient(180deg,#0a2749_0%,#071d38_100%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-light/50 to-transparent" />
        <svg className="pointer-events-none absolute left-0 top-[-5rem] hidden h-[48rem] w-full opacity-50 lg:block" viewBox="0 0 1440 760" fill="none" aria-hidden="true">
          <path d="M92 212C304 54 482 302 706 158C934 12 1128 146 1328 58" stroke="#f4db76" strokeOpacity=".34" strokeWidth="3" strokeLinecap="round" />
          <path d="M210 338C420 196 588 372 808 248C1018 130 1166 206 1294 150" stroke="#f4db76" strokeOpacity=".14" strokeWidth="2" strokeLinecap="round" />
          <path d="M118 574C334 418 510 634 738 504C952 382 1126 488 1308 404" stroke="#f4db76" strokeOpacity=".18" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[.68fr_1fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-gold-light">próxima leitura</div>
              <h2 className="max-w-xl text-3xl font-black tracking-[-0.03em] text-white md:text-5xl">Três leituras para continuar sem dispersar.</h2>
              <p className="mt-5 max-w-lg text-lg leading-8 text-slate-300">
                A curadoria privilegia prioridade: primeiro a análise central, depois poucas leituras de apoio.
              </p>
            </div>

            <div className="space-y-4">
              {essentialPosts.map((post, index) => (
                <Link key={post.slug} href={`/inteligencia-educacional/${post.slug}`} className="group grid gap-5 rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 shadow-2xl backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-gold-light/35 hover:bg-white/[0.085] md:grid-cols-[4.5rem_1fr_auto] md:items-center md:p-7">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-light text-lg font-black text-navy shadow-lg shadow-gold/10">0{index + 1}</div>
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-3">
                      <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] ${post.categoryColor}`}>{post.category}</span>
                      <span className="text-sm text-slate-400">{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-black leading-tight text-white transition group-hover:text-gold-light md:text-2xl">{post.title}</h3>
                    <p className="mt-3 max-w-2xl leading-7 text-slate-300">{post.excerpt}</p>
                  </div>
                  <span className="font-extrabold text-gold-light transition group-hover:translate-x-1">Ler →</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 rounded-[2.5rem] border border-white/10 bg-white/[0.055] p-6 shadow-2xl backdrop-blur md:p-8 lg:grid-cols-[.46fr_1fr] lg:gap-10">
            <div>
              <div className="mb-3 text-sm font-black uppercase tracking-[0.24em] text-gold-light">arquivo de análises</div>
              <h3 className="text-2xl font-black tracking-[-0.03em] text-white md:text-3xl">Leituras disponíveis, sem competir com a recomendação.</h3>
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-0 md:grid-cols-2">
              {archivePosts.map((post) => (
                <Link key={post.slug} href={`/inteligencia-educacional/${post.slug}`} className="group border-t border-white/10 py-4 transition hover:border-gold-light/50">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.18em] text-gold-light">{post.category}</span>
                    <span className="shrink-0 text-sm text-slate-400">{post.readTime}</span>
                  </div>
                  <h4 className="mt-2 font-black leading-snug text-white transition group-hover:text-gold-light">{post.title}</h4>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-16 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.06] text-white shadow-2xl backdrop-blur">
            <div className="grid grid-cols-1 items-center gap-8 p-8 md:p-10 lg:grid-cols-[1fr_auto]">
              <div>
                <div className="mb-3 text-sm font-black uppercase tracking-[0.24em] text-gold-light">para escolas</div>
                <h3 className="text-3xl font-black tracking-[-0.03em] md:text-4xl">Quer levar esse repertório para a equipe?</h3>
                <p className="mt-4 max-w-2xl leading-7 text-slate-300">
                  Converse sobre uma trilha alinhada aos riscos e prioridades da sua instituição.
                </p>
              </div>
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
