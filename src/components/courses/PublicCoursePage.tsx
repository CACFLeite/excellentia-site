import Link from 'next/link';
import type { CourseDefinition } from '@/lib/courses/definitions';

function publicCards(course: CourseDefinition) {
  const isAvailable = course.availability === 'published';
  const isTeacherCourse = course.audience === 'teacher_subscriber';

  if (isTeacherCourse) {
    return [
      {
        title: isAvailable ? 'Curso disponível' : 'Curso em estruturação',
        description: isAvailable
          ? 'Acesso liberado para professores com assinatura individual ativa.'
          : 'Trilha prevista no catálogo Excellentia, sujeita à validação final de conteúdo, certificado e escopo.',
      },
      {
        title: 'Acesso do professor',
        description: 'Depois da compra, o professor entra por login via e-mail e visualiza os cursos vinculados à assinatura.',
      },
      {
        title: 'Aplicação prática',
        description: 'Conteúdo voltado à carreira docente, processo seletivo, entrevista, aula teste e organização profissional.',
      },
    ];
  }

  return [
    {
      title: isAvailable ? 'Formação disponível' : 'Formação em estruturação',
      description: isAvailable
        ? 'Acesso liberado apenas para participantes vinculados a uma contratação, convite institucional ou plano aplicável.'
        : 'Trilha prevista no catálogo Excellentia, sujeita à validação final de conteúdo, certificado e escopo.',
    },
    {
      title: 'Certificação',
      description: 'Certificados são emitidos dentro da experiência autenticada, conforme conclusão e regras da formação.',
    },
    {
      title: 'Uso institucional',
      description: 'Quando contratada por escola, a formação pode compor registros, relatórios e acompanhamento interno.',
    },
  ];
}

export default function PublicCoursePage({ course }: { course: CourseDefinition }) {
  const cards = publicCards(course);
  const isAvailable = course.availability === 'published';
  const isTeacherCourse = course.audience === 'teacher_subscriber';

  return (
    <main className="min-h-screen bg-[#f7f4ec]">
      <section className="relative overflow-hidden bg-[#06101c] py-16 text-white md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_12%,rgba(244,219,118,.20),transparent_28%),linear-gradient(145deg,#06101c_0%,#0a2749_48%,#02060b_100%)]" />
        <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(244,219,118,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(244,219,118,.07)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link href="/formacoes" className="text-sm font-bold text-slate-300 transition-colors hover:text-white">
            ← Voltar às formações
          </Link>
          <div className="mt-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_.78fr]">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex rounded-full border border-gold-light/30 bg-gold-light/10 px-5 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-gold-light">
                {course.publicPage.badge}
              </div>
              <h1 className="text-4xl font-black leading-[1.03] tracking-[-0.04em] md:text-6xl">{course.publicPage.headline}</h1>
              <p className="mt-7 text-lg leading-8 text-slate-200 md:text-xl">{course.publicPage.summary}</p>
            </div>

            <div className="rounded-[2.5rem] border border-white/15 bg-white/[0.07] p-7 shadow-2xl backdrop-blur-md">
              <div className="text-xs font-extrabold uppercase tracking-[0.24em] text-gold-light">acesso protegido</div>
              <h2 className="mt-4 text-2xl font-black">Conteúdo disponível apenas na experiência autenticada.</h2>
              <p className="mt-4 leading-7 text-slate-300">
                {isTeacherCourse
                  ? 'A página pública apresenta escopo e finalidade do curso. Aulas, atividades e certificados ficam dentro da área autenticada do professor.'
                  : 'A página pública apresenta escopo e finalidade da formação. Aulas, vídeos, atividades, respostas e certificados pertencem ao ambiente de acesso autorizado.'}
              </p>
              <div className="mt-7 flex flex-col gap-3">
                <Link href={isTeacherCourse ? '/acesso-professor' : '/contato'} className="rounded-2xl bg-gold px-6 py-4 text-center font-black text-white transition hover:bg-yellow-600">
                  {isTeacherCourse ? 'Acessar como professor' : 'Solicitar acesso institucional'}
                </Link>
                <Link href="/formacoes" className="rounded-2xl border border-white/40 px-6 py-4 text-center font-black text-white transition hover:bg-white hover:text-navy">
                  Ver catálogo de formações
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {cards.map((card) => (
              <div key={card.title} className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-xl">
                <h2 className="text-2xl font-black text-navy">{card.title}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-2xl md:p-10">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_.9fr] lg:items-center">
              <div>
                <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-gold">
                  {isAvailable ? 'formação publicada' : 'formação planejada'}
                </div>
                <h2 className="text-3xl font-black tracking-[-0.03em] text-navy md:text-4xl">
                  {course.publicPage.ctaTitle ?? 'Formação com evidências para escolas'}
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-600">
                  {course.publicPage.ctaDescription ??
                    'A Excellentia organiza formações, registros, certificados e relatórios para reduzir improviso e fortalecer a governança formativa da escola.'}
                </p>
              </div>
              <div className="rounded-[2rem] bg-[#f7f4ec] p-6">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold">acesso ao conteúdo</p>
                <p className="mt-4 leading-7 text-slate-700">
                  {isTeacherCourse
                    ? 'Professores com assinatura ativa acessam o curso pela área do professor. O link público não exibe aulas, vídeos ou atividades internas.'
                    : 'Participantes acessam a formação por convite, contrato ou plano elegível. O link público não exibe aulas, vídeos ou atividades internas.'}
                </p>
                <Link href={isTeacherCourse ? '/acesso-professor' : '/contato'} className="mt-7 inline-flex rounded-2xl bg-navy px-7 py-4 font-black text-white transition hover:bg-slate-900">
                  {isTeacherCourse ? 'Entrar na área do professor' : 'Falar com a Excellentia'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
