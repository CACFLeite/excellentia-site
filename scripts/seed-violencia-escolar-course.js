const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const workspace = path.resolve(__dirname, '..', '..');
const foundationDir = path.join(workspace, 'course-foundations', 'violencia-escolar-protecao');
const lessonsDir = path.join(foundationDir, 'aulas');

const lessonFiles = Array.from({ length: 8 }, (_, index) =>
  path.join(lessonsDir, `aula-${String(index + 1).padStart(2, '0')}.md`),
);

function section(markdown, heading) {
  const lines = markdown.split(/\r?\n/);
  const headingRegex = new RegExp(`^##+\\s+${heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`, 'i');
  const start = lines.findIndex((line) => headingRegex.test(line.trim()));

  if (start === -1) return '';

  const collected = [];
  for (let index = start + 1; index < lines.length; index += 1) {
    if (/^##+\s+/.test(lines[index])) break;
    collected.push(lines[index]);
  }

  return collected.join('\n').trim();
}

function lessonTitle(markdown, order) {
  const firstLine = markdown.split(/\r?\n/).map((line) => line.trim()).find(Boolean) || `Aula ${String(order).padStart(2, '0')}`;
  return firstLine.replace(/^#\s*Aula\s+\d+\s*[—-]\s*/, '').replace(/^#\s*/, '').trim();
}

function activityType(order) {
  return {
    1: 'classification',
    2: 'case_diagnosis',
    3: 'checklist',
    4: 'rewrite_safe_approach',
    5: 'evidence_log',
    6: 'protocol_sequence',
    7: 'action_plan',
    8: 'thirty_day_operational_plan',
  }[order] || 'situational_response';
}

function promptFor(markdown, order) {
  const activity = section(markdown, 'Atividade pós-aula');
  const objective = section(markdown, 'Objetivo');

  const instructions = {
    1: 'Classifique uma situação fictícia como conflito, agressão isolada, suspeita de bullying, cyberbullying ou violência grave. Justifique usando apenas sinais observáveis e indique qual registro/encaminhamento inicial seria prudente.',
    2: 'Analise um caso fictício e indique quais sinais sugerem, ou não, bullying: repetição, intenção, desequilíbrio de poder, impacto e risco de retaliação. Evite conclusões jurídicas.',
    3: 'Monte um checklist de resposta a um incidente digital: preservação de evidência, contenção da circulação, sigilo, comunicação e possíveis encaminhamentos.',
    4: 'Reescreva uma abordagem inadequada de acolhimento para uma forma segura: escuta mínima, proteção, ausência de julgamento, sem acareação e sem promessa de sigilo absoluto.',
    5: 'Preencha um registro simulado com fatos observáveis, providências, evidências preservadas, responsáveis e plano de acompanhamento, evitando adjetivos acusatórios.',
    6: 'Organize a sequência de acionamento em um caso sensível: escola, família, Conselho Tutelar, rede de saúde/assistência ou autoridade, explicando o motivo de cada passo.',
    7: 'Proponha um plano de intervenção pedagógica para turma/equipe que combine responsabilização educativa, proteção da vítima, prevenção de retaliação e cultura de paz.',
    8: 'Desenhe um plano operacional de 30 dias para implantação do protocolo: responsáveis, formulários, comunicação, formação, indicadores e revisão.',
  }[order];

  return [activity, '', 'Tarefa Excellentia:', instructions, '', objective ? `Objetivo da aula: ${objective}` : ''].filter(Boolean).join('\n');
}

function rubricFor(markdown, order) {
  return {
    course: 'violencia-escolar-protecao',
    lessonOrder: order,
    activityType: activityType(order),
    sourceRubric: section(markdown, 'Rubrica / feedback formativo'),
    objective: section(markdown, 'Objetivo'),
    claimLimits: section(markdown, 'Limites de claim'),
    levels: {
      weak: 'Resposta minimiza risco, rotula pessoas de forma conclusiva, ignora sigilo/proteção ou propõe investigação/encaminhamento inadequado.',
      initial: 'Resposta reconhece parte do problema, mas ainda mistura categorias, deixa lacunas de registro/encaminhamento ou usa linguagem pouco segura.',
      adequate: 'Resposta diferencia categorias com base em sinais observáveis, preserva sigilo, propõe registro e encaminhamento compatíveis com o risco.',
      strong: 'Resposta organiza protocolo completo, evidencia limites da escola, protege envolvidos, prevê acompanhamento e evita promessas ou conclusões indevidas.',
    },
    feedback: {
      weak: 'Reforce a diferença entre acolher, registrar e investigar. A escola deve proteger e acionar o fluxo correto, não sentenciar fatos ou expor envolvidos.',
      initial: 'Você identificou elementos importantes. Agora refine a classificação, descreva fatos observáveis e indique registro, comunicação e acompanhamento.',
      adequate: 'Boa conexão entre situação, proteção, registro e encaminhamento. Mantenha linguagem factual e atenção ao sigilo.',
      strong: 'Excelente resposta formativa: combina prudência, protocolo, evidência, proteção e limites institucionais.',
    },
  };
}

async function main() {
  const course = await prisma.course.upsert({
    where: { slug: 'violencia-escolar-protecao' },
    update: {
      title: 'Proteção contra Violência Escolar — Bullying, Cyberbullying e Encaminhamentos',
      status: 'draft',
      description:
        'Formação Excellentia para prevenção, identificação, registro, acolhimento e encaminhamento responsável de violência escolar, bullying e cyberbullying, sem substituir jurídico, psicologia, Conselho Tutelar ou autoridades.',
      metadata: {
        audience: 'school_employee',
        track: 'protecao-digital',
        certificatePrefix: 'PVE',
        definitionVersion: '2026-05-02',
        productionStatus: 'foundation_seeded_pending_caio_validation_and_video',
        foundationDir: 'course-foundations/violencia-escolar-protecao',
        complianceDisclaimer:
          'Curso formativo, protocolar e documental. Não substitui atuação de psicologia, serviço social, jurídico, Conselho Tutelar, rede de proteção ou autoridades quando cabível.',
      },
    },
    create: {
      slug: 'violencia-escolar-protecao',
      title: 'Proteção contra Violência Escolar — Bullying, Cyberbullying e Encaminhamentos',
      status: 'draft',
      description:
        'Formação Excellentia para prevenção, identificação, registro, acolhimento e encaminhamento responsável de violência escolar, bullying e cyberbullying, sem substituir jurídico, psicologia, Conselho Tutelar ou autoridades.',
      metadata: {
        audience: 'school_employee',
        track: 'protecao-digital',
        certificatePrefix: 'PVE',
        definitionVersion: '2026-05-02',
        productionStatus: 'foundation_seeded_pending_caio_validation_and_video',
        foundationDir: 'course-foundations/violencia-escolar-protecao',
        complianceDisclaimer:
          'Curso formativo, protocolar e documental. Não substitui atuação de psicologia, serviço social, jurídico, Conselho Tutelar, rede de proteção ou autoridades quando cabível.',
      },
    },
  });

  for (let index = 0; index < lessonFiles.length; index += 1) {
    const order = index + 1;
    const file = lessonFiles[index];
    const markdown = fs.readFileSync(file, 'utf8');
    const sourceFile = path.relative(workspace, file);
    const title = lessonTitle(markdown, order);

    const lesson = await prisma.lesson.upsert({
      where: { courseId_order: { courseId: course.id, order } },
      update: {
        title,
        videoUrl: null,
        transcript: markdown,
        metadata: {
          sourceFile,
          videoStatus: 'pending_video_production',
          activityType: activityType(order),
          claimLimits: section(markdown, 'Limites de claim'),
        },
      },
      create: {
        courseId: course.id,
        order,
        title,
        videoUrl: null,
        transcript: markdown,
        metadata: {
          sourceFile,
          videoStatus: 'pending_video_production',
          activityType: activityType(order),
          claimLimits: section(markdown, 'Limites de claim'),
        },
      },
    });

    const existing = await prisma.activity.findFirst({ where: { lessonId: lesson.id } });
    const data = {
      prompt: promptFor(markdown, order),
      rubric: rubricFor(markdown, order),
      metadata: {
        sourceFile,
        activityVersion: '2026-05-02',
        activityType: activityType(order),
        feedbackMode: 'formative_protocol_rubric',
      },
    };

    if (existing) {
      await prisma.activity.update({ where: { id: existing.id }, data });
    } else {
      await prisma.activity.create({ data: { lessonId: lesson.id, ...data } });
    }
  }

  console.log(`Seeded ${lessonFiles.length} Proteção contra Violência Escolar lessons for course ${course.slug}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
