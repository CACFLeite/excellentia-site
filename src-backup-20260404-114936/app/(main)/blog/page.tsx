import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog — Excellentia',
  description: 'Artigos sobre carreira docente, direitos dos professores e saúde emocional.',
}

const posts = [
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
              Artigos e insights
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Blog Excellentia</h1>
            <p className="text-xl text-gray-300">
              Conteúdo prático sobre carreira, direitos e saúde para professores.
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
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-6">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
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
            <h3 className="text-2xl font-bold mb-3">Receba novos artigos por e-mail</h3>
            <p className="text-gray-300 mb-6">
              Toda semana um conteúdo novo sobre carreira docente direto na sua caixa de entrada.
            </p>
            <Link
              href="/assinatura"
              className="bg-gold hover:bg-yellow-600 text-white font-bold px-8 py-4 rounded-lg transition-colors inline-block"
            >
              Assinar Excellentia — R$69/mês
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
