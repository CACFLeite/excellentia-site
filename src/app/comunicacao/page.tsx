import CommunicationClient from './CommunicationClient';

export default function ComunicacaoPage({ searchParams }: { searchParams?: { convite?: string } }) {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <CommunicationClient token={searchParams?.convite} />
      </div>
    </main>
  );
}
