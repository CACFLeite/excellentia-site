import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Soluções para Escolas — Excellentia',
  description: 'Treinamentos obrigatórios, formação continuada, certificados, PGR e evidências operacionais para escolas privadas.',
}

const gains = [
  {
    title: 'Conformidade sem corrida de última hora',
    text: 'A escola distribui formações obrigatórias ao longo do calendário que fizer sentido para sua operação, evitando concentração de treinamentos quando a exigência já estiver no limite.',
  },
  {
    title: 'Evidência organizada para fiscalização e defesa',
    text: 'Convites, conclusões, certificados, relatórios e documentos ficam estruturados para reduzir fragilidade em eventual denúncia, fiscalização ou processo.',
  },
  {
    title: 'Formação continuada com finalidade prática',
    text: 'O cumprimento legal deixa de ser apenas burocracia e passa a organizar aprendizagem útil para a rotina escolar e para o desenvolvimento dos professores.',
  },
  {
    title: 'Menos improviso para gestão e coordenação',
    text: 'A plataforma transforma obrigações dispersas em fluxo: cadastro, convite, curso, evidência, relatório e acompanhamento.',
  },
]

const formations = [
  'NR-1 e riscos psicossociais no ambiente escolar',
  'PGR/GRO e documentação operacional',
  'Lei Lucas e protocolos de segurança',
  'Prevenção e combate a incêndio / uso de extintores',
  'ECA digital, bullying, salvaguarda e proteção de dados',
  'Cursos personalizados para demandas específicas da escola',
]

const flow = [
  'Mapeamento da escola',
  'Cadastro de colaboradores',
  'Convites e trilhas formativas',
  'Certificados e relatórios',
  'PGR, evidências e acompanhamento',
]

export default function EscolasPage() {
  return (
    <>
      <section className="bg-navy text-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1.05fr_.95fr] gap-12 items-center">
          <div>
            <div className="inline-block bg-gold-light text-navy text-sm font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wide">
              Soluções para escolas privadas
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Transforme obrigações legais em calendário formativo, evidência e proteção institucional.
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed mb-10">
              A Excellentia ajuda escolas a organizar treinamentos obrigatórios, formação continuada, documentação operacional e registros de conformidade — sem depender de improviso quando a fiscalização, uma denúncia ou um processo já estiverem em curso.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contato" className="bg-gold hover:bg-gold-dark text-white font-bold px-8 py-4 rounded-lg text-lg transition-colors text-center">
                Solicitar proposta
              </Link>
              <Link href="/admin/login" className="border-2 border-white text-white hover:bg-white hover:text-navy font-bold px-8 py-4 rounded-lg text-lg transition-colors text-center">
                Já sou cliente
              </Link>
            </div>
          </div>

          <div className="bg-white/10 border border-white/20 rounded-3xl p-6 backdrop-blur-sm">
            <div className="text-sm uppercase tracking-[0.22em] text-gold-light font-bold mb-5">O que a escola ganha</div>
            <div className="space-y-4">
              {flow.map((step, index) => (
                <div key={step} className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-gold-light text-navy font-extrabold flex items-center justify-center">{index + 1}</div>
                  <div className="flex-1 rounded-xl bg-white/10 border border-white/15 px-4 py-3 font-semibold">{step}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="section-title text-left">Por que comprar agora</h2>
            <p className="section-subtitle text-left">
              O valor para a escola não está apenas em “ter cursos”. Está em ganhar tempo, previsibilidade e lastro documental enquanto a formação obrigatória acontece dentro de um calendário possível.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {gains.map((gain) => (
              <div key={gain.title} className="rounded-2xl border border-gray-200 p-7 shadow-sm bg-white">
                <h3 className="text-xl font-bold text-navy mb-3">{gain.title}</h3>
                <p className="text-gray-600 leading-relaxed">{gain.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[.9fr_1.1fr] gap-12 items-start">
          <div>
            <div className="inline-block bg-gold/10 text-gold font-semibold text-sm px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
              Formação obrigatória e continuada
            </div>
            <h2 className="section-title text-left">NR-1 é a urgência. A estrutura precisa ir além dela.</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              A Excellentia começa pelo que é mais urgente para muitas escolas, mas foi desenhada para sustentar uma agenda mais ampla: segurança, saúde, proteção de dados, convivência escolar, formação docente e documentação institucional.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {formations.map((item, index) => (
              <div key={item} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="text-xs text-gold font-bold uppercase tracking-widest mb-3">{String(index + 1).padStart(2, '0')}</div>
                <p className="font-semibold text-navy leading-snug">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-navy text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-5">A escola compra previsibilidade, evidência e redução de risco.</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-3xl mx-auto">
            Ao iniciar agora, a escola dilui formações ao longo do tempo, protege seu calendário pedagógico, documenta esforço real de adequação e cria uma base mais sólida para responder a exigências legais, famílias, colaboradores e autoridades.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contato" className="bg-gold hover:bg-gold-dark text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors">
              Falar com a Excellentia
            </Link>
            <Link href="/admin/login" className="border-2 border-white text-white hover:bg-white hover:text-navy font-bold px-8 py-4 rounded-xl text-lg transition-colors">
              Acessar painel da escola
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
