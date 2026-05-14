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
    summary: 'Delimita o que a Lei Lucas exige da escola e reforça que a formação institucional não substitui treinamento prático presencial com profissional habilitado.',
    videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=92543447-ea6c-46fa-9c5e-a82f13bf958e',
    duration: '5min27',
    pandaVideoId: 'cb849446-9819-4afd-9726-c55a59de646d',
    pandaExternalId: '92543447-ea6c-46fa-9c5e-a82f13bf958e',
    pandaFolderId: 'bb6c993a-853b-4aa9-88b1-c108d2800bcb',
    videoStatus: 'published_to_panda',
  },
  2: {
    summary: 'Organiza papéis de adultos na emergência escolar para reduzir improviso, dispersão e omissão no acionamento correto.',
    videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=b2a6059f-a4a7-40ff-8d96-0e55904bd011',
    duration: '5min29',
    pandaVideoId: 'b2d81ffb-8631-4a4a-b8c6-d09eef161020',
    pandaExternalId: 'b2a6059f-a4a7-40ff-8d96-0e55904bd011',
    pandaFolderId: 'bb6c993a-853b-4aa9-88b1-c108d2800bcb',
    videoStatus: 'published_to_panda',
  },
  3: {
    summary: 'Trabalha fluxos de acionamento: quem chama quem, em qual ordem, com quais informações e por quais canais.',
    videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=679de7b7-558f-4b43-a10f-91ffc06ba7fa',
    duration: '4min35',
    pandaVideoId: 'b32cb330-d9dc-4240-8fd9-d06a9318b1d5',
    pandaExternalId: '679de7b7-558f-4b43-a10f-91ffc06ba7fa',
    pandaFolderId: 'bb6c993a-853b-4aa9-88b1-c108d2800bcb',
    videoStatus: 'published_to_panda',
  },
  4: {
    summary: 'Prepara a escola para chegar ao treinamento prático com papéis, espaços, materiais, contatos e registros minimamente organizados.',
    videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=f67802e0-1dd5-4bf3-b7e0-81eb3377e883',
    duration: '4min56',
    pandaVideoId: '62fe9184-42ca-4099-9844-95a2a806fa24',
    pandaExternalId: 'f67802e0-1dd5-4bf3-b7e0-81eb3377e883',
    pandaFolderId: 'bb6c993a-853b-4aa9-88b1-c108d2800bcb',
    videoStatus: 'published_to_panda',
  },
  5: {
    summary: 'Diferencia sinais de alerta em situações recorrentes na escola e orienta reconhecimento e acionamento sem manobras improvisadas.',
    videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=7c55774b-f6a8-4db0-80b8-1cfd35d86b80',
    duration: '5min18',
    pandaVideoId: 'd31ce3cc-06df-48d4-aee8-0848ca206d9a',
    pandaExternalId: '7c55774b-f6a8-4db0-80b8-1cfd35d86b80',
    pandaFolderId: 'bb6c993a-853b-4aa9-88b1-c108d2800bcb',
    videoStatus: 'published_to_panda',
  },
  6: {
    summary: 'Explica quais competências dependem de simulação presencial supervisionada e por que vídeo não deve substituir prática técnica.',
    videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=ba65ed86-0cee-49e1-b818-7e2204dee654',
    duration: '4min19',
    pandaVideoId: '9487fff5-d3e8-466f-9220-44fb5e8b0a16',
    pandaExternalId: 'ba65ed86-0cee-49e1-b818-7e2204dee654',
    pandaFolderId: 'bb6c993a-853b-4aa9-88b1-c108d2800bcb',
    videoStatus: 'published_to_panda',
  },
  7: {
    summary: 'Transforma a preparação em protocolo interno com pessoas de referência, locais, kits, comunicação e responsáveis.',
    videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=cc469d5d-0953-4a3d-abf9-0435d43d1d8a',
    duration: '4min17',
    pandaVideoId: '23c1d8ec-7d73-4de5-a569-90c503f8d0e7',
    pandaExternalId: 'cc469d5d-0953-4a3d-abf9-0435d43d1d8a',
    pandaFolderId: 'bb6c993a-853b-4aa9-88b1-c108d2800bcb',
    videoStatus: 'published_to_panda',
  },
  8: {
    summary: 'Fecha a trilha com evidências, reciclagem anual, registros e cultura de segurança como rotina institucional contínua.',
    videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=db5b654a-d368-4d2a-92bc-fbfb9d54bd4f',
    duration: '4min01',
    pandaVideoId: '81d1d82e-ba3b-45ed-ac4e-4131edef51f4',
    pandaExternalId: 'db5b654a-d368-4d2a-92bc-fbfb9d54bd4f',
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
      status: 'published',
      description:
        'Curso Excellentia para preparação institucional, protocolos, evidências e continuidade da Lei Lucas na rotina escolar, sem substituir treinamento prático presencial com profissional habilitado.',
      metadata: {
        audience: 'school_employee',
        track: 'primeiros-socorros',
        certificatePrefix: 'LLC',
        definitionVersion: '2026-05-02',
        targetAudience: 'Público-alvo sugerido: docentes, gestores, coordenação, secretaria, equipe de apoio e demais adultos responsáveis por preparação, acionamento, comunicação e evidências em emergências escolares. A escola define o envio pelo painel conforme função, risco e política interna, sem tratar a lista como bloqueio rígido de distribuição.',
        syllabus: 'Ementa: obrigações e limites da Lei Lucas; papéis dos adultos; protocolo de acionamento; preparação prévia; reconhecimento de sinais; limites do vídeo; treinamento prático presencial; protocolo interno; evidências e reciclagem anual.',
        lessonSummaries: Object.values(lessonVideoData).map((lesson) => lesson.summary),
        productionStatus: 'aula01_aula02_aula03_aula04_aula05_aula06_aula07_aula08_published_to_panda',
        practicalTrainingDisclaimer:
          'Não substitui treinamento prático presencial de primeiros socorros ministrado por profissional habilitado quando aplicável.',
      },
    },
    create: {
      slug: 'lei-lucas-escolas',
      title: 'Lei Lucas nas Escolas — Preparação, Protocolo e Evidências',
      status: 'published',
      description:
        'Curso Excellentia para preparação institucional, protocolos, evidências e continuidade da Lei Lucas na rotina escolar, sem substituir treinamento prático presencial com profissional habilitado.',
      metadata: {
        audience: 'school_employee',
        track: 'primeiros-socorros',
        certificatePrefix: 'LLC',
        definitionVersion: '2026-05-02',
        targetAudience: 'Público-alvo sugerido: docentes, gestores, coordenação, secretaria, equipe de apoio e demais adultos responsáveis por preparação, acionamento, comunicação e evidências em emergências escolares. A escola define o envio pelo painel conforme função, risco e política interna, sem tratar a lista como bloqueio rígido de distribuição.',
        syllabus: 'Ementa: obrigações e limites da Lei Lucas; papéis dos adultos; protocolo de acionamento; preparação prévia; reconhecimento de sinais; limites do vídeo; treinamento prático presencial; protocolo interno; evidências e reciclagem anual.',
        lessonSummaries: Object.values(lessonVideoData).map((lesson) => lesson.summary),
        productionStatus: 'aula01_aula02_aula03_aula04_aula05_aula06_aula07_aula08_published_to_panda',
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
      summary: videoData.summary,
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
