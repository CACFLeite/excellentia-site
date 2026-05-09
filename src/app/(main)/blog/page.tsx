import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Inteligência Educacional — Excellentia',
  description: 'Análises sobre governança educacional, compliance escolar, carreira docente, direitos dos professores e saúde emocional.',
}

const posts = [

  {
    slug: 'riscos-psicossociais-escolas',
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
  return (
    <>
      {/* Header */}
      <section className="bg-navy text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-block bg-gold text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
              Análises e guias
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Inteligência Educacional</h1>
            <p className="text-xl text-gray-300">
              Leituras práticas sobre governança educacional, compliance escolar, carreira, direitos e saúde profissional.
            </p>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide ${post.categoryColor}`}>
                      {post.category}
                    </span>
                    <span className="text-gray-400 text-sm">{post.date}</span>
                    <span className="text-gray-400 text-sm">· {post.readTime} de leitura</span>
                  </div>
                  <h2 className="text-2xl font-bold text-navy mb-3 hover:text-gold transition-colors">
                    <Link href={`/inteligencia-educacional/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-6">{post.excerpt}</p>
                  <Link
                    href={`/inteligencia-educacional/${post.slug}`}
                    className="text-gold font-semibold hover:text-gold-dark transition-colors inline-flex items-center gap-1"
                  >
                    Ler artigo completo
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="mt-16 bg-navy text-white rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-3">Receba novas análises por e-mail</h3>
            <p className="text-gray-300 mb-6">
              Conteúdos sobre governança educacional, carreira docente e conformidade escolar direto na sua caixa de entrada.
            </p>
            <Link
              href="/contato"
              className="bg-gold hover:bg-yellow-600 text-white font-bold px-8 py-4 rounded-lg transition-colors inline-block"
            >
              Falar com a Excellentia
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
