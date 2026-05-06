import Link from 'next/link';
import PrintButton from '@/components/PrintButton';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

function parseTable(lines: string[], start: number) {
  const rows: string[][] = [];
  let index = start;
  while (index < lines.length && lines[index].startsWith('| ')) {
    const cells = lines[index].split('|').slice(1, -1).map((cell) => cell.trim());
    if (!cells.every((cell) => /^-+$/.test(cell))) rows.push(cells);
    index += 1;
  }
  return { rows, nextIndex: index };
}

function renderMarkdown(body: string) {
  const lines = body.split('\n');
  const elements = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (line.startsWith('| ')) {
      const { rows, nextIndex } = parseTable(lines, index);
      const [header, ...bodyRows] = rows;
      elements.push(
        <div key={index} className="overflow-x-auto my-4 rounded-2xl border border-gray-100">
          <table className="min-w-full text-xs md:text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>{header?.map((cell) => <th key={cell} className="text-left font-bold px-3 py-3 border-b border-gray-100">{cell}</th>)}</tr>
            </thead>
            <tbody>
              {bodyRows.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b border-gray-50 last:border-0">
                  {row.map((cell, cellIndex) => <td key={cellIndex} className="align-top px-3 py-3 text-gray-700">{cell.replace(/<br>/g, ' ')}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      index = nextIndex;
      continue;
    }

    if (line.startsWith('# ')) elements.push(<h1 key={index} className="text-3xl font-extrabold text-navy mt-2 mb-4">{line.slice(2)}</h1>);
    else if (line.startsWith('## ')) elements.push(<h2 key={index} className="text-xl font-bold text-navy mt-8 mb-3">{line.slice(3)}</h2>);
    else if (line.startsWith('- ')) elements.push(<li key={index} className="ml-6 list-disc text-gray-700 leading-7">{line.slice(2)}</li>);
    else if (/^\d+\. /.test(line)) elements.push(<li key={index} className="ml-6 list-decimal text-gray-700 leading-7">{line.replace(/^\d+\. /, '')}</li>);
    else if (!line.trim()) elements.push(<div key={index} className="h-2" />);
    else elements.push(<p key={index} className="text-gray-700 leading-7" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />);

    index += 1;
  }

  return elements;
}

export default async function PgrDocumentPage({ params }: { params: Promise<{ pgrId: string }> }) {
  const resolvedParams = await params;
  const pgr = await prisma.pgrDocument.findUnique({
    where: { id: resolvedParams.pgrId },
    include: { organization: { select: { id: true, name: true } } },
  });

  if (!pgr) notFound();

  const riskCount = typeof pgr.metadata === 'object' && pgr.metadata && 'riskCount' in pgr.metadata
    ? String((pgr.metadata as { riskCount?: unknown }).riskCount ?? '—')
    : '—';

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <Link href={`/admin/escolas/${pgr.organizationId}/painel`} className="text-sm text-gold hover:underline">← Voltar ao painel da escola</Link>
            <h1 className="text-3xl font-extrabold text-navy mt-3">PGR — {pgr.organization.name}</h1>
            <p className="text-sm text-gray-500 mt-1">Rascunho gerado em {new Date(pgr.createdAt).toLocaleString('pt-BR')} · {riskCount} risco(s) preliminar(es)</p>
          </div>
          <PrintButton />
        </div>

        <section className="bg-yellow-50 border border-yellow-200 text-yellow-950 rounded-2xl p-5 text-sm leading-6">
          Este documento organiza o PGR conforme NR-1. A escola pode designar responsável interno para preenchimento, assinatura e guarda quando compatível com sua realidade; apoio técnico, SST ou jurídico deve ser acionado quando a natureza do risco, outra norma, contrato ou autoridade competente exigir. O documento deve ser integrado aos demais registros de SST e governança da escola.
        </section>

        <article className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 print:shadow-none print:border-0">
          {pgr.generatedBody ? renderMarkdown(pgr.generatedBody) : <p className="text-gray-500">Este PGR ainda não possui corpo gerado.</p>}
        </article>
      </div>
    </main>
  );
}
