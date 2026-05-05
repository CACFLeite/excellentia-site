const fs = require('fs');
const path = require('path');
const vm = require('vm');
const ts = require('typescript');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function loadCourseDefinitions() {
  const file = path.join(__dirname, '..', 'src', 'lib', 'courses', 'definitions.ts');
  const source = fs.readFileSync(file, 'utf8');
  const js = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;

  const sandbox = {
    exports: {},
    require,
    console,
    process: { env: {} },
  };
  vm.runInNewContext(js, sandbox, { filename: file });
  return sandbox.exports.courseDefinitions;
}

function lessonPrompt(course, lesson) {
  return lesson.prompt || [
    `Aula ${lesson.order}: ${lesson.title}`,
    '',
    'Descreva uma situação possível na rotina da escola e explique qual conduta institucional seria adequada, quais registros/evidências deveriam ser preservados e quais limites devem ser respeitados.',
  ].join('\n');
}

function lessonRubric(course, lesson) {
  return lesson.rubric || {
    course: course.slug,
    lessonOrder: lesson.order,
    mode: 'formative_compliance_school',
    disclaimer:
      'Feedback formativo: avalia compreensão, organização da resposta e conexão com o conteúdo do curso. Não valida fatos narrados, culpa, ilícitos, diagnóstico, obrigação jurídica específica ou acusação contra pessoa/instituição.',
    levels: {
      weak: 'Resposta genérica, sem indicar conduta, registro ou limite institucional.',
      initial: 'Identifica parte do problema, mas ainda confunde responsabilidades, evidências ou encaminhamentos.',
      adequate: 'Mostra compreensão suficiente da conduta esperada, dos registros e dos limites do tema.',
      strong: 'Articula conduta, responsáveis, evidências, comunicação e limites com clareza institucional.',
    },
  };
}

async function seedCourses() {
  const definitions = loadCourseDefinitions();
  const courses = Object.values(definitions);

  for (const definition of courses) {
    const course = await prisma.course.upsert({
      where: { slug: definition.slug },
      update: {
        title: definition.title,
        description: definition.description,
        status: 'published',
        metadata: {
          ...(definition.metadata || {}),
          shortTitle: definition.shortTitle,
          area: definition.area,
          track: definition.track,
          audience: definition.audience,
          certificatePrefix: definition.certificatePrefix,
          complianceNotes: definition.complianceNotes || [],
          publishedByFoundationSeedAt: new Date().toISOString(),
          publicationScope: 'school_compliance_foundation',
        },
      },
      create: {
        slug: definition.slug,
        title: definition.title,
        description: definition.description,
        status: 'published',
        metadata: {
          ...(definition.metadata || {}),
          shortTitle: definition.shortTitle,
          area: definition.area,
          track: definition.track,
          audience: definition.audience,
          certificatePrefix: definition.certificatePrefix,
          complianceNotes: definition.complianceNotes || [],
          publishedByFoundationSeedAt: new Date().toISOString(),
          publicationScope: 'school_compliance_foundation',
        },
      },
    });

    for (const lessonDefinition of definition.lessons) {
      const lesson = await prisma.lesson.upsert({
        where: { courseId_order: { courseId: course.id, order: lessonDefinition.order } },
        update: {
          title: lessonDefinition.title,
          videoUrl: lessonDefinition.videoUrl || null,
          transcript: lessonDefinition.transcript || null,
          metadata: {
            ...(lessonDefinition.metadata || {}),
            duration: lessonDefinition.duration || lessonDefinition.metadata?.duration || null,
            productionStatus: lessonDefinition.videoUrl ? 'video_published' : 'content_foundation_pending_video',
          },
        },
        create: {
          courseId: course.id,
          order: lessonDefinition.order,
          title: lessonDefinition.title,
          videoUrl: lessonDefinition.videoUrl || null,
          transcript: lessonDefinition.transcript || null,
          metadata: {
            ...(lessonDefinition.metadata || {}),
            duration: lessonDefinition.duration || lessonDefinition.metadata?.duration || null,
            productionStatus: lessonDefinition.videoUrl ? 'video_published' : 'content_foundation_pending_video',
          },
        },
      });

      const existing = await prisma.activity.findFirst({ where: { lessonId: lesson.id } });
      const data = {
        prompt: lessonPrompt(definition, lessonDefinition),
        rubric: lessonRubric(definition, lessonDefinition),
        metadata: {
          courseSlug: definition.slug,
          lessonOrder: lessonDefinition.order,
          activityVersion: 'school_compliance_foundation_2026_05_05',
          feedbackBoundary: 'formative_no_factual_or_legal_validation',
        },
      };

      if (existing) {
        // Não sobrescreve rubricas produzidas manualmente; só garante metadados de governança mínimos.
        await prisma.activity.update({
          where: { id: existing.id },
          data: { metadata: { ...(existing.metadata || {}), ...data.metadata } },
        });
      } else {
        await prisma.activity.create({ data: { lessonId: lesson.id, ...data } });
      }
    }
  }

  return courses.length;
}

async function seedDemoOrganization() {
  const org = await prisma.organization.upsert({
    where: { slug: 'excellentia-demo-compliance-escolar' },
    update: {
      name: 'Excellentia Demo — Compliance Escolar',
      legalName: 'Organização fictícia para validação Excellentia',
      status: 'active',
      employeeLimit: 50,
      metadata: {
        demo: true,
        purpose: 'Validação interna de governança escolar multi-curso, PGR, certificados, relatórios e convites.',
        dataClassification: 'fictitious_test_data',
      },
    },
    create: {
      slug: 'excellentia-demo-compliance-escolar',
      name: 'Excellentia Demo — Compliance Escolar',
      legalName: 'Organização fictícia para validação Excellentia',
      status: 'active',
      employeeLimit: 50,
      metadata: {
        demo: true,
        purpose: 'Validação interna de governança escolar multi-curso, PGR, certificados, relatórios e convites.',
        dataClassification: 'fictitious_test_data',
      },
    },
  });

  await prisma.organizationMember.upsert({
    where: { organizationId_email: { organizationId: org.id, email: 'compliance.demo@excellentia-edu.com' } },
    update: { name: 'Responsável Compliance Demo', role: 'compliance_manager', receivesCommunications: true, managesPgr: true },
    create: { organizationId: org.id, name: 'Responsável Compliance Demo', email: 'compliance.demo@excellentia-edu.com', role: 'compliance_manager', receivesCommunications: true, managesPgr: true },
  });

  const employeeSeed = [
    ['Ana Direção Demo', 'ana.direcao.demo@excellentia-edu.com', 'Direção'],
    ['Bruno Coordenação Demo', 'bruno.coordenacao.demo@excellentia-edu.com', 'Coordenação pedagógica'],
    ['Carla Professora Demo', 'carla.professora.demo@excellentia-edu.com', 'Professora'],
    ['Diego Secretaria Demo', 'diego.secretaria.demo@excellentia-edu.com', 'Secretaria escolar'],
    ['Elisa Apoio Demo', 'elisa.apoio.demo@excellentia-edu.com', 'Apoio escolar'],
  ];

  const employees = [];
  for (const [fullName, email, jobTitle] of employeeSeed) {
    const employee = await prisma.employee.upsert({
      where: { organizationId_cpf: { organizationId: org.id, cpf: `DEMO-${email}` } },
      update: { fullName, email, jobTitle, status: 'active', metadata: { demo: true } },
      create: { organizationId: org.id, fullName, email, cpf: `DEMO-${email}`, jobTitle, status: 'active', metadata: { demo: true } },
    });
    employees.push(employee);
  }

  const courses = await prisma.course.findMany({ where: { status: 'published' } });
  for (const employee of employees) {
    for (const course of courses) {
      await prisma.enrollment.upsert({
        where: { employeeId_courseId: { employeeId: employee.id, courseId: course.id } },
        update: { organizationId: org.id, status: 'invited' },
        create: { organizationId: org.id, employeeId: employee.id, courseId: course.id, status: 'invited' },
      });
    }
  }

  return { org, employees: employees.length, courses: courses.length };
}

async function main() {
  const courses = await seedCourses();
  const demo = await seedDemoOrganization();
  console.log(JSON.stringify({ ok: true, publishedCoursesSeeded: courses, demoOrganization: { id: demo.org.id, slug: demo.org.slug, employees: demo.employees, enrollmentsPerEmployee: demo.courses } }, null, 2));
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
