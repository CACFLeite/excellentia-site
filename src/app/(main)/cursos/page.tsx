import type { Metadata } from 'next';
import Link from 'next/link';
import { getCatalogCourses } from '@/lib/courses/catalog';

export const metadata: Metadata = {
  title: 'Cursos — Excellentia',
  description: 'Acesse todos os cursos da Excellentia com uma única assinatura. Gestão de Carreira, Saúde Emocional, NR-1, Lei Lucas e muito mais.',
};

export default function CursosPage() {
  const courses = getCatalogCourses();

  return (
    <>
      {/* Header */}
      <section className="bg-navy text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-gold text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
            Formação continuada e certificável
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Catálogo Excellentia</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Cursos para carreira docente, rotina escolar e conformidade institucional, com certificado e trilhas em expansão.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/assinatura" className="bg-gold hover:bg-yellow-600 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors">
              Assinar — R$69/mês
            </Link>
            <Link href="/assinatura" className="border-2 border-white text-white hover:bg-white hover:text-navy font-bold px-8 py-4 rounded-xl text-lg transition-colors">
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
            <span>Trilhas de carreira e conformidade escolar</span>
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
                className={`bg-white rounded-2xl p-6 shadow-sm border-2 transition-shadow hover:shadow-md ${course.available ? 'border-gold' : 'border-gray-100'}`}
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wide text-gold bg-gold/10 px-3 py-1 rounded-full">{course.area}</span>
                  {course.available ? (
                    <span className="text-xs font-bold uppercase tracking-wide bg-gold text-white px-3 py-1 rounded-full">Disponível</span>
                  ) : (
                    <span className="text-xs font-bold uppercase tracking-wide bg-gray-100 text-gray-500 px-3 py-1 rounded-full">{'inProduction' in course && course.inProduction ? 'Em produção' : 'Em breve'}</span>
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
                {'href' in course && course.href ? (
                  <Link href={course.href} className="inline-block text-sm font-bold text-gold hover:text-yellow-700 transition-colors">
                    {course.available ? 'Acessar curso →' : 'Ver estrutura →'}
                  </Link>
                ) : null}
                {!course.available && (
                  <div className="flex gap-2 text-xs text-gray-400 mt-4">
                    <span>Com certificado</span>
                    <span>• Incluído na assinatura ou pacote escolar</span>
                  </div>
                )}
              </div>
            ))}

            <div className="bg-navy/5 rounded-2xl p-6 border-2 border-dashed border-navy/20 flex flex-col items-center justify-center text-center min-h-[200px]">
              <span className="text-xs font-bold uppercase tracking-wide text-gold mb-3">Sob demanda</span>
              <p className="text-navy font-semibold text-sm">Cursos personalizados para escolas</p>
              <p className="text-gray-500 text-xs mt-1">Trilhas institucionais conforme necessidade da escola</p>
            </div>
          </div>

          <div className="mt-12 bg-navy text-white rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">Tudo isso por R$69/mês para professores</h3>
            <p className="text-gray-300 mb-2">Ou R$588/ano — pague uma vez, use o ano todo. Economia de R$240.</p>
            <p className="text-gray-400 text-sm mb-8">
              Escolas contam com pacote próprio de conformidade formativa, certificados, evidências e relatórios.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/assinatura" className="bg-gold hover:bg-yellow-600 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors">
                Assinar agora
              </Link>
              <Link href="/escolas" className="border-2 border-white text-white hover:bg-white hover:text-navy font-bold px-8 py-4 rounded-xl text-lg transition-colors">
                Ver solução para escolas →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
