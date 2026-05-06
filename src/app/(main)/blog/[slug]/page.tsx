import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const posts: Record<string, {
  title: string
  date: string
  readTime: string
  category: string
  content: string
}> = {
  'como-se-preparar-para-processos-seletivos': {
    title: 'Como se preparar para processos seletivos em escolas particulares',
    date: '15 de março de 2026',
    readTime: '8 min',
    category: 'Carreira',
    content: `
## Por que a maioria dos professores falha no processo seletivo

Depois de 17 anos na rede privada de São Paulo, participando de dezenas de processos seletivos como candidato e como avaliador, posso afirmar com segurança: a maioria dos professores que não passa não falha por falta de conhecimento. Falha por falta de preparo.

O processo seletivo de uma escola particular tem etapas muito específicas — e cada uma exige uma preparação diferente. Vou te mostrar o que funciona em cada uma delas.

## Etapa 1: O Currículo

O currículo do professor tem peculiaridades que a maioria ignora:

**O que as escolas realmente querem ver:**
- Formação e especializações (mas sem encherem de cursos irrelevantes)
- Experiência docente com detalhes: série, disciplina, carga horária
- Experiência com sistemas/metodologias específicos (Saber, Objetivo, bilíngue, etc.)
- Projetos pedagógicos que você coordenou ou participou

**O que derruba currículos antes da entrevista:**
- Objetivo vago ("Atuar como professor") — seja específico
- Foto inadequada (informal, selfie, sem profissionalismo)
- Mais de 2 páginas sem necessidade
- Erros de português — isso é eliminatório para professor

## Etapa 2: A Entrevista

A entrevista em escola particular costuma ter dois momentos:
1. RH/Psicólogo: fit cultural, estabilidade, histórico
2. Coordenação Pedagógica: competências técnicas

**Perguntas que sempre aparecem — e como responder:**

*"Por que você quer trabalhar conosco?"*
Pesquise o projeto pedagógico da escola. Conecte sua trajetória com os valores deles. Nunca responda "porque é perto de casa".

*"Como você lida com alunos difíceis?"*
Tenha um caso real preparado. Situação + sua ação + resultado. Sem romantizar nem catastrofizar.

*"Qual sua metodologia?"*
Seja específico. "Uso metodologias ativas" não diz nada. Fale de como você organiza uma sequência didática, como avalia, como recupera alunos.

## Etapa 3: A Aula Teste

A aula teste é onde mais professores capacitados perdem. Por quê? Porque ensinam, quando deveriam ensinar E mostrar que ensinam.

**Os 3 erros mais comuns:**
1. Começar sem apresentar o planejamento
2. Focar no conteúdo e esquecer a relação com os "alunos" (que são avaliadores)
3. Não fazer check de compreensão

**O que funciona:**
- Entregar um plano de aula escrito antes de começar
- Abrir com uma questão ou problema — não com definição
- Usar ao menos uma técnica de aprendizagem ativa
- Fechar com resumo do que foi aprendido

---

*Quer suporte personalizado para seu próximo processo seletivo? Acesse a Excellentia e veja nosso curso de Gestão de Carreira.*
    `,
  },
  'nr1-nas-escolas': {
    title: 'NR1 nas escolas: o que todo gestor escolar precisa saber',
    date: '8 de março de 2026',
    readTime: '6 min',
    category: 'Direitos',
    content: `
## O que é a NR1 e por que ela afeta as escolas

A Norma Regulamentadora nº 1 (NR1) do Ministério do Trabalho e Previdência foi atualizada em 2024 para incluir, de forma explícita, a gestão de riscos psicossociais no Programa de Gerenciamento de Riscos (PGR) das empresas. Isso inclui escolas — e a maioria ainda não está preparada.

A vigência para gestão de riscos psicossociais começou em 25 de maio de 2025. O prazo acabou. Se sua escola não está adequada, está em descumprimento legal.

## O que são riscos psicossociais?

São fatores do trabalho que podem causar dano à saúde mental e emocional dos trabalhadores. No contexto escolar, os mais comuns são:

- **Sobrecarga de trabalho**: carga horária excessiva, preparação fora do horário contratado
- **Falta de autonomia**: professores sem espaço para tomada de decisão pedagógica
- **Conflitos interpessoais**: com equipe, coordenação ou famílias de alunos
- **Assédio moral**: pressão desmedida, humilhação, isolamento
- **Violência**: agressões físicas ou verbais de alunos
- **Burnout**: esgotamento crônico — endemia entre professores

## O que a escola precisa fazer

A NR1 exige que a escola:

### 1. Identifique os riscos
Através de questionários, entrevistas e grupos focais com os trabalhadores (incluindo professores). Não é opcional — é obrigatório documentar.

### 2. Avalie a gravidade
Cada risco identificado deve ser avaliado quanto à probabilidade de ocorrência e severidade do dano.

### 3. Implemente controles
Para cada risco avaliado, a escola precisa de medidas concretas:
- Ajuste de carga horária
- Políticas claras de comunicação
- Canal de denúncias anônimas
- Suporte psicológico aos docentes

### 4. Monitore e revise
O PGR não é um documento que se faz uma vez. Precisa ser revisado periodicamente e sempre que houver mudança significativa no ambiente de trabalho.

## Quais as penalidades pelo descumprimento?

Multas que variam de R$668,18 a R$6.681,82 por infração, com possibilidade de multiplicação conforme o número de empregados afetados. Em casos graves, pode haver interdição de setores ou do estabelecimento.

Além disso, professores com diagnóstico de burnout reconhecido como doença do trabalho têm direito a estabilidade e todos os benefícios previdenciários — o que gera passivo trabalhista significativo para a escola.

## Para professores: o que isso muda na prática?

A NR1 dá respaldo legal para que você exija:
- Condições de trabalho adequadas
- Respostas formais a denúncias de sobrecarga
- Suporte em caso de violência ou assédio

Se sua escola não tem PGR atualizado com riscos psicossociais, você tem base legal para exigir adequação junto ao RH ou, em último caso, ao Ministério do Trabalho.

---

*Quer aprofundar seu conhecimento sobre direitos docentes? Acesse o módulo de Direitos na Excellentia.*
    `,
  },
}

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const post = posts[resolvedParams.slug]
  if (!post) return { title: 'Post não encontrado — Excellentia' }
  return {
    title: `${post.title} — Excellentia Blog`,
    description: post.content.slice(0, 160).replace(/[#*\n]/g, ' ').trim(),
  }
}

function renderMarkdown(content: string) {
  const lines = content.trim().split('\n')
  return lines.map((line, i) => {
    if (line.startsWith('## ')) {
      return <h2 key={i} className="text-2xl font-bold text-navy mt-10 mb-4">{line.slice(3)}</h2>
    }
    if (line.startsWith('### ')) {
      return <h3 key={i} className="text-xl font-bold text-navy mt-8 mb-3">{line.slice(4)}</h3>
    }
    if (line.startsWith('**') && line.endsWith('**')) {
      return <p key={i} className="font-semibold text-navy mb-2">{line.slice(2, -2)}</p>
    }
    if (line.startsWith('- ')) {
      return <li key={i} className="text-gray-700 mb-1 ml-4">{line.slice(2)}</li>
    }
    if (line.startsWith('*') && line.endsWith('*')) {
      return <p key={i} className="text-gray-500 italic border-l-4 border-gold pl-4 mt-6">{line.slice(1, -1)}</p>
    }
    if (line === '') {
      return <br key={i} />
    }
    return <p key={i} className="text-gray-700 leading-relaxed mb-4">{line}</p>
  })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = posts[resolvedParams.slug]
  if (!post) notFound()

  return (
    <>
      {/* Header */}
      <section className="bg-navy text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-gold text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              {post.category}
            </span>
            <span className="text-gray-400 text-sm">{post.date}</span>
            <span className="text-gray-400 text-sm">· {post.readTime} de leitura</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold">{post.title}</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {renderMarkdown(post.content)}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-navy text-white rounded-2xl p-8 text-center">
              <p className="text-gray-300 mb-4">
                Gostou do conteúdo? Acesse todos os cursos da Excellentia por R$69/mês.
              </p>
              <Link
                href="/assinatura"
                className="bg-gold hover:bg-yellow-600 text-white font-bold px-8 py-3 rounded-lg transition-colors inline-block"
              >
                Assinar agora
              </Link>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/blog"
              className="text-gold hover:text-gold-dark font-semibold transition-colors inline-flex items-center gap-1"
            >
              <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              Voltar para o blog
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
