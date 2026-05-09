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
## Por que esse tema não cabe em uma resposta apressada

A discussão sobre riscos psicossociais chegou às escolas por uma via normativa, mas o problema é anterior à norma. Há muito tempo a rotina escolar combina pressão emocional, conflito com famílias, sobrecarga administrativa, cobrança por resultado, violência, dificuldade de comunicação interna e adoecimento de profissionais. O que muda, agora, é que a escola precisa ter mais método para enxergar e tratar esse conjunto de fatores.

Por isso, não ajuda reduzir o tema a uma frase como “a escola precisa cumprir a NR-1”. Essa frase pode até apontar uma urgência, mas não explica o trabalho institucional que vem depois. Se a escola apenas produz um documento, faz uma palestra genérica e arquiva uma lista de presença, ela talvez responda a uma demanda imediata, mas não cria uma rotina de governança.

## O que precisa ser separado

Risco psicossocial não é diagnóstico individual de professor. Também não é uma autorização para transformar qualquer desconforto da rotina em prova de culpa da escola. A leitura precisa ser mais cuidadosa: existem fatores de organização do trabalho que podem aumentar sofrimento, desgaste e conflito. Alguns dependem da gestão escolar. Outros vêm de fora da escola, como mudanças sociais, expectativas familiares, precarização da profissão e aumento de tensão nas relações.

A escola não controla todo o ecossistema, mas controla parte dele. Controla como distribui responsabilidades, como comunica decisões, como registra ocorrências, como reage a denúncias, como forma lideranças e como acompanha situações recorrentes. É nesse ponto que a governança começa.

## O que uma escola madura deveria conseguir demonstrar

A pergunta prática não é se a escola eliminou todos os riscos. Isso seria uma promessa irreal. A pergunta é se ela consegue demonstrar que identificou temas relevantes, formou adultos, criou canais razoáveis, registrou providências, revisou condutas e tratou a saúde do trabalho como parte da gestão.

Esse tipo de evidência não nasce de um documento isolado. Ele nasce da repetição de procedimentos: formação, registro, análise, orientação, nova formação, revisão. A Excellentia entra nesse espaço como camada de organização e inteligência. Ela não substitui avaliação técnica especializada quando ela for necessária, mas ajuda a escola a deixar de depender apenas de memória informal e respostas improvisadas.
`,
  },
  'pgr-gro-governanca-escolar': {
    title: 'PGR/GRO na escola: documento técnico ou instrumento de governança?',
    date: '9 de maio de 2026',
    readTime: '6 min',
    category: 'Compliance',
    content: `
## O documento técnico não resolve sozinho

O PGR e o GRO tendem a ser tratados como documentos de obrigação. Alguém produz, a escola guarda, e o assunto volta apenas quando há fiscalização, renovação contratual ou algum episódio mais grave. Esse uso é compreensível, porque a rotina escolar já é cheia de urgências, mas ele limita muito a função real desses instrumentos.

Um programa de gerenciamento de riscos só ganha valor quando deixa de ser um arquivo e passa a conversar com a operação da escola. Isso significa que a direção precisa saber que riscos foram mapeados, quais responsabilidades existem, que medidas foram sugeridas, que formações foram realizadas e quais lacunas continuam abertas.

## A ponte entre SST e gestão escolar

A área técnica de segurança e saúde do trabalho tem seu papel. Mas a escola não funciona como uma indústria ou um escritório comum. Há alunos, famílias, professores, auxiliares, equipe administrativa, terceirizados, eventos, excursões, conflitos pedagógicos e situações de exposição pública. A gestão de risco precisa considerar essa ecologia própria.

Por isso, o PGR não deveria ficar isolado do calendário formativo. Se há risco associado à comunicação com famílias, à sobrecarga de professores ou à ausência de protocolo em emergência, a escola precisa formar pessoas, registrar orientação e acompanhar se a prática mudou.

## Como transformar em governança

A passagem de documento para governança acontece quando a escola cria rotina. Primeiro, entende o que o documento aponta. Depois, distribui responsabilidades. Em seguida, forma as equipes envolvidas, registra participação e acompanha pendências. Por fim, revisa o que não funcionou.

A Excellentia pode apoiar essa passagem. Não porque substitua a parte técnica, mas porque cria uma camada de continuidade entre exigência, formação, evidência e decisão institucional.
`,
  },
  'lei-lucas-protocolo-evidencias': {
    title: 'Lei Lucas: protocolo, evidência e o limite da formação online',
    date: '9 de maio de 2026',
    readTime: '7 min',
    category: 'Segurança',
    content: `
## A obrigação é importante, mas a resposta não pode ser teatral

A Lei Lucas tornou mais visível uma responsabilidade que já deveria estar no centro da vida escolar: adultos precisam estar preparados para agir em situações de emergência. O problema é que, em muitas instituições, a resposta vira um evento anual. Alguém vai à escola, apresenta slides, faz uma simulação, recolhe assinaturas e o tema desaparece até o próximo ciclo.

Isso é melhor do que nada, mas ainda é pouco. Emergência não respeita calendário de treinamento. Uma criança pode engasgar, cair, ter uma reação alérgica, desmaiar ou sofrer um trauma em qualquer dia comum. A escola precisa de adultos mais atentos, protocolos mais claros e registros que mostrem continuidade.

## O limite da formação digital

É necessário ser preciso aqui. Uma formação online não substitui treinamento prático presencial de primeiros socorros quando a prática é exigida ou pedagogicamente indispensável. Manobra, ritmo, força, postura e tomada de decisão em emergência precisam de orientação técnica e correção presencial.

Mas disso não se conclui que a camada digital seja irrelevante. Ela pode preparar a equipe antes do treinamento prático, alinhar conceitos, explicar limites de atuação, organizar protocolo interno, reforçar papéis e registrar que a escola mantém uma cultura preventiva entre um treinamento presencial e outro.

## Evidência não é burocracia quando documenta cuidado real

A escola precisa conseguir demonstrar que tratou o tema com seriedade. Isso envolve certificados, atas, registros de orientação, identificação de responsáveis, revisão de fluxos e comunicação interna. A evidência não salva uma instituição que age mal, mas protege melhor uma instituição que está tentando agir corretamente.

A Excellentia deve ocupar esse espaço intermediário: formar, organizar, documentar e ajudar a escola a não depender apenas do improviso no momento em que a urgência aparece.
`,
  },
  'lgpd-escolar-privacidade': {
    title: 'LGPD escolar: privacidade, titulares e rotina administrativa',
    date: '9 de maio de 2026',
    readTime: '6 min',
    category: 'LGPD',
    content: `
## A escola lida com dados antes de perceber que está lidando com dados

Em uma escola, dados pessoais circulam o tempo todo. Matrícula, histórico, boletim, laudo, imagem, ocorrência disciplinar, informação de saúde, conversa com família, autorização de saída, contrato, cobrança, relatório pedagógico e registro de atendimento são exemplos cotidianos. Justamente por serem cotidianos, muitos passam despercebidos.

A LGPD escolar começa nesse ponto: perceber que privacidade não é apenas um documento publicado no site. É uma prática administrativa e pedagógica. Ela depende de quem acessa informação, por que acessa, por quanto tempo guarda, com quem compartilha e como responde quando alguém pede explicação.

## O risco costuma aparecer em pequenos hábitos

Parte importante do risco não está em grandes vazamentos, mas em hábitos comuns: encaminhar documento por grupo errado, comentar situação de aluno em ambiente inadequado, guardar arquivo sensível em pasta solta, usar imagem sem critério, responder família sem registrar contexto ou deixar plataformas terceiras sem avaliação mínima.

Esses gestos não parecem graves quando vistos isoladamente. O problema é o acúmulo. Com o tempo, eles revelam uma cultura institucional pouco cuidadosa com informação sensível.

## Formação precisa encontrar processo

A escola precisa formar pessoas, mas formação sozinha não resolve se o processo continuar confuso. Professores, coordenação, secretaria e direção precisam saber o que podem decidir, o que devem encaminhar e quando uma solicitação exige cuidado técnico maior.

A Excellentia pode ajudar a criar linguagem comum e evidência de orientação. Não é uma consultoria jurídica automática para cada caso, nem substitui análise especializada quando houver conflito. O valor está em reduzir respostas improvisadas e tornar privacidade parte da rotina escolar.
`,
  },
  'bullying-cyberbullying-violencia-escolar': {
    title: 'Bullying e cyberbullying: quando convivência vira governança',
    date: '9 de maio de 2026',
    readTime: '8 min',
    category: 'Proteção escolar',
    content: `
## O problema não cabe na categoria de indisciplina

Bullying, cyberbullying e violência escolar são frequentemente tratados como conflitos entre alunos. Às vezes são. Mas, quando a situação envolve repetição, humilhação, exposição digital, ameaça, discriminação ou sofrimento persistente, a escola entra em outro campo. A questão deixa de ser apenas disciplinar e passa a envolver proteção, registro, comunicação com famílias, proporcionalidade de resposta e cuidado com a exposição dos envolvidos.

Esse deslocamento é importante porque uma escola pode errar em direções opostas. Pode minimizar demais e parecer omissa. Pode reagir de modo teatral e produzir nova violência. Pode comunicar mal e aumentar o conflito. Pode registrar pouco e ficar sem memória institucional. Nenhum desses erros depende de má-fé; muitas vezes eles nascem da ausência de processo.

## O que precisa existir antes do caso concreto

Protocolos criados no calor do caso tendem a carregar a ansiedade do momento. Por isso, a escola precisa discutir antes: quem escuta, quem registra, quem conversa com famílias, quando acionar rede de proteção, como preservar sigilo, como separar relato de conclusão e como evitar exposição pública.

Também é preciso reconhecer que o digital ampliou a complexidade. O conflito pode começar fora da escola, circular em grupos privados, chegar ao pátio e voltar para as famílias em poucos minutos. Ainda assim, a escola não pode simplesmente dizer que nada lhe diz respeito. Ela precisa delimitar responsabilidade sem fingir controle total.

## Governança como memória institucional

A parte mais difícil é aprender com os padrões sem transformar casos concretos em espetáculo. Se há recorrência de humilhação, isolamento, agressão verbal ou exposição em grupos, a escola precisa olhar para ambiente, supervisão, comunicação e cultura.

A Excellentia pode apoiar esse trabalho ao organizar formação, linguagem comum, registros e reflexão institucional. A promessa não é resolver cada conflito. É criar melhores condições para que a escola responda com menos improviso e mais responsabilidade.
`,
  },
  'protecao-integral-eca-salvaguarda': {
    title: 'Proteção integral, ECA e salvaguarda: o que a escola precisa organizar',
    date: '9 de maio de 2026',
    readTime: '7 min',
    category: 'Proteção escolar',
    content: `
## Proteção integral exige mais do que boa intenção

A escola ocupa um lugar delicado na proteção de crianças e adolescentes. Ela observa mudanças de comportamento, recebe relatos, acompanha conflitos, percebe faltas, escuta famílias e convive diariamente com sinais que podem ou não indicar situações graves. Esse lugar exige cuidado, porque a escola pode ser decisiva para proteger, mas também pode causar dano quando age sem critério.

Boa intenção não basta. Um adulto pode querer ajudar e, mesmo assim, expor uma criança, contaminar um relato, criar boato, prometer sigilo impossível ou investigar algo que deveria ser encaminhado a quem tem atribuição própria.

## O que salvaguarda significa na prática

Salvaguarda institucional é um conjunto de rotinas para reduzir riscos de dano. Envolve critérios de escuta, registro, encaminhamento, comunicação interna, contato com famílias, preservação de informação sensível e compreensão dos limites da escola.

Isso não transforma professor em investigador, psicólogo ou autoridade. Pelo contrário: ajuda cada adulto a entender melhor seu papel. Há situações em que observar e encaminhar corretamente é mais responsável do que tentar resolver tudo internamente.

## O desafio da linguagem comum

Uma escola com muitos adultos precisa de uma linguagem minimamente comum. Se cada pessoa entende proteção de um jeito, a resposta institucional fica desigual. Alguns exageram, outros silenciam, outros expõem, outros documentam mal.

A Excellentia pode contribuir com formação e evidências para que a escola construa esse vocabulário comum. Não se trata de substituir conselho tutelar, rede de saúde, jurídico ou autoridades competentes. Trata-se de preparar a escola para agir melhor antes que uma situação sensível seja conduzida no improviso.
`,
  },
  'incendio-evacuacao-cultura-preventiva': {
    title: 'Incêndio e evacuação: cultura preventiva além do extintor',
    date: '9 de maio de 2026',
    readTime: '5 min',
    category: 'Segurança',
    content: `
## Segurança depende de repetição, não de lembrança heroica

Em uma situação de incêndio, fumaça, evacuação ou pânico, a escola não pode depender da memória individual de uma ou duas pessoas. Crianças pequenas, alunos com deficiência, visitantes, terceirizados, professores novos e famílias circulando pela unidade tornam a operação mais complexa do que parece em um treinamento abstrato.

Por isso, a discussão não é apenas saber onde está o extintor. A escola precisa entender rotas, pontos de encontro, papéis dos adultos, comunicação, conferência de presença, acionamento de ajuda e cuidado com quem tem mobilidade ou compreensão reduzida.

## Formação não substitui exigência técnica

Também aqui é preciso manter limite. Uma formação digital não transforma alguém em brigadista, não autoriza atuação técnica indevida e não substitui obrigações específicas quando elas existem. Prometer isso seria irresponsável.

O que ela pode fazer é melhorar consciência preventiva, preparar a equipe para reconhecer papéis, reforçar condutas básicas e criar continuidade entre treinamentos, simulados e revisões internas.

## Cultura preventiva aparece depois do simulado

O momento mais importante talvez não seja apenas o simulado, mas o que a escola faz depois dele. Quem demorou? Qual porta travou? Que turma se dispersou? Que adulto não sabia sua função? Que comunicação falhou? O que precisa ser corrigido?

Quando essas perguntas viram registro e revisão, a escola começa a construir cultura preventiva. A Excellentia pode ajudar nesse ciclo de formação, evidência e acompanhamento, sem confundir orientação institucional com habilitação técnica.
`,
  },
  'formacoes-personalizadas-matriz-risco': {
    title: 'Formações personalizadas: a matriz de risco de cada escola',
    date: '9 de maio de 2026',
    readTime: '6 min',
    category: 'Estratégia',
    content: `
## Um pacote único raramente enxerga a escola real

Há temas comuns a muitas escolas, mas a ordem de prioridade não é igual para todas. Uma escola de educação infantil tem exposições diferentes de uma rede de ensino médio. Uma instituição com alta rotatividade de equipe enfrenta problemas distintos de uma escola pequena e estável. Uma unidade que acabou de passar por conflito com famílias não tem a mesma urgência de outra que está reorganizando documentos e processos internos.

Por isso, formações personalizadas não deveriam ser apenas cursos com o nome da escola na capa. Elas deveriam nascer de uma leitura mínima de risco, maturidade e contexto.

## Como pensar prioridade sem complicar demais

A escola pode começar por perguntas simples: que situações têm maior chance de acontecer? Quais teriam maior impacto se acontecessem? Onde a equipe demonstra insegurança? Que registros faltam? Que temas já geraram conflito? Que obrigações legais estão próximas? Que áreas dependem demais de uma pessoa específica?

Essas perguntas não substituem diagnóstico técnico completo, mas ajudam a organizar uma matriz inicial. A partir dela, a formação deixa de ser uma lista aleatória de temas e passa a responder a uma lógica institucional.

## Personalizar é assumir responsabilidade editorial

Quando a Excellentia propõe formações personalizadas, precisa evitar a tentação de prometer solução total. O papel é construir trilhas mais aderentes à realidade da escola, com linguagem, exemplos e evidências compatíveis com o risco que se quer tratar.

Isso exige conversa, revisão e amadurecimento. Um bom conteúdo não encerra a discussão; ele melhora a qualidade da próxima decisão.
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
