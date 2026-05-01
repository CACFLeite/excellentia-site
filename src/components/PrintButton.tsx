'use client';

export default function PrintButton({ label = 'Imprimir / salvar PDF' }: { label?: string }) {
  return (
    <button type="button" onClick={() => window.print()} className="bg-navy hover:bg-blue-950 text-white font-bold px-4 py-2 rounded-lg text-sm print:hidden">
      {label}
    </button>
  );
}
