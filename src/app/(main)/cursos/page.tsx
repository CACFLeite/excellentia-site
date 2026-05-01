import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cursos — Excellentia',
  description: 'Acesse todos os cursos da Excellentia com uma única assinatura. Gestão de Carreira, Saúde Emocional, NR1, Lei Lucas e muito mais.',
}

const courses = [
  {
    title: 'Gestão de Carreira para Professores',
    description: 'O guia completo para o processo seletivo de escolas particulares: currículo profissional, entrevistas, aula teste, planejamento de aula e documentação.',
    area: 'Carreira',
    available: true,
    modules: 5,
    lessons: 20,
  },
  {
    title: 'Cotidiano Escolar',
    description: 'Como navegar o dia a dia da escola com autoridade, limites saudáveis e relações profissionais com coordenação, colegas e pais de alunos.',
    area: 'Cotidiano escolar',
    available: false,
    modules: 5,
    lessons: null,
  },
  {
    title: 'Saúde Emocional do Professor',
    description: 'Burnout, síndrome de Boreout, ansiedade docente. Ferramentas práticas de autocuidado para ensinar sem se destruir.',
    area: 'Saúde profissional',
    available: false,
    modules: 5,
    lessons: null,
  },
  {
    title: 'NR-1 nas Escolas',
    description: 'Gestão de riscos psicossociais: o que a NR-1 exige, como iniciar a adequação e o que equipes escolares precisam saber.',
    area: 'Conformidade',
    available: true,
    modules: 1,
    lessons: 8,
    href: '/cursos/nr1-escolas',
  },
  {
    title: 'Lei Lucas — Prevenção a Afogamentos',
    description: 'Obrigatório para escolas com piscinas. Protocolos de segurança, responsabilidades legais e certificação.',
    area: 'Segurança escolar',
    available: false,
    modules: null,
    lessons: null,
  },
]

export default function CursosPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-navy text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-gold text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
            Formação continuada e certificável
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Catálogo Excellentia
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Cursos para carreira docente, rotina escolar e conformidade institucional, com certificado e trilhas em expansão.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/assinatura"
              className="bg-gold hover:bg-yellow-600 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors"
            >
              Assinar — R$69/mês
            </Link>
            <Link
              href="/assinatura"
              className="border-2 border-white text-white hover:bg-white hover:text-navy font-bold px-8 py-4 rounded-xl text-lg transition-colors"
            >
              Ver plano anual — R$588/ano
            </Link>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-4 bg-gold/10 border-b border-gold/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-navy py-3">
            <span>Certificado em cada curso</span>
            <span>Novos cursos a cada trimestre</span>
            <span>Cancele quando quiser</span>
            <span>Garantia de 7 dias</span>
          </div>
        </div>
      </section>

      {/* Courses grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.title}
                className={`bg-white rounded-2xl p-6 shadow-sm border-2 transition-shadow hover:shadow-md ${
                  course.available ? 'border-gold' : 'border-gray-100'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wide text-gold bg-gold/10 px-3 py-1 rounded-full">{course.area}</span>
                  {course.available ? (
                    <span className="text-xs font-bold uppercase tracking-wide bg-gold text-white px-3 py-1 rounded-full">
                      Disponível
                    </span>
                  ) : (
                    <span className="text-xs font-bold uppercase tracking-wide bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
                      Em breve
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{course.description}</p>
                {course.available && course.modules && (
                  <div className="flex gap-4 text-xs text-gray-500 mb-4">
                    <span>{course.modules} módulos</span>
                    {course.lessons && <span>{course.lessons} aulas</span>}
                    <span>Com certificado</span>
                  </div>
                )}
                {course.available && 'href' in course && course.href && (
                  <Link
                    href={course.href}
                    className="inline-block text-sm font-bold text-gold hover:text-yellow-700 transition-colors"
                  >
                    Acessar curso →
                  </Link>
                )}
                {!course.available && (
                  <div className="flex gap-2 text-xs text-gray-400 mb-4">
                    <span>Com certificado</span>
                    <span>• Incluído na assinatura</span>
                  </div>
                )}
              </div>
            ))}

            {/* Placeholder — próximo curso */}
            <div className="bg-navy/5 rounded-2xl p-6 border-2 border-dashed border-navy/20 flex flex-col items-center justify-center text-center min-h-[200px]">
              <span className="text-xs font-bold uppercase tracking-wide text-gold mb-3">Em produção</span>
              <p className="text-navy font-semibold text-sm">Novo curso todo trimestre</p>
              <p className="text-gray-500 text-xs mt-1">Incluído na sua assinatura</p>
            </div>
          </div>

          {/* CTA bottom */}
          <div className="mt-12 bg-navy text-white rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Tudo isso por R$69/mês
            </h3>
            <p className="text-gray-300 mb-2">
              Ou R$588/ano — pague uma vez, use o ano todo. Economia de R$138.
            </p>
            <p className="text-gray-400 text-sm mb-8">
              Acesso imediato. Certificado em cada curso concluído. Cancele quando quiser.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/assinatura"
                className="bg-gold hover:bg-yellow-600 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors"
              >
                Assinar agora
              </Link>
              <Link
                href="/curriculo-professor"
                className="border-2 border-white text-white hover:bg-white hover:text-navy font-bold px-8 py-4 rounded-xl text-lg transition-colors"
              >
                Currículo grátis em 24h →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
