import type { Metadata } from 'next';
import Link from 'next/link';
import { getSchoolCatalogCourses, teacherCatalogCourses } from '@/lib/courses/catalog';

export const metadata: Metadata = {
  title: 'Formações — Excellentia',
  description:
    'Formações Excellentia para professores e escolas: carreira docente, governança educacional, compliance escolar, Lei Lucas, LGPD, proteção e segurança institucional.',
};

const professorPlanItems = [
  'Acesso às formações disponíveis no plano individual',
  'Certificados emitidos nas formações concluídas',
  'Novas trilhas incorporadas conforme o catálogo evolui',
];

const schoolPlanItems = [
  'Formações destinadas a colaboradores, coordenação e gestão escolar',
  'Certificados, registros e relatórios vinculados à escola',
  'Apoio a fluxos institucionais de governança, documentação e acompanhamento',
];

const institutionalLayers = [
  {
    title: 'Formações obrigatórias e temas críticos',
    text: 'Trilhas para adultos da escola em temas como Lei Lucas, riscos psicossociais, LGPD, proteção integral, bullying, segurança e convivência.',
  },
  {
    title: 'Evidências e acompanhamento',
    text: 'Certificados, registros de participação e relatórios ajudam a escola a acompanhar lacunas sem depender de controles informais.',
  },
  {
    title: 'Documentos e fluxos institucionais',
    text: 'PGR/GRO não aparece como formação isolada: entra como documento e processo de gestão que pode ser apoiado por dados, registros e orientação operacional.',
  },
];

function CourseCard({
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
    <div className={`rounded-[2rem] border p-6 shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl ${available ? 'border-gold/45 bg-white' : 'border-slate-200 bg-white/80'}`}>
      <div className="mb-5 flex items-start justify-between gap-3">
        <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-gold">{area}</span>
        <span className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.16em] ${available ? 'bg-navy text-white' : 'bg-slate-100 text-slate-500'}`}>
          {available ? 'Disponível' : inProduction ? 'Em produção' : 'Planejada'}
        </span>
      </div>
      <h3 className="text-2xl font-black leading-tight text-navy">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-600">{description}</p>
      {(modules || lessons) && (
        <div className="mt-5 flex flex-wrap gap-3 text-xs font-bold text-slate-500">
          {modules ? <span>{modules} módulo{modules > 1 ? 's' : ''}</span> : null}
          {lessons ? <span>{lessons} aulas</span> : null}
          <span>Certificação</span>
        </div>
      )}
      {href ? (
        <Link href={href} className="mt-6 inline-flex text-sm font-black text-gold transition hover:translate-x-1 hover:text-yellow-700">
          Ver estrutura →
        </Link>
      ) : null}
    </div>
  );
}

export default function CursosPage() {
  const schoolFormations = getSchoolCatalogCourses().filter((course) => !course.href.includes('/pgr-gro-escolas'));

  return (
    <>
      <section className="relative overflow-hidden bg-[#06101c] py-20 text-white md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_12%,rgba(244,219,118,.20),transparent_28%),radial-gradient(circle_at_12%_70%,rgba(59,130,246,.13),transparent_26%),linear-gradient(145deg,#06101c_0%,#0a2749_48%,#02060b_100%)]" />
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(244,219,118,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(244,219,118,.07)_1px,transparent_1px)] [background-size:72px_72px]" />
        <svg className="pointer-events-none absolute left-0 top-28 hidden h-[760px] w-full opacity-70 lg:block" viewBox="0 0 1440 760" fill="none" aria-hidden="true">
          <path className="excellentia-flow-path" d="M115 450C320 292 505 510 704 380C918 240 1138 405 1265 618" />
        </svg>

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_.9fr] lg:px-8">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-gold-light/30 bg-gold-light/10 px-5 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-gold-light">
              Formações para professores e escolas
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.04em] md:text-6xl">
              Trilhas formativas conectadas à carreira docente e à governança escolar.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-200 md:text-xl">
              A Excellentia reúne formações para professores, equipes escolares e gestores. Algumas trilhas desenvolvem carreira e prática profissional; outras sustentam compliance, registros e maturidade institucional nas escolas.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="#professores" className="rounded-2xl bg-gold px-8 py-4 text-center text-lg font-extrabold text-white shadow-2xl shadow-gold/20 transition hover:bg-yellow-600">
                Formações para professores
              </Link>
              <Link href="#escolas" className="rounded-2xl border-2 border-white/55 px-8 py-4 text-center text-lg font-extrabold text-white transition hover:bg-white hover:text-navy">
                Formações para escolas
              </Link>
            </div>
          </div>

          <div className="relative min-h-[500px]">
            <div className="absolute inset-4 rounded-[3.5rem] bg-gold-light/10 blur-3xl" />
            <div className="excellentia-float absolute right-2 top-0 w-[92%] rounded-[2.5rem] border border-white/15 bg-white/[0.07] p-6 shadow-2xl backdrop-blur-md md:p-8">
              <div className="text-xs font-extrabold uppercase tracking-[0.28em] text-gold-light">catálogo em duas modalidades</div>
              <div className="mt-8 grid grid-cols-1 gap-4">
                <div className="rounded-2xl border border-white/10 bg-navy/50 p-5">
                  <div className="text-sm font-black uppercase tracking-[0.2em] text-gold-light">Professores</div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">Assinatura individual para carreira, rotina escolar e desenvolvimento profissional.</p>
                </div>
                <div className="ml-8 rounded-2xl border border-white/10 bg-white/[0.08] p-5">
                  <div className="text-sm font-black uppercase tracking-[0.2em] text-gold-light">Escolas</div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">Pacote institucional para formação de equipes, evidências, relatórios e governança.</p>
                </div>
                <div className="mr-8 rounded-2xl border border-white/10 bg-navy/50 p-5">
                  <div className="text-sm font-black uppercase tracking-[0.2em] text-gold-light">Governança documental</div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">PGR/GRO, quando aplicável, é tratado como documento e rotina institucional apoiada por registros.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-gold/20 bg-[#f7f4ec] py-5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-5 text-center text-sm font-bold text-navy md:gap-8">
            <span>Certificação nas formações aplicáveis</span>
            <span>Trilhas individuais e institucionais</span>
            <span>Registros e evidências para escolas</span>
            <span>Planos contratados conforme perfil de uso</span>
          </div>
        </div>
      </section>

      <section id="professores" className="relative overflow-hidden bg-white py-24">
        <div className="absolute right-[-8rem] top-16 h-80 w-80 rounded-full bg-gold/15 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[.82fr_1.18fr]">
            <div>
              <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-gold">professores</div>
              <h2 className="text-3xl font-black tracking-[-0.03em] text-navy md:text-5xl">Para professores, a assinatura organiza carreira e desenvolvimento profissional.</h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                O plano individual permanece separado da contratação escolar. Ele reúne formações voltadas à carreira docente, processos seletivos, rotina profissional e saúde do trabalho.
              </p>
              <div className="mt-8 rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
                <div className="text-sm font-black uppercase tracking-[0.2em] text-gold">Plano individual</div>
                <p className="mt-3 text-3xl font-black text-navy">R$69/mês <span className="text-base font-bold text-slate-500">ou R$588/ano</span></p>
                <p className="mt-3 text-sm leading-6 text-slate-600">Contratação individual voltada ao desenvolvimento profissional do professor. Condições comerciais e arrependimento seguem os termos aplicáveis no checkout.</p>
                <Link href="/assinatura" className="mt-6 inline-flex rounded-2xl bg-gold px-7 py-4 font-black text-white transition hover:bg-yellow-600">
                  Ver assinatura individual
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {teacherCatalogCourses.map((course, index) => (
                <CourseCard key={course.title} {...course} href={index === 0 ? '/assinatura' : undefined} />
              ))}
              <div className="rounded-[2rem] border border-dashed border-navy/25 bg-[#f7f4ec] p-6 shadow-sm">
                <div className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-gold">incluído no plano</div>
                <div className="space-y-3">
                  {professorPlanItems.map((item) => (
                    <p key={item} className="text-sm leading-6 text-slate-700">{item}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="escolas" className="relative overflow-hidden bg-[#f7f4ec] py-24">
        <div className="absolute left-[-10rem] top-28 h-96 w-96 rounded-full bg-navy/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-gold">escolas</div>
            <h2 className="text-3xl font-black tracking-[-0.03em] text-navy md:text-5xl">Para escolas, as formações integram uma camada de governança e compliance.</h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              A contratação escolar não é uma assinatura individual replicada para vários usuários. Ela envolve trilhas para equipes, registros institucionais, acompanhamento e fluxos de apoio à gestão documental quando aplicável.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {schoolFormations.map((course) => (
              <CourseCard key={course.title} {...course} />
            ))}
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {institutionalLayers.map((layer, index) => (
              <div key={layer.title} className={`rounded-[2rem] border p-7 shadow-xl ${index === 2 ? 'border-navy bg-navy text-white' : 'border-slate-200 bg-white text-navy'}`}>
                <div className={`mb-5 text-xs font-black uppercase tracking-[0.24em] ${index === 2 ? 'text-gold-light' : 'text-gold'}`}>camada {index + 1}</div>
                <h3 className="text-2xl font-black">{layer.title}</h3>
                <p className={`mt-4 leading-7 ${index === 2 ? 'text-slate-300' : 'text-slate-600'}`}>{layer.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-[2.5rem] border border-white/60 bg-white p-8 shadow-2xl md:p-10">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_.85fr] lg:items-center">
              <div>
                <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-gold">pacote escolar</div>
                <h3 className="text-3xl font-black tracking-[-0.03em] text-navy">Preço e escopo dependem do porte, das trilhas e da camada de acompanhamento.</h3>
                <p className="mt-5 text-lg leading-8 text-slate-600">
                  O pacote para escolas deve ser tratado em proposta própria, porque pode reunir formações, colaboradores, certificados, relatórios, canal de comunicação, documentos e acompanhamento institucional.
                </p>
              </div>
              <div className="rounded-[2rem] bg-[#f7f4ec] p-6">
                <div className="space-y-3">
                  {schoolPlanItems.map((item) => (
                    <p key={item} className="text-sm font-bold leading-6 text-navy">{item}</p>
                  ))}
                </div>
                <Link href="/escolas" className="mt-7 inline-flex rounded-2xl bg-navy px-7 py-4 font-black text-white transition hover:bg-slate-900">
                  Ver solução para escolas
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
