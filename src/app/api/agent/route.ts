import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

type ChatMessage = { role: 'user' | 'assistant' | 'system'; content: string }

// Carrega a base de conhecimento na inicialização
function loadKnowledgeBase(): string {
  const candidateDirs = [
    path.join(process.cwd(), 'agent-knowledge'),
    path.join(process.cwd(), '..', 'excellentia-app', 'agent-knowledge'),
  ]

  const files = [
    'bncc-competencias.md',
    'taxonomia-bloom.md',
    'adaptacoes-neurodivergencia.md',
    'rubricas-modelos.md',
    'planejamento-modelos.md',
  ]

  let knowledge = ''
  for (const knowledgeDir of candidateDirs) {
    for (const file of files) {
      const filePath = path.join(knowledgeDir, file)
      if (fs.existsSync(filePath)) {
        knowledge += `\n\n### ${file.replace('.md', '').toUpperCase()} ###\n`
        knowledge += fs.readFileSync(filePath, 'utf-8')
      }
    }
    if (knowledge.trim()) break
  }

  return knowledge
}

const KNOWLEDGE_BASE = loadKnowledgeBase()

const SYSTEM_PROMPT = `Você é o Agente Educacional da Excellentia — uma plataforma criada por professores para professores.

Você foi desenvolvido para ajudar professores da educação básica brasileira com tarefas práticas do dia a dia pedagógico. Seu diferencial é trabalhar com conhecimento pedagógico real e fundamentado — não teoria vaga, não promessas, não invenção.

## Sua missão

Você ajuda professores a:
1. **Adaptar materiais** para alunos neurodivergentes (TDAH, TOD, TOC, dislexia, discalculia)
2. **Criar planejamentos** alinhados com a BNCC (com habilidades e competências corretas)
3. **Elaborar rubricas** de avaliação (quantitativas e qualitativas)
4. **Gerar atividades e exercícios** com qualidade pedagógica real
5. **Tirar dúvidas pedagógicas** com base em fundamentos legais e didáticos

## Como você opera

- Você trabalha dentro do escopo da sua base de conhecimento
- Se não tem a informação no seu repertório, diz claramente: "Não tenho essa informação no meu repertório. Recomendo consultar [fonte específica]."
- Você NUNCA inventa dados, habilidades BNCC, leis ou procedimentos
- Você trabalha com o tema/conteúdo informado pelo professor — não exige que ele envie o material completo
- Você é prático: entrega material utilizável, não teoria abstrata

## Diretrizes de resposta

- Seja direto e prático — o professor precisa do material para usar amanhã
- Use linguagem clara, sem academicismo desnecessário
- Quando gerar planejamentos, inclua habilidade BNCC, objetivo de Bloom e metodologia
- Quando adaptar materiais, especifique a neurodivergência e o tipo de adaptação
- Quando criar rubricas, deixe os critérios observáveis e mensuráveis
- Se o professor der pouco contexto, use o que tem e ao final pergunte se quer refinamentos

## O que você NÃO faz

- Não dá diagnóstico de transtornos (isso é função de profissional clínico)
- Não promete resultados ("se fizer isso, o aluno vai aprender")
- Não substitui o julgamento pedagógico do professor
- Não inventa habilidades ou competências que não existem na BNCC
- Não age como coach motivacional

## Contexto do professor (quando informado)

O professor pode informar disciplina, série e tema. Use esse contexto para personalizar as respostas. Se não for informado, pergunte de forma direta e objetiva.

---

## BASE DE CONHECIMENTO

A seguir está sua base de conhecimento com informações sobre BNCC, Taxonomia de Bloom, adaptações para neurodivergentes, modelos de rubrica e planejamento:

${KNOWLEDGE_BASE || 'Base local não encontrada nesta implantação. Responda com cautela e peça validação quando a pergunta depender de repertório específico.'}

---

Responda sempre em português brasileiro. Seja um parceiro pedagógico real — não um gerador de texto genérico.`

function buildUserMessage(message: string, context?: { discipline?: string; grade?: string; topic?: string }) {
  if (!context || !(context.discipline || context.grade || context.topic)) return message

  const contextParts = []
  if (context.discipline) contextParts.push(`Disciplina: ${context.discipline}`)
  if (context.grade) contextParts.push(`Série: ${context.grade}`)
  if (context.topic) contextParts.push(`Tema/Conteúdo: ${context.topic}`)

  return `[Contexto: ${contextParts.join(' | ')}]\n\n${message}`
}

function extractAssistantMessage(data: unknown): string | null {
  if (!data || typeof data !== 'object') return null
  const obj = data as Record<string, any>

  if (typeof obj.message === 'string') return obj.message
  if (typeof obj.text === 'string') return obj.text
  if (typeof obj.output === 'string') return obj.output
  if (typeof obj.response === 'string') return obj.response

  const choiceContent = obj.choices?.[0]?.message?.content
  if (typeof choiceContent === 'string') return choiceContent

  const contentText = obj.content?.[0]?.text
  if (typeof contentText === 'string') return contentText

  return null
}

async function runCodexOAuthChat(messages: ChatMessage[]) {
  const endpoint = process.env.OPENCLAW_CODEX_CHAT_ENDPOINT || process.env.OPENCLAW_LLM_TASK_ENDPOINT
  const token = process.env.OPENCLAW_CODEX_CHAT_TOKEN || process.env.OPENCLAW_LLM_TASK_TOKEN

  if (!endpoint) {
    return {
      ok: false as const,
      status: 503,
      error: 'Agente educacional não configurado. O Excellentia usa o caminho ChatGPT/Codex OAuth via OpenClaw; configure OPENCLAW_CODEX_CHAT_ENDPOINT para habilitar esta rota em produção.',
    }
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      model: process.env.OPENCLAW_CODEX_MODEL || 'openai-codex/gpt-5.5',
      system: SYSTEM_PROMPT,
      messages,
      max_tokens: 2048,
      temperature: 0.2,
    }),
  })

  const raw = await response.text()
  let data: unknown = null
  try {
    data = raw ? JSON.parse(raw) : null
  } catch {
    data = { text: raw }
  }

  if (!response.ok) {
    return {
      ok: false as const,
      status: response.status,
      error: `Falha no provedor ChatGPT/Codex OAuth: ${raw.slice(0, 500)}`,
    }
  }

  const assistantMessage = extractAssistantMessage(data)
  if (!assistantMessage) {
    return {
      ok: false as const,
      status: 502,
      error: 'Resposta inválida do provedor ChatGPT/Codex OAuth.',
    }
  }

  return {
    ok: true as const,
    message: assistantMessage,
    raw: data,
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { message, context, history } = body as {
      message: string
      context?: {
        discipline?: string
        grade?: string
        topic?: string
      }
      history?: Array<{ role: 'user' | 'assistant'; content: string }>
    }

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Mensagem não pode ser vazia' },
        { status: 400 }
      )
    }

    const userMessage = buildUserMessage(message, context)
    const messages: ChatMessage[] = []

    if (history && history.length > 0) {
      const recentHistory = history.slice(-10)
      messages.push(...recentHistory.map((item) => ({ role: item.role, content: item.content })))
    }

    messages.push({ role: 'user', content: userMessage })

    const result = await runCodexOAuthChat(messages)
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status })
    }

    return NextResponse.json({
      message: result.message,
      model: process.env.OPENCLAW_CODEX_MODEL || 'openai-codex/gpt-5.5',
      provider: 'openclaw-codex-oauth',
    })
  } catch (error) {
    console.error('Erro no Agente Educacional:', error)
    return NextResponse.json(
      { error: 'Erro interno no servidor. Tente novamente em instantes.' },
      { status: 500 }
    )
  }
}
