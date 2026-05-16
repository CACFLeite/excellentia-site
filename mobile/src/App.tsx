import { useEffect, useMemo, useState } from 'react'
import { App as CapacitorApp } from '@capacitor/app'
import { Preferences } from '@capacitor/preferences'
import './App.css'

const API_BASE_URL = import.meta.env.VITE_EXCELLENTIA_API_BASE_URL ?? 'https://excellentia-edu.com'
const SESSION_KEY = 'excellentia_teacher_session'

type TeacherCourse = {
  title: string
  description?: string | null
  slug: string
  status: string
  available: boolean
  href?: string | null
  source?: string
}

type TeacherCourseDetail = {
  subscriber: {
    email: string
    fullName?: string | null
    status: string
    currentPeriodEnd?: string | null
  }
  course: {
    id: string
    slug: string
    title: string
    description?: string | null
    lessons: Array<{
      id: string
      order: number
      title: string
      videoUrl?: string | null
      transcript?: string | null
      module?: string | null
      summary?: string | null
      contentStatus?: string | null
      activities: Array<{ id: string; prompt: string }>
    }>
  }
}

type TeacherCoursesPayload = {
  subscriber: {
    email: string
    fullName?: string | null
    status: string
    currentPeriodEnd?: string | null
  }
  courses: TeacherCourse[]
  usingCatalogFallback?: boolean
}

type SchoolInvite = {
  invitationId: string
  status: string
  organization: { id: string; name: string; slug: string }
  employee: { id: string; fullName: string; email?: string | null; cpf?: string | null; jobTitle?: string | null } | null
  expiresAt: string
}

type EmployeeCoursePayload = {
  organization: { name: string }
  employee: { fullName: string } | null
  certificate: null | { verificationCode: string; issuedAt: string; status: string }
  course: {
    slug: string
    title: string
    description?: string | null
    lessons: Array<{
      id: string
      order: number
      title: string
      duration?: string
      embedUrl?: string
      activity: null | {
        id: string
        prompt: string
        response: null | {
          id: string
          answer: string
          status: string
          feedback: null | { level: string; summary: string; strengths: string[]; nextSteps: string[] }
        }
      }
    }>
  }
}

type Screen = 'home' | 'teacher-login' | 'teacher-courses' | 'teacher-course' | 'school-access' | 'school-course' | 'certificate'

async function apiFetch<T>(path: string, sessionToken?: string | null, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers)
  headers.set('Accept', 'application/json')
  if (sessionToken) headers.set('Authorization', 'Bearer ' + sessionToken)

  const response = await fetch(new URL(path, API_BASE_URL).toString(), {
    ...init,
    headers,
  })

  const payload = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(payload.error ?? 'Não foi possível completar a operação.')
  }

  return payload as T
}

function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [sessionToken, setSessionToken] = useState('')
  const [email, setEmail] = useState('')
  const [coursesPayload, setCoursesPayload] = useState<TeacherCoursesPayload | null>(null)
  const [courseDetail, setCourseDetail] = useState<TeacherCourseDetail | null>(null)
  const [inviteToken, setInviteToken] = useState('')
  const [schoolCourseSlug, setSchoolCourseSlug] = useState('nr1-escolas')
  const [schoolInvite, setSchoolInvite] = useState<SchoolInvite | null>(null)
  const [schoolForm, setSchoolForm] = useState({ fullName: '', email: '', cpf: '', jobTitle: '', privacyAccepted: false })
  const [employeeCourse, setEmployeeCourse] = useState<EmployeeCoursePayload | null>(null)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [certificateCode, setCertificateCode] = useState('')
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const displayName = coursesPayload?.subscriber.fullName ?? coursesPayload?.subscriber.email
  const hasSession = Boolean(sessionToken)

  useEffect(() => {
    let removeUrlListener: (() => void) | undefined

    Preferences.get({ key: SESSION_KEY }).then(({ value }) => {
      if (value) {
        setSessionToken(value)
        setScreen('teacher-courses')
      }
    })

    const url = new URL(window.location.href)
    const tokenFromUrl = url.searchParams.get('teacherSession')
    if (tokenFromUrl) {
      saveSession(tokenFromUrl)
    }

    CapacitorApp.addListener('appUrlOpen', (event) => {
      handleAuthUrl(event.url)
    }).then((handle) => {
      removeUrlListener = () => handle.remove()
    })

    return () => {
      removeUrlListener?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (screen === 'teacher-courses' && sessionToken) {
      loadTeacherCourses()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, sessionToken])

  const completionCount = useMemo(() => {
    if (!courseDetail) return 0
    return courseDetail.course.lessons.filter((lesson) => lesson.videoUrl || lesson.activities.length).length
  }, [courseDetail])

  const schoolAnsweredCount = useMemo(() => {
    if (!employeeCourse) return 0
    return employeeCourse.course.lessons.filter((lesson) => lesson.activity?.response).length
  }, [employeeCourse])

  function formatCpf(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, 11)
    return digits
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1-$2')
  }

  function parseInviteInput(value: string) {
    const trimmed = value.trim()
    if (!trimmed) return { token: '', courseSlug: schoolCourseSlug || 'nr1-escolas' }

    try {
      const url = new URL(trimmed)
      return {
        token: url.searchParams.get('convite') ?? trimmed,
        courseSlug: url.searchParams.get('curso') ?? url.pathname.match(/\/cursos\/([^/]+)/)?.[1] ?? schoolCourseSlug,
      }
    } catch {
      return { token: trimmed, courseSlug: schoolCourseSlug || 'nr1-escolas' }
    }
  }

  async function saveSession(token: string) {
    setSessionToken(token)
    await Preferences.set({ key: SESSION_KEY, value: token })
    setScreen('teacher-courses')
  }

  async function handleAuthUrl(rawUrl: string) {
    try {
      const url = new URL(rawUrl)
      const isTeacherAuth = url.protocol === 'excellentia:' && url.hostname === 'auth' && url.pathname === '/teacher'
      const isAuthError = url.protocol === 'excellentia:' && url.hostname === 'auth' && url.pathname === '/error'

      if (isTeacherAuth) {
        const token = url.searchParams.get('session')
        if (!token) throw new Error('Link de acesso sem sessão.')
        await saveSession(token)
        setNotice('Acesso confirmado no app.')
        setError('')
        return
      }

      if (isAuthError) {
        setError('Não foi possível confirmar o acesso. Solicite um novo link.')
      }
    } catch {
      setError('Link de acesso inválido.')
    }
  }

  async function clearSession() {
    setSessionToken('')
    setCoursesPayload(null)
    setCourseDetail(null)
    await Preferences.remove({ key: SESSION_KEY })
    setScreen('home')
  }

  async function requestTeacherLink() {
    setLoading(true)
    setError('')
    setNotice('')
    try {
      await apiFetch('/api/professor/auth/request-link', null, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, client: 'mobile' }),
      })
      setNotice('Enviamos o link de acesso para o e-mail informado.')
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  async function loadTeacherCourses() {
    setLoading(true)
    setError('')
    try {
      const payload = await apiFetch<TeacherCoursesPayload>('/api/professor/cursos', sessionToken)
      setCoursesPayload(payload)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  async function openTeacherCourse(slug: string) {
    setLoading(true)
    setError('')
    try {
      const payload = await apiFetch<TeacherCourseDetail>('/api/professor/cursos/' + encodeURIComponent(slug), sessionToken)
      setCourseDetail(payload)
      setScreen('teacher-course')
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  async function loadSchoolInvite() {
    const parsed = parseInviteInput(inviteToken)
    if (!parsed.token) {
      setError('Informe o token de convite recebido pela escola.')
      return
    }
    setLoading(true)
    setError('')
    setNotice('')
    setSchoolCourseSlug(parsed.courseSlug || 'nr1-escolas')
    setInviteToken(parsed.token)
    try {
      const invite = await apiFetch<SchoolInvite>('/api/escolas/convites/' + encodeURIComponent(parsed.token))
      setSchoolInvite(invite)
      setSchoolForm({
        fullName: invite.employee?.fullName ?? '',
        email: invite.employee?.email ?? '',
        cpf: invite.employee?.cpf ? formatCpf(invite.employee.cpf) : '',
        jobTitle: invite.employee?.jobTitle ?? '',
        privacyAccepted: false,
      })
      if (invite.status === 'accepted') {
        await loadEmployeeCourse(parsed.token, parsed.courseSlug || 'nr1-escolas')
      }
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  async function activateSchoolInvite() {
    if (!inviteToken) return
    setLoading(true)
    setError('')
    try {
      await apiFetch('/api/escolas/convites/' + encodeURIComponent(inviteToken), null, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(schoolForm),
      })
      setNotice('Convite ativado.')
      await loadEmployeeCourse(inviteToken, schoolCourseSlug)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  async function loadEmployeeCourse(token: string, courseSlug: string) {
    const payload = await apiFetch<EmployeeCoursePayload>('/api/cursos/' + encodeURIComponent(courseSlug) + '?convite=' + encodeURIComponent(token))
    setEmployeeCourse(payload)
    setAnswers(
      Object.fromEntries(
        payload.course.lessons
          .filter((lesson) => lesson.activity?.response?.answer)
          .map((lesson) => [lesson.activity!.id, lesson.activity!.response!.answer]),
      ),
    )
    setScreen('school-course')
  }

  async function saveEmployeeAnswer(activityId: string) {
    setLoading(true)
    setError('')
    try {
      await apiFetch('/api/cursos/' + encodeURIComponent(schoolCourseSlug) + '/respostas', null, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ convite: inviteToken, activityId, answer: answers[activityId] ?? '' }),
      })
      await loadEmployeeCourse(inviteToken, schoolCourseSlug)
      setNotice('Resposta salva.')
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  async function issueEmployeeCertificate() {
    setLoading(true)
    setError('')
    try {
      const payload = await apiFetch<{ certificate: { verificationCode: string } }>('/api/cursos/' + encodeURIComponent(schoolCourseSlug) + '/certificado', null, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ convite: inviteToken }),
      })
      setNotice('Certificado emitido: ' + payload.certificate.verificationCode)
      await loadEmployeeCourse(inviteToken, schoolCourseSlug)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  function openCertificate() {
    if (!certificateCode.trim()) {
      setError('Informe o código de verificação do certificado.')
      return
    }
    window.location.href = new URL('/certificados/' + encodeURIComponent(certificateCode.trim()), API_BASE_URL).toString()
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <button className="brand-mark" onClick={() => setScreen('home')} aria-label="Início">
          E
        </button>
        <div>
          <strong>Excellentia</strong>
          <span>Plataforma educacional</span>
        </div>
        {hasSession ? (
          <button className="ghost-button" onClick={clearSession}>Sair</button>
        ) : null}
      </header>

      {screen === 'home' ? (
        <section className="hero-screen">
          <div className="eyebrow">App mobile</div>
          <h1>Formações e registros da Excellentia no celular.</h1>
          <p>
            Acesse cursos, atividades e certificados com a mesma base da plataforma web, em uma experiência própria para uso móvel.
          </p>

          <div className="action-grid">
            <button className="primary-button" onClick={() => setScreen('teacher-login')}>Sou professor</button>
            <button className="secondary-button" onClick={() => setScreen('school-access')}>Tenho convite da escola</button>
            <button className="secondary-button" onClick={() => setScreen('certificate')}>Verificar certificado</button>
          </div>
        </section>
      ) : null}

      {screen === 'teacher-login' ? (
        <section className="panel">
          <button className="back-button" onClick={() => setScreen('home')}>Voltar</button>
          <h1>Acesso do professor</h1>
          <p>Informe o e-mail usado na assinatura para receber o link de entrada.</p>
          <label>
            E-mail
            <input value={email} onChange={(event) => setEmail(event.target.value)} inputMode="email" autoCapitalize="none" placeholder="seu@email.com" />
          </label>
          <button className="primary-button" disabled={loading} onClick={requestTeacherLink}>
            {loading ? 'Enviando...' : 'Enviar link de acesso'}
          </button>
          <p className="small-note">A etapa seguinte será abrir o link diretamente no app via deep link.</p>
        </section>
      ) : null}

      {screen === 'teacher-courses' ? (
        <section className="panel">
          <div className="section-row">
            <div>
              <div className="eyebrow">Área do professor</div>
              <h1>Meus cursos</h1>
              {displayName ? <p>Acesso autenticado para {displayName}.</p> : null}
            </div>
            <button className="ghost-button" onClick={loadTeacherCourses}>Atualizar</button>
          </div>

          {!sessionToken ? (
            <div className="empty-state">
              <p>Entre pelo link enviado ao seu e-mail para carregar seus cursos.</p>
              <button className="primary-button" onClick={() => setScreen('teacher-login')}>Entrar</button>
            </div>
          ) : null}

          <div className="course-list">
            {coursesPayload?.courses.map((course) => (
              <article className="course-card" key={course.slug}>
                <span>{course.available ? 'Disponível' : 'Em estruturação'}</span>
                <h2>{course.title}</h2>
                <p>{course.description}</p>
                <button className="primary-button" disabled={!course.available} onClick={() => openTeacherCourse(course.slug)}>
                  Abrir curso
                </button>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {screen === 'teacher-course' && courseDetail ? (
        <section className="panel">
          <button className="back-button" onClick={() => setScreen('teacher-courses')}>Voltar aos cursos</button>
          <div className="eyebrow">Curso liberado</div>
          <h1>{courseDetail.course.title}</h1>
          <p>{courseDetail.course.description}</p>
          <div className="metric-strip">
            <strong>{courseDetail.course.lessons.length}</strong>
            <span>aulas</span>
            <strong>{completionCount}</strong>
            <span>itens com conteúdo</span>
          </div>

          <div className="lesson-list">
            {courseDetail.course.lessons.map((lesson) => (
              <article className="lesson-card" key={lesson.id}>
                <span>Aula {String(lesson.order).padStart(2, '0')}{lesson.module ? ' · ' + lesson.module : ''}</span>
                <h2>{lesson.title}</h2>
                {lesson.summary ? <p>{lesson.summary}</p> : null}
                <small>{lesson.videoUrl ? 'Vídeo disponível' : lesson.contentStatus === 'outline_pending_full_media' ? 'Conteúdo em alimentação' : 'Aula estruturada'}</small>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {screen === 'school-access' ? (
        <section className="panel">
          <button className="back-button" onClick={() => setScreen('home')}>Voltar</button>
          <h1>Convite da escola</h1>
          <p>Use o token ou link de convite recebido pela instituição. O app usa as mesmas APIs do site para ativar acesso, carregar curso, salvar respostas e emitir certificado.</p>
          <label>
            Token ou link de convite
            <input value={inviteToken} onChange={(event) => setInviteToken(event.target.value)} placeholder="Cole o token aqui" />
          </label>
          <label>
            Curso
            <input value={schoolCourseSlug} onChange={(event) => setSchoolCourseSlug(event.target.value)} placeholder="nr1-escolas" autoCapitalize="none" />
          </label>
          <button className="primary-button" disabled={loading} onClick={loadSchoolInvite}>
            {loading ? 'Validando...' : 'Validar convite'}
          </button>

          {schoolInvite ? (
            <div className="course-card">
              <span>Convite encontrado</span>
              <h2>{schoolInvite.organization.name}</h2>
              <p>Status: {schoolInvite.status}. Confirme os dados para liberar o curso e preservar o registro do certificado.</p>

              {schoolInvite.status !== 'accepted' ? (
                <>
                  <label>
                    Nome completo
                    <input value={schoolForm.fullName} onChange={(event) => setSchoolForm({ ...schoolForm, fullName: event.target.value })} />
                  </label>
                  <label>
                    E-mail
                    <input value={schoolForm.email} onChange={(event) => setSchoolForm({ ...schoolForm, email: event.target.value })} inputMode="email" autoCapitalize="none" />
                  </label>
                  <label>
                    CPF
                    <input value={schoolForm.cpf} onChange={(event) => setSchoolForm({ ...schoolForm, cpf: formatCpf(event.target.value) })} inputMode="numeric" />
                  </label>
                  <label>
                    Função/cargo
                    <input value={schoolForm.jobTitle} onChange={(event) => setSchoolForm({ ...schoolForm, jobTitle: event.target.value })} />
                  </label>
                  <label className="check-row">
                    <input type="checkbox" checked={schoolForm.privacyAccepted} onChange={(event) => setSchoolForm({ ...schoolForm, privacyAccepted: event.target.checked })} />
                    <span>Confirmo ciência sobre tratamento de dados para acesso, progresso, respostas e certificado.</span>
                  </label>
                  <button className="primary-button" disabled={loading || !schoolForm.fullName.trim() || schoolForm.cpf.replace(/\D/g, '').length !== 11 || !schoolForm.privacyAccepted} onClick={activateSchoolInvite}>
                    Ativar acesso
                  </button>
                </>
              ) : (
                <button className="primary-button" onClick={() => loadEmployeeCourse(inviteToken, schoolCourseSlug)}>Abrir curso</button>
              )}
            </div>
          ) : null}
        </section>
      ) : null}

      {screen === 'school-course' && employeeCourse ? (
        <section className="panel">
          <button className="back-button" onClick={() => setScreen('school-access')}>Voltar ao convite</button>
          <div className="eyebrow">{employeeCourse.organization.name}</div>
          <h1>{employeeCourse.course.title}</h1>
          <p>Olá, {employeeCourse.employee?.fullName ?? 'colaborador(a)'}. Assista às aulas e responda às atividades para formar seu registro de participação.</p>
          <div className="metric-strip">
            <strong>{schoolAnsweredCount}</strong>
            <span>respondidas</span>
            <strong>{employeeCourse.course.lessons.length}</strong>
            <span>aulas</span>
          </div>

          {employeeCourse.certificate ? (
            <div className="course-card">
              <span>Certificado emitido</span>
              <h2>{employeeCourse.certificate.verificationCode}</h2>
              <button className="secondary-button" onClick={() => window.location.href = new URL('/certificados/' + employeeCourse.certificate!.verificationCode, API_BASE_URL).toString()}>
                Abrir certificado
              </button>
            </div>
          ) : null}

          <div className="lesson-list">
            {employeeCourse.course.lessons.map((lesson) => (
              <article className="lesson-card" key={lesson.id}>
                <span>Aula {String(lesson.order).padStart(2, '0')}{lesson.duration ? ' · ' + lesson.duration : ''}</span>
                <h2>{lesson.title}</h2>
                {lesson.embedUrl ? (
                  <div className="video-frame">
                    <iframe src={lesson.embedUrl} title={lesson.title} allowFullScreen />
                  </div>
                ) : null}
                {lesson.activity ? (
                  <div className="activity-box">
                    <p>{lesson.activity.prompt}</p>
                    {lesson.activity.response?.feedback ? (
                      <p className="small-note">Feedback: {lesson.activity.response.feedback.summary}</p>
                    ) : null}
                    <textarea
                      value={answers[lesson.activity.id] ?? ''}
                      onChange={(event) => setAnswers({ ...answers, [lesson.activity!.id]: event.target.value })}
                      placeholder="Escreva sua resposta"
                    />
                    <button className="primary-button" disabled={loading} onClick={() => saveEmployeeAnswer(lesson.activity!.id)}>
                      Salvar resposta
                    </button>
                  </div>
                ) : null}
              </article>
            ))}
          </div>

          {!employeeCourse.certificate ? (
            <button className="primary-button certificate-button" disabled={loading || schoolAnsweredCount < employeeCourse.course.lessons.length} onClick={issueEmployeeCertificate}>
              Emitir certificado
            </button>
          ) : null}
        </section>
      ) : null}

      {screen === 'certificate' ? (
        <section className="panel">
          <button className="back-button" onClick={() => setScreen('home')}>Voltar</button>
          <h1>Verificar certificado</h1>
          <p>Informe o código de verificação emitido pela Excellentia.</p>
          <label>
            Código
            <input value={certificateCode} onChange={(event) => setCertificateCode(event.target.value)} placeholder="EXC-..." autoCapitalize="characters" />
          </label>
          <button className="primary-button" onClick={openCertificate}>Abrir certificado</button>
        </section>
      ) : null}

      {error ? <div className="toast error">{error}</div> : null}
      {notice ? <div className="toast">{notice}</div> : null}
      {loading && screen !== 'teacher-login' ? <div className="loading-bar" /> : null}

      <footer className="app-footer">
        <span>Privacidade</span>
        <span>Suporte</span>
        <span>Termos</span>
      </footer>
    </main>
  )
}

export default App
