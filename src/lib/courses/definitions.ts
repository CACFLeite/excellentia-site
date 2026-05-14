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
    metadata: { summary: 'Apresenta a NR-1 (Norma Regulamentadora 1), os riscos psicossociais e o papel da escola na leitura inicial do tema sem transformar o curso em consultoria técnica.', pandaVideoId: '404bd859-9526-483a-a5a2-1fd380de9473', pandaExternalId: 'e581c5b6-ea70-41b4-9f89-7b5b51cb3b69', pandaFolderId: '8ddda579-dbfe-4412-b97d-5be2023e9747', videoStatus: 'published_to_panda' },
  },
  {
    order: 2,
    title: 'Sinais iniciais de burnout e desgaste',
    duration: '2min29',
    videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=55c77a38-4377-4212-9489-46e20030700b',
    metadata: { summary: 'Ajuda equipes escolares a reconhecer sinais iniciais de desgaste, burnout e alerta institucional, preservando limites de atuação e encaminhamento.', pandaVideoId: '657ae26e-81fa-4c17-b893-5a843edd32ef', pandaExternalId: '55c77a38-4377-4212-9489-46e20030700b', pandaFolderId: '8ddda579-dbfe-4412-b97d-5be2023e9747', videoStatus: 'published_to_panda' },
  },
  {
    order: 3,
    title: 'Mudanças institucionais, sobrecarga e registros',
    duration: '2min17',
    videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=faf2d75b-83f8-41f7-b35a-5ac31e418a2c',
    metadata: { summary: 'Relaciona mudanças, acúmulo de demandas e registros institucionais para reduzir improviso e apoiar evidências de gestão.', pandaVideoId: '63d2c87b-0d6f-468b-9008-f17dd4cd5acf', pandaExternalId: 'faf2d75b-83f8-41f7-b35a-5ac31e418a2c', pandaFolderId: '8ddda579-dbfe-4412-b97d-5be2023e9747', videoStatus: 'published_to_panda' },
  },
  {
    order: 4,
    title: 'Comunicação de riscos sem exposição indevida',
    duration: '2min08',
    videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=acd29539-bf7d-4956-b41f-7e943668baab',
    metadata: { summary: 'Orienta comunicação responsável de riscos psicossociais, evitando exposição pessoal, acusações improvisadas e ruído institucional.', pandaVideoId: '8866f203-e87a-4ba6-9c51-28fc5ea6f51d', pandaExternalId: 'acd29539-bf7d-4956-b41f-7e943668baab', pandaFolderId: '8ddda579-dbfe-4412-b97d-5be2023e9747', videoStatus: 'published_to_panda' },
  },
  {
    order: 5,
    title: 'Mapeamento de riscos em diferentes funções',
    duration: '2min10',
    videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=635d0e24-ba73-46e9-9e51-94939048c581',
    metadata: { summary: 'Mostra como observar riscos em funções diferentes da escola, conectando relatos, rotina e documentação sem criar um curso autônomo de PGR (Programa de Gerenciamento de Riscos) ou GRO (Gerenciamento de Riscos Ocupacionais).', pandaVideoId: '4d427229-6cd1-420e-8664-a2cd771b9e62', pandaExternalId: '635d0e24-ba73-46e9-9e51-94939048c581', pandaFolderId: '8ddda579-dbfe-4412-b97d-5be2023e9747', videoStatus: 'published_to_panda' },
  },
  {
    order: 6,
    title: 'Canais formais e comunicação profissional',
    duration: '2min09',
    videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=fbae575c-f70a-42be-b5c5-abca2f19b22c',
    metadata: { summary: 'Define canais formais, critérios mínimos de registro e postura profissional para que a escola trate riscos sem informalidade perigosa.', pandaVideoId: '0fd0ceff-6cbb-4f2e-a917-0840fbd1bce0', pandaExternalId: 'fbae575c-f70a-42be-b5c5-abca2f19b22c', pandaFolderId: '8ddda579-dbfe-4412-b97d-5be2023e9747', videoStatus: 'published_to_panda' },
  },
  {
    order: 7,
    title: 'Canal anônimo, proteção e segurança psicológica',
    duration: '2min05',
    videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=ac17c596-0ccd-4352-b6b7-d6fae3af51de',
    metadata: { summary: 'Explica a função de canais protegidos e anônimos, com cuidado para segurança psicológica, apuração responsável e proteção contra retaliação.', pandaVideoId: 'f733514e-bb35-462d-bf10-002d09419f21', pandaExternalId: 'ac17c596-0ccd-4352-b6b7-d6fae3af51de', pandaFolderId: '8ddda579-dbfe-4412-b97d-5be2023e9747', videoStatus: 'published_to_panda' },
  },
  {
    order: 8,
    title: 'Certificado, evidências e continuidade da NR-1',
    duration: '2min17',
    videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=e3deb1c4-acdf-450a-a2b0-d0651052944e',
    metadata: { summary: 'Fecha a trilha com certificado, evidências, continuidade institucional e conexão da NR-1 (Norma Regulamentadora 1) com governança escolar.', pandaVideoId: 'ddfa0f76-d6a8-4b0b-83cb-8a0705c3af8b', pandaExternalId: 'e3deb1c4-acdf-450a-a2b0-d0651052944e', pandaFolderId: '8ddda579-dbfe-4412-b97d-5be2023e9747', videoStatus: 'published_to_panda' },
  }
];

export const courseDefinitions = {
  'nr1-escolas': {
    slug: 'nr1-escolas',
    title: 'NR-1 para Escolas — Riscos Psicossociais',
    shortTitle: 'NR-1 nas Escolas',
    description: 'Curso Excellentia para formação, registro institucional e compreensão prática da NR-1 (Norma Regulamentadora 1) no contexto escolar.',
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
      summary: 'Curso introdutório para equipes escolares sobre NR-1 (Norma Regulamentadora 1), riscos psicossociais, saúde emocional no trabalho e primeiros passos de adequação institucional.',
      cards: [
        { title: '8 aulas', description: 'Conteúdo liberado apenas na experiência autenticada' },
        { title: 'Equipe escolar', description: 'Conteúdo aplicável a docentes, gestão e colaboradores' },
        { title: 'NR-1 (Norma Regulamentadora 1) / PGR (Programa de Gerenciamento de Riscos)', description: 'Camada formativa ligada à documentação, governança e redução de riscos; PGR (Programa de Gerenciamento de Riscos) e GRO (Gerenciamento de Riscos Ocupacionais) não são tratados como curso autônomo.' },
      ],
      courseIntro:
        'Esta é a página pública do curso. Colaboradores convidados acessam a experiência formativa completa pelo link individual recebido da escola, com situações-problema, respostas, feedback formativo e registro de participação.',
      ctaTitle: 'Próxima camada do curso',
      ctaDescription:
        'A próxima etapa é transformar as aulas em uma experiência formativa completa: situações-problema, respostas dos colaboradores, feedback orientado por rubrica, evidências de participação e relatório para a escola.',
    },
    lessons: nr1Lessons,
    complianceNotes: [
      'Curso formativo e documental; não substitui avaliação técnica, jurídica ou de SST (Saúde e Segurança do Trabalho) quando exigida.',
      'Feedback formativo sem nota pública qualitativa.',
    ],
    metadata: {
      definitionVersion: '2026-05-02',
      productionStatus: 'nr1_aula01_aula02_aula03_aula04_aula05_aula06_aula07_aula08_published_to_panda',
      targetAudience: 'Público-alvo sugerido: docentes, gestores, coordenação, secretaria, apoio e demais colaboradores escolares, como recomendação por perfil/função para compreender a camada formativa e documental da NR-1 (Norma Regulamentadora 1). A escola define o envio pelo painel conforme função, risco e política interna.',
      syllabus: 'Ementa: introdução à NR-1 (Norma Regulamentadora 1), riscos psicossociais, sinais de desgaste, registros institucionais, comunicação segura, canais formais, proteção, evidências e continuidade. PGR (Programa de Gerenciamento de Riscos) e GRO (Gerenciamento de Riscos Ocupacionais) aparecem como camada documental e de governança vinculada à NR-1 (Norma Regulamentadora 1), não como curso autônomo.',
      lessonSummaries: nr1Lessons.map((lesson) => lesson.metadata?.summary),
    },
  },

  'lei-lucas-escolas': {
    slug: 'lei-lucas-escolas',
    title: 'Lei Lucas nas Escolas — Preparação, Protocolo e Evidências',
    shortTitle: 'Lei Lucas nas Escolas',
    description:
      'Formação Excellentia para preparar equipes escolares, organizar protocolos, registrar evidências e manter continuidade institucional em torno da Lei Lucas, sem substituir o treinamento prático presencial com profissional habilitado.',
    status: 'published',
    availability: 'published',
    audience: 'school_employee',
    track: 'primeiros-socorros',
    area: 'Segurança escolar',
    certificatePrefix: 'LLC',
    modules: 1,
    lessonsCount: 8,
    publicPage: {
      badge: 'Conformidade Escolar Essencial',
      headline: 'Lei Lucas nas Escolas',
      summary:
        'Curso disponível para transformar a Lei Lucas em preparação real: protocolo, responsabilidades, comunicação, registro e evidências ao longo do ano.',
      cards: [
        { title: '8 aulas', description: 'Conteúdo liberado apenas na experiência autenticada' },
        { title: 'Protocolo escolar', description: 'Fluxos de acionamento, coordenação, equipe de saúde e comunicação com responsáveis' },
        { title: 'Limite responsável', description: 'Não substitui a prática presencial com profissional habilitado; organiza o antes, o durante e o depois' },
      ],
      courseIntro:
        'A trilha Lei Lucas nas Escolas foi desenhada como camada institucional de preparação, protocolo e evidências. Ela apoia a escola antes, durante e depois do treinamento prático, sem prometer ensinar manobras técnicas por vídeo.',
      ctaTitle: 'Curso disponível',
      ctaDescription:
        'A formação reúne preparação protocolar, organização documental e evidências de participação para escolas, com acesso ao conteúdo completo apenas por convite ou contratação aplicável.'
    },
    lessons: [
      {
        order: 1,
        title: 'O que a Lei Lucas exige — e o que ela não resolve sozinha',
        duration: '5min27',
        videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=92543447-ea6c-46fa-9c5e-a82f13bf958e',
        metadata: {
          summary: 'Delimita o que a Lei Lucas exige da escola e reforça que a formação institucional não substitui treinamento prático presencial com profissional habilitado.',
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
          summary: 'Organiza papéis de adultos na emergência escolar para reduzir improviso, dispersão e omissão no acionamento correto.',
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
          summary: 'Trabalha fluxos de acionamento: quem chama quem, em qual ordem, com quais informações e por quais canais.',
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
          summary: 'Prepara a escola para chegar ao treinamento prático com papéis, espaços, materiais, contatos e registros minimamente organizados.',
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
          summary: 'Diferencia sinais de alerta em situações recorrentes na escola e orienta reconhecimento e acionamento sem manobras improvisadas.',
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
          summary: 'Explica quais competências dependem de simulação presencial supervisionada e por que vídeo não deve substituir prática técnica.',
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
          summary: 'Transforma a preparação em protocolo interno com pessoas de referência, locais, kits, comunicação e responsáveis.',
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
          summary: 'Fecha a trilha com evidências, reciclagem anual, registros e cultura de segurança como rotina institucional contínua.',
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
    metadata: {
      definitionVersion: '2026-05-02',
      videoStatus: 'aula01_aula02_aula03_aula04_aula05_aula06_aula07_aula08_published_to_panda',
      targetAudience: 'Público-alvo sugerido: docentes, gestores, coordenação, secretaria, equipe de apoio e demais adultos responsáveis por preparação, acionamento, comunicação e evidências em emergências escolares. A escola define o envio pelo painel conforme função, risco e política interna, sem tratar a lista como bloqueio rígido de distribuição.',
      syllabus: 'Ementa: obrigações e limites da Lei Lucas; papéis dos adultos; protocolo de acionamento; preparação prévia; reconhecimento de sinais; limites do vídeo; treinamento prático presencial; protocolo interno; evidências e reciclagem anual.',
      lessonSummaries: [
        'Delimita o que a Lei Lucas exige da escola e reforça que a formação institucional não substitui treinamento prático presencial com profissional habilitado.',
        'Organiza papéis de adultos na emergência escolar para reduzir improviso, dispersão e omissão no acionamento correto.',
        'Trabalha fluxos de acionamento: quem chama quem, em qual ordem, com quais informações e por quais canais.',
        'Prepara a escola para chegar ao treinamento prático com papéis, espaços, materiais, contatos e registros minimamente organizados.',
        'Diferencia sinais de alerta em situações recorrentes na escola e orienta reconhecimento e acionamento sem manobras improvisadas.',
        'Explica quais competências dependem de simulação presencial supervisionada e por que vídeo não deve substituir prática técnica.',
        'Transforma a preparação em protocolo interno com pessoas de referência, locais, kits, comunicação e responsáveis.',
        'Fecha a trilha com evidências, reciclagem anual, registros e cultura de segurança como rotina institucional contínua.',
      ],
    },
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
        'Esta trilha organiza uma base comum recomendada por perfil/função sobre prevenção, acionamento e limites de atuação. A escola define pelo painel quem recebe cada etapa conforme função, risco, política interna e exigências locais aplicáveis.',
      ctaTitle: 'Segurança contra incêndio como rotina escolar',
      ctaDescription:
        'A Excellentia apoia formação, registro e evidências, mas não substitui brigada, laudos, AVCB ou orientação técnica do Corpo de Bombeiros e profissionais habilitados.',
    },
    lessons: [
      { order: 1, title: "Escola, responsabilidade e cultura preventiva", metadata: { summary: "A aula enquadra a prevenção contra incêndio como responsabilidade institucional da escola, diferenciando cultura preventiva, regularidade técnica, resposta emergencial e limites de uma formação online.", sourcePath: "course-production/incendio-escolas/aulas/aula-01.md", videoStatus: 'content_validated_pending_video' } },
      { order: 2, title: "Riscos cotidianos e prevenção antes da emergência", metadata: { summary: "A aula identifica riscos cotidianos antes da emergência e orienta a escola a transformar observações simples em rotina preventiva documentada.", sourcePath: "course-production/incendio-escolas/aulas/aula-02.md", videoStatus: 'content_validated_pending_video' } },
      { order: 3, title: "Documentos, sistemas e regularidade: o que a escola deve saber sem improvisar", metadata: { summary: "A aula diferencia documentos, sistemas, laudos, licenças e evidências pedagógicas, reforçando que a escola deve conhecer seus limites e acionar apoio técnico competente.", sourcePath: "course-production/incendio-escolas/aulas/aula-03.md", videoStatus: 'content_validated_pending_video' } },
      { order: 4, title: "Plano de emergência, abandono e inclusão", metadata: { summary: "A aula organiza plano de emergência, abandono seguro, ponto de encontro, inclusão e comunicação, sempre sem substituir treinamento prático ou validação técnica local.", sourcePath: "course-production/incendio-escolas/aulas/aula-04.md", videoStatus: 'content_validated_pending_video' } },
      { order: 5, title: "Primeira resposta: alarme, comunicação e limites de atuação", metadata: { summary: "A aula define a primeira resposta escolar: alarmar, comunicar, orientar abandono e respeitar limites de atuação sem improvisar combate ao fogo.", sourcePath: "course-production/incendio-escolas/aulas/aula-05.md", videoStatus: 'content_validated_pending_video' } },
      { order: 6, title: "Governança, evidências e melhoria contínua", metadata: { summary: "A aula consolida governança, evidências, responsáveis, revisão periódica e integração documental com segurança e saúde do trabalho quando aplicável.", sourcePath: "course-production/incendio-escolas/aulas/aula-06.md", videoStatus: 'content_validated_pending_video' } }
    ],
    complianceNotes: [
      'Curso formativo e documental; não substitui brigada, AVCB, laudos, treinamento prático ou exigências do Corpo de Bombeiros.',
      'Conteúdo deve ser validado conforme legislação local e realidade física da escola.',
    ],
    metadata: {
      definitionVersion: '2026-05-10',
      videoStatus: 'pending_content_production',
      validationStatus: 'validated_theoretically_by_caio_telegram_2026_05_10',
      productionStatus: 'validated_theoretical_pending_video_seed_review',
      publicationGate: 'do_not_seed_deploy_publish_or_render_without_final_preproduction_gates',
      targetAudience: "Observação de implantação: o público-alvo é sugestão pedagógica por perfil/função. A escola decide no painel para quem enviar o curso ou cada aula, considerando função, risco, política interna, exigências locais e estratégia de formação. Diretores, coordenadores, mantenedores, professores, funcionários administrativos, equipes de apoio, portaria, limpeza, manutenção, cozinha, inspetoria, transporte escolar interno e equipes responsáveis por eventos ou permanência ampliada. Algumas aulas têm perfis recomendados por função indicados em cada arquivo.",
      suggestedProfiles: ["gestao", "coordenacao", "docentes", "secretaria", "manutencao", "portaria", "apoio"],
      syllabus: "Formação introdutória e protocolar sobre prevenção e resposta escolar a incêndio, com foco em cultura preventiva, responsabilidades institucionais, reconhecimento de riscos, documentos de regularidade, abandono seguro, comunicação, evidências e melhoria contínua.",
      lessonSummaries: [
            "A aula enquadra a prevenção contra incêndio como responsabilidade institucional da escola, diferenciando cultura preventiva, regularidade técnica, resposta emergencial e limites de uma formação online.",
            "A aula identifica riscos cotidianos antes da emergência e orienta a escola a transformar observações simples em rotina preventiva documentada.",
            "A aula diferencia documentos, sistemas, laudos, licenças e evidências pedagógicas, reforçando que a escola deve conhecer seus limites e acionar apoio técnico competente.",
            "A aula organiza plano de emergência, abandono seguro, ponto de encontro, inclusão e comunicação, sempre sem substituir treinamento prático ou validação técnica local.",
            "A aula define a primeira resposta escolar: alarmar, comunicar, orientar abandono e respeitar limites de atuação sem improvisar combate ao fogo.",
            "A aula consolida governança, evidências, responsáveis, revisão periódica e integração documental com segurança e saúde do trabalho quando aplicável."
      ],
    },
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
    lessonsCount: 10,
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
      { order: 1, title: "O que conta como violência escolar hoje", metadata: { summary: "A aula define violência escolar de forma ampla e operacional, diferenciando conflitos, intimidação, agressões, ameaças e situações que exigem proteção.", sourcePath: "course-production/violencia-escolar-protecao/aulas/aula-01.md", videoStatus: 'content_validated_pending_video' } },
      { order: 2, title: "Bullying: critérios, sinais e padrões", metadata: { summary: "A aula explica os critérios do bullying, sinais e padrões de repetição, intencionalidade e desequilíbrio de poder sem banalizar conflitos comuns.", sourcePath: "course-production/violencia-escolar-protecao/aulas/aula-02.md", videoStatus: 'content_validated_pending_video' } },
      { order: 3, title: "Cyberbullying e evidências digitais", metadata: { summary: "A aula trata cyberbullying e evidências digitais, orientando registro, preservação e encaminhamento sem exposição ou investigação improvisada.", sourcePath: "course-production/violencia-escolar-protecao/aulas/aula-03.md", videoStatus: 'content_validated_pending_video' } },
      { order: 4, title: "Acolhimento sem revitimização: proteção inicial e escuta mínima", metadata: { summary: "A aula aprofunda a proteção sem revitimização: como receber um relato, limitar perguntas, evitar exposição, registrar o mínimo necessário e acionar o fluxo sem aumentar o dano.", sourcePath: "course-production/violencia-escolar-protecao/aulas/aula-04.md", videoStatus: 'content_validated_pending_video' } },
      { order: 5, title: "Cuidado com o suposto autor e responsabilização pedagógica", metadata: { summary: "A aula trata o cuidado com o suposto autor: o que a escola pode fazer, o que deve evitar, como responsabilizar pedagogicamente e quando práticas restaurativas são inadequadas ou insuficientes.", sourcePath: "course-production/violencia-escolar-protecao/aulas/aula-05.md", videoStatus: 'content_validated_pending_video' } },
      { order: 6, title: "Quando acionar esferas superiores e rede de proteção", metadata: { summary: "A aula diferencia resposta pedagógica interna de acionamento superior, indicando sinais de gravidade como maus-tratos, violência sexual, ameaça grave, autolesão, arma, extorsão, adulto envolvido e risco atual.", sourcePath: "course-production/violencia-escolar-protecao/aulas/aula-06.md", videoStatus: 'content_validated_pending_video' } },
      { order: 7, title: "Registro escolar e proteção de informações", metadata: { summary: "A aula organiza registro escolar, proteção de informações, minimização de dados e acesso restrito em ocorrências sensíveis.", sourcePath: "course-production/violencia-escolar-protecao/aulas/aula-07.md", videoStatus: 'content_validated_pending_video' } },
      { order: 8, title: "Encaminhamentos: família, Conselho Tutelar e rede de proteção", metadata: { summary: "A aula orienta encaminhamentos para família, Conselho Tutelar e rede de proteção, distinguindo papel escolar de atuação jurídica, policial ou psicossocial.", sourcePath: "course-production/violencia-escolar-protecao/aulas/aula-08.md", videoStatus: 'content_validated_pending_video' } },
      { order: 9, title: "Responsabilização educativa e cultura de paz", metadata: { summary: "A aula trabalha responsabilização educativa, reparação possível e cultura de paz sem transformar a escola em órgão sancionador externo.", sourcePath: "course-production/violencia-escolar-protecao/aulas/aula-09.md", videoStatus: 'content_validated_pending_video' } },
      { order: 10, title: "Implantando o protocolo na escola", metadata: { summary: "A aula fecha o curso com implantação de protocolo, papéis, evidências, revisão e adaptação à realidade local da escola.", sourcePath: "course-production/violencia-escolar-protecao/aulas/aula-10.md", videoStatus: 'content_validated_pending_video' } }
    ],
    complianceNotes: [
      'Curso formativo; não substitui atuação de psicologia, serviço social, jurídico, Conselho Tutelar ou autoridades quando cabível.',
      'Casos de violência devem observar proteção da vítima, sigilo, devido encaminhamento e legislação aplicável.',
    ],
    metadata: {
      definitionVersion: '2026-05-10',
      videoStatus: 'pending_content_production',
      validationStatus: 'validated_theoretically_by_caio_telegram_2026_05_10',
      productionStatus: 'validated_theoretical_pending_video_seed_review',
      publicationGate: 'do_not_seed_deploy_publish_or_render_without_final_preproduction_gates',
      targetAudience: "Observação de implantação: o público-alvo é sugestão pedagógica por perfil/função. A escola decide no painel para quem enviar o curso ou cada aula, considerando função, risco, política interna, exigências locais e estratégia de formação. Direção, coordenação, orientação/convivência, professores, inspetoria/monitores e demais adultos que lidam diretamente com estudantes na rotina escolar. Secretaria, comunicação, tecnologia da informação e mantenedora entram como público por perfil/função apenas quando participam de registro, guarda de evidências, comunicação institucional, plataformas digitais, governança ou encaminhamentos.",
      suggestedProfiles: ["gestao", "coordenacao", "docentes", "orientacao", "secretaria", "apoio", "comunicacao"],
      syllabus: "Formação protocolar e pedagógica para reconhecer violência escolar, bullying e cyberbullying, acolher sem revitimizar, registrar fatos, proteger informações, acionar fluxos internos e externos, comunicar com sobriedade e implantar protocolo de convivência e proteção.",
      lessonSummaries: [
            "A aula define violência escolar de forma ampla e operacional, diferenciando conflitos, intimidação, agressões, ameaças e situações que exigem proteção.",
            "A aula explica os critérios do bullying, sinais e padrões de repetição, intencionalidade e desequilíbrio de poder sem banalizar conflitos comuns.",
            "A aula trata cyberbullying e evidências digitais, orientando registro, preservação e encaminhamento sem exposição ou investigação improvisada.",
            "A aula aprofunda a proteção sem revitimização: como receber um relato, limitar perguntas, evitar exposição, registrar o mínimo necessário e acionar o fluxo sem aumentar o dano.",
            "A aula trata o cuidado com o suposto autor: o que a escola pode fazer, o que deve evitar, como responsabilizar pedagogicamente e quando práticas restaurativas são inadequadas ou insuficientes.",
            "A aula diferencia resposta pedagógica interna de acionamento superior, indicando sinais de gravidade como maus-tratos, violência sexual, ameaça grave, autolesão, arma, extorsão, adulto envolvido e risco atual.",
            "A aula organiza registro escolar, proteção de informações, minimização de dados e acesso restrito em ocorrências sensíveis.",
            "A aula orienta encaminhamentos para família, Conselho Tutelar e rede de proteção, distinguindo papel escolar de atuação jurídica, policial ou psicossocial.",
            "A aula trabalha responsabilização educativa, reparação possível e cultura de paz sem transformar a escola em órgão sancionador externo.",
            "A aula fecha o curso com implantação de protocolo, papéis, evidências, revisão e adaptação à realidade local da escola."
      ],
    },
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
      { order: 1, title: "Cultura digital e proteção integral na escola", metadata: { summary: "A aula cria linguagem comum para tratar tecnologia, exposição, comunicação e dados como parte da proteção integral, sem transformar o curso em formação jurídica de proteção de dados.", sourcePath: "course-production/protecao-digital-dados-escolas/aulas/aula-01.md", videoStatus: 'content_validated_pending_video' } },
      { order: 2, title: "Celulares e telas: regra, exceção e finalidade pedagógica", metadata: { summary: "A aula organiza regras sobre celulares e telas, distinguindo proibição, exceção pedagógica, finalidade, comunicação com famílias e coerência institucional.", sourcePath: "course-production/protecao-digital-dados-escolas/aulas/aula-02.md", videoStatus: 'content_validated_pending_video' } },
      { order: 3, title: "Imagem, voz e exposição de estudantes", metadata: { summary: "A aula orienta o cuidado com imagem, voz e exposição de estudantes em eventos, redes sociais, grupos e registros escolares.", sourcePath: "course-production/protecao-digital-dados-escolas/aulas/aula-03.md", videoStatus: 'content_validated_pending_video' } },
      { order: 4, title: "Dados pessoais, plataformas e mínimo necessário", metadata: { summary: "A aula ensina um inventário mínimo de dados e plataformas, com foco em finalidade, necessidade, acesso, segurança e melhor interesse.", sourcePath: "course-production/protecao-digital-dados-escolas/aulas/aula-04.md", videoStatus: 'content_validated_pending_video' } },
      { order: 5, title: "Grupos digitais e comunicação institucional", metadata: { summary: "A aula estrutura grupos digitais e comunicação institucional para reduzir ruído, conflitos, prints indevidos e informalidade de canais sensíveis.", sourcePath: "course-production/protecao-digital-dados-escolas/aulas/aula-05.md", videoStatus: 'content_validated_pending_video' } },
      { order: 6, title: "Incidentes digitais: acolher, registrar e encaminhar sem revitimizar", metadata: { summary: "A aula define resposta escolar a incidentes digitais com acolhimento, registro proporcional, preservação de evidências e encaminhamento sem revitimização.", sourcePath: "course-production/protecao-digital-dados-escolas/aulas/aula-06.md", videoStatus: 'content_validated_pending_video' } },
      { order: 7, title: "Plano escolar de proteção digital", metadata: { summary: "A aula reúne papéis, documentos, política mínima, evidências e ciclo de revisão em um plano escolar de proteção digital.", sourcePath: "course-production/protecao-digital-dados-escolas/aulas/aula-07.md", videoStatus: 'content_validated_pending_video' } }
    ],
    complianceNotes: [
      'Curso formativo e preventivo; não substitui parecer jurídico, DPO ou adequação LGPD completa quando necessária.',
      'Condutas devem ser compatibilizadas com regimento escolar, contratos, políticas de privacidade e legislação vigente.',
    ],
    metadata: {
      definitionVersion: '2026-05-10',
      videoStatus: 'pending_content_production',
      validationStatus: 'validated_theoretically_by_caio_telegram_2026_05_10',
      productionStatus: 'validated_theoretical_pending_video_seed_review',
      publicationGate: 'do_not_seed_deploy_publish_or_render_without_final_preproduction_gates',
      targetAudience: "Observação de implantação: o público-alvo é sugestão pedagógica por perfil/função. A escola decide no painel para quem enviar o curso ou cada aula, considerando função, risco, política interna, exigências locais e estratégia de formação. Direção, coordenação, professores, secretaria, comunicação, tecnologia da informação, orientação/convivência, inspetoria, equipes de apoio, mantenedora e responsáveis por canais digitais, eventos, plataformas ou comunicação com famílias.",
      suggestedProfiles: ["gestao", "coordenacao", "docentes", "secretaria", "comunicacao", "tecnologia", "orientacao"],
      syllabus: "Formação prática sobre cultura digital, uso de telas, imagem, dados pessoais, plataformas, grupos digitais, incidentes e plano escolar de proteção digital, com foco em proteção integral e rotina institucional segura.",
      lessonSummaries: [
            "A aula cria linguagem comum para tratar tecnologia, exposição, comunicação e dados como parte da proteção integral, sem transformar o curso em formação jurídica de proteção de dados.",
            "A aula organiza regras sobre celulares e telas, distinguindo proibição, exceção pedagógica, finalidade, comunicação com famílias e coerência institucional.",
            "A aula orienta o cuidado com imagem, voz e exposição de estudantes em eventos, redes sociais, grupos e registros escolares.",
            "A aula ensina um inventário mínimo de dados e plataformas, com foco em finalidade, necessidade, acesso, segurança e melhor interesse.",
            "A aula estrutura grupos digitais e comunicação institucional para reduzir ruído, conflitos, prints indevidos e informalidade de canais sensíveis.",
            "A aula define resposta escolar a incidentes digitais com acolhimento, registro proporcional, preservação de evidências e encaminhamento sem revitimização.",
            "A aula reúne papéis, documentos, política mínima, evidências e ciclo de revisão em um plano escolar de proteção digital."
      ],
    },
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
    lessonsCount: 8,
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
      { order: 1, title: "Fundamentos da LGPD (Lei Geral de Proteção de Dados) na escola: dados, papéis e melhor interesse", metadata: { summary: "A aula apresenta a Lei Geral de Proteção de Dados na escola como cuidado institucional cotidiano, com dados pessoais, dados sensíveis, papéis e melhor interesse de crianças e adolescentes.", sourcePath: "course-production/lgpd-escolas/aulas/aula-01.md", videoStatus: 'content_validated_pending_video' } },
      { order: 2, title: "Crianças, adolescentes, dados sensíveis e imagem", metadata: { summary: "A aula aprofunda o tratamento de dados de crianças e adolescentes, dados sensíveis, imagem e consentimento sem reduzir o tema a autorização formal.", sourcePath: "course-production/lgpd-escolas/aulas/aula-02.md", videoStatus: 'content_validated_pending_video' } },
      { order: 3, title: "Secretaria, matrícula, documentos e comunicação com famílias", metadata: { summary: "A aula traduz a proteção de dados para matrícula, secretaria, documentos, balcão, guarda de informações e comunicação com famílias, com foco em finalidade, necessidade, acesso e canal institucional.", sourcePath: "course-production/lgpd-escolas/aulas/aula-03.md", videoStatus: 'content_validated_pending_video' } },
      { order: 4, title: "Direitos dos titulares, solicitações de famílias e fluxo de atendimento LGPD", metadata: { summary: "A aula organiza o atendimento a direitos dos titulares na escola: acesso, correção, informação, revogação, remoção de imagem, pedidos de exclusão, verificação de identidade, legitimidade de responsáveis, registro e encaminhamento institucional.", sourcePath: "course-production/lgpd-escolas/aulas/aula-04.md", videoStatus: 'content_validated_pending_video' } },
      { order: 5, title: "Professores, registros pedagógicos e linguagem responsável", metadata: { summary: "A aula mostra como transformar observações pedagógicas em registros objetivos, necessários e respeitosos, evitando rótulos, exposição, comentários informais e compartilhamento inadequado.", sourcePath: "course-production/lgpd-escolas/aulas/aula-05.md", videoStatus: 'content_validated_pending_video' } },
      { order: 6, title: "Coordenação, inclusão, laudos, ocorrências e acesso restrito", metadata: { summary: "A aula trata de laudos, ocorrências, inclusão, reuniões, encaminhamentos e informações sensíveis, orientando a escola a compartilhar somente o necessário, registrar com acesso restrito e evitar exposição indevida.", sourcePath: "course-production/lgpd-escolas/aulas/aula-06.md", videoStatus: 'content_validated_pending_video' } },
      { order: 7, title: "Fornecedores, plataformas digitais, segurança e incidentes", metadata: { summary: "A aula organiza cuidados com fornecedores, plataformas digitais, segurança da informação e resposta inicial a incidentes envolvendo dados escolares.", sourcePath: "course-production/lgpd-escolas/aulas/aula-07.md", videoStatus: 'content_validated_pending_video' } },
      { order: 8, title: "Governança escolar, evidências e plano de implantação por perfil", metadata: { summary: "A aula transforma os aprendizados em governança escolar por perfil, com políticas, fluxos, evidências, responsáveis e plano de ação proporcional.", sourcePath: "course-production/lgpd-escolas/aulas/aula-08.md", videoStatus: 'content_validated_pending_video' } }
    ],
    complianceNotes: [
      'Curso formativo; não substitui programa completo de adequação LGPD, DPO ou assessoria jurídica.',
      'Tratamento de dados de crianças e adolescentes exige cuidado reforçado, base legal adequada e governança documental.',
    ],
    metadata: {
      definitionVersion: '2026-05-10',
      videoStatus: 'pending_content_production',
      validationStatus: 'validated_theoretically_by_caio_telegram_2026_05_10',
      productionStatus: 'validated_theoretical_pending_video_seed_review',
      publicationGate: 'do_not_seed_deploy_publish_or_render_without_final_preproduction_gates',
      targetAudience: "Observação de implantação: o público-alvo é sugestão pedagógica por perfil/função. A escola decide no painel para quem enviar o curso ou cada aula, considerando função, risco, política interna, exigências locais e estratégia de formação. Colaboradores escolares por perfil: equipes de apoio e circulação; secretaria, comunicação, coordenação, professores, tecnologia, financeiro e direção; e, em camada inicial de governança, mantenedora, jurídico, encarregado/ponto focal, tecnologia da informação e coordenações que definem processos. Aprofundamentos jurídicos, contratuais e técnicos devem ser tratados em módulo complementar quando necessário.",
      suggestedProfiles: ["gestao", "coordenacao", "secretaria", "financeiro", "comunicacao", "tecnologia", "docentes", "encarregado"],
      syllabus: "Formação operacional sobre aplicação da Lei Geral de Proteção de Dados à rotina escolar, cobrindo matrícula, secretaria, comunicação com famílias, registros pedagógicos, imagem, plataformas, fornecedores, direitos dos titulares, incidentes e governança documental.",
      lessonSummaries: [
            "A aula apresenta a Lei Geral de Proteção de Dados na escola como cuidado institucional cotidiano, com dados pessoais, dados sensíveis, papéis e melhor interesse de crianças e adolescentes.",
            "A aula aprofunda o tratamento de dados de crianças e adolescentes, dados sensíveis, imagem e consentimento sem reduzir o tema a autorização formal.",
            "A aula traduz a proteção de dados para matrícula, secretaria, documentos, balcão, guarda de informações e comunicação com famílias, com foco em finalidade, necessidade, acesso e canal institucional.",
            "A aula organiza o atendimento a direitos dos titulares na escola: acesso, correção, informação, revogação, remoção de imagem, pedidos de exclusão, verificação de identidade, legitimidade de responsáveis, registro e encaminhamento institucional.",
            "A aula mostra como transformar observações pedagógicas em registros objetivos, necessários e respeitosos, evitando rótulos, exposição, comentários informais e compartilhamento inadequado.",
            "A aula trata de laudos, ocorrências, inclusão, reuniões, encaminhamentos e informações sensíveis, orientando a escola a compartilhar somente o necessário, registrar com acesso restrito e evitar exposição indevida.",
            "A aula organiza cuidados com fornecedores, plataformas digitais, segurança da informação e resposta inicial a incidentes envolvendo dados escolares.",
            "A aula transforma os aprendizados em governança escolar por perfil, com políticas, fluxos, evidências, responsáveis e plano de ação proporcional."
      ],
    },
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
