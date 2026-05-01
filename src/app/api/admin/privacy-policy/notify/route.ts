import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import { isAdminRequest } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import { sendTransactionalEmail } from '@/lib/transactionalEmail';

function dedupeEmails(values: Array<string | null | undefined>) {
  return Array.from(new Set(values.map((value) => value?.trim().toLowerCase()).filter((value): value is string => Boolean(value && /^\S+@\S+\.\S+$/.test(value)))));
}

export async function POST(request: NextRequest) {
  try {
    if (!isAdminRequest(request)) return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });

    const body = await request.json();
    const version = String(body.version || new Date().toISOString().slice(0, 10)).trim();
    const title = String(body.title || 'Atualização da Política de Privacidade').trim();
    const summary = String(body.summary || '').trim();
    const policyUrl = String(body.policyUrl || 'https://excellentia-edu.com/privacidade').trim();
    const dryRun = Boolean(body.dryRun);

    if (!version || !summary) return NextResponse.json({ error: 'Informe version e summary.' }, { status: 400 });

    const [employees, members] = await Promise.all([
      prisma.employee.findMany({ where: { email: { not: null } }, select: { email: true, fullName: true } }),
      prisma.organizationMember.findMany({ select: { email: true, name: true } }),
    ]);

    const emails = dedupeEmails([...employees.map((employee) => employee.email), ...members.map((member) => member.email)]);

    if (dryRun) {
      return NextResponse.json({ success: true, dryRun: true, recipientCount: emails.length, sample: emails.slice(0, 10) });
    }

    const policyVersion = await prisma.privacyPolicyVersion.upsert({
      where: { version },
      update: { title, summary, policyUrl },
      create: { version, title, summary, policyUrl },
    });

    const results = [];
    for (const email of emails) {
      const alreadySent = await prisma.privacyPolicyNotification.findUnique({
        where: { versionId_email: { versionId: policyVersion.id, email } },
      });
      if (alreadySent?.status === 'sent') {
        results.push({ email, skipped: true, reason: 'already_sent' });
        continue;
      }

      const result = await sendTransactionalEmail({
        to: email,
        subject: title,
        text: [
          'Olá.',
          '',
          'A Política de Privacidade da Excellentia foi atualizada.',
          '',
          summary,
          '',
          `Versão: ${version}`,
          `Consulte o texto atualizado em: ${policyUrl}`,
          '',
          'Excellentia',
        ].join('\n'),
        html: `<div style="font-family:Arial,sans-serif;line-height:1.5;color:#172033;max-width:620px"><p>Olá.</p><p>A <strong>Política de Privacidade da Excellentia</strong> foi atualizada.</p><div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px">${summary.replace(/\n/g, '<br>')}</div><p><strong>Versão:</strong> ${version}</p><p><a href="${policyUrl}" style="display:inline-block;background:#C9A227;color:#fff;text-decoration:none;font-weight:700;padding:12px 18px;border-radius:10px">Ver política atualizada</a></p><p>Excellentia</p></div>`,
      });

      await prisma.privacyPolicyNotification.upsert({
        where: { versionId_email: { versionId: policyVersion.id, email } },
        update: { status: result.sent ? 'sent' : 'failed', provider: result.provider, error: result.error, sentAt: result.sent ? new Date() : null },
        create: { versionId: policyVersion.id, email, status: result.sent ? 'sent' : 'failed', provider: result.provider, error: result.error, sentAt: result.sent ? new Date() : null },
      });
      results.push({ email, sent: result.sent, provider: result.provider, error: result.error });
    }

    const sent = results.filter((result) => 'sent' in result && result.sent).length;
    const failed = results.filter((result) => 'sent' in result && !result.sent).length;
    const skipped = results.filter((result) => 'skipped' in result && result.skipped).length;

    await prisma.privacyPolicyVersion.update({
      where: { id: policyVersion.id },
      data: { notificationLog: { at: new Date().toISOString(), sent, failed, skipped, recipientCount: emails.length } },
    });

    return NextResponse.json({ success: true, version, recipientCount: emails.length, sent, failed, skipped });
  } catch (error) {
    console.error('[privacy notify] error:', error);
    return NextResponse.json({ error: 'Erro interno ao enviar notificações.' }, { status: 500 });
  }
}
