import type { Metadata } from 'next'
import Link from 'next/link'
import CourseCard from '@/components/CourseCard'

export const metadata: Metadata = {
  title: 'Cursos — Excellentia',
  description: 'Todos os cursos da plataforma Excellentia para professores de escolas particulares.',
}

const courses = [
  {
    title: 'Gestão de Carreira para Professores',
    description:
      'O guia completo para o processo seletivo de escolas particulares: currículo profissional, entrevistas, aula teste, planejamento de aula, documentação e muito mais.',
    status: 'active' as const,
    price: 'R$9/mês — acesso completo',
    href: '/assinatura',
    icon: '🎯',
  },
  {
    title: 'Cotidiano Escolar',
    description:
      'Como navegar o dia a dia da escola com autoridade, limites saudáveis e relações profissionais com coordenação, colegas e pais de alunos.',
    status: 'coming-soon' as const,
    icon: '🏫',
  },
  {
    title: 'Saúde Emocional do Professor',
    description:
      'Burnout, síndrome de Boreout, ansiedade docente. Ferramentas práticas de autocuidado para ensinar sem se destruir.',
    status: 'coming-soon' as const,
    icon: '🧠',
  },
  {
    title: 'NR1 nas Escolas',
    description:
      'Gestão de riscos psicossociais: o que a nova NR1 exige das escolas, como implementar e o que todo gestor e professor precisa saber.',
    status: 'coming-soon' as const,
    icon: '⚖️',
  },
  {
    title: 'Lei Lucas — Prevenção a Afogamentos',
    description:
      'Obrigatório para escolas com piscinas. Aprenda os protocolos de segurança, responsabilidades legais e como certificar sua equipe.',
    status: 'coming-soon' as const,
    icon: '🏊',
  },
]

export default function CursosPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-navy text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-block bg-gold text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
              Formação Docente
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Cursos Excellentia
            </h1>
            <p className="text-xl text-gray-300">
              Conteúdo prático, criado por quem esteve 17 anos no chão da fábrica.
            </p>
          </div>
        </div>
      </section>

      {/* Courses grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course.title} {...course} />
            ))}
          </div>

          {/* Info box */}
          <div className="mt-12 bg-navy text-white rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-3">
              Uma assinatura. Todos os cursos.
            </h3>
            <p className="text-gray-300 mb-6">
              Por R$9/mês você acessa todos os cursos disponíveis e todos os que vierem a seguir. Sem custo extra.
            </p>
            <Link
              href="/assinatura"
              className="bg-gold hover:bg-yellow-600 text-white font-bold px-8 py-4 rounded-lg text-lg transition-colors inline-block"
            >
              Assinar agora — R$9/mês
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
