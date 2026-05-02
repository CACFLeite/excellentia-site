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
  { title: 'Introdução à NR-1 e riscos psicossociais', duration: '1min40', videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=2aa5e28f-2ed0-494a-b031-3255071e559e', pandaVideoId: '4fdf2899-aa91-486d-a066-a5ed202d8ee2', pandaExternalId: '2aa5e28f-2ed0-494a-b031-3255071e559e', pandaFolderId: '8ddda579-dbfe-4412-b97d-5be2023e9747', videoStatus: 'published_to_panda' },
  { title: 'Sinais iniciais de burnout e desgaste', duration: '1min47', videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=0ffa720d-5a19-4a15-bb1a-f2bb98eb04a9', pandaVideoId: 'c9bf5efe-4c75-4b14-8206-ca1f1a0f05f1', pandaExternalId: '0ffa720d-5a19-4a15-bb1a-f2bb98eb04a9', pandaFolderId: '8ddda579-dbfe-4412-b97d-5be2023e9747', videoStatus: 'published_to_panda' },
  { title: 'Mudanças institucionais, sobrecarga e registros', duration: '1min38', videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=9629b8a0-02b8-4fdd-b34b-61606dc736c4', pandaVideoId: 'f226dc6e-7862-4246-813c-5ecf86e48a82', pandaExternalId: '9629b8a0-02b8-4fdd-b34b-61606dc736c4', pandaFolderId: '8ddda579-dbfe-4412-b97d-5be2023e9747', videoStatus: 'published_to_panda' },
  { title: 'Comunicação de riscos sem exposição indevida', duration: '1min32', videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=d62f1110-0cc1-4d58-b1d3-c77fcd23af3a', pandaVideoId: '488f1c09-6474-4cbb-ac63-07d7a34e4a8d', pandaExternalId: 'd62f1110-0cc1-4d58-b1d3-c77fcd23af3a', pandaFolderId: '8ddda579-dbfe-4412-b97d-5be2023e9747', videoStatus: 'published_to_panda' },
  { title: 'Mapeamento de riscos em diferentes funções', duration: '1min33', videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=56a20acf-0746-4748-b81a-98beba8fb844', pandaVideoId: 'fa82d165-9310-4f41-a279-47bccbd280d7', pandaExternalId: '56a20acf-0746-4748-b81a-98beba8fb844', pandaFolderId: '8ddda579-dbfe-4412-b97d-5be2023e9747', videoStatus: 'published_to_panda' },
  { title: 'Canais formais e comunicação profissional', duration: '1min32', videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=24f3937c-83b7-4d69-877a-ca0560b50269', pandaVideoId: '07029934-a6f4-4529-b0aa-83c838e3e0de', pandaExternalId: '24f3937c-83b7-4d69-877a-ca0560b50269', pandaFolderId: '8ddda579-dbfe-4412-b97d-5be2023e9747', videoStatus: 'published_to_panda' },
  { title: 'Canal anônimo, proteção e segurança psicológica', duration: '1min29', videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=dd06eabe-744d-45ec-9705-925256bdeb88', pandaVideoId: 'a6c77741-8313-413f-aec8-ffe836234f80', pandaExternalId: 'dd06eabe-744d-45ec-9705-925256bdeb88', pandaFolderId: '8ddda579-dbfe-4412-b97d-5be2023e9747', videoStatus: 'published_to_panda' },
  { title: 'Certificado, evidências e continuidade da NR-1', duration: '1min38', videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=3877dbcd-069a-4c99-ae20-05584cc9c1a7', pandaVideoId: 'ae8cc804-0100-4e0b-8cdc-8db395ae70bc', pandaExternalId: '3877dbcd-069a-4c99-ae20-05584cc9c1a7', pandaFolderId: '8ddda579-dbfe-4412-b97d-5be2023e9747', videoStatus: 'published_to_panda' }
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
