import type { Metadata } from 'next';
import Link from 'next/link';
import { getSchoolCatalogCourses, teacherCatalogCourses } from '@/lib/courses/catalog';

export const metadata: Metadata = {
  title: 'Formações — Excellentia',
  description:
    'Formações Excellentia para professores, educadores e escolas: carreira docente, governança educacional, compliance escolar, proteção e segurança institucional.',
};

const institutionalNotes = [
  'acessos definidos pela escola',
  'certificados e registros institucionais',
  'relatórios conforme escopo contratado',
];

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
  const schoolFormations = getSchoolCatalogCourses();
  const [featuredTeacherCourse, ...upcomingTeacherCourses] = teacherCatalogCourses;

  return (
    <>
      <section className="relative overflow-hidden bg-[#06101c] py-20 text-white md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_12%,rgba(244,219,118,.18),transparent_28%),linear-gradient(145deg,#06101c_0%,#0a2749_52%,#02060b_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/55 to-transparent" />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-end gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_.58fr] lg:px-8">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-gold-light/30 bg-gold-light/10 px-5 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-gold-light">
              Formações Excellentia
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.04em] md:text-6xl">
              Formação docente e governança escolar no mesmo ecossistema — sem misturar as jornadas.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-200 md:text-xl">
              Cursos individuais para professores. Trilhas institucionais para escolas. Cada caminho com acesso, certificado e finalidade próprios.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="#professores" className="rounded-2xl bg-gold px-8 py-4 text-center text-lg font-extrabold text-white shadow-2xl shadow-gold/20 transition hover:bg-yellow-600">
                Professores
              </Link>
              <Link href="#escolas" className="rounded-2xl border-2 border-white/55 px-8 py-4 text-center text-lg font-extrabold text-white transition hover:bg-white hover:text-navy">
                Escolas
              </Link>
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-white/12 bg-white/[0.07] p-7 shadow-2xl backdrop-blur-md md:p-8">
            <div className="text-xs font-extrabold uppercase tracking-[0.28em] text-gold-light">duas portas de entrada</div>
            <div className="mt-8 space-y-6">
              <div>
                <p className="text-2xl font-black tracking-[-0.03em]">Professor</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">Carreira, seleção, rotina docente e saúde profissional no acesso individual.</p>
              </div>
              <div className="h-px bg-white/10" />
              <div>
                <p className="text-2xl font-black tracking-[-0.03em]">Escola</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">Formações para equipes, evidências, relatórios e apoio à governança institucional.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-gold/20 bg-[#f7f4ec] py-5">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-5 px-4 text-center text-sm font-bold text-navy sm:px-6 md:gap-8 lg:px-8">
          <span>Certificação nas formações elegíveis</span>
          <span>Acesso individual ou institucional</span>
          <span>Registros para acompanhamento escolar</span>
        </div>
      </section>

      <section id="professores" className="relative overflow-hidden bg-white py-24">
        <div className="absolute right-[-8rem] top-16 h-80 w-80 rounded-full bg-gold/12 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[.72fr_1fr] lg:px-8">
          <div>
            <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-gold">professores e educadores</div>
            <h2 className="text-3xl font-black tracking-[-0.03em] text-navy md:text-5xl">Desenvolvimento profissional com foco em carreira e prática.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              A trilha individual começa pelo processo seletivo em escolas particulares e cresce para temas de rotina, posicionamento e saúde docente.
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

      <section id="escolas" className="relative overflow-hidden bg-[#f7f4ec] py-24">
        <div className="absolute left-[-10rem] top-28 h-96 w-96 rounded-full bg-navy/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[.78fr_1fr] lg:items-end">
            <div>
              <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-gold">escolas</div>
              <h2 className="text-3xl font-black tracking-[-0.03em] text-navy md:text-5xl">Formações institucionais para comprovar, orientar e acompanhar.</h2>
            </div>
            <p className="text-lg leading-8 text-slate-600">
              A escola contrata trilhas para colaboradores e gestores, com certificados, registros e relatórios no escopo combinado. A formação individual de professores não compete com a solução escolar; ela atende outra jornada.
            </p>
          </div>

          <div className="mt-14 rounded-[2.5rem] border border-white/70 bg-white px-6 shadow-2xl md:px-9">
            {schoolFormations.map((course) => (
              <FormationRow key={course.title} {...course} />
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_.76fr] lg:items-center">
            <div className="rounded-[2rem] border border-navy bg-navy p-8 text-white shadow-2xl">
              <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-gold-light">pacote escolar</div>
              <h3 className="text-3xl font-black tracking-[-0.03em]">Sob proposta institucional.</h3>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                A proposta define formações, públicos, acessos, relatórios, certificados e apoio documental quando aplicável.
              </p>
              <Link href="/escolas" className="mt-7 inline-flex rounded-2xl bg-gold px-7 py-4 font-black text-white transition hover:bg-yellow-600">
                Ver solução para escolas
              </Link>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8">
              <div className="mb-5 text-xs font-black uppercase tracking-[0.22em] text-gold">o que acompanha a operação</div>
              <div className="space-y-4">
                {institutionalNotes.map((item) => (
                  <p key={item} className="border-b border-slate-100 pb-4 text-sm font-bold uppercase tracking-[0.12em] text-navy last:border-b-0 last:pb-0">{item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
