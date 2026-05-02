export type CourseAudience = 'school_employee' | 'teacher_subscriber' | 'school_manager';
export type CourseTrack =
  | 'saude-ocupacional'
  | 'primeiros-socorros'
  | 'seguranca-escolar'
  | 'protecao-digital'
  | 'carreira-docente'
  | 'personalizado';
export type CourseAvailability = 'published' | 'in_production' | 'planned';

export type CourseLessonDefinition = {
  order: number;
  title: string;
  duration?: string;
  videoUrl?: string;
  transcript?: string;
  prompt?: string;
  rubric?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
};

export type CourseDefinition = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  status: 'draft' | 'published' | 'archived';
  availability: CourseAvailability;
  audience: CourseAudience;
  track: CourseTrack;
  area: string;
  certificatePrefix: string;
  modules?: number | null;
  lessonsCount?: number | null;
  publicPage: {
    badge: string;
    headline: string;
    summary: string;
    cards: Array<{ title: string; description: string }>;
    courseIntro?: string;
    ctaTitle?: string;
    ctaDescription?: string;
  };
  lessons: CourseLessonDefinition[];
  complianceNotes?: string[];
  metadata?: Record<string, unknown>;
};

const nr1Lessons: CourseLessonDefinition[] = [
  {
    order: 1,
    title: 'Introdução à NR-1 e riscos psicossociais',
    duration: '1min30',
    videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=6460138d-6f63-4e61-b7c0-4fbc29bd291f',
  },
  {
    order: 2,
    title: 'Sinais iniciais de burnout e desgaste',
    duration: '1min19',
    videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=5ef32733-81f9-41e0-bd0b-0a3aebb790db',
  },
  {
    order: 3,
    title: 'Mudanças institucionais, sobrecarga e registros',
    duration: '2min27',
    videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=33ab495e-1366-45b9-8d40-993c298c60f6',
  },
  {
    order: 4,
    title: 'Comunicação de riscos sem exposição indevida',
    duration: '1min39',
    videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=d925b726-25b8-4c07-a327-29d4260cdc6d',
  },
  {
    order: 5,
    title: 'Mapeamento de riscos em diferentes funções',
    duration: '1min29',
    videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=5669f8fc-b290-4aad-9722-8227a838049b',
  },
  {
    order: 6,
    title: 'Canais formais e comunicação profissional',
    duration: '1min43',
    videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=adbc0945-6581-4491-95cc-bcc34ba0fc35',
  },
  {
    order: 7,
    title: 'Canal anônimo, proteção e segurança psicológica',
    duration: '2min27',
    videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=513d6a80-dc03-44f1-9af3-383f003b2abf',
  },
  {
    order: 8,
    title: 'Aplicação prática e registro de conclusão',
    duration: '2min01',
    videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=cc1d3ddf-5375-4803-8a9e-f6d5c22a4444',
  },
];

export const courseDefinitions = {
  'nr1-escolas': {
    slug: 'nr1-escolas',
    title: 'NR-1 para Escolas — Riscos Psicossociais',
    shortTitle: 'NR-1 nas Escolas',
    description: 'Curso Excellentia para formação, registro institucional e compreensão prática da NR-1 no contexto escolar.',
    status: 'published',
    availability: 'published',
    audience: 'school_employee',
    track: 'saude-ocupacional',
    area: 'Conformidade',
    certificatePrefix: 'NR1',
    modules: 1,
    lessonsCount: 8,
    publicPage: {
      badge: 'Conformidade Escolar Essencial',
      headline: 'NR-1 nas Escolas',
      summary: 'Curso introdutório para equipes escolares sobre riscos psicossociais, saúde emocional no trabalho e primeiros passos de adequação institucional.',
      cards: [
        { title: '8 aulas', description: 'Vídeos já hospedados no Panda Vídeos' },
        { title: 'Equipe escolar', description: 'Conteúdo aplicável a docentes, gestão e colaboradores' },
        { title: 'NR-1/PGR', description: 'Base para diagnóstico, documentação e redução de risco' },
      ],
      courseIntro:
        'Esta é a página pública do curso. Colaboradores convidados acessam a experiência formativa completa pelo link individual recebido da escola, com situações-problema, respostas, feedback formativo e registro de participação.',
      ctaTitle: 'Próxima camada do curso',
      ctaDescription:
        'A próxima etapa é transformar as aulas em uma experiência formativa completa: situações-problema, respostas dos colaboradores, feedback orientado por rubrica, evidências de participação e relatório para a escola.',
    },
    lessons: nr1Lessons,
    complianceNotes: [
      'Curso formativo e documental; não substitui avaliação técnica, jurídica ou de SST quando exigida.',
      'Feedback formativo sem nota pública qualitativa.',
    ],
    metadata: { definitionVersion: '2026-05-01' },
  },
  'lei-lucas-escolas': {
    slug: 'lei-lucas-escolas',
    title: 'Lei Lucas nas Escolas — Preparação, Protocolo e Evidências',
    shortTitle: 'Lei Lucas nas Escolas',
    description:
      'Formação Excellentia para preparar equipes escolares, organizar protocolos, registrar evidências e manter continuidade institucional em torno da Lei Lucas, sem substituir o treinamento prático presencial com profissional habilitado.',
    status: 'draft',
    availability: 'in_production',
    audience: 'school_employee',
    track: 'primeiros-socorros',
    area: 'Segurança escolar',
    certificatePrefix: 'LLC',
    modules: 1,
    lessonsCount: 8,
    publicPage: {
      badge: 'Em produção',
      headline: 'Lei Lucas nas Escolas',
      summary:
        'Curso em produção para transformar a Lei Lucas em preparação real: protocolo, responsabilidades, comunicação, registro e evidências ao longo do ano.',
      cards: [
        { title: '8 aulas', description: 'Roteiros, rubricas e áudios profissionais já preparados' },
        { title: 'Protocolo escolar', description: 'Fluxos de acionamento, coordenação, equipe de saúde e comunicação com responsáveis' },
        { title: 'Limite responsável', description: 'Não substitui a prática presencial com profissional habilitado; organiza o antes, o durante e o depois' },
      ],
      courseIntro:
        'A trilha Lei Lucas nas Escolas foi desenhada como camada institucional de preparação, protocolo e evidências. Ela apoia a escola antes, durante e depois do treinamento prático, sem prometer ensinar manobras técnicas por vídeo.',
      ctaTitle: 'Status de produção',
      ctaDescription:
        'Os roteiros, rubricas e áudios estão prontos. A etapa atual é validar o padrão visual com avatar antes de publicar os vídeos finais.',
    },
    lessons: [
      { order: 1, title: 'O que a Lei Lucas exige — e o que ela não resolve sozinha' },
      { order: 2, title: 'O papel de cada adulto diante de uma emergência escolar' },
      { order: 3, title: 'Protocolos de acionamento: quem chama quem, quando e como' },
      { order: 4, title: 'Preparação antes do treinamento prático' },
      { order: 5, title: 'Durante a ocorrência: proteção, comunicação e limites de atuação' },
      { order: 6, title: 'Depois da ocorrência: registro, família e revisão do protocolo' },
      { order: 7, title: 'Evidências, reciclagem e continuidade ao longo do ano' },
      { order: 8, title: 'Como transformar a Lei Lucas em cultura institucional de cuidado' },
    ],
    complianceNotes: [
      'Curso formativo, protocolar e documental; não substitui treinamento prático presencial de primeiros socorros quando exigido.',
      'Não ensina manobras técnicas por vídeo; organiza preparação, acionamento, comunicação, registro e evidências.',
    ],
    metadata: { definitionVersion: '2026-05-02', videoStatus: 'pending_final_avatar_video' },
  },
  'incendio-escolas': {
    slug: 'incendio-escolas',
    title: 'Prevenção e Combate a Incêndio na Escola',
    shortTitle: 'Prevenção e Incêndio',
    description: 'Curso em produção sobre prevenção, uso responsável de extintores e encaminhamentos seguros na rotina escolar.',
    status: 'draft',
    availability: 'in_production',
    audience: 'school_employee',
    track: 'seguranca-escolar',
    area: 'Segurança escolar',
    certificatePrefix: 'INC',
    modules: null,
    lessonsCount: null,
    publicPage: {
      badge: 'Em produção',
      headline: 'Prevenção e Combate a Incêndio na Escola',
      summary: 'Formação em produção para reduzir improviso, orientar prevenção e organizar evidências sem substituir exigências locais de brigada, AVCB ou treinamento prático.',
      cards: [
        { title: 'Prevenção', description: 'Riscos cotidianos, rotas, sinalização e cultura de segurança' },
        { title: 'Extintores', description: 'Uso responsável e limites de atuação de colaboradores' },
        { title: 'Normas locais', description: 'Validação conforme Corpo de Bombeiros, AVCB e exigências aplicáveis' },
      ],
    },
    lessons: [],
  },
} satisfies Record<string, CourseDefinition>;

export type CourseSlug = keyof typeof courseDefinitions;

export function getCourseDefinition(slug: string): CourseDefinition | null {
  return courseDefinitions[slug as CourseSlug] ?? null;
}

export function getPublishedCourseDefinitions() {
  return Object.values(courseDefinitions).filter((course) => course.availability === 'published');
}

export function getCatalogCourseDefinitions() {
  return Object.values(courseDefinitions);
}
