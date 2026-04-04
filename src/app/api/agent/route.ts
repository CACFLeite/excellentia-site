import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import fs from 'fs'
import path from 'path'

// Carrega a base de conhecimento na inicialização
function loadKnowledgeBase(): string {
  const knowledgeDir = path.join(process.cwd(), '..', 'excellentia-app', 'agent-knowledge')
  
  const files = [
    'bncc-competencias.md',
    'taxonomia-bloom.md',
    'adaptacoes-neurodivergencia.md',
    'rubricas-modelos.md',
    'planejamento-modelos.md',
  ]

  let knowledge = ''
  for (const file of files) {
    const filePath = path.join(knowledgeDir, file)
    if (fs.existsSync(filePath)) {
      knowledge += `\n\n### ${file.replace('.md', '').toUpperCase()} ###\n`
      knowledge += fs.readFileSync(filePath, 'utf-8')
    }
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

${KNOWLEDGE_BASE}

---

Responda sempre em português brasileiro. Seja um parceiro pedagógico real — não um gerador de texto genérico.`

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

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Chave da API não configurada' },
        { status: 500 }
      )
    }

    const anthropic = new Anthropic({ apiKey })

    // Monta a mensagem com contexto do professor
    let userMessage = message
    if (context && (context.discipline || context.grade || context.topic)) {
      const contextParts = []
      if (context.discipline) contextParts.push(`Disciplina: ${context.discipline}`)
      if (context.grade) contextParts.push(`Série: ${context.grade}`)
      if (context.topic) contextParts.push(`Tema/Conteúdo: ${context.topic}`)

      if (contextParts.length > 0) {
        userMessage = `[Contexto: ${contextParts.join(' | ')}]\n\n${message}`
      }
    }

    // Monta o histórico de mensagens
    const messages: Array<{ role: 'user' | 'assistant'; content: string }> = []

    if (history && history.length > 0) {
      // Limita o histórico a 10 mensagens para controlar custos
      const recentHistory = history.slice(-10)
      messages.push(...recentHistory)
    }

    messages.push({ role: 'user', content: userMessage })

    // Decide o modelo: Haiku para interações simples, Sonnet para complexas
    const isComplexRequest =
      message.length > 500 ||
      message.toLowerCase().includes('planejamento') ||
      message.toLowerCase().includes('sequência didática') ||
      message.toLowerCase().includes('rubrica completa') ||
      message.toLowerCase().includes('adaptar material completo')

    const model = isComplexRequest
      ? 'claude-sonnet-4-5'
      : 'claude-haiku-4-5'

    const response = await anthropic.messages.create({
      model,
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages,
    })

    const assistantMessage =
      response.content[0].type === 'text' ? response.content[0].text : ''

    return NextResponse.json({
      message: assistantMessage,
      model,
      usage: {
        input_tokens: response.usage.input_tokens,
        output_tokens: response.usage.output_tokens,
      },
    })
  } catch (error) {
    console.error('Erro no Agente Educacional:', error)

    if (error instanceof Anthropic.APIError) {
      return NextResponse.json(
        { error: `Erro na API: ${error.message}` },
        { status: error.status || 500 }
      )
    }

    return NextResponse.json(
      { error: 'Erro interno no servidor. Tente novamente em instantes.' },
      { status: 500 }
    )
  }
}
