import Link from 'next/link';

const cards = [
  {
    title: 'Escolas cadastradas',
    description: 'Buscar escolas já criadas e abrir painel, importação, comunicados e relatório.',
    href: '/admin/escolas',
  },
  {
    title: 'Cadastrar escola',
    description: 'Criar organização, sede/unidade principal, responsável e dados fiscais para NF.',
    href: '/admin/escolas/nova',
  },
  {
    title: 'Colaboradores por escola',
    description: 'Escolha uma escola para cadastrar colaboradores, importar planilha e gerar convites.',
    href: '/admin/escolas',
  },
];

export default function AdminHomePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-gold">Área interna Excellentia</p>
          <h1 className="text-3xl font-extrabold text-navy mt-2">Operação escolar</h1>
          <p className="text-gray-600 mt-2 max-w-3xl">
            Hub temporário para implantação e acompanhamento das escolas em teste controlado.
          </p>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((card) => (
            <Link key={card.href} href={card.href} className="block bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:border-gold transition-colors">
              <h2 className="text-xl font-bold text-navy">{card.title}</h2>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">{card.description}</p>
              <p className="text-sm font-bold text-gold mt-5">Abrir →</p>
            </Link>
          ))}
        </section>

        <section className="rounded-2xl bg-blue-50 border border-blue-100 p-5 text-sm text-blue-950 leading-relaxed">
          Agora você não precisa guardar o ID manualmente: use “Escolas cadastradas” para encontrar a escola e abrir painel, importação, comunicados ou relatório. O ID continua aparecendo para suporte e integração.
        </section>
      </div>
    </main>
  );
}
