import type { Metadata } from 'next';
import CourseExperienceClient from '@/components/courses/CourseExperienceClient';
import PublicCoursePage from '@/components/courses/PublicCoursePage';
import { getCourseDefinition } from '@/lib/courses/definitions';

const course = getCourseDefinition('nr1-escolas');

export const metadata: Metadata = {
  title: 'NR-1 nas Escolas — Excellentia',
  description: 'Curso introdutório sobre NR-1, riscos psicossociais e rotina escolar para equipes de escolas.',
};

export default function NR1EscolasPage({ searchParams }: { searchParams?: { convite?: string } }) {
  if (searchParams?.convite) {
    return <CourseExperienceClient token={searchParams.convite} courseSlug="nr1-escolas" />;
  }

  if (!course) return null;

  return <PublicCoursePage course={course} />;
}
