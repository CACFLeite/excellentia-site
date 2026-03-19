import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Assinatura — Excellentia',
  description: 'Assine a Excellentia e acesse todos os cursos por R$69/mês. Garantia de 7 dias.',
}

const plans = [
  {
    id: 'monthly',
    name: 'Mensal',
    price: 'R$69',
    period: '/mês',
    savings: null,
    priceDetail: 'Cobrado mensalmente',
    href: 'https://buy.stripe.com/9B67sLcrc5Q55oG0nZ6c000',
    highlight: false,
  },
  {
    id: 'annual',
    name: 'Anual',
    price: 'R$588',
    period: '/ano',
    savings: 'Economize R$138',
    priceDetail: 'Equivale a R$49/mês',
    href: 'https://buy.stripe.com/cNi7sL4YK0vL7wO4Ef6c001',
    highlight: true,
  },
]

const benefits = [
  { icon: '🎯', text: 'Curso de Gestão de Carreira para Professores (completo)' },
  { icon: '📚', text: 'Acesso a todos os cursos futuros sem custo adicional' },
  { icon: '📝', text: 'Artigos e materiais exclusivos para assinantes' },
  { icon: '🎓', text: 'Certificado de conclusão em cada curso' },
  { icon: '📱', text: 'Acesso antecipado ao app Excellentia (em breve)' },
  { icon: '🔒', text: 'Cancele quando quiser, sem fidelidade' },
]

export default function AssinaturaPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-navy text-white py-16 md:py-24 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-block bg-gold text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wide">
            Planos Excellentia
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Invista na sua carreira
          </h1>
          <p className="text-xl text-gray-300">
            Menos de um café por semana. Acesso a todo o conteúdo da plataforma.
          </p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-2xl overflow-hidden shadow-lg ${
                  plan.highlight
                    ? 'border-4 border-gold relative'
                    : 'border-2 border-gray-200'
                }`}
              >
                {plan.highlight && (
                  <div className="bg-gold text-white text-center py-2 font-bold text-sm uppercase tracking-wide">
                    ⭐ Melhor valor
                  </div>
                )}
                <div className="bg-white p-8">
                  <h3 className="text-2xl font-bold text-navy mb-2">{plan.name}</h3>
                  <div className="flex items-end gap-1 mb-1">
                    <span className="text-5xl font-extrabold text-navy">{plan.price}</span>
                    <span className="text-gray-500 text-lg mb-2">{plan.period}</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-1">{plan.priceDetail}</p>
                  {plan.savings && (
                    <p className="text-gold font-semibold text-sm mb-6">{plan.savings}</p>
                  )}
                  {!plan.savings && <div className="mb-6" />}

                  <ul className="space-y-3 mb-8">
                    {benefits.map((benefit) => (
                      <li key={benefit.text} className="flex items-start gap-3">
                        <span className="text-xl flex-shrink-0">{benefit.icon}</span>
                        <span className="text-gray-700 text-sm leading-snug">{benefit.text}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={plan.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block text-center font-bold px-6 py-4 rounded-xl text-lg transition-colors ${
                      plan.highlight
                        ? 'bg-gold hover:bg-yellow-600 text-white'
                        : 'bg-navy hover:bg-navy-dark text-white'
                    }`}
                  >
                    Assinar {plan.name}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Guarantee */}
          <div className="bg-white rounded-2xl border-2 border-gold/30 p-8 text-center shadow-sm">
            <div className="text-5xl mb-4">🛡️</div>
            <h3 className="text-2xl font-bold text-navy mb-3">Garantia de 7 dias</h3>
            <p className="text-gray-600 max-w-xl mx-auto">
              Se por qualquer motivo você não ficar satisfeito nos primeiros 7 dias, devolvemos 100% do seu dinheiro. Sem perguntas, sem burocracia.
            </p>
          </div>

          {/* FAQ */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-navy mb-8 text-center">Perguntas frequentes</h2>
            <div className="space-y-6">
              {[
                {
                  q: 'Posso cancelar quando quiser?',
                  a: 'Sim. Não há fidelidade. Você cancela a assinatura a qualquer momento pelo próprio portal de pagamento, sem necessidade de contato.',
                },
                {
                  q: 'Quanto tempo tenho acesso após cancelar?',
                  a: 'Você mantém o acesso até o fim do período pago. Se for mensal, até o fim do mês. Se for anual, até o fim do ano.',
                },
                {
                  q: 'Os cursos futuros estão incluídos?',
                  a: 'Sim. Todos os cursos que forem adicionados à plataforma são automaticamente incluídos na assinatura sem custo adicional.',
                },
                {
                  q: 'A cobrança é automática?',
                  a: 'Sim, é uma assinatura recorrente. O plano mensal é cobrado todo mês. O plano anual é cobrado uma vez por ano.',
                },
              ].map((item) => (
                <div key={item.q} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h4 className="font-bold text-navy mb-2">{item.q}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="mt-16 bg-navy text-white rounded-2xl p-10 text-center">
            <h3 className="text-3xl font-bold mb-3">Ainda com dúvidas?</h3>
            <p className="text-gray-300 mb-6">
              Entre em contato com a gente. Respondemos em até 24 horas.
            </p>
            <a
              href="https://wa.me/5511999999999?text=Olá!%20Tenho%20dúvidas%20sobre%20a%20assinatura%20Excellentia"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white hover:bg-white hover:text-navy font-bold px-8 py-3 rounded-lg transition-colors inline-block"
            >
              Falar com o suporte
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
