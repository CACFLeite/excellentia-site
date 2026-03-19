import type { Metadata } from 'next'
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
        <span className="text-white text-2xl font-bold">
          Excel<span className="text-gold">lentia</span>
        </span>
      </header>

      {/* Hero */}
      <section className="bg-navy text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-gold text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wide">
            Processo Seletivo
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6">
            Seu currículo em 24h, feito por quem conhece o processo seletivo das escolas
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            17 anos de experiência em escolas particulares transformados em um currículo que chama atenção dos coordenadores certos.
          </p>
        </div>
      </section>

      {/* Video placeholder */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy rounded-2xl aspect-video flex items-center justify-center relative overflow-hidden shadow-xl">
            <div className="text-center text-white">
              <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-yellow-600 transition-colors">
                <svg className="w-10 h-10 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-gray-300 text-sm">Vídeo de apresentação</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: '✅', title: 'Entrega em 24h', desc: 'Você envia as informações, recebe o currículo pronto no dia seguinte.' },
              { icon: '🎯', title: 'Focado nas escolas', desc: 'Feito para passar pelo crivo de coordenadores de escolas particulares.' },
              { icon: '👨‍🏫', title: 'Experiência real', desc: 'Baseado em 17 anos participando e avaliando processos seletivos.' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-navy text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
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
              Preencha os campos abaixo e entraremos em contato em até 24 horas.
            </p>
          </div>
          <CurriculoForm />
        </div>
      </section>

      {/* Social proof */}
      <section className="py-12 bg-navy text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-gray-300 text-lg italic">
            &ldquo;Depois de 8 anos enviando currículos, finalmente entendi por que não estava sendo chamado. Reformulei com o Caio e em 3 semanas tive duas entrevistas.&rdquo;
          </p>
          <p className="mt-4 font-semibold text-gold">— Professor de História, São Paulo</p>
        </div>
      </section>
    </div>
  )
}
