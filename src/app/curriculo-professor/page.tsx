import type { Metadata } from 'next'
import Image from 'next/image'
import CurriculoForm from './CurriculoForm'

export const metadata: Metadata = {
  title: 'Currículo Profissional para Professores — Excellentia',
  description:
    'Seu currículo em 24h, feito por quem conhece o processo seletivo das escolas particulares.',
}

export default function CurriculoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple LP header without full navbar links */}
      <header className="bg-navy py-4 px-6 flex justify-center">
        <Image src="/logo.png" alt="Excellentia" width={48} height={48} className="h-12 w-auto" />
      </header>

      {/* Hero */}
      <section className="bg-navy text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-gold text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wide">
            Processo Seletivo
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6">
            Currículo profissional para professores da educação privada
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Uma entrega objetiva para apresentar sua trajetória com clareza, organização e linguagem adequada aos processos seletivos escolares.
          </p>
        </div>
      </section>

      {/* Video — YouTube embed */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }} className="rounded-2xl shadow-xl overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/naDddYlS990"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { number: '01', title: 'Entrega em 24h', desc: 'Você envia as informações e recebe o currículo pronto no dia seguinte.' },
              { number: '02', title: 'Foco em escolas privadas', desc: 'Estrutura pensada para leitura de coordenação, direção e RH escolar.' },
              { number: '03', title: 'Leitura profissional', desc: 'Organização da experiência, formação e diferenciais em linguagem institucional.' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-xs text-gold font-bold uppercase tracking-widest mb-3">{item.number}</div>
                <h3 className="font-bold text-navy text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Método Excellentia */}
      <section className="py-16 bg-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-4xl font-extrabold mb-3">
            Mais do que um currículo — uma prévia do método Excellentia
          </h2>
          <p className="text-gray-300 text-lg mb-10">Cada curso da plataforma funciona assim:</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            {[
              {
                number: '01',
                title: 'Base conceitual',
                desc: 'Conceito pedagógico claro, aplicado à realidade do professor',
              },
              {
                number: '02',
                title: 'Situação real',
                desc: 'Um cenário do cotidiano escolar que você vai enfrentar',
              },
              {
                number: '03',
                title: 'Sua resposta',
                desc: 'Você responde com suas próprias palavras, sem gabarito',
              },
              {
                number: '04',
                title: 'Feedback estruturado',
                desc: 'A IA analisa com rubricas invisíveis e devolve feedback personalizado para desenvolver suas skills',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white/10 border border-white/20 rounded-xl p-6 flex gap-4 items-start hover:bg-white/15 transition-colors"
              >
                <span className="h-10 w-10 rounded-full bg-gold/15 text-gold font-extrabold flex-none flex items-center justify-center">{card.number}</span>
                <div>
                  <h3 className="font-bold text-gold text-lg mb-1">{card.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 text-xl font-semibold text-gold">
            Sem depender de múltipla escolha. O foco é desenvolvimento profissional com contexto, critério e devolutiva.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-navy mb-3">
              Quero meu currículo profissional
            </h2>
            <p className="text-gray-600">
              Preencha os campos abaixo e enviaremos seu currículo em até 24 horas.
            </p>
          </div>
          <CurriculoForm />
        </div>
      </section>

    </div>
  )
}
