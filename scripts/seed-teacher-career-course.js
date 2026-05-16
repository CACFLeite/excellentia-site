const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const courseDefinition = {
  slug: 'gestao-carreira-professores',
  title: 'Gestão de Carreira para Professores',
  description:
    'Curso Excellentia para professores que querem atravessar processos seletivos de escolas particulares com mais preparo, leitura de contexto e posicionamento profissional.',
  metadata: {
    audience: 'teacher_subscriber',
    teacherSubscriber: true,
    track: 'carreira-docente',
    certificatePrefix: 'GCP',
    definitionVersion: '2026-05-16',
    modules: 5,
    lessonsCount: 20,
    productionStatus: 'technical_access_seed_available_content_outline_pending_full_media',
    targetAudience:
      'Professores que buscam vagas, recolocação, preparação para processos seletivos ou melhor posicionamento profissional em escolas particulares.',
    syllabus:
      'Processo seletivo escolar, currículo docente, entrevista individual, dinâmica coletiva, aula teste, planejamento, sequência didática, documentação, disponibilidade e decisão profissional.',
  },
};

const lessons = [
  ['Como escolas particulares selecionam professores', 'Como escolas decidem contratações', 'Mapeie quem participa da decisão de contratação e que sinal profissional você precisa tornar visível já no início do processo.'],
  ['Critérios explícitos e critérios silenciosos', 'Como escolas decidem contratações', 'Liste três critérios explícitos da vaga e três critérios silenciosos que provavelmente serão observados durante a seleção.'],
  ['O que a escola tenta evitar ao contratar', 'Como escolas decidem contratações', 'Identifique riscos que a escola pode tentar evitar e como seu currículo ou entrevista podem reduzir essa percepção.'],
  ['Sinais de cultura institucional antes de aceitar uma vaga', 'Como escolas decidem contratações', 'Registre sinais de cultura institucional que você observaria antes de aceitar uma proposta.'],
  ['Estrutura ideal do currículo docente', 'Currículo de professor', 'Reorganize seu currículo em blocos claros: formação, experiência, segmentos, resultados e diferenciais reais.'],
  ['Como apresentar formação, experiência e resultados', 'Currículo de professor', 'Transforme uma experiência anterior em evidência profissional observável, sem exagero e sem linguagem genérica.'],
  ['Como adaptar currículo por segmento e função', 'Currículo de professor', 'Escolha uma vaga-alvo e indique quais partes do currículo precisam ganhar destaque ou ser reduzidas.'],
  ['Erros que eliminam antes da entrevista', 'Currículo de professor', 'Revise seu currículo e registre três elementos que podem transmitir ruído, excesso ou falta de foco.'],
  ['Preparação antes da entrevista', 'Entrevista individual', 'Monte um roteiro de preparação com pesquisa da escola, narrativa profissional e perguntas a fazer.'],
  ['Como falar de trajetória sem parecer genérico', 'Entrevista individual', 'Escreva uma resposta curta sobre sua trajetória conectando escolha, prática docente e evidência concreta.'],
  ['Perguntas comuns e perguntas-armadilha', 'Entrevista individual', 'Prepare uma resposta para uma pergunta difícil envolvendo conflito, família, inclusão, resultado ou desligamento.'],
  ['Leitura política da entrevista', 'Entrevista individual', 'Anote que sinais do entrevistador e da escola você observaria para decidir se a vaga faz sentido.'],
  ['Entrevista coletiva e dinâmica de grupo', 'Dinâmica e posicionamento', 'Defina como você quer se posicionar numa dinâmica sem competir artificialmente nem se apagar.'],
  ['Quando liderar e quando observar', 'Dinâmica e posicionamento', 'Descreva uma situação em que liderar ajuda e outra em que observar comunica mais maturidade.'],
  ['Como lidar com divergência e comparação', 'Dinâmica e posicionamento', 'Construa uma resposta para discordar de alguém mantendo firmeza, escuta e postura profissional.'],
  ['Critérios silenciosos em dinâmicas coletivas', 'Dinâmica e posicionamento', 'Liste comportamentos que podem ser avaliados numa dinâmica mesmo quando ninguém os nomeia.'],
  ['Como planejar uma aula teste', 'Aula-teste e contratação', 'Organize objetivo, início, desenvolvimento, fechamento e evidência de aprendizagem para uma aula teste.'],
  ['O que a banca observa na aula teste', 'Aula-teste e contratação', 'Identifique como demonstrar domínio, intencionalidade e manejo sem transformar a aula em apresentação teatral.'],
  ['Planejamento, sequência didática e documentação', 'Aula-teste e contratação', 'Monte um esqueleto de plano de aula com objetivo, habilidade, avaliação e justificativa das escolhas.'],
  ['Disponibilidade, proposta e decisão profissional', 'Aula-teste e contratação', 'Crie um checklist de decisão antes de aceitar uma proposta: horário, contrato, remuneração, cultura e limites.'],
].map(([title, module, prompt], index) => ({
  order: index + 1,
  title,
  module,
  prompt,
  summary: prompt,
}));

function rubric(module) {
  return {
    module,
    expected: [
      'Resposta conectada ao contexto real de processos seletivos escolares.',
      'Clareza sobre decisão prática ou evidência profissional observável.',
      'Linguagem profissional, sem promessa artificial e sem generalidade vazia.',
    ],
    feedbackPolicy: 'Feedback formativo, privado e orientado à melhoria do posicionamento profissional.',
  };
}

async function grantPublishedTeacherCourses(courseId) {
  const subscribers = await prisma.teacherSubscriber.findMany({
    where: { status: 'active' },
    select: { id: true },
  });

  await Promise.all(subscribers.map((subscriber) => prisma.teacherCourseAccess.upsert({
    where: { subscriberId_courseId: { subscriberId: subscriber.id, courseId } },
    update: {},
    create: { subscriberId: subscriber.id, courseId, grantedBy: 'seed_teacher_course' },
  })));

  return subscribers.length;
}

async function main() {
  const course = await prisma.course.upsert({
    where: { slug: courseDefinition.slug },
    update: {
      title: courseDefinition.title,
      description: courseDefinition.description,
      status: 'published',
      metadata: {
        ...courseDefinition.metadata,
        lessonSummaries: lessons.map((lesson) => lesson.summary),
      },
    },
    create: {
      slug: courseDefinition.slug,
      title: courseDefinition.title,
      description: courseDefinition.description,
      status: 'published',
      metadata: {
        ...courseDefinition.metadata,
        lessonSummaries: lessons.map((lesson) => lesson.summary),
      },
    },
  });

  for (const lessonDefinition of lessons) {
    const lesson = await prisma.lesson.upsert({
      where: { courseId_order: { courseId: course.id, order: lessonDefinition.order } },
      update: {
        title: lessonDefinition.title,
        metadata: {
          module: lessonDefinition.module,
          summary: lessonDefinition.summary,
          contentStatus: 'outline_pending_full_media',
        },
      },
      create: {
        courseId: course.id,
        order: lessonDefinition.order,
        title: lessonDefinition.title,
        metadata: {
          module: lessonDefinition.module,
          summary: lessonDefinition.summary,
          contentStatus: 'outline_pending_full_media',
        },
      },
    });

    const existingActivity = await prisma.activity.findFirst({ where: { lessonId: lesson.id } });
    const activityData = {
      prompt: lessonDefinition.prompt,
      rubric: rubric(lessonDefinition.module),
    };

    if (existingActivity) {
      await prisma.activity.update({ where: { id: existingActivity.id }, data: activityData });
    } else {
      await prisma.activity.create({ data: { lessonId: lesson.id, ...activityData } });
    }
  }

  const grantedSubscribers = await grantPublishedTeacherCourses(course.id);
  console.log(JSON.stringify({
    course: course.slug,
    courseId: course.id,
    lessons: lessons.length,
    grantedSubscribers,
  }, null, 2));
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
