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

  'riscos-psicossociais-escolas': {
    title: 'Riscos psicossociais nas escolas: por onde a governança começa',
    date: '9 de maio de 2026',
    readTime: '7 min',
    category: 'Governança',
    content: `
## O problema não é apenas cumprir uma norma

Riscos psicossociais entraram com força na agenda das escolas porque a rotina escolar reúne pressão emocional, sobrecarga, conflitos com famílias, violência, assédio, adoecimento docente e falhas de comunicação institucional.

Mas tratar o tema como uma corrida para “cumprir NR-1” reduz o problema. A escola precisa construir uma leitura permanente de risco: o que acontece na rotina, como os adultos são afetados, quais sinais aparecem, quais respostas existem e que evidências mostram esforço real de gestão.

## O que a escola precisa organizar

- Critérios para identificar riscos psicossociais sem transformar cada relato em diagnóstico clínico
- Registros de ações formativas e preventivas
- Fluxos de comunicação e acolhimento
- Responsabilidades entre direção, coordenação, RH, jurídico e SST
- Revisão periódica das medidas adotadas

## Como a Excellentia entra

A Excellentia deve funcionar como camada de formação, evidência e inteligência: ajuda a escola a formar equipes, registrar participação, amadurecer a linguagem institucional e transformar obrigações em rotina compreensível.

Não substitui avaliação técnica especializada quando ela for necessária. Também não promete eliminar risco. A promessa correta é reduzir improviso e aumentar maturidade institucional.
    `,
  },
  'pgr-gro-governanca-escolar': {
    title: 'PGR/GRO na escola: documento técnico ou instrumento de governança?',
    date: '9 de maio de 2026',
    readTime: '6 min',
    category: 'Compliance',
    content: `
## O PGR não deveria ser um arquivo esquecido

Em muitas escolas, documentos de segurança e saúde ocupacional existem apenas para responder a uma exigência formal. O problema é que um documento isolado não muda conduta, não forma equipe e não cria evidência de gestão cotidiana.

O PGR/GRO ganha valor quando conversa com o calendário, com as formações, com os registros, com os responsáveis internos e com a leitura de riscos reais da escola.

## Governança prática

Uma escola madura precisa saber:

- quem acompanha cada frente de risco;
- quais formações foram realizadas;
- que evidências foram produzidas;
- quais lacunas permanecem abertas;
- quando revisar medidas e documentos.

## Onde a plataforma ajuda

A Excellentia não transforma automaticamente um documento técnico em conformidade. Ela cria uma camada operacional para que formação, evidência e acompanhamento deixem de ficar dispersos.
    `,
  },
  'lei-lucas-protocolo-evidencias': {
    title: 'Lei Lucas: protocolo, evidência e o limite da formação online',
    date: '9 de maio de 2026',
    readTime: '7 min',
    category: 'Segurança',
    content: `
## O cuidado começa antes da emergência

A Lei Lucas colocou os primeiros socorros no centro da responsabilidade escolar. Mas a resposta institucional não pode ser apenas chamar alguém uma vez por ano e arquivar uma lista de presença.

A escola precisa preparar adultos, organizar protocolos, registrar treinamentos, preservar evidências e saber o que fazer antes, durante e depois de uma ocorrência.

## O limite importante

Formação online não substitui prática presencial de primeiros socorros quando ela é exigida ou necessária. A prática com instrutor, simulação e correção técnica continua indispensável.

O papel correto da camada digital é outro: preparar, alinhar linguagem, orientar protocolos, documentar participação e manter continuidade entre ciclos presenciais.

## Evidência também é proteção

Quando algo acontece, a escola precisa demonstrar que não improvisou: havia orientação, rotina, responsáveis, registros e cultura preventiva em construção.
    `,
  },
  'lgpd-escolar-privacidade': {
    title: 'LGPD escolar: privacidade, titulares e rotina administrativa',
    date: '9 de maio de 2026',
    readTime: '6 min',
    category: 'LGPD',
    content: `
## Escola trata dados sensíveis todos os dias

Dados de alunos, famílias, colaboradores, saúde, desempenho, comportamento, imagem, comunicação e documentação administrativa circulam o tempo todo dentro de uma escola.

A LGPD escolar não pode ser reduzida a um aviso de privacidade no site. Ela exige rotina: quem acessa, por quê, por quanto tempo, como responde, como registra e como evita exposição indevida.

## Pontos que costumam gerar risco

- compartilhamento informal de documentos;
- uso de imagem de alunos;
- grupos de mensagem sem critério;
- dados de saúde e atendimento especializado;
- solicitações de pais, responsáveis ou titulares;
- contratos com plataformas terceiras.

## O papel da governança

A Excellentia ajuda a transformar privacidade em formação e processo. A escola precisa que equipe administrativa, coordenação e professores entendam condutas básicas e saibam encaminhar situações sensíveis.
    `,
  },
  'bullying-cyberbullying-violencia-escolar': {
    title: 'Bullying e cyberbullying: quando convivência vira governança',
    date: '9 de maio de 2026',
    readTime: '8 min',
    category: 'Proteção escolar',
    content: `
## Não é apenas um problema disciplinar

Bullying, cyberbullying e violência escolar envolvem proteção de crianças e adolescentes, comunicação com famílias, documentação, atuação pedagógica, limites jurídicos e cuidado com exposição indevida.

Quando a escola responde caso a caso, sem protocolo, aumenta o risco de omissão, exagero, revitimização ou comunicação contraditória.

## O que precisa estar estruturado

- critérios mínimos para registro;
- fluxo de escuta e encaminhamento;
- papéis de professores, coordenação e direção;
- comunicação responsável com famílias;
- proteção contra exposição pública;
- medidas pedagógicas e disciplinares proporcionais;
- revisão do ambiente e prevenção.

## Por que isso é inteligência educacional

A escola precisa aprender com padrões recorrentes sem transformar casos concretos em espetáculo. Governança aqui significa criar memória institucional, não apenas apagar incêndios.
    `,
  },
  'protecao-integral-eca-salvaguarda': {
    title: 'Proteção integral, ECA e salvaguarda: o que a escola precisa organizar',
    date: '9 de maio de 2026',
    readTime: '7 min',
    category: 'Proteção escolar',
    content: `
## Proteção integral exige rotina adulta

O ECA e a lógica de proteção integral colocam a escola em posição de atenção permanente. Adultos precisam reconhecer sinais, evitar exposição, encaminhar corretamente e documentar sem transformar suspeitas em julgamento precipitado.

Salvaguarda não é apenas “ter boa intenção”. É ter processo.

## Riscos de uma atuação improvisada

A escola pode errar por omissão, mas também pode errar por excesso, comunicação descuidada ou tratamento inadequado de informação sensível.

Por isso, a formação deve trabalhar limites: o que observar, como registrar, para quem encaminhar, o que não prometer e o que não investigar por conta própria.

## Camada Excellentia

A plataforma pode apoiar a criação de linguagem comum e evidências formativas para que a escola tenha mais clareza antes de situações críticas.
    `,
  },
  'incendio-evacuacao-cultura-preventiva': {
    title: 'Incêndio e evacuação: cultura preventiva além do extintor',
    date: '9 de maio de 2026',
    readTime: '5 min',
    category: 'Segurança',
    content: `
## Segurança não pode depender de memória individual

Em uma emergência, a escola não pode descobrir na hora quem orienta alunos, quem aciona ajuda, quem confere salas, quem acompanha crianças pequenas ou quem registra a ocorrência.

Formações sobre incêndio, evacuação e uso básico de equipamentos devem reforçar cultura preventiva e clareza de papéis.

## Evidência e repetição

A escola precisa registrar orientação, simulações, revisão de rotas, pontos frágeis e medidas corretivas. O valor não está apenas em “dar uma aula”, mas em criar ciclo de melhoria.

## O que evitar

Não se deve prometer que uma formação digital torna alguém apto a atuar tecnicamente em combate a incêndio. A promessa correta é preparar consciência, protocolo e cultura preventiva, respeitando exigências técnicas específicas.
    `,
  },
  'formacoes-personalizadas-matriz-risco': {
    title: 'Formações personalizadas: a matriz de risco de cada escola',
    date: '9 de maio de 2026',
    readTime: '6 min',
    category: 'Estratégia',
    content: `
## Nem toda escola precisa da mesma trilha no mesmo momento

Uma escola pequena, uma rede com várias unidades, uma escola bilíngue, uma instituição de educação infantil e uma escola com histórico recente de conflito não têm a mesma matriz de risco.

Formações personalizadas devem nascer da exposição real, da maturidade institucional e das prioridades de gestão.

## Como pensar uma matriz simples

- quais temas geram maior risco jurídico, pedagógico ou reputacional;
- quais equipes estão mais expostas;
- que evidências já existem;
- onde há lacunas de conduta ou comunicação;
- que formações precisam vir antes de protocolos mais complexos.

## O papel da Excellentia

A plataforma pode organizar uma base comum e abrir caminhos específicos para cada escola, sem vender um pacote genérico como se ele resolvesse todos os contextos.
    `,
  },
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
    title: `${post.title} — Inteligência Educacional | Excellentia`,
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
                Quer discutir como isso se aplica à sua escola?
              </p>
              <Link
                href="/contato"
                className="bg-gold hover:bg-yellow-600 text-white font-bold px-8 py-3 rounded-lg transition-colors inline-block"
              >
                Falar com a Excellentia
              </Link>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/inteligencia-educacional"
              className="text-gold hover:text-gold-dark font-semibold transition-colors inline-flex items-center gap-1"
            >
              <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              Voltar para Inteligência Educacional
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
