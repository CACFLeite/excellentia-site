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

export function generateMetadata({ params }: { params: { courseSlug: string } }): Metadata {
  const course = getCourseDefinition(params.courseSlug);

  if (!course) {
    return { title: 'Curso não encontrado — Excellentia' };
  }

  return {
    title: `${course.shortTitle} — Excellentia`,
    description: course.description,
  };
}

export default function CoursePage({ params, searchParams }: { params: { courseSlug: string }; searchParams?: { convite?: string } }) {
  const course = getCourseDefinition(params.courseSlug);

  if (!course) {
    notFound();
  }

  if (searchParams?.convite) {
    return <CourseExperienceClient token={searchParams.convite} courseSlug={params.courseSlug} />;
  }

  return <PublicCoursePage course={course} />;
}
