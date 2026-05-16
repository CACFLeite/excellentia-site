import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { getTeacherSessionFromCookie } from '@/lib/teacherAuth'
import { prisma } from '@/lib/prisma'

function metadataText(metadata: unknown, key: string) {
  if (!metadata || typeof metadata !== 'object' || Array.isArray(metadata)) return null
  const value = (metadata as Record<string, unknown>)[key]
  return typeof value === 'string' ? value : null
}

export default async function ProfessorCourseDetailPage({ params }: { params: Promise<{ courseSlug: string }> }) {
  const session = await getTeacherSessionFromCookie()
  if (!session) redirect('/acesso-professor')

  const { courseSlug } = await params
  const access = await prisma.teacherCourseAccess.findFirst({
    where: {
      subscriberId: session.subscriberId,
      course: { slug: courseSlug, status: 'published' },
    },
    include: {
      course: {
        include: {
          lessons: {
            orderBy: { order: 'asc' },
            include: { activities: { orderBy: { createdAt: 'asc' } } },
          },
        },
      },
    },
  })

  if (!access) notFound()

  const course = access.course

  return (
    <main className="min-h-screen bg-navy text-white">
      <section className="relative overflow-hidden bg-[#06101c] py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(244,219,118,.20),transparent_28%),linear-gradient(145deg,#06101c_0%,#0a2749_48%,#02060b_100%)]" />
        <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(244,219,118,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(244,219,118,.07)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link href="/professor/cursos" className="text-sm font-bold text-slate-300 transition hover:text-white">
            ← Voltar aos meus cursos
          </Link>
          <div className="mt-10 max-w-4xl">
            <div className="mb-6 inline-flex rounded-full border border-gold-light/30 bg-gold-light/10 px-5 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-gold-light">
              Curso liberado
            </div>
            <h1 className="text-4xl font-black leading-[1.03] tracking-[-0.04em] md:text-6xl">{course.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{course.description}</p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm font-bold text-slate-300">
              <span className="rounded-full border border-white/15 bg-white/[0.06] px-4 py-2">{course.lessons.length} aulas</span>
              <span className="rounded-full border border-white/15 bg-white/[0.06] px-4 py-2">Acesso: {session.subscriber.email}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy py-14 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_0%,rgba(244,219,118,.13),transparent_28%),linear-gradient(180deg,#0a2749_0%,#071d38_100%)]" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-5">
            {course.lessons.map((lesson) => {
              const moduleName = metadataText(lesson.metadata, 'module')
              const summary = metadataText(lesson.metadata, 'summary')
              const contentStatus = metadataText(lesson.metadata, 'contentStatus')
              const activity = lesson.activities[0]
              const lessonLabel = 'Aula ' + lesson.order.toString().padStart(2, '0') + (moduleName ? ' · ' + moduleName : '')

              return (
                <article key={lesson.id} className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-xl md:p-8">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="max-w-3xl">
                      <div className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-gold-light">
                        {lessonLabel}
                      </div>
                      <h2 className="text-2xl font-black tracking-[-0.03em] text-white">{lesson.title}</h2>
                      {summary ? <p className="mt-4 text-sm leading-7 text-slate-300">{summary}</p> : null}
                    </div>
                    <span className="inline-flex w-fit rounded-full border border-gold-light/30 bg-gold-light/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-gold-light">
                      {lesson.videoUrl ? 'Vídeo disponível' : contentStatus === 'outline_pending_full_media' ? 'Conteúdo em alimentação' : 'Aula disponível'}
                    </span>
                  </div>

                  {lesson.videoUrl ? (
                    <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-black">
                      <iframe src={lesson.videoUrl} title={lesson.title} className="aspect-video w-full" allowFullScreen />
                    </div>
                  ) : null}

                  {activity ? (
                    <div className="mt-6 rounded-2xl border border-white/10 bg-navy/45 p-5">
                      <div className="text-xs font-black uppercase tracking-[0.2em] text-gold-light">atividade</div>
                      <p className="mt-3 text-sm leading-7 text-slate-200">{activity.prompt}</p>
                    </div>
                  ) : null}
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
