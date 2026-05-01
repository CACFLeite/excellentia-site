type PgrFormData = Record<string, any>;

type RiskItem = {
  category: string;
  source: string;
  exposedGroups: string;
  possibleHarm: string;
  currentControls: string;
  level: 'baixo' | 'medio' | 'alto';
  action: string;
  priority: 'baixa' | 'media' | 'alta';
};

function hasAny(values: unknown, expected: string[]) {
  return Array.isArray(values) && values.some((value) => expected.includes(String(value)));
}

function yes(value: unknown) {
  return value === 'sim';
}

function add(risks: RiskItem[], item: RiskItem) {
  risks.push(item);
}

function buildRiskInventory(formData: PgrFormData): RiskItem[] {
  const risks: RiskItem[] = [];

  if (['muito_barulhento', 'alguns_momentos'].includes(formData.C01)) {
    add(risks, {
      category: 'Físico',
      source: 'Ruído em salas, pátio, recreio, refeitório ou quadra',
      exposedGroups: 'Professores, monitores, equipe de pátio/refeitório e demais colaboradores expostos',
      possibleHarm: 'Fadiga, estresse, desconforto, prejuízo vocal e auditivo conforme intensidade e duração',
      currentControls: 'A verificar conforme respostas sobre organização de ambientes, treinamentos e medidas existentes',
      level: formData.C01 === 'muito_barulhento' ? 'alto' : 'medio',
      action: 'Mapear locais/horários críticos, reorganizar rotinas ruidosas, avaliar medidas coletivas e orientar saúde vocal.',
      priority: formData.C01 === 'muito_barulhento' ? 'alta' : 'media',
    });
  }

  if (['parcial', 'nao', 'sazonalmente'].includes(formData.C03)) {
    add(risks, {
      category: 'Físico',
      source: 'Calor/frio ou ventilação inadequada em ambientes escolares',
      exposedGroups: 'Colaboradores dos ambientes indicados no formulário',
      possibleHarm: 'Desconforto térmico, fadiga, queda de atenção e agravamento de queixas de saúde',
      currentControls: 'A verificar climatização, ventilação, pausas e manutenção predial',
      level: formData.C03 === 'nao' ? 'alto' : 'medio',
      action: 'Priorizar levantamento dos ambientes críticos, manutenção/climatização e medidas administrativas em períodos extremos.',
      priority: formData.C03 === 'nao' ? 'alta' : 'media',
    });
  }

  if (['parcial', 'nao'].includes(formData.C05)) {
    add(risks, {
      category: 'Físico/Acidente',
      source: 'Iluminação insuficiente ou excessiva',
      exposedGroups: 'Professores, administrativos, limpeza, alunos e demais usuários dos ambientes',
      possibleHarm: 'Fadiga visual, erro operacional, tropeços e quedas',
      currentControls: 'A verificar manutenção elétrica e troca de lâmpadas/luminárias',
      level: formData.C05 === 'nao' ? 'alto' : 'medio',
      action: 'Realizar inspeção de iluminação, corrigir pontos críticos e registrar manutenção preventiva.',
      priority: formData.C05 === 'nao' ? 'alta' : 'media',
    });
  }

  if (['parcial', 'nao'].includes(formData.C07) || hasAny(formData.B01, ['lab_ciencias'])) {
    add(risks, {
      category: 'Químico',
      source: 'Produtos de limpeza, saneantes ou reagentes de laboratório',
      exposedGroups: 'Limpeza, manutenção, laboratório, professores responsáveis e terceiros expostos',
      possibleHarm: 'Irritação, intoxicação, alergias, queimaduras químicas e acidentes por armazenamento inadequado',
      currentControls: Array.isArray(formData.D01) ? `EPIs informados: ${formData.D01.join(', ')}` : 'EPIs e fichas de segurança a verificar',
      level: ['parcial', 'nao'].includes(formData.C07) ? 'alto' : 'medio',
      action: 'Organizar armazenamento, rotulagem e FISPQ/FDS; treinar uso seguro; revisar EPIs e acesso de alunos.',
      priority: ['parcial', 'nao'].includes(formData.C07) ? 'alta' : 'media',
    });
  }

  if (['frequente', 'ocasional'].includes(formData.C10) || ['frequente', 'raramente'].includes(formData.C11)) {
    add(risks, {
      category: 'Biológico',
      source: 'Contato com crianças doentes, secreções, resíduos de higiene ou material biológico',
      exposedGroups: 'Professores, auxiliares, berçário/infantil, limpeza e atendimento escolar',
      possibleHarm: 'Contaminações, infecções e afastamentos por doenças transmissíveis',
      currentControls: 'A verificar protocolos, EPIs descartáveis, higienização e comunicação com famílias',
      level: formData.C10 === 'frequente' || formData.C11 === 'frequente' ? 'alto' : 'medio',
      action: 'Formalizar protocolo de sintomas, higiene, descarte, EPIs e comunicação/retirada de alunos sintomáticos.',
      priority: formData.C10 === 'frequente' || formData.C11 === 'frequente' ? 'alta' : 'media',
    });
  }

  if (['maior_parte', 'metade'].includes(formData.C13) || ['parcial', 'inadequado'].includes(formData.C14) || ['frequente', 'periodos'].includes(formData.C15)) {
    add(risks, {
      category: 'Ergonômico',
      source: 'Posturas prolongadas, mobiliário inadequado, jornada intensa e organização do trabalho',
      exposedGroups: 'Professores, coordenação, secretaria, limpeza, cozinha e demais cargos conforme atividade',
      possibleHarm: 'Dores musculoesqueléticas, fadiga, LER/DORT, estresse e queda de desempenho',
      currentControls: 'A verificar pausas, mobiliário, rodízio, ergonomia e PCMSO',
      level: formData.C14 === 'inadequado' || formData.C15 === 'frequente' ? 'alto' : 'medio',
      action: 'Realizar análise ergonômica preliminar, ajustar mobiliário/pausas, revisar distribuição de tarefas e orientar equipes.',
      priority: formData.C14 === 'inadequado' || formData.C15 === 'frequente' ? 'alta' : 'media',
    });
  }

  if (['maioria', 'alguns'].includes(formData.C16)) {
    add(risks, {
      category: 'Ergonômico/Saúde vocal',
      source: 'Uso intenso da voz em sala, pátio ou quadra',
      exposedGroups: 'Professores, monitores, coordenação e equipe de pátio',
      possibleHarm: 'Disfonia, fadiga vocal, afastamentos e piora de saúde mental associada',
      currentControls: 'A verificar orientação vocal, acústica de ambientes e pausas',
      level: formData.C16 === 'maioria' ? 'alto' : 'medio',
      action: 'Incluir orientação de saúde vocal, avaliar amplificação/acústica e controlar ruído de fundo.',
      priority: formData.C16 === 'maioria' ? 'alta' : 'media',
    });
  }

  if (['atencao', 'ruim'].includes(formData.C20) || ['problemas', 'atencao'].includes(formData.C22) || ['vencidos', 'nao_temos'].includes(formData.C23)) {
    add(risks, {
      category: 'Acidente',
      source: 'Escadas, rampas, instalações elétricas, extintores ou equipamentos sem controle adequado',
      exposedGroups: 'Todos os colaboradores, alunos, visitantes e terceirizados',
      possibleHarm: 'Quedas, choques elétricos, cortes, queimaduras e agravamento em emergências',
      currentControls: 'A verificar manutenção preventiva, sinalização, extintores e plano de emergência',
      level: ['ruim', 'problemas', 'nao_temos'].includes(formData.C20) || formData.C22 === 'problemas' || formData.C23 === 'nao_temos' ? 'alto' : 'medio',
      action: 'Corrigir imediatamente pontos críticos, registrar inspeções, revisar extintores, sinalização e plano de emergência.',
      priority: 'alta',
    });
  }

  if (['frequente', 'alguns'].includes(formData.C26) || ['frequente', 'isolados'].includes(formData.C27) || ['com_registro', 'sem_registro', 'sem_controle'].includes(formData.C28)) {
    add(risks, {
      category: 'Psicossocial',
      source: 'Sobrecarga, violência, conflitos, assédio ou ausência de controle formal de relatos',
      exposedGroups: 'Todos os colaboradores, com atenção a professores, coordenação, atendimento e equipes de apoio',
      possibleHarm: 'Estresse, adoecimento mental, burnout, afastamentos, conflitos e queda de segurança institucional',
      currentControls: 'A verificar canais de comunicação/denúncia, políticas internas, treinamento e fluxo de acolhimento',
      level: formData.C26 === 'frequente' || formData.C27 === 'frequente' || formData.C28 === 'sem_controle' ? 'alto' : 'medio',
      action: 'Implantar/fortalecer canal de comunicação, protocolo de apuração, treinamento de lideranças e acompanhamento de clima.',
      priority: formData.C26 === 'frequente' || formData.C27 === 'frequente' || formData.C28 === 'sem_controle' ? 'alta' : 'media',
    });
  }

  if (!risks.length) {
    add(risks, {
      category: 'Geral',
      source: 'Riscos não críticos informados no questionário inicial',
      exposedGroups: 'Colaboradores do estabelecimento',
      possibleHarm: 'A definir em inspeção técnica e revisão periódica',
      currentControls: 'Controles informados pela escola no formulário',
      level: 'baixo',
      action: 'Manter monitoramento, registros de treinamento, revisão periódica e atualização em caso de mudanças.',
      priority: 'baixa',
    });
  }

  return risks;
}

function buildMarkdownTable(rows: string[][]) {
  const [header, ...body] = rows;
  return [
    `| ${header.join(' | ')} |`,
    `| ${header.map(() => '---').join(' | ')} |`,
    ...body.map((row) => `| ${row.map((cell) => String(cell).replace(/\n/g, '<br>')).join(' | ')} |`),
  ].join('\n');
}

function estimateRiskGrade(formData: PgrFormData, risks: RiskItem[]) {
  const cnae = String(formData.A06 || '');
  const employeeCount = Number(formData.A08 || 0);
  const hasHighRisk = risks.some((risk) => risk.level === 'alto');
  const hasLabOrKitchen = hasAny(formData.B01, ['lab_ciencias', 'cozinha_refeitorio']);

  if (hasHighRisk || hasLabOrKitchen || employeeCount > 100) return 'Grau estimado 2 — validar tecnicamente conforme CNAE, ambientes e atividades reais';
  if (cnae.startsWith('85') || employeeCount > 30) return 'Grau estimado 1/2 — escola típica, sujeito a validação pelo CNAE e atividades acessórias';
  return 'Grau estimado 1 — sujeito a validação pelo CNAE e atividades reais';
}

export function generatePgrDocument(formData: PgrFormData) {
  const risks = buildRiskInventory(formData);
  const estimatedRiskGrade = estimateRiskGrade(formData, risks);
  const now = new Date();
  const organizationName = formData.A01 || 'Escola/organização não informada';

  const inventory = buildMarkdownTable([
    ['Categoria', 'Perigo/Fonte', 'Expostos', 'Danos possíveis', 'Controles existentes', 'Nível'],
    ...risks.map((risk) => [risk.category, risk.source, risk.exposedGroups, risk.possibleHarm, risk.currentControls, risk.level]),
  ]);

  const actionPlan = buildMarkdownTable([
    ['Prioridade', 'Medida de prevenção/controle', 'Responsável sugerido', 'Prazo sugerido', 'Evidência'],
    ...risks.map((risk) => [
      risk.priority,
      risk.action,
      formData.F02 || 'Responsável pelo PGR / direção da escola',
      risk.priority === 'alta' ? 'Imediato a 30 dias' : risk.priority === 'media' ? '30 a 90 dias' : 'Até a próxima revisão',
      'Registro de inspeção, fotos, certificados, atas, fichas ou ordem de serviço',
    ]),
  ]);

  const body = `# Programa de Gerenciamento de Riscos (PGR) — rascunho operacional\n\n` +
    `**Organização:** ${organizationName}\n\n` +
    `**CNPJ:** ${formData.A02 || 'não informado'}\n\n` +
    `**Unidade/endereço:** ${formData.A03 || 'não informado'}\n\n` +
    `**Responsável informado:** ${formData.F02 || 'não informado'} — ${formData.F03 || 'cargo não informado'}\n\n` +
    `**Data de geração:** ${now.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })}\n\n` +
    `## Base normativa e escopo\n\n` +
    `Este rascunho organiza informações para o Gerenciamento de Riscos Ocupacionais previsto na NR-1. O PGR deve conter, no mínimo, inventário de riscos e plano de ação, ser mantido por estabelecimento, revisado quando houver mudanças relevantes e preservado historicamente. O documento não substitui inspeção técnica, medições ambientais, laudos, PCMSO, AEP/AET ou validação por profissional habilitado quando aplicável.\n\n` +
    `## Caracterização resumida\n\n` +
    `- CNAE informado: ${formData.A06 === 'outro' ? formData.A06_outro : formData.A06 || 'não informado'}\n` +
    `- Grau de risco calculado preliminarmente: ${estimatedRiskGrade}\n` +
    `- Número de funcionários na unidade: ${formData.A08 || 'não informado'}\n` +
    `- Quadro por cargo: ${formData.A09 || 'não informado'}\n` +
    `- Terceirizados: ${formData.A10 || 'não informado'} ${formData.A10_sub ? `(${formData.A10_sub})` : ''}\n\n` +
    `## Inventário de riscos preliminar\n\n${inventory}\n\n` +
    `## Plano de ação preliminar\n\n${actionPlan}\n\n` +
    `## Pontos que exigem validação\n\n` +
    `1. Conferir se todos os ambientes, cargos e terceirizados foram incluídos.\n` +
    `2. Validar tecnicamente os níveis de risco e controles existentes.\n` +
    `3. Integrar este PGR ao PCMSO, treinamentos, CIPA/designado e documentos específicos exigidos por outras NRs.\n` +
    `4. Definir responsáveis e prazos reais para cada ação.\n` +
    `5. Arquivar versões e evidências por prazo compatível com a NR-1.\n`;

  return {
    body,
    metadata: {
      generatedAt: now.toISOString(),
      riskCount: risks.length,
      risks,
      source: 'excellentia-pgr-form-v1',
      legalNote: 'Rascunho operacional baseado na estrutura mínima da NR-1: inventário de riscos e plano de ação. Requer validação técnica antes de uso formal.',
      estimatedRiskGrade,
    },
  };
}
