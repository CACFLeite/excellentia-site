import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';
import { buildDataSubjectExport, hashToken, sendDataSubjectExportEmail } from '@/lib/lgpd';

function appendAudit(existing: unknown, event: Record<string, unknown>) {
  return [...(Array.isArray(existing) ? existing : []), event];
}

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get('token') || '';
    if (!token) return NextResponse.redirect(new URL('/dados/titular?status=token-ausente', request.url));

    const tokenHash = hashToken(token);
    const lgpdRequest = await prisma.dataSubjectRequest.findUnique({ where: { verificationTokenHash: tokenHash } });

    if (!lgpdRequest) return NextResponse.redirect(new URL('/dados/titular?status=token-invalido', request.url));
    if (lgpdRequest.status === 'completed') return NextResponse.redirect(new URL('/dados/titular?status=ja-concluido', request.url));
    if (lgpdRequest.verificationExpiresAt < new Date()) {
      await prisma.dataSubjectRequest.update({
        where: { id: lgpdRequest.id },
        data: { status: 'expired', auditLog: appendAudit(lgpdRequest.auditLog, { at: new Date().toISOString(), event: 'expired_on_verify' }) },
      });
      return NextResponse.redirect(new URL('/dados/titular?status=expirado', request.url));
    }

    const exportData = await buildDataSubjectExport(lgpdRequest.email, lgpdRequest.cpf);
    const emailResult = await sendDataSubjectExportEmail({ to: lgpdRequest.email, name: lgpdRequest.name, exportData });

    await prisma.dataSubjectRequest.update({
      where: { id: lgpdRequest.id },
      data: {
        status: emailResult.sent ? 'completed' : 'delivery_failed',
        verifiedAt: lgpdRequest.verifiedAt || new Date(),
        completedAt: emailResult.sent ? new Date() : undefined,
        exportData,
        auditLog: appendAudit(lgpdRequest.auditLog, {
          at: new Date().toISOString(),
          event: emailResult.sent ? 'export_email_sent' : 'export_email_failed',
          provider: emailResult.provider,
          error: emailResult.error,
        }),
      },
    });

    if (!emailResult.sent) return NextResponse.redirect(new URL('/dados/titular?status=falha-envio', request.url));
    return NextResponse.redirect(new URL('/dados/titular?status=confirmado', request.url));
  } catch (error) {
    console.error('[lgpd verify] error:', error);
    return NextResponse.redirect(new URL('/dados/titular?status=erro', request.url));
  }
}
