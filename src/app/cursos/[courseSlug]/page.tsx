import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CourseExperienceClient from '@/components/courses/CourseExperienceClient';
import PublicCoursePage from '@/components/courses/PublicCoursePage';
import { courseDefinitions, getCourseDefinition } from '@/lib/courses/definitions';

export function generateStaticParams() {
  return Object.keys(courseDefinitions)
    .filter((courseSlug) => courseSlug !== 'nr1-escolas')
    .map((courseSlug) => ({ courseSlug }));
}

export async function generateMetadata({ params }: { params: Promise<{ courseSlug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const course = getCourseDefinition(resolvedParams.courseSlug);

  if (!course) {
    return { title: 'Curso não encontrado — Excellentia' };
  }

  return {
    title: `${course.shortTitle} — Excellentia`,
    description: course.description,
  };
}

export default async function CoursePage({ params, searchParams }: { params: Promise<{ courseSlug: string }>; searchParams?: Promise<{ convite?: string }> }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const course = getCourseDefinition(resolvedParams.courseSlug);

  if (!course) {
    notFound();
  }

  if (resolvedSearchParams?.convite) {
    return <CourseExperienceClient token={resolvedSearchParams.convite} courseSlug={resolvedParams.courseSlug} />;
  }

  return <PublicCoursePage course={course} />;
}
