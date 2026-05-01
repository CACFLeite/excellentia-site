import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sobre — Excellentia',
  description: 'Conheça a origem institucional da Excellentia: formação, carreira e conformidade para a educação privada.'
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
              Uma empresa construída a partir da experiência concreta da educação privada e das exigências reais de gestão escolar.
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
                  src="/caio-hero.jpg"
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
                A Excellentia foi fundada por Caio Leite, professor com 17 anos de atuação na rede privada de São Paulo, com passagem por diferentes modelos escolares, processos seletivos, rotinas pedagógicas e contextos institucionais.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Essa experiência revelou uma lacuna recorrente: escolas operando com processos formativos e documentais frágeis, e professores tentando construir carreira sem orientação prática sobre posicionamento, direitos, saúde profissional e desempenho em processos seletivos.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                A formação inicial ensina fundamentos pedagógicos, mas raramente organiza a dimensão profissional e institucional do trabalho docente: carreira, documentação, conformidade, comunicação, riscos psicossociais e evidências de formação.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                A Excellentia nasce dessa lacuna: uma plataforma para profissionalizar a relação entre escolas, professores, formação continuada e obrigações operacionais da educação privada.
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
                  <div className="text-2xl font-extrabold text-gold">5</div>
                  <div className="text-sm text-gray-300">frentes de atuação</div>
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
            <h2 className="section-title">Frentes de atuação da Excellentia</h2>
            <p className="section-subtitle">
              Áreas integradas para apoiar escolas e professores com método, evidência e continuidade.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: '01',
                title: 'Carreira docente',
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
                title: 'Conformidade e direitos',
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
                title: 'Saúde profissional',
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
                  <div className="h-11 w-11 rounded-full bg-gold/10 text-gold font-extrabold flex items-center justify-center">{pillar.number}</div>
                  <div>
                    <div className="text-xs text-gold font-bold uppercase tracking-widest">Frente {pillar.number}</div>
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
          <h2 className="text-3xl font-bold mb-4">Uma plataforma para profissionalizar a educação privada.</h2>
          <p className="text-gray-300 mb-8">
            Escolas encontram estrutura operacional. Professores encontram desenvolvimento de carreira.
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
