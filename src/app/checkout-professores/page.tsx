import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Antes de assinar — Excellentia',
  description:
    'Complete sua assinatura Excellentia e veja a opção de receber uma lista curada de escolas para orientar sua busca profissional.',
}

const checkoutLinks: Record<string, string> = {
  monthly: 'https://buy.stripe.com/9B67sLcrc5Q55oG0nZ6c000',
  annual: 'https://buy.stripe.com/cNi7sL4YK0vL7wO4Ef6c001',
}

const planLabels: Record<string, string> = {
  monthly: 'plano mensal',
  annual: 'plano anual',
}

type SearchParams = {
  plan?: string
}

export default function CheckoutProfessoresPage({ searchParams }: { searchParams: SearchParams }) {
  const plan = searchParams.plan === 'annual' ? 'annual' : 'monthly'
  const checkoutUrl = checkoutLinks[plan]
  const planLabel = planLabels[plan]

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-navy text-white py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-gold text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-wide">
            Antes de concluir sua assinatura
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-5">
            Você já sabe onde vai tentar entrar?
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            A plataforma te prepara para o processo seletivo. A lista curada ajuda a transformar essa preparação em uma busca mais estratégica.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
            <p className="text-sm font-semibold text-gold uppercase tracking-wide mb-3">
              Oferta complementar
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
              Lista curada de escolas para sua região e perfil
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Em vez de sair mandando currículo para qualquer escola, você pode receber uma seleção de instituições com mais sentido para sua localização, área de atuação e ambição profissional.
            </p>

            <div className="bg-gold/10 border border-gold/30 rounded-xl p-5 mb-6">
              <p className="font-bold text-navy mb-2">Como isso deve funcionar</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• levantamento de escolas relevantes próximas à sua região ou grandes centros próximos;</li>
                <li>• organização da lista com critérios de oportunidade e aderência;</li>
                <li>• orientação para usar a lista junto com seu currículo e preparação de entrevista.</li>
              </ul>
            </div>

            <p className="text-sm text-gray-500 leading-relaxed">
              Esta oferta ainda está em fase de estruturação operacional. Se você quiser seguir agora, conclua sua assinatura normalmente. Quando a lista estiver disponível, ela poderá ser oferecida como complemento dentro do fluxo Excellentia.
            </p>
          </div>

          <aside className="bg-white rounded-2xl shadow-lg border-2 border-gold p-8 sticky top-6">
            <h3 className="text-xl font-bold text-navy mb-2">Continuar para o Stripe</h3>
            <p className="text-gray-600 text-sm mb-6">
              Você está indo para o {planLabel}. O pagamento é processado com segurança pela Stripe.
            </p>

            <a
              href={checkoutUrl}
              className="block w-full bg-gold hover:bg-yellow-600 text-white font-bold py-4 rounded-xl text-center text-lg transition-colors mb-4"
            >
              Continuar assinatura
            </a>

            <Link
              href="/assinatura"
              className="block w-full border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl text-center transition-colors"
            >
              Voltar aos planos
            </Link>

            <div className="mt-6 pt-6 border-t border-gray-100 text-xs text-gray-500 leading-relaxed">
              A lista curada não substitui sua decisão profissional. Ela serve como inteligência de busca para apoiar sua estratégia de candidatura.
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
