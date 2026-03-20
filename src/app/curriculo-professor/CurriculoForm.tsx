'use client'

import { useState } from 'react'

type Segmento = 'EF1' | 'EF2' | 'EM' | 'Pré-vestibular' | 'Outro'

interface FormData {
  // Bloco 1
  nome: string
  email: string
  telefone: string
  cidadeBairro: string
  disciplinas: string
  segmentos: Segmento[]
  experiencia: string
  escolas: string
  formacao: string
  cursosRelevantes: string
  // Bloco 2
  q1PraticaPedagogica: string
  q2GestaoEmocional: string
  q3Salvaguarda: string
  q4Interdisciplinaridade: string
  q5Socioemocionais: string
}

const SEGMENTOS: Segmento[] = ['EF1', 'EF2', 'EM', 'Pré-vestibular', 'Outro']

const inputClass =
  'w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-gray-800 placeholder-gray-400'
const labelClass = 'block text-sm font-semibold text-navy mb-1'
const hintClass = 'text-xs text-gray-400 mt-1'

export default function CurriculoForm() {
  const [step, setStep] = useState<1 | 2>(1)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const [form, setForm] = useState<FormData>({
    nome: '',
    email: '',
    telefone: '',
    cidadeBairro: '',
    disciplinas: '',
    segmentos: [],
    experiencia: '',
    escolas: '',
    formacao: '',
    cursosRelevantes: '',
    q1PraticaPedagogica: '',
    q2GestaoEmocional: '',
    q3Salvaguarda: '',
    q4Interdisciplinaridade: '',
    q5Socioemocionais: '',
  })

  const set = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const toggleSegmento = (seg: Segmento) => {
    setForm((prev) => ({
      ...prev,
      segmentos: prev.segmentos.includes(seg)
        ? prev.segmentos.filter((s) => s !== seg)
        : [...prev.segmentos, seg],
    }))
  }

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/curriculo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        throw new Error('Erro no servidor')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Erro ao enviar. Tente novamente ou entre em contato por email.')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-10 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-2xl font-bold text-navy mb-3">Tudo certo!</h3>
        <p className="text-gray-700 text-lg">
          Recebemos tudo! Seu currículo profissional será enviado em até 24 horas para{' '}
          <strong>{form.email}</strong>. Fique de olho na caixa de entrada (e no spam, por
          precaução).
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-navy">
            Passo {step} de 2
          </span>
          <span className="text-sm text-gray-400">
            {step === 1 ? 'Dados profissionais' : 'Perguntas situacionais'}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gold h-2 rounded-full transition-all duration-500"
            style={{ width: step === 1 ? '50%' : '100%' }}
          />
        </div>
      </div>

      {/* BLOCO 1 */}
      {step === 1 && (
        <form onSubmit={handleNext} className="space-y-6">
          <h2 className="text-xl font-bold text-navy mb-4">Dados profissionais</h2>

          {/* Nome */}
          <div>
            <label className={labelClass}>Nome completo *</label>
            <input
              type="text"
              required
              value={form.nome}
              onChange={(e) => set('nome', e.target.value)}
              placeholder="Seu nome completo"
              className={inputClass}
            />
          </div>

          {/* Email */}
          <div>
            <label className={labelClass}>Email profissional *</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              placeholder="seu@email.com"
              className={inputClass}
            />
          </div>

          {/* Telefone */}
          <div>
            <label className={labelClass}>Telefone (WhatsApp) *</label>
            <input
              type="tel"
              required
              value={form.telefone}
              onChange={(e) => set('telefone', e.target.value)}
              placeholder="(11) 99999-9999"
              className={inputClass}
            />
          </div>

          {/* Cidade e bairro */}
          <div>
            <label className={labelClass}>Cidade e bairro *</label>
            <input
              type="text"
              required
              value={form.cidadeBairro}
              onChange={(e) => set('cidadeBairro', e.target.value)}
              placeholder="Ex: São Paulo — Moema"
              className={inputClass}
            />
          </div>

          {/* Disciplinas */}
          <div>
            <label className={labelClass}>Disciplinas que leciona *</label>
            <input
              type="text"
              required
              value={form.disciplinas}
              onChange={(e) => set('disciplinas', e.target.value)}
              placeholder="Ex: Matemática e Física"
              className={inputClass}
            />
          </div>

          {/* Segmentos */}
          <div>
            <label className={labelClass}>Segmentos em que atua *</label>
            <div className="flex flex-wrap gap-3 mt-2">
              {SEGMENTOS.map((seg) => (
                <label key={seg} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.segmentos.includes(seg)}
                    onChange={() => toggleSegmento(seg)}
                    className="w-4 h-4 accent-gold"
                  />
                  <span className="text-sm text-gray-700 font-medium">{seg}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Experiência */}
          <div>
            <label className={labelClass}>Anos de experiência total *</label>
            <select
              required
              value={form.experiencia}
              onChange={(e) => set('experiencia', e.target.value)}
              className={`${inputClass} bg-white`}
            >
              <option value="">Selecione</option>
              <option value="menos-1">Menos de 1 ano</option>
              <option value="1-3">1 a 3 anos</option>
              <option value="3-7">3 a 7 anos</option>
              <option value="7-15">7 a 15 anos</option>
              <option value="mais-15">Mais de 15 anos</option>
            </select>
          </div>

          {/* Escolas */}
          <div>
            <label className={labelClass}>Escolas onde trabalhou/trabalha *</label>
            <textarea
              required
              rows={4}
              value={form.escolas}
              onChange={(e) => set('escolas', e.target.value)}
              placeholder="Liste as escolas onde trabalhou ou trabalha atualmente. Indique qual é a atual. Exemplo: Colégio X — Matemática (atual), Escola Y — Matemática e Física"
              className={inputClass}
            />
            <p className={hintClass}>
              Indique a escola atual e o período em cada uma.
            </p>
          </div>

          {/* Formação */}
          <div>
            <label className={labelClass}>Formação acadêmica *</label>
            <textarea
              required
              rows={3}
              value={form.formacao}
              onChange={(e) => set('formacao', e.target.value)}
              placeholder="Curso, área e instituição. Ex: Licenciatura em Matemática — USP"
              className={inputClass}
            />
          </div>

          {/* Cursos */}
          <div>
            <label className={labelClass}>Cursos e formação continuada relevantes</label>
            <textarea
              rows={3}
              value={form.cursosRelevantes}
              onChange={(e) => set('cursosRelevantes', e.target.value)}
              placeholder="Ex: Curso de Metodologias Ativas — Instituto X (2023)"
              className={inputClass}
            />
            <p className={hintClass}>Opcional — inclua cursos, workshops e certificações relevantes.</p>
          </div>

          <button
            type="submit"
            className="w-full bg-gold hover:bg-yellow-600 text-white font-bold px-6 py-4 rounded-lg text-lg transition-colors"
          >
            Próximo — Etapa 2 →
          </button>
        </form>
      )}

      {/* BLOCO 2 */}
      {step === 2 && (
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <h2 className="text-xl font-bold text-navy mb-2">Perguntas situacionais</h2>
            <p className="text-sm text-gray-600 bg-blue-50 border border-blue-100 rounded-lg p-4 leading-relaxed">
              Responda com suas próprias palavras. Não existe resposta certa ou errada — queremos
              entender como você pensa e age. Suas respostas alimentam a seção de{' '}
              <strong>Qualificações</strong> do currículo, transformadas em linguagem
              técnico-pedagógica profissional.
            </p>
          </div>

          {/* Q1 */}
          <div>
            <label className={labelClass}>
              1. Preparação de sequência didática
            </label>
            <textarea
              required
              rows={6}
              value={form.q1PraticaPedagogica}
              onChange={(e) => set('q1PraticaPedagogica', e.target.value)}
              placeholder="Você está preparando uma sequência didática sobre um tema complexo que nunca trabalhou antes. Descreva passo a passo como você faz isso — desde o momento em que recebe o conteúdo até concluir o tema com a turma."
              className={inputClass}
            />
          </div>

          {/* Q2 */}
          <div>
            <label className={labelClass}>
              2. Turma desafiadora
            </label>
            <textarea
              required
              rows={6}
              value={form.q2GestaoEmocional}
              onChange={(e) => set('q2GestaoEmocional', e.target.value)}
              placeholder="Você está com uma turma muito desafiadora, que tira todos os professores do eixo. Você preparou a aula, está tentando metodologias diferentes e nada funciona. A turma continua te irritando e você está prestes a perder a cabeça. Qual caminho você trilha para concluir o que foi planejado?"
              className={inputClass}
            />
          </div>

          {/* Q3 */}
          <div>
            <label className={labelClass}>
              3. Situação de vulnerabilidade
            </label>
            <textarea
              required
              rows={6}
              value={form.q3Salvaguarda}
              onChange={(e) => set('q3Salvaguarda', e.target.value)}
              placeholder="Uma aluna te procura discretamente na saída da aula e conta algo sobre a situação em casa que te deixa preocupado. O que você faz a partir daí?"
              className={inputClass}
            />
          </div>

          {/* Q4 */}
          <div>
            <label className={labelClass}>
              4. Projeto além da sua disciplina
            </label>
            <textarea
              required
              rows={6}
              value={form.q4Interdisciplinaridade}
              onChange={(e) => set('q4Interdisciplinaridade', e.target.value)}
              placeholder="Conta um projeto ou atividade que você desenvolveu que foi além da sua disciplina — que envolveu outros professores, outras matérias ou que saiu da sala de aula."
              className={inputClass}
            />
          </div>

          {/* Q5 */}
          <div>
            <label className={labelClass}>
              5. Comportamento fora do padrão
            </label>
            <textarea
              required
              rows={6}
              value={form.q5Socioemocionais}
              onChange={(e) => set('q5Socioemocionais', e.target.value)}
              placeholder="Você percebeu que um estudante passou a ter um comportamento desequilibrado para sua faixa etária. Qual seu processo de intervenção para assegurar a aprendizagem e o bem-estar desse aluno?"
              className={inputClass}
            />
          </div>

          {status === 'error' && (
            <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{errorMsg}</p>
          )}

          {/* Consentimento LGPD — obrigatório */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Consentimento (obrigatório)</p>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="consentimento_dados"
                required
                className="mt-1 h-4 w-4 rounded border-gray-300 text-gold focus:ring-gold flex-shrink-0"
              />
              <span className="text-sm text-gray-700 leading-relaxed">
                Concordo com o tratamento dos meus dados pessoais pela <strong>CACFL Educacional (CNPJ 50.939.805/0001-73)</strong> para fins de geração do currículo profissional solicitado, conforme a{' '}
                <a href="/privacidade" target="_blank" className="text-gold underline hover:text-yellow-700">Política de Privacidade</a>.
                Os dados serão utilizados exclusivamente para este fim e não serão compartilhados com terceiros sem meu consentimento.
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="consentimento_comunicacao"
                className="mt-1 h-4 w-4 rounded border-gray-300 text-gold focus:ring-gold flex-shrink-0"
              />
              <span className="text-sm text-gray-700 leading-relaxed">
                <strong>(Opcional)</strong> Aceito receber conteúdo relevante sobre carreira profissional docente, legislação educacional e novidades da plataforma Excellentia por e-mail. Posso cancelar a qualquer momento.
              </span>
            </label>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => { setStep(1); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              className="flex-none border border-gray-300 text-gray-600 font-semibold px-5 py-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              ← Voltar
            </button>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="flex-1 bg-gold hover:bg-yellow-600 disabled:opacity-60 text-white font-bold px-6 py-4 rounded-lg text-lg transition-colors"
            >
              {status === 'loading' ? 'Enviando...' : 'Enviar e aguardar meu currículo →'}
            </button>
          </div>

          <p className="text-center text-xs text-gray-400">
            🔒 Seus dados são protegidos pela LGPD (Lei 13.709/2018) e nunca serão vendidos ou compartilhados sem seu consentimento.
          </p>
        </form>
      )}
    </div>
  )
}
