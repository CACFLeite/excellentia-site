import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashInviteToken } from '@/lib/invitations';

function buildInitialFeedback(answer: string) {
  const trimmed = answer.trim();
  const concreteSignals = ['rotina', 'frequência', 'frequente', 'intensidade', 'clareza', 'suporte', 'registro', 'ação', 'sobrecarga', 'assédio', 'burnout', 'meta', 'conflito'];
  const signalCount = concreteSignals.filter((signal) => trimmed.toLowerCase().includes(signal)).length;

  if (trimmed.length > 550 && signalCount >= 3) {
    return {
      level: 'forte',
      summary: 'Sua resposta apresenta boa conexão com a rotina escolar e mostra atenção a fatores concretos que podem exigir registro, suporte ou ação institucional.',
      strengths: ['Trouxe elementos concretos da rotina.', 'Relacionou a situação com prevenção e gestão de riscos.'],
      nextSteps: ['Mantenha esse nível de especificidade nas próximas aulas, sempre ligando exemplos cotidianos a formas de prevenção.'],
    };
  }

  if (trimmed.length > 220) {
    return {
      level: 'adequada',
      summary: 'Sua resposta mostra compreensão inicial do tema e já aponta situações relevantes da rotina escolar.',
      strengths: ['Reconheceu que o tema se liga ao cotidiano do trabalho.', 'Apresentou uma resposta organizada.'],
      nextSteps: ['Na próxima resposta, fortaleça ainda mais com exemplos concretos e indicação de frequência, intensidade, clareza ou suporte.'],
    };
  }

  return {
    level: 'em desenvolvimento',
    summary: 'Sua resposta registra uma compreensão inicial do tema e pode ser fortalecida com mais detalhes da rotina vivida na escola.',
    strengths: ['Você iniciou a conexão entre o conteúdo da aula e a prática escolar.'],
    nextSteps: ['Procure citar situações mais concretas e explicar por que elas merecem atenção, registro ou ação da escola.'],
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const token = String(body.convite ?? '');
    const activityId = String(body.activityId ?? '');
    const answer = String(body.answer ?? '').trim();

    if (!token || !activityId || !answer) {
      return NextResponse.json({ error: 'Convite, atividade e resposta são obrigatórios.' }, { status: 400 });
    }

    if (answer.length < 40) {
      return NextResponse.json({ error: 'A resposta precisa ter um pouco mais de contexto para gerar registro formativo.' }, { status: 400 });
    }

    const invitation = await prisma.employeeInvitation.findUnique({
      where: { tokenHash: hashInviteToken(token) },
      include: { employee: true },
    });

    if (!invitation || invitation.status === 'revoked' || invitation.expiresAt.getTime() < Date.now() || !invitation.employeeId) {
      return NextResponse.json({ error: 'Convite inválido ou expirado.' }, { status: 404 });
    }

    const activity = await prisma.activity.findUnique({
      where: { id: activityId },
      include: { lesson: { include: { course: true } } },
    });

    if (!activity || activity.lesson.course.slug !== 'nr1-escolas') {
      return NextResponse.json({ error: 'Atividade não encontrada.' }, { status: 404 });
    }

    const feedback = buildInitialFeedback(answer);

    const response = await prisma.$transaction(async (tx) => {
      const saved = await tx.activityResponse.upsert({
        where: { employeeId_activityId: { employeeId: invitation.employeeId!, activityId } },
        create: {
          employeeId: invitation.employeeId!,
          activityId,
          answer,
          status: 'feedback_ready',
          metadata: { feedbackMode: 'initial-rule-based' },
        },
        update: {
          answer,
          status: 'feedback_ready',
          submittedAt: new Date(),
          metadata: { feedbackMode: 'initial-rule-based' },
        },
      });

      await tx.activityFeedback.upsert({
        where: { responseId: saved.id },
        create: {
          responseId: saved.id,
          level: feedback.level,
          summary: feedback.summary,
          strengths: feedback.strengths,
          nextSteps: feedback.nextSteps,
          model: 'initial-rule-based',
        },
        update: {
          level: feedback.level,
          summary: feedback.summary,
          strengths: feedback.strengths,
          nextSteps: feedback.nextSteps,
          model: 'initial-rule-based',
        },
      });

      return saved;
    });

    return NextResponse.json({ responseId: response.id, feedback }, { status: 201 });
  } catch (error) {
    console.error('Erro ao salvar resposta NR-1:', error);
    return NextResponse.json({ error: 'Erro interno ao salvar resposta.' }, { status: 500 });
  }
}
