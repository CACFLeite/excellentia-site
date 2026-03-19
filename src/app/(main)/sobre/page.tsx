import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sobre — Excellentia',
  description: 'Conheça Caio Leite, professor há 17 anos na rede privada de São Paulo e fundador da Excellentia.',
}

export default function SobrePage() {
  return (
    <>
      {/* Header */}
      <section className="bg-navy text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-block bg-gold text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
              Nossa história
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Sobre a Excellentia</h1>
            <p className="text-xl text-gray-300">
              De professor a fundador. Uma plataforma construída de dentro da sala de aula para fora.
            </p>
          </div>
        </div>
      </section>

      {/* Main bio section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="flex justify-center">
              <div className="relative w-80 h-96 md:w-96 md:h-[480px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/caio-leite.jpg"
                  alt="Caio Leite — Fundador da Excellentia"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 320px, 384px"
                />
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
                Caio Leite
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Professor há 17 anos na rede privada de São Paulo, já passei por escolas de todos os tipos — do colegiado tradicional ao bilíngue, do sistema de apostila ao projeto pedagógico alternativo. Participei de mais processos seletivos do que consigo contar.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                E em todos esses anos, percebi um problema que ninguém resolve: professores excelentes perdendo oportunidades por não saberem como se apresentar. Currículos errados. Entrevistas mal conduzidas. Aulas teste que destroçam professores experientes.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                A faculdade ensina didática, pedagogia, metodologia — mas não ensina como <em>construir uma carreira docente</em>. Não fala de direitos trabalhistas, de saúde emocional, de como navegar a política interna das escolas.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                A Excellentia nasceu dessa lacuna. É a plataforma que eu gostaria que existisse quando comecei.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-navy text-white rounded-xl px-5 py-3 text-center">
                  <div className="text-2xl font-extrabold text-gold">17+</div>
                  <div className="text-sm text-gray-300">anos de experiência</div>
                </div>
                <div className="bg-navy text-white rounded-xl px-5 py-3 text-center">
                  <div className="text-2xl font-extrabold text-gold">SP</div>
                  <div className="text-sm text-gray-300">rede privada</div>
                </div>
                <div className="bg-navy text-white rounded-xl px-5 py-3 text-center">
                  <div className="text-2xl font-extrabold text-gold">3</div>
                  <div className="text-sm text-gray-300">pilares de atuação</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title">Os 3 pilares da Excellentia</h2>
            <p className="section-subtitle">
              Três dimensões que todo professor profissional precisa dominar.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: '01',
                icon: '🎯',
                title: 'Carreira',
                items: [
                  'Currículo profissional para escolas particulares',
                  'Como se preparar para processos seletivos',
                  'Entrevistas e aula teste',
                  'Planejamento de aula e portfólio docente',
                  'Como negociar salário e carga horária',
                ],
              },
              {
                number: '02',
                icon: '⚖️',
                title: 'Direitos',
                items: [
                  'NR1 — Gestão de riscos psicossociais',
                  'Lei Lucas — Prevenção a afogamentos',
                  'Política de Salvaguarda',
                  'CLT para professores: o que você precisa saber',
                  'Assédio moral e sexual no ambiente escolar',
                ],
              },
              {
                number: '03',
                icon: '🧠',
                title: 'Saúde',
                items: [
                  'Burnout docente: identificar e prevenir',
                  'Limites saudáveis com alunos e pais',
                  'Gestão emocional em sala de aula',
                  'Autocuidado para professores',
                  'Como não carregar o trabalho para casa',
                ],
              },
            ].map((pillar) => (
              <div key={pillar.title} className="bg-white rounded-2xl shadow-md p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{pillar.icon}</span>
                  <div>
                    <div className="text-xs text-gold font-bold uppercase tracking-widest">Pilar {pillar.number}</div>
                    <h3 className="text-2xl font-bold text-navy">{pillar.title}</h3>
                  </div>
                </div>
                <ul className="space-y-2">
                  {pillar.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-gray-600 text-sm">
                      <span className="text-gold mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Pronto para levar sua carreira a sério?</h2>
          <p className="text-gray-300 mb-8">
            Junte-se à Excellentia e tenha acesso a todo o conteúdo por R$69/mês.
          </p>
          <Link
            href="/assinatura"
            className="bg-gold hover:bg-yellow-600 text-white font-bold px-10 py-4 rounded-xl text-lg transition-colors inline-block"
          >
            Começar agora
          </Link>
        </div>
      </section>
    </>
  )
}
