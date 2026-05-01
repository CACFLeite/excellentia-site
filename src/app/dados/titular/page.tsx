import Link from 'next/link';
import DataSubjectForm from './DataSubjectForm';

const statusMessages: Record<string, string> = {
  confirmado: 'Solicitação confirmada. Se localizarmos dados vinculados ao e-mail verificado, a exportação será enviada para esse mesmo endereço.',
  'ja-concluido': 'Esta solicitação já foi confirmada anteriormente.',
  expirado: 'O link expirou. Envie uma nova solicitação para receber outro link de verificação.',
  'token-invalido': 'Link inválido. Confira o e-mail recebido ou envie uma nova solicitação.',
  'falha-envio': 'A identidade foi verificada, mas houve falha no envio automático. Nossa equipe deverá tratar a pendência operacionalmente.',
  erro: 'Não foi possível concluir a verificação agora. Tente novamente ou entre em contato pelo atendimento.',
};

export default function DataSubjectPage({ searchParams }: { searchParams?: { status?: string } }) {
  const status = searchParams?.status;
  const message = status ? statusMessages[status] : null;

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <section className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <Link href="/" className="text-sm font-semibold text-gold">← Voltar para a Excellentia</Link>
        <h1 className="mt-6 text-3xl font-bold text-navy">Solicitação de dados pessoais</h1>
        <p className="mt-4 text-slate-700">
          Use este canal para solicitar acesso, confirmação de tratamento, correção, portabilidade, informação ou exclusão de dados pessoais tratados pela Excellentia.
        </p>
        <p className="mt-3 text-sm text-slate-600">
          Por segurança, a exportação automática só é enviada ao e-mail verificado e inclui apenas registros vinculados a esse e-mail. Essa camada reduz risco de fraude, estelionato ou envio indevido de dados a terceiros.
        </p>

        {message && <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-950">{message}</div>}

        <DataSubjectForm />
      </section>
    </main>
  );
}
