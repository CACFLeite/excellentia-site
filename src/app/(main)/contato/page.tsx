import type { Metadata } from 'next'
import ContatoForm from './ContatoForm'

export const metadata: Metadata = {
  title: 'Contato — Excellentia',
  description: 'Entre em contato com a Excellentia para assuntos de escolas, professores, cursos e suporte operacional.',
}

export default function ContatoPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-navy text-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Fale com a gente</h1>
            <p className="text-xl text-gray-300">
              Canal para escolas, professores e parceiros que precisam falar com a Excellentia.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact info */}
            <div className="lg:col-span-1">
              <h2 className="text-xl font-bold text-navy mb-6">Canais de contato</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gold/10 rounded-lg p-3 text-xs font-bold text-gold flex-shrink-0">E-mail</div>
                  <div>
                    <p className="font-semibold text-navy text-sm mb-1">E-mail</p>
                    <a
                      href="mailto:atendimento@excellentia-edu.com"
                      className="text-gold hover:text-gold-dark transition-colors text-sm"
                    >
                      atendimento@excellentia-edu.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-gold/10 rounded-lg p-3 text-xs font-bold text-gold flex-shrink-0">Prazo</div>
                  <div>
                    <p className="font-semibold text-navy text-sm mb-1">Tempo de resposta</p>
                    <p className="text-gray-600 text-sm">Em até 24 horas úteis</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-gold/10 rounded-lg p-3 text-xs font-bold text-gold flex-shrink-0">Base</div>
                  <div>
                    <p className="font-semibold text-navy text-sm mb-1">Localização</p>
                    <p className="text-gray-600 text-sm">São Paulo, SP — Brasil</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <ContatoForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
