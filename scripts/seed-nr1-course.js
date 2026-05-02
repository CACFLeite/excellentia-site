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
  { title: 'Introdução à NR-1 e riscos psicossociais', duration: '1min30', videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=6460138d-6f63-4e61-b7c0-4fbc29bd291f' },
  { title: 'Sinais iniciais de burnout e desgaste', duration: '1min19', videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=5ef32733-81f9-41e0-bd0b-0a3aebb790db' },
  { title: 'Mudanças institucionais, sobrecarga e registros', duration: '2min27', videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=33ab495e-1366-45b9-8d40-993c298c60f6' },
  { title: 'Comunicação de riscos sem exposição indevida', duration: '1min39', videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=d925b726-25b8-4c07-a327-29d4260cdc6d' },
  { title: 'Mapeamento de riscos em diferentes funções', duration: '1min29', videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=5669f8fc-b290-4aad-9722-8227a838049b' },
  { title: 'Canais formais e comunicação profissional', duration: '1min43', videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=adbc0945-6581-4491-95cc-bcc34ba0fc35' },
  { title: 'Canal anônimo, proteção e segurança psicológica', duration: '2min27', videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=513d6a80-dc03-44f1-9af3-383f003b2abf' },
  { title: 'Aplicação prática e registro de conclusão', duration: '2min01', videoUrl: 'https://player-vz-9bd0fea2-c7a.tv.pandavideo.com.br/embed/?v=cc1d3ddf-5375-4803-8a9e-f6d5c22a4444' },
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
        metadata: { sourceFile: sourceFiles[i], duration: lessonDefinition.duration },
      },
      create: {
        courseId: course.id,
        order,
        title,
        videoUrl: lessonDefinition.videoUrl,
        transcript: markdown,
        metadata: { sourceFile: sourceFiles[i], duration: lessonDefinition.duration },
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
