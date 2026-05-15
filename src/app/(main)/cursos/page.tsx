import type { Metadata } from 'next';
import Link from 'next/link';
import { teacherCatalogCourses } from '@/lib/courses/catalog';

export const metadata: Metadata = {
  title: 'Formação de Professores — Excellentia',
  description:
    'Formações Excellentia para professores: carreira docente, processo seletivo, rotina profissional, posicionamento e saúde emocional.',
};

const teacherDisplayCourses = teacherCatalogCourses.map((course) => {
  if (course.title === 'Gestão de Carreira para Professores') {
    return {
      ...course,
      description:
        'O guia completo para processos seletivos da educação privada: currículo profissional, entrevistas, aula teste, planejamento de aula e documentação.',
    };
  }

  if (course.title === 'Cotidiano Escolar') {
    return {
      ...course,
      title: 'Rotina Docente',
      area: 'Rotina profissional',
      description:
        'Como navegar o dia a dia da docência com autoridade, limites saudáveis e relações profissionais com coordenação, colegas e famílias.',
    };
  }

  return course;
});

function StatusBadge({ available, inProduction }: { available: boolean; inProduction?: boolean }) {
  return (
    <span className={`rounded-full px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.16em] ${available ? 'bg-navy text-white' : 'bg-slate-100 text-slate-500'}`}>
      {available ? 'Disponível' : inProduction ? 'Em produção' : 'Planejada'}
    </span>
  );
}

function FormationRow({
  title,
  description,
  area,
  available,
  inProduction,
  modules,
  lessons,
  href,
}: {
  title: string;
  description: string;
  area: string;
  available: boolean;
  inProduction?: boolean;
  modules?: number | null;
  lessons?: number | null;
  href?: string;
}) {
  return (
    <div className="group grid gap-4 border-b border-slate-200 py-7 transition last:border-b-0 md:grid-cols-[.72fr_1fr_auto] md:items-start">
      <div>
        <div className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-gold">{area}</div>
        <h3 className="text-xl font-black leading-tight tracking-[-0.02em] text-navy md:text-2xl">{title}</h3>
      </div>
      <p className="max-w-2xl text-sm leading-7 text-slate-600 md:text-base">{description}</p>
      <div className="flex flex-wrap items-center gap-3 md:justify-end">
        {(modules || lessons) ? (
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
            {modules ? `${modules} módulo${modules > 1 ? 's' : ''}` : null}{modules && lessons ? ' · ' : ''}{lessons ? `${lessons} aulas` : null}
          </span>
        ) : null}
        <StatusBadge available={available} inProduction={inProduction} />
        {href ? (
          <Link href={href} className="text-sm font-black text-gold transition group-hover:translate-x-1 group-hover:text-yellow-700">
            Ver →
          </Link>
        ) : null}
      </div>
    </div>
  );
}

function SpotlightCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <div className="rounded-[2rem] border border-gold/35 bg-white p-7 shadow-xl shadow-gold/5">
      <div className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-gold">primeiro acesso individual</div>
      <h3 className="text-2xl font-black tracking-[-0.03em] text-navy">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-600">{description}</p>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link href={href} className="rounded-2xl bg-gold px-7 py-4 text-center font-black text-white transition hover:bg-yellow-600">
          Ver assinatura
        </Link>
        <span className="text-sm font-bold text-slate-500">R$69/mês ou R$588/ano</span>
      </div>
    </div>
  );
}

export default function CursosPage() {
  const [featuredTeacherCourse, ...upcomingTeacherCourses] = teacherDisplayCourses;

  return (
    <>
      <section className="relative overflow-hidden bg-[#06101c] pt-20 text-white md:pt-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(244,219,118,.20),transparent_28%),radial-gradient(circle_at_9%_35%,rgba(59,130,246,.13),transparent_25%),linear-gradient(145deg,#06101c_0%,#0a2749_44%,#02060b_100%)]" />
        <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(244,219,118,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(244,219,118,.07)_1px,transparent_1px)] [background-size:72px_72px]" />
        <svg className="pointer-events-none absolute left-0 top-32 hidden h-[760px] w-full opacity-60 lg:block" viewBox="0 0 1440 760" fill="none" aria-hidden="true">
          <path className="excellentia-flow-path" d="M120 240C360 95 520 340 735 220C965 90 1150 220 1275 430" />
          <path d="M170 335C420 190 580 440 800 315C1010 195 1138 340 1205 500" stroke="#f4db76" strokeOpacity=".18" strokeWidth="2" strokeLinecap="round" />
        </svg>

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 pb-20 sm:px-6 lg:grid-cols-[1fr_.9fr] lg:px-8 lg:pb-28">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-gold-light/30 bg-gold-light/10 px-5 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-gold-light">
              Formação de Professores
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.04em] md:text-6xl lg:text-7xl">
              Formação docente para crescer com método.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-200 md:text-xl">
              Cursos para professores que querem organizar carreira, passar por processos seletivos com mais clareza, sustentar uma rotina profissional melhor e se posicionar com maturidade.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="#professores" className="rounded-2xl bg-gold px-8 py-4 text-center text-lg font-extrabold text-white shadow-2xl shadow-gold/20 transition hover:bg-yellow-600">
                Ver formações
              </Link>
              <Link href="/assinatura" className="rounded-2xl border-2 border-white/55 px-8 py-4 text-center text-lg font-extrabold text-white transition hover:bg-white hover:text-navy">
                Assinar agora
              </Link>
            </div>
          </div>

          <div className="relative min-h-[430px]">
            <div className="excellentia-float absolute right-2 top-0 w-[92%] rounded-[2.5rem] border border-white/15 bg-white/[0.07] p-6 shadow-2xl backdrop-blur-md md:p-8">
              <div className="text-xs font-extrabold uppercase tracking-[0.28em] text-gold-light">jornada docente</div>
              <p className="mt-2 max-w-md text-sm leading-6 text-slate-300">Da apresentação profissional à rotina de trabalho.</p>
              <div className="relative mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {['Carreira', 'Seleção', 'Rotina'].map((node, index) => (
                  <div key={node} className={`group flex min-h-[140px] flex-col justify-between rounded-2xl border border-white/10 bg-navy/45 p-4 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-gold-light/35 hover:bg-navy/65 ${index === 1 ? 'sm:translate-y-10' : ''}`}>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-light text-sm font-black text-navy shadow-[0_0_24px_rgba(244,219,118,.22)]">{index + 1}</span>
                    <span className="text-lg font-black text-white">{node}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="excellentia-float-slow absolute bottom-0 left-0 w-[70%] rounded-[2rem] border border-white/12 bg-[#06101c]/80 p-6 shadow-2xl backdrop-blur-md">
              <div className="text-xs font-black uppercase tracking-[0.22em] text-gold-light">formação contínua</div>
              <p className="mt-3 text-sm leading-6 text-slate-300">Conteúdo direto, certificação e repertório prático para decisões profissionais.</p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-gold-light/65 to-transparent" />
        </div>
      </section>

      <section id="professores" className="relative overflow-hidden bg-navy py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_0%,rgba(244,219,118,.13),transparent_28%),linear-gradient(180deg,#0a2749_0%,#071d38_100%)]" />
        <svg className="pointer-events-none absolute left-0 top-[-6rem] hidden h-[38rem] w-full opacity-50 lg:block" viewBox="0 0 1440 620" fill="none" aria-hidden="true">
          <path className="excellentia-flow-path" d="M112 206C316 54 500 292 724 154C942 18 1128 164 1302 78C1378 302 1126 428 928 548" />
          <path d="M178 310C386 160 552 350 780 230C996 116 1134 240 1260 174" stroke="#f4db76" strokeOpacity=".16" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[.72fr_1fr] lg:px-8">
          <div>
            <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-gold-light">programas para professores</div>
            <h2 className="text-3xl font-black tracking-[-0.03em] text-white md:text-5xl">Formação docente para entrar, permanecer e se posicionar.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              A trilha individual começa pela carreira e avança para rotina, posicionamento, relações profissionais e saúde emocional.
            </p>
          </div>

          <div className="space-y-8">
            <SpotlightCard title={featuredTeacherCourse.title} description={featuredTeacherCourse.description} href="/assinatura" />
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 px-7">
              {upcomingTeacherCourses.map((course) => (
                <FormationRow key={course.title} {...course} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
