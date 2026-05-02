const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const workspace = path.resolve(__dirname, '..', '..');

const sourceFiles = Array.from({ length: 8 }, (_, index) =>
  `excellentia-lei-lucas-aula${String(index + 1).padStart(2, '0')}-roteiro-rubrica-v1-rascunho-2026-05-01.md`,
);

const lessonVideoData = {
  1: {
    videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=c9025a4f-855f-4735-ae1e-fe0fa3e7adbb',
    duration: '5min13',
    pandaVideoId: '916580d4-cfae-49dd-a28c-45635355a6ca',
    pandaExternalId: 'c9025a4f-855f-4735-ae1e-fe0fa3e7adbb',
    pandaFolderId: 'bb6c993a-853b-4aa9-88b1-c108d2800bcb',
    videoStatus: 'published_to_panda',
  },
  2: {
    videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=b2a6059f-a4a7-40ff-8d96-0e55904bd011',
    duration: '5min29',
    pandaVideoId: 'b2d81ffb-8631-4a4a-b8c6-d09eef161020',
    pandaExternalId: 'b2a6059f-a4a7-40ff-8d96-0e55904bd011',
    pandaFolderId: 'bb6c993a-853b-4aa9-88b1-c108d2800bcb',
    videoStatus: 'published_to_panda',
  },
  3: {
    videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=679de7b7-558f-4b43-a10f-91ffc06ba7fa',
    duration: '4min35',
    pandaVideoId: 'b32cb330-d9dc-4240-8fd9-d06a9318b1d5',
    pandaExternalId: '679de7b7-558f-4b43-a10f-91ffc06ba7fa',
    pandaFolderId: 'bb6c993a-853b-4aa9-88b1-c108d2800bcb',
    videoStatus: 'published_to_panda',
  },
  4: {
    videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=f67802e0-1dd5-4bf3-b7e0-81eb3377e883',
    duration: '4min56',
    pandaVideoId: '62fe9184-42ca-4099-9844-95a2a806fa24',
    pandaExternalId: 'f67802e0-1dd5-4bf3-b7e0-81eb3377e883',
    pandaFolderId: 'bb6c993a-853b-4aa9-88b1-c108d2800bcb',
    videoStatus: 'published_to_panda',
  },
  5: {
    videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=7c55774b-f6a8-4db0-80b8-1cfd35d86b80',
    duration: '5min18',
    pandaVideoId: 'd31ce3cc-06df-48d4-aee8-0848ca206d9a',
    pandaExternalId: '7c55774b-f6a8-4db0-80b8-1cfd35d86b80',
    pandaFolderId: 'bb6c993a-853b-4aa9-88b1-c108d2800bcb',
    videoStatus: 'published_to_panda',
  },
};

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
        productionStatus: 'aula01_aula02_aula03_aula04_aula05_published_to_panda_aula06_in_production',
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
        productionStatus: 'aula01_aula02_aula03_aula04_aula05_published_to_panda_aula06_in_production',
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

    const videoData = lessonVideoData[order] ?? { videoStatus: 'pending_final_avatar_video' };
    const lessonMetadata = {
      sourceFile,
      narrationFile: `excellentia-lei-lucas-aula${String(order).padStart(2, '0')}-elevenlabs-v1-2026-05-01.txt`,
      videoStatus: videoData.videoStatus,
      ...(videoData.duration ? { duration: videoData.duration } : {}),
      ...(videoData.pandaVideoId ? { pandaVideoId: videoData.pandaVideoId } : {}),
      ...(videoData.pandaExternalId ? { pandaExternalId: videoData.pandaExternalId } : {}),
      ...(videoData.pandaFolderId ? { pandaFolderId: videoData.pandaFolderId } : {}),
    };

    const lesson = await prisma.lesson.upsert({
      where: { courseId_order: { courseId: course.id, order } },
      update: {
        title,
        videoUrl: videoData.videoUrl ?? null,
        transcript: markdown,
        metadata: lessonMetadata,
      },
      create: {
        courseId: course.id,
        order,
        title,
        videoUrl: videoData.videoUrl ?? null,
        transcript: markdown,
        metadata: lessonMetadata,
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
