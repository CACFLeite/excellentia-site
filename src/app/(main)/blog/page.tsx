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
      'A norma trouxe urgência para uma realidade que já existia: pressão, conflito, registro, saúde do trabalho e decisão institucional convivem na rotina escolar.',
    date: '9 de maio de 2026',
    readTime: '7 min',
    category: 'Governança',
    categoryColor: 'bg-navy text-white',
  },
  {
    slug: 'pgr-gro-governanca-escolar',
    title: 'PGR/GRO na escola: documento técnico ou instrumento de governança?',
    excerpt:
      'O PGR ganha valor quando documento técnico, calendário, responsabilidades, formação e revisão da prática começam a se comunicar.',
    date: '9 de maio de 2026',
    readTime: '6 min',
    category: 'Compliance',
    categoryColor: 'bg-gold text-white',
  },
  {
    slug: 'lei-lucas-protocolo-evidencias',
    title: 'Lei Lucas: protocolo, evidência e o limite da formação online',
    excerpt:
      'A camada digital ajuda quando prepara, organiza e documenta, preservando o lugar indispensável da prática presencial em primeiros socorros.',
    date: '9 de maio de 2026',
    readTime: '7 min',
    category: 'Segurança',
    categoryColor: 'bg-navy text-white',
  },
  {
    slug: 'lgpd-escolar-privacidade',
    title: 'LGPD escolar: privacidade, titulares e rotina administrativa',
    excerpt:
      'Privacidade escolar se constrói em gestos cotidianos: documentos, imagens, laudos, mensagens, plataformas e respostas a famílias.',
    date: '9 de maio de 2026',
    readTime: '6 min',
    category: 'LGPD',
    categoryColor: 'bg-gold text-white',
  },
  {
    slug: 'bullying-cyberbullying-violencia-escolar',
    title: 'Bullying e cyberbullying: quando convivência vira governança',
    excerpt:
      'O tema atravessa disciplina, proteção, registro, comunicação, proporcionalidade e cuidado com exposição indevida.',
    date: '9 de maio de 2026',
    readTime: '8 min',
    category: 'Proteção escolar',
    categoryColor: 'bg-navy text-white',
  },
  {
    slug: 'protecao-integral-eca-salvaguarda',
    title: 'Proteção integral, ECA e salvaguarda: o que a escola precisa organizar',
    excerpt:
      'Proteção integral depende de papéis claros para observar, registrar, encaminhar e comunicar com cuidado diante de sinais ambíguos.',
    date: '9 de maio de 2026',
    readTime: '7 min',
    category: 'Proteção escolar',
    categoryColor: 'bg-gold text-white',
  },
  {
    slug: 'incendio-evacuacao-cultura-preventiva',
    title: 'Incêndio e evacuação: cultura preventiva além do extintor',
    excerpt:
      'Segurança se sustenta na repetição de orientação, simulação, definição de papéis, registro e revisão das falhas encontradas.',
    date: '9 de maio de 2026',
    readTime: '5 min',
    category: 'Segurança',
    categoryColor: 'bg-navy text-white',
  },
  {
    slug: 'formacoes-personalizadas-matriz-risco',
    title: 'Formações personalizadas: a matriz de risco de cada escola',
    excerpt:
      'Personalizar exige partir da exposição real, da maturidade da escola e da ordem de prioridade, em vez de apenas adaptar a capa do curso.',
    date: '9 de maio de 2026',
    readTime: '6 min',
    category: 'Estratégia',
    categoryColor: 'bg-gold text-white',
  },
  {
    slug: 'como-se-preparar-para-processos-seletivos',
    title: 'Como se preparar para processos seletivos em escolas particulares',
    excerpt:
      'A maioria dos professores chega ao processo seletivo sem preparação adequada. Conheça o passo a passo completo: currículo, entrevista e aula teste.',
    date: '15 de março de 2026',
    readTime: '8 min',
    category: 'Carreira',
    categoryColor: 'bg-gold text-white',
  },
  {
    slug: 'nr1-nas-escolas',
    title: 'NR1 nas escolas: o que todo gestor escolar precisa saber',
    excerpt:
      'A nova NR1 sobre gestão de riscos psicossociais entrou em vigor em 2025 e as escolas precisam se adequar. Entenda o que muda e quais são as obrigações.',
    date: '8 de março de 2026',
    readTime: '6 min',
    category: 'Direitos',
    categoryColor: 'bg-navy text-white',
  },
]

export default function BlogPage() {
  const featuredPost = posts.find((post) => post.featured) ?? posts[0]
  const remainingPosts = posts.filter((post) => post.slug !== featuredPost.slug)

  return (
    <>
      <section className="relative overflow-hidden bg-[#06101c] py-20 text-white md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_16%,rgba(244,219,118,.20),transparent_30%),radial-gradient(circle_at_14%_34%,rgba(59,130,246,.13),transparent_24%),linear-gradient(145deg,#06101c_0%,#0a2749_48%,#02060b_100%)]" />
        <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(244,219,118,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(244,219,118,.07)_1px,transparent_1px)] [background-size:72px_72px]" />
        <svg className="pointer-events-none absolute inset-x-0 bottom-[-9rem] hidden h-[28rem] w-full opacity-60 lg:block" viewBox="0 0 1440 420" fill="none" aria-hidden="true">
          <path d="M70 270C285 90 472 360 690 198C925 24 1132 170 1328 72" stroke="#f4db76" strokeOpacity=".42" strokeWidth="3" strokeLinecap="round" />
          <path d="M210 360C420 222 585 372 800 250C1008 132 1160 202 1288 152" stroke="#f4db76" strokeOpacity=".16" strokeWidth="2" strokeLinecap="round" />
        </svg>

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-end gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_.85fr] lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex rounded-full border border-gold-light/30 bg-gold-light/10 px-5 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-gold-light">
              Análises e guias
            </div>
            <h1 className="text-5xl font-black leading-[1.02] tracking-[-0.04em] md:text-7xl">Inteligência Educacional</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-200 md:text-xl">
              Leituras práticas sobre governança educacional, compliance escolar, carreira, direitos e saúde profissional.
            </p>
          </div>

          <Link href={`/inteligencia-educacional/${featuredPost.slug}`} className="group rounded-[2.5rem] border border-white/15 bg-white/[0.08] p-7 shadow-2xl backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-gold-light/40">
            <div className="mb-8 flex items-center justify-between gap-4">
              <span className={`rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-[0.18em] ${featuredPost.categoryColor}`}>{featuredPost.category}</span>
              <span className="text-sm text-slate-300">{featuredPost.readTime} de leitura</span>
            </div>
            <h2 className="text-2xl font-black leading-tight text-white md:text-3xl">{featuredPost.title}</h2>
            <p className="mt-5 leading-7 text-slate-300">{featuredPost.excerpt}</p>
            <span className="mt-7 inline-flex font-extrabold text-gold-light transition group-hover:translate-x-1">Ler artigo completo →</span>
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f7f4ec] py-20">
        <div className="absolute left-[-10rem] top-16 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute right-[-8rem] bottom-24 h-80 w-80 rounded-full bg-navy/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="mb-3 text-sm font-black uppercase tracking-[0.24em] text-gold">publicações</div>
              <h2 className="max-w-3xl text-3xl font-black tracking-[-0.03em] text-navy md:text-5xl">Temas para decisões mais conscientes na escola.</h2>
            </div>
            <p className="max-w-xl text-lg leading-8 text-slate-600">
              Conteúdos organizados para apoiar leitura institucional, formação de equipes e maturidade de governança.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {remainingPosts.map((post, index) => (
              <article key={post.slug} className={`group rounded-[2rem] border border-slate-200 bg-white p-7 shadow-xl transition duration-300 hover:-translate-y-1 hover:border-gold/35 hover:shadow-2xl ${index % 3 === 1 ? 'xl:mt-10' : ''}`}>
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.16em] ${post.categoryColor}`}>{post.category}</span>
                  <span className="text-sm text-slate-400">{post.date}</span>
                  <span className="text-sm text-slate-400">· {post.readTime} de leitura</span>
                </div>
                <h3 className="text-2xl font-black leading-tight text-navy transition group-hover:text-gold">
                  <Link href={`/inteligencia-educacional/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="mt-5 leading-7 text-slate-600">{post.excerpt}</p>
                <Link href={`/inteligencia-educacional/${post.slug}`} className="mt-7 inline-flex items-center gap-2 font-extrabold text-gold transition group-hover:translate-x-1">
                  Ler artigo completo
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-20 overflow-hidden rounded-[2.5rem] bg-navy text-white shadow-2xl">
            <div className="grid grid-cols-1 items-center gap-8 p-8 md:p-10 lg:grid-cols-[1fr_auto]">
              <div>
                <div className="mb-3 text-sm font-black uppercase tracking-[0.24em] text-gold-light">acompanhe a inteligência educacional</div>
                <h3 className="text-3xl font-black tracking-[-0.03em] md:text-4xl">Receba novas análises por e-mail</h3>
                <p className="mt-4 max-w-2xl leading-7 text-slate-300">
                  Conteúdos sobre governança educacional, carreira docente e conformidade escolar direto na sua caixa de entrada.
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
