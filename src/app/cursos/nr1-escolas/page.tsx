import type { Metadata } from 'next'
import Link from 'next/link'
import NR1CourseClient from './NR1CourseClient'

export const metadata: Metadata = {
  title: 'NR-1 nas Escolas — Excellentia',
  description:
    'Curso introdutório sobre NR-1, riscos psicossociais e rotina escolar para equipes de escolas.',
}

const lessons = [
  {
    number: '01',
    title: 'Aula 01',
    duration: '1min30',
    embedUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=6460138d-6f63-4e61-b7c0-4fbc29bd291f',
  },
  {
    number: '02',
    title: 'Aula 02',
    duration: '1min19',
    embedUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=5ef32733-81f9-41e0-bd0b-0a3aebb790db',
  },
  {
    number: '03',
    title: 'Aula 03',
    duration: '2min27',
    embedUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=33ab495e-1366-45b9-8d40-993c298c60f6',
  },
  {
    number: '04',
    title: 'Aula 04',
    duration: '1min39',
    embedUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=d925b726-25b8-4c07-a327-29d4260cdc6d',
  },
  {
    number: '05',
    title: 'Aula 05',
    duration: '1min29',
    embedUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=5669f8fc-b290-4aad-9722-8227a838049b',
  },
  {
    number: '06',
    title: 'Aula 06',
    duration: '1min43',
    embedUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=adbc0945-6581-4491-95cc-bcc34ba0fc35',
  },
  {
    number: '07',
    title: 'Aula 07',
    duration: '2min27',
    embedUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=513d6a80-dc03-44f1-9af3-383f003b2abf',
  },
  {
    number: '08',
    title: 'Aula 08',
    duration: '2min01',
    embedUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=cc1d3ddf-5375-4803-8a9e-f6d5c22a4444',
  },
]

export default function NR1EscolasPage({ searchParams }: { searchParams?: { convite?: string } }) {
  if (searchParams?.convite) {
    return <NR1CourseClient token={searchParams.convite} />
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-navy text-white py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/cursos" className="text-sm text-gray-300 hover:text-white transition-colors">
            ← Voltar ao catálogo
          </Link>
          <div className="mt-8 max-w-3xl">
            <div className="inline-block bg-gold text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-wide">
              Conformidade Escolar Essencial
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-5">
              NR-1 nas Escolas
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Curso introdutório para equipes escolares sobre riscos psicossociais, saúde emocional no trabalho e primeiros passos de adequação institucional.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            ['8 aulas', 'Vídeos já hospedados no Panda Vídeos'],
            ['Equipe escolar', 'Conteúdo aplicável a docentes, gestão e colaboradores'],
            ['NR-1/PGR', 'Base para diagnóstico, documentação e redução de risco'],
          ].map(([title, desc]) => (
            <div key={title} className="rounded-2xl bg-gray-50 border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-navy mb-2">{title}</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3">Aulas do curso</h2>
            <p className="text-gray-600 leading-relaxed max-w-3xl">
              Esta é a página pública do curso. Colaboradores convidados acessam a experiência formativa completa pelo link individual recebido da escola, com situações-problema, respostas, feedback formativo e registro de participação.
            </p>
          </div>

          <div className="space-y-10">
            {lessons.map((lesson) => (
              <article key={lesson.number} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-gray-100">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-gold mb-1">
                      Aula {lesson.number}
                    </p>
                    <h3 className="text-xl font-bold text-navy">{lesson.title}</h3>
                  </div>
                  <span className="text-sm text-gray-500">{lesson.duration}</span>
                </div>
                <div className="aspect-video bg-black">
                  <iframe
                    src={lesson.embedUrl}
                    title={`NR-1 nas Escolas — ${lesson.title}`}
                    className="w-full h-full"
                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy text-white rounded-2xl p-8 md:p-10">
            <h2 className="text-2xl font-bold mb-3">Próxima camada do curso</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              A próxima etapa é transformar as aulas em uma experiência formativa completa: situações-problema, respostas dos colaboradores, feedback orientado por rubrica, evidências de participação e relatório para a escola.
            </p>
            <Link
              href="/contato"
              className="inline-block bg-gold hover:bg-yellow-600 text-white font-bold px-6 py-3 rounded-xl transition-colors"
            >
              Falar com a Excellentia
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
