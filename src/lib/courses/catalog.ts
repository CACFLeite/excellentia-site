import { getCatalogCourseDefinitions } from './definitions';

export const teacherCatalogCourses = [
  {
    title: 'Gestão de Carreira para Professores',
    description: 'O guia completo para o processo seletivo de escolas particulares: currículo profissional, entrevistas, aula teste, planejamento de aula e documentação.',
    area: 'Carreira',
    available: true,
    modules: 5,
    lessons: 20,
  },
  {
    title: 'Cotidiano Escolar',
    description: 'Como navegar o dia a dia da escola com autoridade, limites saudáveis e relações profissionais com coordenação, colegas e pais de alunos.',
    area: 'Cotidiano escolar',
    available: false,
    modules: 5,
    lessons: null,
  },
  {
    title: 'Saúde Emocional do Professor',
    description: 'Burnout, síndrome de Boreout, ansiedade docente. Ferramentas práticas de autocuidado para ensinar sem se destruir.',
    area: 'Saúde profissional',
    available: false,
    modules: 5,
    lessons: null,
  },
];

export function getSchoolCatalogCourses() {
  return getCatalogCourseDefinitions().map((course) => ({
    title: course.shortTitle,
    description: course.description,
    area: course.area,
    available: course.availability === 'published',
    inProduction: course.availability === 'in_production',
    modules: course.modules,
    lessons: course.lessonsCount,
    href: `/cursos/${course.slug}`,
  }));
}

export function getCatalogCourses() {
  return [...teacherCatalogCourses, ...getSchoolCatalogCourses()];
}
