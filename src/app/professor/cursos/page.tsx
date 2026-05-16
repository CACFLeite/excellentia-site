import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getTeacherSessionFromCookie } from '@/lib/teacherAuth'
import { prisma } from '@/lib/prisma'
import { teacherCatalogCourses } from '@/lib/courses/catalog'

function slugify(value: string) {
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default async function ProfessorCoursesPage() {
  const session = await getTeacherSessionFromCookie()
  if (!session) redirect('/acesso-professor')

  const courseAccess = await prisma.teacherCourseAccess.findMany({
    where: { subscriberId: session.subscriberId },
    include: { course: true },
    orderBy: { createdAt: 'asc' },
  })

  const dbCourses = courseAccess.map((access) => ({
    title: access.course.title,
    description: access.course.description ?? 'Curso disponível na sua assinatura Excellentia.',
    slug: access.course.slug,
    available: access.course.status === 'published',
    href: '/formacoes/' + access.course.slug,
  }))

  const fallbackCourses = teacherCatalogCourses.map((course) => ({
    title: course.title,
    description: course.description,
    slug: slugify(course.title),
    available: course.available,
    href: course.available ? '/formacoes' : null,
  }))

  const courses = dbCourses.length > 0 ? dbCourses : fallbackCourses
  const usingFallback = dbCourses.length === 0

  return (
    <main className="min-h-screen bg-navy text-white">
      <section className="relative overflow-hidden bg-[#06101c] py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(244,219,118,.20),transparent_28%),linear-gradient(145deg,#06101c_0%,#0a2749_48%,#02060b_100%)]" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex rounded-full border border-gold-light/30 bg-gold-light/10 px-5 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-gold-light">
            Área do professor
          </div>
          <h1 className="text-4xl font-black leading-[1.03] tracking-[-0.04em] md:text-6xl">Cursos disponíveis</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Acesso autenticado para {session.subscriber.fullName ?? session.subscriber.email}. Status da assinatura: {session.subscriber.status}.
          </p>
          {usingFallback && (
            <p className="mt-5 max-w-3xl rounded-2xl border border-gold-light/30 bg-gold-light/10 p-4 text-sm leading-6 text-gold-light">
              Sua assinatura está ativa, mas ainda não há cursos individuais vinculados no banco. Enquanto a vinculação automática é configurada, mostramos o catálogo de professores disponível.
            </p>
          )}
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_0%,rgba(244,219,118,.13),transparent_28%),linear-gradient(180deg,#0a2749_0%,#071d38_100%)]" />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-5 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          {courses.map((course) => (
            <article key={course.slug} className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 shadow-xl">
              <div className="mb-4 inline-flex rounded-full bg-gold-light/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-gold-light">
                {course.available ? 'Disponível' : 'Em estruturação'}
              </div>
              <h2 className="text-2xl font-black">{course.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">{course.description}</p>
              {course.href ? (
                <Link href={course.href} className="mt-7 inline-flex rounded-2xl bg-gold px-6 py-4 font-black text-white transition hover:bg-yellow-600">
                  Abrir curso
                </Link>
              ) : (
                <span className="mt-7 inline-flex rounded-2xl border border-white/20 px-6 py-4 font-black text-slate-300">
                  Em breve
                </span>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
