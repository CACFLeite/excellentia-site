import Link from 'next/link';
import type { CourseDefinition } from '@/lib/courses/definitions';

export default function PublicCoursePage({ course }: { course: CourseDefinition }) {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-navy text-white py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/cursos" className="text-sm text-gray-300 hover:text-white transition-colors">
            ← Voltar ao catálogo
          </Link>
          <div className="mt-8 max-w-3xl">
            <div className="inline-block bg-gold text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-wide">
              {course.publicPage.badge}
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-5">{course.publicPage.headline}</h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">{course.publicPage.summary}</p>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {course.publicPage.cards.map((card) => (
            <div key={card.title} className="rounded-2xl bg-gray-50 border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-navy mb-2">{card.title}</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      {course.lessons.length > 0 ? (
        <section className="py-12 md:py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3">Aulas do curso</h2>
              <p className="text-gray-600 leading-relaxed max-w-3xl">
                {course.publicPage.courseIntro ??
                  'Colaboradores convidados acessam a experiência formativa pelo link individual recebido da escola, com situações-problema, respostas, feedback formativo e registro de participação.'}
              </p>
            </div>

            <div className="space-y-10">
              {course.lessons.map((lesson) => (
                <article key={lesson.order} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-gray-100">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-gold mb-1">Aula {String(lesson.order).padStart(2, '0')}</p>
                      <h3 className="text-xl font-bold text-navy">{lesson.title}</h3>
                    </div>
                    <span className="text-sm text-gray-500">{lesson.duration}</span>
                  </div>
                  {lesson.videoUrl && (
                    <div className="aspect-video bg-black">
                      <iframe src={lesson.videoUrl} title={`${course.shortTitle} — ${lesson.title}`} className="w-full h-full" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture" allowFullScreen />
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-12 md:py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-10">
              <p className="text-xs font-bold uppercase tracking-wide text-gold mb-3">Curso em estruturação</p>
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3">Conteúdo em produção</h2>
              <p className="text-gray-600 leading-relaxed max-w-3xl">
                Este curso já faz parte da arquitetura de trilhas da Excellentia, mas ainda não está publicado como experiência completa. A publicação final deve ocorrer depois da validação de conteúdo, rubricas, limites técnicos e certificado adequado.
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy text-white rounded-2xl p-8 md:p-10">
            <h2 className="text-2xl font-bold mb-3">{course.publicPage.ctaTitle ?? 'Formação com evidências para escolas'}</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              {course.publicPage.ctaDescription ??
                'A Excellentia organiza formações, registros, certificados e relatórios para reduzir improviso e fortalecer a governança formativa da escola.'}
            </p>
            <Link href="/contato" className="inline-block bg-gold hover:bg-yellow-600 text-white font-bold px-6 py-3 rounded-xl transition-colors">
              Falar com a Excellentia
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
