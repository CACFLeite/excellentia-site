import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Cancelamento — Excellentia',
  description: 'Política de Cancelamento e Reembolso da Excellentia conforme o CDC (Lei 8.078/1990).',
}

export default function CancelamentoPage() {
  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-navy mb-2">
            Política de Cancelamento
          </h1>
          <p className="text-gray-400 text-sm mb-8">
            Última atualização: 19 de março de 2026
          </p>

          <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

            {/* Intro */}
            <section>
              <p>
                Esta política é aplicável às assinaturas da plataforma Excellentia, operada pela{' '}
                <strong>CACFL Educacional</strong>, CNPJ 50.939.805/0001-73. Nossos termos de
                cancelamento respeitam integralmente o Código de Defesa do Consumidor (CDC — Lei
                n.º 8.078/1990).
              </p>
            </section>

            {/* 1. Direito de Arrependimento */}
            <section>
              <h2 className="text-xl font-bold text-navy mb-3">
                1. Direito de Arrependimento — 7 dias (Art. 49 CDC)
              </h2>
              <div className="bg-gold/10 border border-gold/30 rounded-xl p-4 mb-4">
                <p className="font-semibold text-navy">
                  Você tem direito ao reembolso integral dentro de 7 dias corridos após a
                  contratação, sem necessidade de justificativa.
                </p>
              </div>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  O prazo começa a contar a partir da data da contratação (não da data de uso).
                </li>
                <li>
                  O reembolso é <strong>integral</strong>, independentemente de ter acessado ou
                  assistido algum curso durante esse período. O conteúdo acessado{' '}
                  <strong>não é motivo para recusa do reembolso</strong> dentro dos 7 dias.
                </li>
                <li>
                  O prazo de devolução do valor é de até{' '}
                  <strong>10 dias úteis</strong> após a solicitação aprovada, conforme o método de
                  pagamento utilizado.
                </li>
              </ul>
            </section>

            {/* 2. Cancelamento após 7 dias */}
            <section>
              <h2 className="text-xl font-bold text-navy mb-3">
                2. Cancelamento Após os 7 Dias
              </h2>
              <p>
                Após o período de arrependimento, o cancelamento pode ser feito a qualquer momento,
                mas <strong>sem direito a reembolso proporcional</strong>:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>
                  <strong>Plano Mensal:</strong> o cancelamento encerra a renovação automática.
                  Você mantém o acesso até o fim do período mensal já pago.
                </li>
                <li>
                  <strong>Plano Anual (R$588/ano):</strong> o cancelamento encerra a renovação
                  automática anual. Você mantém o acesso até o fim do ano já pago. Não há reembolso
                  proporcional pelos meses não utilizados após os 7 dias iniciais.
                </li>
              </ul>
            </section>

            {/* 3. Como Cancelar */}
            <section>
              <h2 className="text-xl font-bold text-navy mb-3">3. Como Cancelar</h2>
              <p>Você pode cancelar sua assinatura por dois meios:</p>
              <ol className="list-decimal pl-6 mt-3 space-y-3">
                <li>
                  <strong>Portal do cliente Stripe (autoatendimento):</strong>{' '}
                  <a
                    href="https://billing.stripe.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:underline break-all"
                  >
                    https://billing.stripe.com
                  </a>
                  <br />
                  <span className="text-sm text-gray-500">
                    Acesse com o e-mail cadastrado na assinatura. Você pode cancelar, visualizar
                    faturas e gerenciar dados de pagamento sem precisar de suporte.
                  </span>
                </li>
                <li>
                  <strong>E-mail para nossa equipe:</strong>{' '}
                  <a
                    href="mailto:atendimento@excellentia-edu.com"
                    className="text-gold hover:underline"
                  >
                    atendimento@excellentia-edu.com
                  </a>
                  <br />
                  <span className="text-sm text-gray-500">
                    Informe o e-mail cadastrado e o motivo do cancelamento (opcional). Respondemos
                    em até 1 dia útil.
                  </span>
                </li>
              </ol>
            </section>

            {/* 4. Prazo de Reembolso */}
            <section>
              <h2 className="text-xl font-bold text-navy mb-3">4. Prazo de Reembolso</h2>
              <p>
                Após a aprovação da solicitação de reembolso (dentro do direito de arrependimento de
                7 dias), o valor será devolvido em até{' '}
                <strong>10 dias úteis</strong>. O prazo efetivo pode variar conforme a operadora do
                cartão de crédito ou banco utilizado.
              </p>
            </section>

            {/* 5. Dúvidas */}
            <section>
              <h2 className="text-xl font-bold text-navy mb-3">5. Dúvidas?</h2>
              <p>
                Se tiver qualquer dúvida sobre cancelamento, reembolso ou acesso após o cancelamento,
                entre em contato com nossa equipe:
              </p>
              <p className="mt-2">
                <a
                  href="mailto:atendimento@excellentia-edu.com"
                  className="text-gold hover:underline"
                >
                  atendimento@excellentia-edu.com
                </a>
              </p>
              <p className="mt-4">
                Você também pode consultar sua assinatura diretamente em{' '}
                <Link href="/assinatura" className="text-gold hover:underline">
                  nossos planos
                </Link>
                .
              </p>
            </section>

          </div>
        </div>
      </div>
    </section>
  )
}
