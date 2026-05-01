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

const lessonTitles = [
  'Introdução à NR-1 e riscos psicossociais',
  'Sinais iniciais de burnout e desgaste',
  'Mudanças institucionais, sobrecarga e registros',
  'Comunicação de riscos sem exposição indevida',
  'Mapeamento de riscos em diferentes funções',
  'Canais formais e comunicação profissional',
  'Canal anônimo, proteção e segurança psicológica',
  'Aplicação prática e registro de conclusão',
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
    },
    create: {
      slug: 'nr1-escolas',
      title: 'NR-1 para Escolas — Riscos Psicossociais',
      status: 'published',
      description:
        'Curso Excellentia para formação, registro institucional e compreensão prática da NR-1 no contexto escolar.',
    },
  });

  for (let i = 0; i < sourceFiles.length; i += 1) {
    const order = i + 1;
    const file = path.join(workspace, sourceFiles[i]);
    const markdown = fs.readFileSync(file, 'utf8');
    const title = lessonTitles[i] || firstNonEmptyLine(markdown).replace(/^#\s*/, '') || `Aula ${String(order).padStart(2, '0')}`;
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
      update: { title, transcript: markdown, metadata: { sourceFile: sourceFiles[i] } },
      create: { courseId: course.id, order, title, transcript: markdown, metadata: { sourceFile: sourceFiles[i] } },
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
