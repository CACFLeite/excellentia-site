import { NextResponse } from 'next/server';
import { getTeacherSessionFromCookie } from '@/lib/teacherAuth';
import { prisma } from '@/lib/prisma';
import { teacherCatalogCourses } from '@/lib/courses/catalog';

function slugify(value: string) {
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export async function GET() {
  const session = await getTeacherSessionFromCookie();
  if (!session) return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 });

  const courseAccess = await prisma.teacherCourseAccess.findMany({
    where: { subscriberId: session.subscriberId },
    include: { course: true },
    orderBy: { createdAt: 'asc' },
  });

  const dbCourses = courseAccess.map((access) => ({
    title: access.course.title,
    description: access.course.description,
    slug: access.course.slug,
    status: access.course.status,
    available: access.course.status === 'published',
    href: '/formacoes/' + access.course.slug,
    source: 'database',
  }));

  const fallbackCourses = teacherCatalogCourses.map((course) => ({
    title: course.title,
    description: course.description,
    slug: slugify(course.title),
    status: course.available ? 'published' : 'draft',
    available: course.available,
    href: course.available ? '/formacoes' : null,
    source: 'catalog',
  }));

  return NextResponse.json({
    subscriber: {
      email: session.subscriber.email,
      fullName: session.subscriber.fullName,
      status: session.subscriber.status,
      currentPeriodEnd: session.subscriber.currentPeriodEnd,
    },
    courses: dbCourses.length > 0 ? dbCourses : fallbackCourses,
    usingCatalogFallback: dbCourses.length === 0,
  });
}
