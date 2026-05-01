'use client';

import { useEffect, useState } from 'react';

type Lesson = {
  id: string;
  order: number;
  title: string;
  duration?: string;
  embedUrl?: string;
  activity: null | {
    id: string;
    prompt: string;
    response: null | {
      id: string;
      answer: string;
      feedback: null | {
        level: string;
        summary: string;
        strengths: string[];
        nextSteps: string[];
      };
    };
  };
};

type CourseData = {
  organization: { name: string };
  employee: { fullName: string } | null;
  certificate: null | { id: string; verificationCode: string; issuedAt: string; status: string };
  course: { title: string; description?: string | null; lessons: Lesson[] };
};

export default function NR1CourseClient({ token }: { token: string }) {
  const [data, setData] = useState<CourseData | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [issuingCertificate, setIssuingCertificate] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  async function loadCourse() {
    setLoading(true);
    const response = await fetch(`/api/cursos/nr1-escolas?convite=${encodeURIComponent(token)}`);
    const payload = await response.json();

    if (!response.ok) {
      setError(payload.error ?? 'Não foi possível carregar o curso.');
      setLoading(false);
      return;
    }

    setData(payload);
    setAnswers(
      Object.fromEntries(
        payload.course.lessons
          .filter((lesson: Lesson) => lesson.activity?.response?.answer)
          .map((lesson: Lesson) => [lesson.activity!.id, lesson.activity!.response!.answer]),
      ),
    );
    setLoading(false);
  }

  useEffect(() => {
    loadCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  async function saveAnswer(activityId: string) {
    setSaving(activityId);
    setError(null);

    const response = await fetch('/api/cursos/nr1-escolas/respostas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ convite: token, activityId, answer: answers[activityId] ?? '' }),
    });
    const payload = await response.json();

    if (!response.ok) {
      setError(payload.error ?? 'Não foi possível salvar a resposta.');
      setSaving(null);
      return;
    }

    await loadCourse();
    setSaving(null);
  }

  if (loading) {
    return <main className="min-h-screen bg-gray-50 px-4 py-12 text-center text-gray-600">Carregando curso...</main>;
  }

  if (error && !data) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-12 text-center text-red-700">
        <p>{error}</p>
        <button onClick={() => window.history.back()} className="mt-5 bg-navy hover:bg-blue-950 text-white font-bold px-5 py-3 rounded-xl text-sm">Voltar</button>
      </main>
    );
  }

  async function issueCertificate() {
    setIssuingCertificate(true);
    setError(null);

    const response = await fetch('/api/cursos/nr1-escolas/certificado', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ convite: token }),
    });
    const payload = await response.json();

    if (!response.ok) {
      setError(payload.error ?? 'Não foi possível emitir o certificado.');
      setIssuingCertificate(false);
      return;
    }

    await loadCourse();
    setIssuingCertificate(false);
  }

  if (!data) return null;

  const answeredCount = data.course.lessons.filter((lesson) => lesson.activity?.response).length;
  const isComplete = answeredCount === data.course.lessons.length;
  const currentLesson = data.course.lessons[currentLessonIndex] ?? data.course.lessons[0];

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-navy text-white py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <button onClick={() => window.history.back()} className="mb-6 text-sm text-gray-300 hover:text-white">← Voltar</button>
          <p className="text-sm text-gray-300 mb-2">{data.organization.name}</p>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">{data.course.title}</h1>
          <p className="text-gray-300 max-w-3xl">Olá, {data.employee?.fullName ?? 'colaborador(a)'}. Assista às aulas e responda às situações-problema para formar seu registro de participação.</p>
          <div className="mt-6 bg-white/10 rounded-xl p-4 text-sm">
            Progresso: {answeredCount} de {data.course.lessons.length} atividades respondidas.
          </div>
          <a href={`/comunicacao?convite=${encodeURIComponent(token)}`} className="inline-block mt-4 bg-gold hover:bg-yellow-600 text-white font-bold px-5 py-3 rounded-xl text-sm">
            Acessar canal de comunicação
          </a>
          {isComplete && (
            <div className="mt-4 bg-white text-navy rounded-xl p-5">
              {data.certificate ? (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-gold mb-1">Certificado emitido</p>
                  <p className="font-bold">Código de verificação: {data.certificate.verificationCode}</p>
                  <p className="text-sm text-gray-600 mt-1">Este certificado comprova curso ofertado e respostas enviadas, sem nota pública qualitativa.</p>
                  <a href={`/certificados/${data.certificate.verificationCode}`} className="inline-block mt-3 text-sm font-bold text-gold hover:underline">
                    Abrir certificado →
                  </a>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="font-bold">Todas as atividades foram respondidas.</p>
                    <p className="text-sm text-gray-600 mt-1">Você já pode emitir o registro de conclusão do curso.</p>
                  </div>
                  <button onClick={issueCertificate} disabled={issuingCertificate} className="bg-gold hover:bg-yellow-600 disabled:opacity-50 text-white font-bold px-5 py-3 rounded-xl text-sm">
                    {issuingCertificate ? 'Emitindo...' : 'Emitir certificado'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {error && <div className="rounded-xl bg-red-50 border border-red-200 text-red-700 p-4 text-sm">{error}</div>}

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-wrap gap-2">
            {data.course.lessons.map((lesson, index) => (
              <button key={lesson.id} onClick={() => setCurrentLessonIndex(index)} className={`px-3 py-2 rounded-lg text-sm font-bold ${index === currentLessonIndex ? 'bg-navy text-white' : lesson.activity?.response ? 'bg-green-50 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                Aula {String(lesson.order).padStart(2, '0')}
              </button>
            ))}
          </div>

          {currentLesson && (
            <article key={currentLesson.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-gray-100">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-gold mb-1">Aula {String(currentLesson.order).padStart(2, '0')}</p>
                  <h2 className="text-xl font-bold text-navy">{currentLesson.title}</h2>
                </div>
                <span className="text-sm text-gray-500">{currentLesson.duration}</span>
              </div>

              {currentLesson.embedUrl && (
                <div className="aspect-video bg-black">
                  <iframe src={currentLesson.embedUrl} title={`NR-1 nas Escolas — ${currentLesson.title}`} className="w-full h-full" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture" allowFullScreen />
                </div>
              )}

              {currentLesson.activity && (
                <div className="p-5 md:p-6 border-t border-gray-100">
                  <h3 className="text-lg font-bold text-navy mb-3">Situação-problema</h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-5">{currentLesson.activity.prompt}</p>

                  <textarea
                    value={answers[currentLesson.activity.id] ?? ''}
                    onChange={(e) => setAnswers({ ...answers, [currentLesson.activity!.id]: e.target.value })}
                    className="w-full min-h-36 rounded-xl border border-gray-300 p-4 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gold"
                    placeholder="Escreva sua resposta conectando a aula à rotina concreta da escola..."
                  />

                  <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <p className="text-xs text-gray-500">O feedback é formativo e avalia organização/compreensão da resposta, não fatos individuais.</p>
                    <button onClick={() => saveAnswer(currentLesson.activity!.id)} disabled={saving === currentLesson.activity.id} className="bg-gold hover:bg-yellow-600 disabled:opacity-50 text-white font-bold px-5 py-3 rounded-xl text-sm">
                      {saving === currentLesson.activity.id ? 'Salvando...' : currentLesson.activity.response ? 'Atualizar resposta' : 'Enviar resposta'}
                    </button>
                  </div>

                  {currentLesson.activity.response?.feedback && (
                    <div className="mt-5 rounded-xl bg-green-50 border border-green-100 p-5">
                      <p className="text-xs font-bold uppercase tracking-wide text-green-700 mb-2">Feedback formativo — {currentLesson.activity.response.feedback.level}</p>
                      <p className="text-sm text-green-900 leading-relaxed mb-3">{currentLesson.activity.response.feedback.summary}</p>
                      <ul className="text-sm text-green-900 list-disc pl-5 space-y-1">
                        {currentLesson.activity.response.feedback.nextSteps.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              <div className="p-5 md:p-6 border-t border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <button onClick={() => setCurrentLessonIndex(Math.max(0, currentLessonIndex - 1))} disabled={currentLessonIndex === 0} className="bg-white border border-gray-200 hover:border-gold disabled:opacity-50 text-navy font-bold px-5 py-3 rounded-xl text-sm">Aula anterior</button>
                <button onClick={() => setCurrentLessonIndex(Math.min(data.course.lessons.length - 1, currentLessonIndex + 1))} disabled={currentLessonIndex === data.course.lessons.length - 1} className="bg-navy hover:bg-blue-950 disabled:opacity-50 text-white font-bold px-5 py-3 rounded-xl text-sm">Próxima aula</button>
              </div>
            </article>
          )}
        </div>
      </section>
    </main>
  );
}
