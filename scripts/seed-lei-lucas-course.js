const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const workspace = path.resolve(__dirname, '..', '..');

const sourceFiles = Array.from({ length: 8 }, (_, index) =>
  `excellentia-lei-lucas-aula${String(index + 1).padStart(2, '0')}-roteiro-rubrica-v1-rascunho-2026-05-01.md`,
);

function section(markdown, heading) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`^##+\\s+${escaped}\\s*$([\\s\\S]*?)(?=^##+\\s+|\\z)`, 'im');
  const match = markdown.match(regex);
  return match ? match[1].trim() : '';
}

function firstNonEmptyLine(text) {
  return text.split(/\r?\n/).map((line) => line.trim()).find(Boolean) || '';
}

function lessonTitle(markdown, order) {
  return (
    section(markdown, 'Título da aula') ||
    firstNonEmptyLine(markdown).replace(/^#\s*/, '') ||
    `Aula ${String(order).padStart(2, '0')}`
  ).split(/\r?\n/)[0].trim();
}

function activityPrompt(markdown, order) {
  return (
    section(markdown, `Situação-problema — versão final Aula ${String(order).padStart(2, '0')}`) ||
    section(markdown, `Situação-problema — versão final Aula ${order}`) ||
    section(markdown, `Situação-problema — versão inicial Aula ${String(order).padStart(2, '0')}`) ||
    section(markdown, `Situação-problema — versão inicial Aula ${order}`) ||
    section(markdown, 'Situação-problema') ||
    section(markdown, 'Variação mais simples para colaboradores não docentes') ||
    'Explique, com suas palavras, como a escola deve transformar esta aula em conduta prática, protocolo e evidência institucional.'
  );
}

function rubric(markdown, order) {
  return {
    course: 'lei-lucas-escolas',
    lessonOrder: order,
    weak: section(markdown, 'Resposta frágil'),
    initial: section(markdown, 'Resposta inicial'),
    adequate: section(markdown, 'Resposta adequada'),
    strong: section(markdown, 'Resposta forte'),
    feedback: {
      weak: section(markdown, 'Para resposta frágil'),
      initial: section(markdown, 'Para resposta inicial'),
      adequate: section(markdown, 'Para resposta adequada'),
      strong: section(markdown, 'Para resposta forte'),
    },
    signals: section(markdown, 'O que a questão deve revelar'),
  };
}

async function main() {
  const course = await prisma.course.upsert({
    where: { slug: 'lei-lucas-escolas' },
    update: {
      title: 'Lei Lucas nas Escolas — Preparação, Protocolo e Evidências',
      status: 'draft',
      description:
        'Curso Excellentia para preparação institucional, protocolos, evidências e continuidade da Lei Lucas na rotina escolar, sem substituir treinamento prático presencial com profissional habilitado.',
      metadata: {
        audience: 'school_employee',
        track: 'primeiros-socorros',
        certificatePrefix: 'LLC',
        definitionVersion: '2026-05-02',
        productionStatus: 'scripts_rubrics_audio_ready_video_pipeline_in_validation',
        practicalTrainingDisclaimer:
          'Não substitui treinamento prático presencial de primeiros socorros ministrado por profissional habilitado quando aplicável.',
      },
    },
    create: {
      slug: 'lei-lucas-escolas',
      title: 'Lei Lucas nas Escolas — Preparação, Protocolo e Evidências',
      status: 'draft',
      description:
        'Curso Excellentia para preparação institucional, protocolos, evidências e continuidade da Lei Lucas na rotina escolar, sem substituir treinamento prático presencial com profissional habilitado.',
      metadata: {
        audience: 'school_employee',
        track: 'primeiros-socorros',
        certificatePrefix: 'LLC',
        definitionVersion: '2026-05-02',
        productionStatus: 'scripts_rubrics_audio_ready_video_pipeline_in_validation',
        practicalTrainingDisclaimer:
          'Não substitui treinamento prático presencial de primeiros socorros ministrado por profissional habilitado quando aplicável.',
      },
    },
  });

  for (let i = 0; i < sourceFiles.length; i += 1) {
    const order = i + 1;
    const sourceFile = sourceFiles[i];
    const file = path.join(workspace, sourceFile);
    const markdown = fs.readFileSync(file, 'utf8');
    const title = lessonTitle(markdown, order);

    const lesson = await prisma.lesson.upsert({
      where: { courseId_order: { courseId: course.id, order } },
      update: {
        title,
        transcript: markdown,
        metadata: {
          sourceFile,
          narrationFile: `excellentia-lei-lucas-aula${String(order).padStart(2, '0')}-elevenlabs-v1-2026-05-01.txt`,
          videoStatus: 'pending_final_avatar_video',
        },
      },
      create: {
        courseId: course.id,
        order,
        title,
        transcript: markdown,
        metadata: {
          sourceFile,
          narrationFile: `excellentia-lei-lucas-aula${String(order).padStart(2, '0')}-elevenlabs-v1-2026-05-01.txt`,
          videoStatus: 'pending_final_avatar_video',
        },
      },
    });

    const existing = await prisma.activity.findFirst({ where: { lessonId: lesson.id } });
    const data = {
      prompt: activityPrompt(markdown, order),
      rubric: rubric(markdown, order),
      metadata: { sourceFile, activityVersion: '2026-05-02' },
    };

    if (existing) {
      await prisma.activity.update({ where: { id: existing.id }, data });
    } else {
      await prisma.activity.create({ data: { lessonId: lesson.id, ...data } });
    }
  }

  console.log(`Seeded ${sourceFiles.length} Lei Lucas lessons for course ${course.slug}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
