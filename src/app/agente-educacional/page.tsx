'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface AgentContext {
  discipline: string
  grade: string
  topic: string
}

export default function AgenteEducacional() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Olá! Sou o **Agente Educacional da Excellentia**. Posso ajudar você com:\n\n• Adaptações de material para alunos neurodivergentes (TDAH, TOD, TOC, dislexia, discalculia)\n• Planejamentos alinhados com a BNCC\n• Rubricas de avaliação (quantitativas e qualitativas)\n• Atividades e exercícios com qualidade pedagógica real\n\nSe quiser, informe a disciplina, série e tema nos campos ao lado — mas pode começar direto pela pergunta também!',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [context, setContext] = useState<AgentContext>({
    discipline: '',
    grade: '',
    topic: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showContext, setShowContext] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const formatMessage = (content: string) => {
    // Converte markdown básico para HTML
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^• /gm, '• ')
      .replace(/\n/g, '<br/>')
  }

  const sendMessage = async () => {
    const trimmedInput = input.trim()
    if (!trimmedInput || isLoading) return

    const userMessage: Message = {
      role: 'user',
      content: trimmedInput,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Prepara histórico (sem a mensagem de boas-vindas inicial)
    const history = messages
      .slice(1)
      .map((m) => ({ role: m.role, content: m.content }))

    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmedInput,
          context: {
            discipline: context.discipline || undefined,
            grade: context.grade || undefined,
            topic: context.topic || undefined,
          },
          history,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao processar sua solicitação')
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      const errorMessage: Message = {
        role: 'assistant',
        content:
          'Desculpe, ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
      console.error('Erro:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content:
          'Conversa reiniciada. Como posso ajudar você agora?',
        timestamp: new Date(),
      },
    ])
  }

  const quickPrompts = [
    'Crie uma atividade sobre a Revolução Francesa para o 9º ano',
    'Como adaptar uma prova de Matemática para aluno com dislexia?',
    'Elabore uma rubrica para avaliação de redação no EM',
    'Monte um planejamento de Ciências para 7º ano sobre ecossistemas',
    'Quais adaptações fazer para aluno com TDAH em aula expositiva?',
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
            ← Voltar
          </a>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#2A6049] rounded-full flex items-center justify-center text-white text-sm font-bold">
              AE
            </div>
            <div>
              <h1 className="text-sm font-semibold text-gray-900">
                Agente Educacional
              </h1>
              <p className="text-xs text-gray-500">Excellentia</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowContext(!showContext)}
            className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded border border-gray-200 transition-colors"
          >
            {showContext ? 'Ocultar contexto' : 'Mostrar contexto'}
          </button>
          <button
            onClick={clearChat}
            className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded border border-gray-200 transition-colors"
          >
            Nova conversa
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden max-w-6xl mx-auto w-full">
        {/* Sidebar com contexto */}
        {showContext && (
          <aside className="w-64 bg-white border-r border-gray-200 flex flex-col p-4 gap-4 shrink-0">
            <div>
              <h2 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">
                Contexto da aula
              </h2>
              <p className="text-xs text-gray-500 mb-3">
                Opcional — mas ajuda o agente a personalizar as respostas.
              </p>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Disciplina
                  </label>
                  <input
                    type="text"
                    value={context.discipline}
                    onChange={(e) =>
                      setContext((prev) => ({ ...prev, discipline: e.target.value }))
                    }
                    placeholder="Ex: Matemática, História..."
                    className="w-full text-sm border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2A6049] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Série / Ano
                  </label>
                  <select
                    value={context.grade}
                    onChange={(e) =>
                      setContext((prev) => ({ ...prev, grade: e.target.value }))
                    }
                    className="w-full text-sm border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2A6049] focus:border-transparent bg-white"
                  >
                    <option value="">Selecione...</option>
                    <optgroup label="Ensino Fundamental I">
                      <option value="1º ano EF">1º ano</option>
                      <option value="2º ano EF">2º ano</option>
                      <option value="3º ano EF">3º ano</option>
                      <option value="4º ano EF">4º ano</option>
                      <option value="5º ano EF">5º ano</option>
                    </optgroup>
                    <optgroup label="Ensino Fundamental II">
                      <option value="6º ano EF">6º ano</option>
                      <option value="7º ano EF">7º ano</option>
                      <option value="8º ano EF">8º ano</option>
                      <option value="9º ano EF">9º ano</option>
                    </optgroup>
                    <optgroup label="Ensino Médio">
                      <option value="1ª série EM">1ª série</option>
                      <option value="2ª série EM">2ª série</option>
                      <option value="3ª série EM">3ª série</option>
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Tema / Conteúdo
                  </label>
                  <input
                    type="text"
                    value={context.topic}
                    onChange={(e) =>
                      setContext((prev) => ({ ...prev, topic: e.target.value }))
                    }
                    placeholder="Ex: Revolução Industrial, Equações..."
                    className="w-full text-sm border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2A6049] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                Sugestões
              </h2>
              <div className="space-y-1">
                {quickPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(prompt)}
                    className="w-full text-left text-xs text-gray-600 hover:text-[#2A6049] hover:bg-green-50 px-2 py-1.5 rounded transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400 leading-relaxed">
                Agente treinado com BNCC, Taxonomia de Bloom e práticas pedagógicas inclusivas. Não substitui julgamento pedagógico do professor.
              </p>
            </div>
          </aside>
        )}

        {/* Área de chat */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Mensagens */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 bg-[#2A6049] rounded-full flex items-center justify-center text-white text-xs font-bold mr-2 mt-1 shrink-0">
                    AE
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-[#2A6049] text-white rounded-tr-sm'
                      : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm shadow-sm'
                  }`}
                >
                  <div
                    className={`text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user' ? 'text-white' : 'text-gray-800'
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: formatMessage(msg.content),
                    }}
                  />
                  <p
                    className={`text-xs mt-1 ${
                      msg.role === 'user' ? 'text-green-200' : 'text-gray-400'
                    }`}
                  >
                    {msg.timestamp.toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                {msg.role === 'user' && (
                  <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-xs font-bold ml-2 mt-1 shrink-0">
                    P
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="w-7 h-7 bg-[#2A6049] rounded-full flex items-center justify-center text-white text-xs font-bold mr-2 mt-1 shrink-0">
                  AE
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 bg-white p-4">
            <div className="flex items-end gap-2">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Digite sua pergunta ou solicitação... (Enter para enviar, Shift+Enter para nova linha)"
                rows={3}
                className="flex-1 text-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2A6049] focus:border-transparent resize-none"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="bg-[#2A6049] text-white rounded-xl px-4 py-3 font-medium text-sm hover:bg-[#1e4434] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0 h-[76px] flex items-center justify-center"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              O agente trabalha dentro de seu repertório treinado — não inventa informações pedagógicas.
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}
