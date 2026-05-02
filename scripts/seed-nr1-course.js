const fs = require('node:fs');
const path = require('node:path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const sourceFiles = [
  'excellentia-nr1-aula01-rubrica-v1-1-fechada-2026-04-30.md',
  'excellentia-nr1-aula02-rubrica-v1-rascunho-2026-04-30.md',
  'excellentia-nr1-aula03-rubrica-v1-rascunho-2026-04-30.md',
  'excellentia-nr1-aula04-rubrica-v1-rascunho-2026-04-30.md',
  'excellentia-nr1-aula05-rubrica-v1-rascunho-2026-04-30.md',
  'excellentia-nr1-aula06-rubrica-v1-rascunho-2026-04-30.md',
  'excellentia-nr1-aula07-rubrica-v1-rascunho-2026-04-30.md',
  'excellentia-nr1-aula08-rubrica-v1-rascunho-2026-04-30.md',
];

const lessonDefinitions = [
  { title: 'Introdução à NR-1 e riscos psicossociais', duration: '2min19', videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=e581c5b6-ea70-41b4-9f89-7b5b51cb3b69', pandaVideoId: '404bd859-9526-483a-a5a2-1fd380de9473', pandaExternalId: 'e581c5b6-ea70-41b4-9f89-7b5b51cb3b69', pandaFolderId: '8ddda579-dbfe-4412-b97d-5be2023e9747', videoStatus: 'published_to_panda' },
  { title: 'Sinais iniciais de burnout e desgaste', duration: '2min29', videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=55c77a38-4377-4212-9489-46e20030700b', pandaVideoId: '657ae26e-81fa-4c17-b893-5a843edd32ef', pandaExternalId: '55c77a38-4377-4212-9489-46e20030700b', pandaFolderId: '8ddda579-dbfe-4412-b97d-5be2023e9747', videoStatus: 'published_to_panda' },
  { title: 'Mudanças institucionais, sobrecarga e registros', duration: '2min17', videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=faf2d75b-83f8-41f7-b35a-5ac31e418a2c', pandaVideoId: '63d2c87b-0d6f-468b-9008-f17dd4cd5acf', pandaExternalId: 'faf2d75b-83f8-41f7-b35a-5ac31e418a2c', pandaFolderId: '8ddda579-dbfe-4412-b97d-5be2023e9747', videoStatus: 'published_to_panda' },
  { title: 'Comunicação de riscos sem exposição indevida', duration: '2min08', videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=acd29539-bf7d-4956-b41f-7e943668baab', pandaVideoId: '8866f203-e87a-4ba6-9c51-28fc5ea6f51d', pandaExternalId: 'acd29539-bf7d-4956-b41f-7e943668baab', pandaFolderId: '8ddda579-dbfe-4412-b97d-5be2023e9747', videoStatus: 'published_to_panda' },
  { title: 'Mapeamento de riscos em diferentes funções', duration: '2min10', videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=635d0e24-ba73-46e9-9e51-94939048c581', pandaVideoId: '4d427229-6cd1-420e-8664-a2cd771b9e62', pandaExternalId: '635d0e24-ba73-46e9-9e51-94939048c581', pandaFolderId: '8ddda579-dbfe-4412-b97d-5be2023e9747', videoStatus: 'published_to_panda' },
  { title: 'Canais formais e comunicação profissional', duration: '2min09', videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=fbae575c-f70a-42be-b5c5-abca2f19b22c', pandaVideoId: '0fd0ceff-6cbb-4f2e-a917-0840fbd1bce0', pandaExternalId: 'fbae575c-f70a-42be-b5c5-abca2f19b22c', pandaFolderId: '8ddda579-dbfe-4412-b97d-5be2023e9747', videoStatus: 'published_to_panda' },
  { title: 'Canal anônimo, proteção e segurança psicológica', duration: '2min05', videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=ac17c596-0ccd-4352-b6b7-d6fae3af51de', pandaVideoId: 'f733514e-bb35-462d-bf10-002d09419f21', pandaExternalId: 'ac17c596-0ccd-4352-b6b7-d6fae3af51de', pandaFolderId: '8ddda579-dbfe-4412-b97d-5be2023e9747', videoStatus: 'published_to_panda' },
  { title: 'Certificado, evidências e continuidade da NR-1', duration: '2min17', videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=e3deb1c4-acdf-450a-a2b0-d0651052944e', pandaVideoId: 'ddfa0f76-d6a8-4b0b-83cb-8a0705c3af8b', pandaExternalId: 'e3deb1c4-acdf-450a-a2b0-d0651052944e', pandaFolderId: '8ddda579-dbfe-4412-b97d-5be2023e9747', videoStatus: 'published_to_panda' }
];

function section(markdown, heading) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`## ${escaped}[^\\n]*\\n([\\s\\S]*?)(?=\\n## |$)`, 'i');
  return markdown.match(re)?.[1]?.trim() ?? null;
}

function firstNonEmptyLine(text) {
  return text.split('\n').map((line) => line.trim()).find(Boolean) ?? '';
}

async function main() {
  const workspace = path.resolve(__dirname, '..', '..');

  const course = await prisma.course.upsert({
    where: { slug: 'nr1-escolas' },
    update: {
      title: 'NR-1 para Escolas — Riscos Psicossociais',
      status: 'published',
      description:
        'Curso Excellentia para formação, registro institucional e compreensão prática da NR-1 no contexto escolar.',
      metadata: {
        audience: 'school_employee',
        track: 'saude-ocupacional',
        certificatePrefix: 'NR1',
        definitionVersion: '2026-05-01',
      },
    },
    create: {
      slug: 'nr1-escolas',
      title: 'NR-1 para Escolas — Riscos Psicossociais',
      status: 'published',
      description:
        'Curso Excellentia para formação, registro institucional e compreensão prática da NR-1 no contexto escolar.',
      metadata: {
        audience: 'school_employee',
        track: 'saude-ocupacional',
        certificatePrefix: 'NR1',
        definitionVersion: '2026-05-01',
      },
    },
  });

  for (let i = 0; i < sourceFiles.length; i += 1) {
    const order = i + 1;
    const file = path.join(workspace, sourceFiles[i]);
    const markdown = fs.readFileSync(file, 'utf8');
    const lessonDefinition = lessonDefinitions[i] ?? {};
    const title = lessonDefinition.title || firstNonEmptyLine(markdown).replace(/^#\s*/, '') || `Aula ${String(order).padStart(2, '0')}`;
    const prompt =
      section(markdown, `Situação-problema — versão final Aula ${String(order).padStart(2, '0')}`) ||
      section(markdown, `Situação-problema — versão final Aula ${order}`) ||
      section(markdown, 'Situação-problema') ||
      section(markdown, 'Situação-problema — versão final') ||
      'Situação-problema pendente de revisão.';

    const rubric = {
      sourceFile: sourceFiles[i],
      fragile: section(markdown, 'Resposta frágil'),
      adequate: section(markdown, 'Resposta adequada'),
      strong: section(markdown, 'Resposta forte'),
      feedbackGuidelines: section(markdown, 'Diretriz de feedback') || section(markdown, 'Feedback'),
    };

    const lesson = await prisma.lesson.upsert({
      where: { courseId_order: { courseId: course.id, order } },
      update: {
        title,
        videoUrl: lessonDefinition.videoUrl,
        transcript: markdown,
        metadata: {
          sourceFile: sourceFiles[i],
          duration: lessonDefinition.duration,
          ...(lessonDefinition.pandaVideoId ? { pandaVideoId: lessonDefinition.pandaVideoId } : {}),
          ...(lessonDefinition.pandaExternalId ? { pandaExternalId: lessonDefinition.pandaExternalId } : {}),
          ...(lessonDefinition.pandaFolderId ? { pandaFolderId: lessonDefinition.pandaFolderId } : {}),
          ...(lessonDefinition.videoStatus ? { videoStatus: lessonDefinition.videoStatus } : {}),
        },
      },
      create: {
        courseId: course.id,
        order,
        title,
        videoUrl: lessonDefinition.videoUrl,
        transcript: markdown,
        metadata: {
          sourceFile: sourceFiles[i],
          duration: lessonDefinition.duration,
          ...(lessonDefinition.pandaVideoId ? { pandaVideoId: lessonDefinition.pandaVideoId } : {}),
          ...(lessonDefinition.pandaExternalId ? { pandaExternalId: lessonDefinition.pandaExternalId } : {}),
          ...(lessonDefinition.pandaFolderId ? { pandaFolderId: lessonDefinition.pandaFolderId } : {}),
          ...(lessonDefinition.videoStatus ? { videoStatus: lessonDefinition.videoStatus } : {}),
        },
      },
    });

    const existing = await prisma.activity.findFirst({ where: { lessonId: lesson.id } });
    if (existing) {
      await prisma.activity.update({ where: { id: existing.id }, data: { prompt, rubric } });
    } else {
      await prisma.activity.create({ data: { lessonId: lesson.id, prompt, rubric } });
    }
  }

  console.log('Seed NR-1 concluído:', course.id);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
