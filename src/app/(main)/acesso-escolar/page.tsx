import type { Metadata } from 'next'
import Link from 'next/link'
import InviteActivation from './InviteActivation'

export const metadata: Metadata = {
  title: 'Acesso Corporativo — Excellentia',
  description: 'Ative seu acesso à plataforma Excellentia com o código fornecido pela sua escola.',
}

export default function AcessoEscolarPage({ searchParams }: { searchParams?: { convite?: string } }) {
  const token = searchParams?.convite

  return (
    <main className="min-h-screen bg-navy flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo / título */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center mx-auto mb-4 text-3xl">
            🏫
          </div>
          <h1 className="text-2xl font-bold text-white">Acesso Corporativo</h1>
          <p className="text-gray-400 mt-2 text-sm leading-relaxed">
            Sua escola contratou a Excellentia.<br />
            Use o código abaixo para ativar seu acesso.
          </p>
        </div>

        {token ? <InviteActivation token={token} /> : (
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <h2 className="text-navy font-bold text-lg mb-4">Como ativar seu acesso</h2>

          <ol className="space-y-4 mb-8">
            <li className="flex gap-3">
              <span className="flex-none w-7 h-7 rounded-full bg-navy text-white text-sm font-bold flex items-center justify-center">1</span>
              <div>
                <p className="text-gray-800 font-medium text-sm">Baixe o aplicativo Excellentia</p>
                <p className="text-gray-500 text-xs mt-0.5">Disponível para Android e iOS, ou acesse pelo navegador.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-none w-7 h-7 rounded-full bg-navy text-white text-sm font-bold flex items-center justify-center">2</span>
              <div>
                <p className="text-gray-800 font-medium text-sm">Crie sua conta ou faça login</p>
                <p className="text-gray-500 text-xs mt-0.5">Use seu e-mail profissional para facilitar o acesso.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-none w-7 h-7 rounded-full bg-gold text-white text-sm font-bold flex items-center justify-center">3</span>
              <div>
                <p className="text-gray-800 font-medium text-sm">Vá em Perfil → Acesso Corporativo</p>
                <p className="text-gray-500 text-xs mt-0.5">Digite o código fornecido pela sua escola para liberar o acesso.</p>
              </div>
            </li>
          </ol>

          {/* Destaque do código */}
          <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-5 text-center mb-6">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Você vai precisar do código</p>
            <p className="text-navy font-bold text-base">Recebido por e-mail da sua escola</p>
            <p className="text-gray-500 text-xs mt-1">Formato: SIGLA-ANO-XXXX (ex: BIS-2026-A3F7)</p>
          </div>

          <a
            href="https://excellentia-edu.web.app"
            className="block w-full bg-gold hover:bg-yellow-600 text-white font-bold py-3 rounded-lg text-center transition-colors text-sm"
          >
            Acessar a plataforma →
          </a>
        </div>
        )}

        {/* Links adicionais */}
        <div className="text-center mt-6 space-y-2">
          <p className="text-gray-500 text-sm">
            Não recebeu o código?{' '}
            <Link href="/contato" className="text-gold hover:underline">
              Entre em contato
            </Link>
          </p>
          <p className="text-gray-600 text-sm">
            Sou professor independente →{' '}
            <Link href="/assinatura" className="text-gold hover:underline">
              Ver planos individuais
            </Link>
          </p>
          <p className="text-gray-600 text-sm">
            Sou gestor escolar →{' '}
            <Link href="/contato" className="text-gold hover:underline">
              Quero contratar para minha escola
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
