import CourseExperienceClient from '@/components/courses/CourseExperienceClient';

export default function NR1CourseClient({ token }: { token: string }) {
  return <CourseExperienceClient token={token} courseSlug="nr1-escolas" />;
}
