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
    duration: '2min19',
    videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=e581c5b6-ea70-41b4-9f89-7b5b51cb3b69',
    metadata: { pandaVideoId: '404bd859-9526-483a-a5a2-1fd380de9473', pandaExternalId: 'e581c5b6-ea70-41b4-9f89-7b5b51cb3b69', pandaFolderId: '8ddda579-dbfe-4412-b97d-5be2023e9747', videoStatus: 'published_to_panda' },
  },
  {
    order: 2,
    title: 'Sinais iniciais de burnout e desgaste',
    duration: '2min29',
    videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=55c77a38-4377-4212-9489-46e20030700b',
    metadata: { pandaVideoId: '657ae26e-81fa-4c17-b893-5a843edd32ef', pandaExternalId: '55c77a38-4377-4212-9489-46e20030700b', pandaFolderId: '8ddda579-dbfe-4412-b97d-5be2023e9747', videoStatus: 'published_to_panda' },
  },
  {
    order: 3,
    title: 'Mudanças institucionais, sobrecarga e registros',
    duration: '2min17',
    videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=faf2d75b-83f8-41f7-b35a-5ac31e418a2c',
    metadata: { pandaVideoId: '63d2c87b-0d6f-468b-9008-f17dd4cd5acf', pandaExternalId: 'faf2d75b-83f8-41f7-b35a-5ac31e418a2c', pandaFolderId: '8ddda579-dbfe-4412-b97d-5be2023e9747', videoStatus: 'published_to_panda' },
  },
  {
    order: 4,
    title: 'Comunicação de riscos sem exposição indevida',
    duration: '2min08',
    videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=acd29539-bf7d-4956-b41f-7e943668baab',
    metadata: { pandaVideoId: '8866f203-e87a-4ba6-9c51-28fc5ea6f51d', pandaExternalId: 'acd29539-bf7d-4956-b41f-7e943668baab', pandaFolderId: '8ddda579-dbfe-4412-b97d-5be2023e9747', videoStatus: 'published_to_panda' },
  },
  {
    order: 5,
    title: 'Mapeamento de riscos em diferentes funções',
    duration: '2min10',
    videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=635d0e24-ba73-46e9-9e51-94939048c581',
    metadata: { pandaVideoId: '4d427229-6cd1-420e-8664-a2cd771b9e62', pandaExternalId: '635d0e24-ba73-46e9-9e51-94939048c581', pandaFolderId: '8ddda579-dbfe-4412-b97d-5be2023e9747', videoStatus: 'published_to_panda' },
  },
  {
    order: 6,
    title: 'Canais formais e comunicação profissional',
    duration: '2min09',
    videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=fbae575c-f70a-42be-b5c5-abca2f19b22c',
    metadata: { pandaVideoId: '0fd0ceff-6cbb-4f2e-a917-0840fbd1bce0', pandaExternalId: 'fbae575c-f70a-42be-b5c5-abca2f19b22c', pandaFolderId: '8ddda579-dbfe-4412-b97d-5be2023e9747', videoStatus: 'published_to_panda' },
  },
  {
    order: 7,
    title: 'Canal anônimo, proteção e segurança psicológica',
    duration: '2min05',
    videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=ac17c596-0ccd-4352-b6b7-d6fae3af51de',
    metadata: { pandaVideoId: 'f733514e-bb35-462d-bf10-002d09419f21', pandaExternalId: 'ac17c596-0ccd-4352-b6b7-d6fae3af51de', pandaFolderId: '8ddda579-dbfe-4412-b97d-5be2023e9747', videoStatus: 'published_to_panda' },
  },
  {
    order: 8,
    title: 'Certificado, evidências e continuidade da NR-1',
    duration: '2min17',
    videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=e3deb1c4-acdf-450a-a2b0-d0651052944e',
    metadata: { pandaVideoId: 'ddfa0f76-d6a8-4b0b-83cb-8a0705c3af8b', pandaExternalId: 'e3deb1c4-acdf-450a-a2b0-d0651052944e', pandaFolderId: '8ddda579-dbfe-4412-b97d-5be2023e9747', videoStatus: 'published_to_panda' },
  }
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
    metadata: { definitionVersion: '2026-05-02', productionStatus: 'nr1_aula01_aula02_aula03_aula04_aula05_aula06_aula07_aula08_published_to_panda' },
  },

  'pgr-gro-escolas': {
    slug: 'pgr-gro-escolas',
    title: 'PGR/GRO para Escolas — Diagnóstico, Evidências e Plano de Ação',
    shortTitle: 'PGR/GRO Escolar',
    description:
      'Formação e camada operacional para apoiar escolas na organização de diagnóstico, evidências e plano de ação ligados ao GRO/PGR e à gestão de riscos no ambiente escolar.',
    status: 'draft',
    availability: 'in_production',
    audience: 'school_manager',
    track: 'saude-ocupacional',
    area: 'Conformidade',
    certificatePrefix: 'PGR',
    modules: 1,
    lessonsCount: 6,
    publicPage: {
      badge: 'Trilha escolar em produção',
      headline: 'PGR/GRO para Escolas',
      summary:
        'Uma formação para transformar riscos ocupacionais e psicossociais em diagnóstico, plano de ação, evidências e rotina mínima de governança escolar.',
      cards: [
        { title: 'Diagnóstico', description: 'Leitura inicial dos riscos psicossociais e operacionais da escola' },
        { title: 'Evidências', description: 'Registros, documentos, comunicações e plano de ação acompanhável' },
        { title: 'Governança', description: 'Limites entre formação, gestão escolar, SST e apoio jurídico especializado' },
      ],
      courseIntro:
        'Esta trilha conecta a formação NR-1 a uma camada de gestão: identificação de riscos, comunicação, plano de ação, canal governado e evidências institucionais.',
      ctaTitle: 'PGR como processo, não arquivo solto',
      ctaDescription:
        'A Excellentia ajuda a escola a organizar a rotina documental e formativa, sem substituir profissionais de SST, jurídico ou responsáveis técnicos quando exigidos.',
    },
    lessons: [
      { order: 1, title: 'O que são GRO e PGR no contexto escolar' },
      { order: 2, title: 'Riscos psicossociais, assédio, sobrecarga e conflitos' },
      { order: 3, title: 'Como levantar evidências sem expor pessoas indevidamente' },
      { order: 4, title: 'Plano de ação: prioridade, responsável, prazo e registro' },
      { order: 5, title: 'Canal de comunicação, sigilo e tratamento institucional' },
      { order: 6, title: 'Relatório, acompanhamento e revisão periódica' },
    ],
    complianceNotes: [
      'Camada formativa e operacional; não substitui elaboração técnica quando profissional habilitado for exigido.',
      'Canal, diagnóstico e documentos devem respeitar LGPD, sigilo e governança institucional.',
    ],
    metadata: { definitionVersion: '2026-05-02', videoStatus: 'pending_content_production' },
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
        'Os roteiros, rubricas e áudios estão prontos. A etapa atual é produzir as próximas aulas no padrão audiovisual local aprovado.',
    },
    lessons: [
      {
        order: 1,
        title: 'O que a Lei Lucas exige — e o que ela não resolve sozinha',
        duration: '5min27',
        videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=92543447-ea6c-46fa-9c5e-a82f13bf958e',
        metadata: {
          videoStatus: 'published_to_panda',
          pandaVideoId: 'cb849446-9819-4afd-9726-c55a59de646d',
          pandaExternalId: '92543447-ea6c-46fa-9c5e-a82f13bf958e',
        },
      },
      {
        order: 2,
        title: 'O papel de cada adulto diante de uma emergência escolar',
        duration: '5min29',
        videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=b2a6059f-a4a7-40ff-8d96-0e55904bd011',
        metadata: {
          videoStatus: 'published_to_panda',
          pandaVideoId: 'b2d81ffb-8631-4a4a-b8c6-d09eef161020',
          pandaExternalId: 'b2a6059f-a4a7-40ff-8d96-0e55904bd011',
        },
      },
      {
        order: 3,
        title: 'Protocolos de acionamento: quem chama quem, quando e como',
        duration: '4min35',
        videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=679de7b7-558f-4b43-a10f-91ffc06ba7fa',
        metadata: {
          videoStatus: 'published_to_panda',
          pandaVideoId: 'b32cb330-d9dc-4240-8fd9-d06a9318b1d5',
          pandaExternalId: '679de7b7-558f-4b43-a10f-91ffc06ba7fa',
        },
      },
      {
        order: 4,
        title: 'Preparação antes do treinamento prático',
        duration: '4min56',
        videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=f67802e0-1dd5-4bf3-b7e0-81eb3377e883',
        metadata: {
          videoStatus: 'published_to_panda',
          pandaVideoId: '62fe9184-42ca-4099-9844-95a2a806fa24',
          pandaExternalId: 'f67802e0-1dd5-4bf3-b7e0-81eb3377e883',
        },
      },
      {
        order: 5,
        title: 'Convulsão, desmaio, alergia e crise respiratória: reconhecer sinais e acionar sem improviso',
        duration: '5min18',
        videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=7c55774b-f6a8-4db0-80b8-1cfd35d86b80',
        metadata: {
          videoStatus: 'published_to_panda',
          pandaVideoId: 'd31ce3cc-06df-48d4-aee8-0848ca206d9a',
          pandaExternalId: '7c55774b-f6a8-4db0-80b8-1cfd35d86b80',
        },
      },
      {
        order: 6,
        title: 'O treinamento prático: o que precisa ser simulado presencialmente',
        duration: '4min19',
        videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=ba65ed86-0cee-49e1-b818-7e2204dee654',
        metadata: {
          videoStatus: 'published_to_panda',
          pandaVideoId: '9487fff5-d3e8-466f-9220-44fb5e8b0a16',
          pandaExternalId: 'ba65ed86-0cee-49e1-b818-7e2204dee654',
        },
      },
      {
        order: 7,
        title: 'Protocolo interno da escola: pessoas, locais, kits, comunicação e responsáveis',
        duration: '4min17',
        videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=cc469d5d-0953-4a3d-abf9-0435d43d1d8a',
        metadata: {
          videoStatus: 'published_to_panda',
          pandaVideoId: '23c1d8ec-7d73-4de5-a569-90c503f8d0e7',
          pandaExternalId: 'cc469d5d-0953-4a3d-abf9-0435d43d1d8a',
        },
      },
      {
        order: 8,
        title: 'Evidências, reciclagem anual e cultura de segurança',
        duration: '4min01',
        videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=db5b654a-d368-4d2a-92bc-fbfb9d54bd4f',
        metadata: {
          videoStatus: 'published_to_panda',
          pandaVideoId: '81d1d82e-ba3b-45ed-ac4e-4131edef51f4',
          pandaExternalId: 'db5b654a-d368-4d2a-92bc-fbfb9d54bd4f',
        },
      },
    ],
    complianceNotes: [
      'Curso formativo, protocolar e documental; não substitui treinamento prático presencial de primeiros socorros quando exigido.',
      'Não ensina manobras técnicas por vídeo; organiza preparação, acionamento, comunicação, registro e evidências.',
    ],
    metadata: { definitionVersion: '2026-05-02', videoStatus: 'aula01_aula02_aula03_aula04_aula05_aula06_aula07_aula08_published_to_panda' },
  },
  'incendio-escolas': {
    slug: 'incendio-escolas',
    title: 'Prevenção e Combate a Incêndio na Escola',
    shortTitle: 'Prevenção e Incêndio',
    description:
      'Formação escolar sobre prevenção de incêndios, rotas, sinalização, extintores, limites de atuação e evidências, sem substituir brigada, AVCB ou treinamento prático exigido localmente.',
    status: 'draft',
    availability: 'in_production',
    audience: 'school_employee',
    track: 'seguranca-escolar',
    area: 'Segurança escolar',
    certificatePrefix: 'INC',
    modules: 1,
    lessonsCount: 6,
    publicPage: {
      badge: 'Trilha escolar em produção',
      headline: 'Prevenção e Combate a Incêndio na Escola',
      summary:
        'Formação para reduzir improviso, orientar prevenção e organizar evidências sem substituir exigências locais de brigada, AVCB ou treinamento prático.',
      cards: [
        { title: 'Prevenção', description: 'Riscos cotidianos, rotas de fuga, sinalização e cultura de segurança' },
        { title: 'Extintores', description: 'Uso responsável, limites de atuação e acionamento de apoio' },
        { title: 'Normas locais', description: 'Validação conforme Corpo de Bombeiros, AVCB e exigências aplicáveis' },
      ],
      courseIntro:
        'Esta trilha organiza o que toda equipe escolar precisa compreender sobre prevenção, acionamento e limites de atuação, mantendo a exigência de treinamentos técnicos e normas locais quando aplicáveis.',
      ctaTitle: 'Segurança contra incêndio como rotina escolar',
      ctaDescription:
        'A Excellentia apoia formação, registro e evidências, mas não substitui brigada, laudos, AVCB ou orientação técnica do Corpo de Bombeiros e profissionais habilitados.',
    },
    lessons: [
      { order: 1, title: 'Prevenção de incêndio na rotina escolar' },
      { order: 2, title: 'Rotas, sinalização, portas e pontos de encontro' },
      { order: 3, title: 'Extintores: tipos, limites e uso responsável' },
      { order: 4, title: 'O que o colaborador deve e não deve fazer' },
      { order: 5, title: 'Acionamento, evacuação e comunicação interna' },
      { order: 6, title: 'Evidências, simulações e revisão periódica' },
    ],
    complianceNotes: [
      'Curso formativo e documental; não substitui brigada, AVCB, laudos, treinamento prático ou exigências do Corpo de Bombeiros.',
      'Conteúdo deve ser validado conforme legislação local e realidade física da escola.',
    ],
    metadata: { definitionVersion: '2026-05-02', videoStatus: 'pending_content_production' },
  },

  'violencia-escolar-protecao': {
    slug: 'violencia-escolar-protecao',
    title: 'Proteção contra Violência Escolar — Bullying, Cyberbullying e Encaminhamentos',
    shortTitle: 'Proteção contra Violência',
    description:
      'Formação para equipes escolares sobre prevenção, identificação, registro e encaminhamento de bullying, cyberbullying, violência e violações de direitos no ambiente escolar.',
    status: 'draft',
    availability: 'in_production',
    audience: 'school_employee',
    track: 'protecao-digital',
    area: 'Proteção escolar',
    certificatePrefix: 'PVE',
    modules: 1,
    lessonsCount: 8,
    publicPage: {
      badge: 'Trilha escolar em produção',
      headline: 'Proteção contra Violência Escolar',
      summary:
        'Uma trilha para ajudar a escola a sair da reação improvisada e organizar prevenção, escuta responsável, registro, encaminhamento e evidências diante de violência escolar.',
      cards: [
        { title: 'Bullying e cyberbullying', description: 'Leitura institucional sem banalizar nem exagerar conflitos' },
        { title: 'Proteção integral', description: 'ECA, sinais de violência, deveres da escola e encaminhamentos' },
        { title: 'Registros e fluxos', description: 'Como documentar, comunicar e acompanhar casos com responsabilidade' },
      ],
      courseIntro:
        'A trilha trata violência escolar como tema de proteção institucional: prevenção, escuta, registro, comunicação com famílias e encaminhamento a autoridades quando aplicável.',
      ctaTitle: 'Proteger estudantes exige método',
      ctaDescription:
        'A Excellentia organiza formação e evidências para que a escola tenha critérios, fluxos e registros mais consistentes diante de situações sensíveis.',
    },
    lessons: [
      { order: 1, title: 'Violência escolar: entre conflito, bullying e violação de direitos' },
      { order: 2, title: 'Bullying e cyberbullying: sinais, recorrência e impacto' },
      { order: 3, title: 'ECA, proteção integral e deveres da escola' },
      { order: 4, title: 'Escuta responsável sem investigação improvisada' },
      { order: 5, title: 'Fluxo de registro, coordenação e família' },
      { order: 6, title: 'Quando acionar Conselho Tutelar ou autoridades' },
      { order: 7, title: 'Prevenção, cultura escolar e acompanhamento' },
      { order: 8, title: 'Evidências institucionais e revisão de casos' },
    ],
    complianceNotes: [
      'Curso formativo; não substitui atuação de psicologia, serviço social, jurídico, Conselho Tutelar ou autoridades quando cabível.',
      'Casos de violência devem observar proteção da vítima, sigilo, devido encaminhamento e legislação aplicável.',
    ],
    metadata: { definitionVersion: '2026-05-02', videoStatus: 'pending_content_production' },
  },
  'protecao-digital-dados-escolas': {
    slug: 'protecao-digital-dados-escolas',
    title: 'Proteção Digital, Telas e Dados na Escola',
    shortTitle: 'Proteção Digital e Dados',
    description:
      'Formação para equipes escolares sobre ambiente digital, uso de telas, imagem, plataformas, exposição, dados pessoais e proteção de crianças e adolescentes.',
    status: 'draft',
    availability: 'in_production',
    audience: 'school_employee',
    track: 'protecao-digital',
    area: 'Proteção digital',
    certificatePrefix: 'PDD',
    modules: 1,
    lessonsCount: 7,
    publicPage: {
      badge: 'Trilha escolar em produção',
      headline: 'Proteção Digital, Telas e Dados na Escola',
      summary:
        'Formação para organizar condutas e evidências sobre telas, celulares, imagem, plataformas digitais e dados de crianças e adolescentes.',
      cards: [
        { title: 'ECA Digital', description: 'Proteção de crianças e adolescentes em ambientes digitais' },
        { title: 'Telas e celulares', description: 'Rotina escolar, sofrimento psíquico, limites e comunicação institucional' },
        { title: 'Dados e imagem', description: 'Consentimento, exposição, fornecedores digitais e boas práticas de proteção' },
      ],
      courseIntro:
        'Esta trilha une proteção digital, uso de telas e dados escolares para orientar decisões cotidianas de professores, gestores e equipes administrativas.',
      ctaTitle: 'Proteção digital como responsabilidade escolar',
      ctaDescription:
        'A Excellentia ajuda a escola a formar sua equipe, organizar evidências e reduzir improviso diante de riscos digitais e tratamento de dados.',
    },
    lessons: [
      { order: 1, title: 'Por que proteção digital virou tema escolar' },
      { order: 2, title: 'ECA Digital e proteção de crianças e adolescentes' },
      { order: 3, title: 'Uso de celulares e telas na educação básica' },
      { order: 4, title: 'Imagem, exposição e comunicação com famílias' },
      { order: 5, title: 'Dados pessoais e dados sensíveis na rotina escolar' },
      { order: 6, title: 'Fornecedores, plataformas e grupos digitais' },
      { order: 7, title: 'Protocolos, registros e revisão de práticas' },
    ],
    complianceNotes: [
      'Curso formativo e preventivo; não substitui parecer jurídico, DPO ou adequação LGPD completa quando necessária.',
      'Condutas devem ser compatibilizadas com regimento escolar, contratos, políticas de privacidade e legislação vigente.',
    ],
    metadata: { definitionVersion: '2026-05-02', videoStatus: 'pending_content_production' },
  },
  'lgpd-escolas': {
    slug: 'lgpd-escolas',
    title: 'LGPD Aplicada à Rotina Escolar',
    shortTitle: 'LGPD nas Escolas',
    description:
      'Formação introdutória para equipes escolares sobre dados pessoais, dados sensíveis, imagem, comunicação, fornecedores e evidências de boas práticas de proteção de dados.',
    status: 'draft',
    availability: 'in_production',
    audience: 'school_employee',
    track: 'protecao-digital',
    area: 'LGPD escolar',
    certificatePrefix: 'LGPD',
    modules: 1,
    lessonsCount: 6,
    publicPage: {
      badge: 'Trilha escolar em produção',
      headline: 'LGPD Aplicada à Rotina Escolar',
      summary:
        'Uma trilha para tirar a LGPD do documento jurídico e levar boas práticas para a rotina de atendimento, comunicação, imagem, arquivos e plataformas da escola.',
      cards: [
        { title: 'Dados escolares', description: 'Dados pessoais e sensíveis de alunos, famílias e colaboradores' },
        { title: 'Rotina prática', description: 'Atendimento, grupos, fotos, relatórios, fornecedores e documentos' },
        { title: 'Evidências', description: 'Registros, políticas, comunicações e condutas de proteção' },
      ],
      courseIntro:
        'Esta trilha é uma camada formativa para a equipe escolar compreender riscos comuns e boas práticas no tratamento de dados pessoais.',
      ctaTitle: 'LGPD precisa chegar à rotina',
      ctaDescription:
        'A Excellentia apoia formação e evidências, sem substituir mapeamento jurídico completo, DPO, contratos ou políticas formais quando exigidos.',
    },
    lessons: [
      { order: 1, title: 'O que é LGPD na prática da escola' },
      { order: 2, title: 'Dados de alunos, famílias e colaboradores' },
      { order: 3, title: 'Imagem, autorização e exposição indevida' },
      { order: 4, title: 'Comunicação escolar, grupos e mensagens' },
      { order: 5, title: 'Fornecedores, plataformas e documentos' },
      { order: 6, title: 'Boas práticas, registros e evidências' },
    ],
    complianceNotes: [
      'Curso formativo; não substitui programa completo de adequação LGPD, DPO ou assessoria jurídica.',
      'Tratamento de dados de crianças e adolescentes exige cuidado reforçado, base legal adequada e governança documental.',
    ],
    metadata: { definitionVersion: '2026-05-02', videoStatus: 'pending_content_production' },
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
