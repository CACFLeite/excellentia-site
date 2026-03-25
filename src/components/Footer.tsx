import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-navy text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Excellentia"
                width={120}
                height={120}
                className="h-16 w-auto"
              />
            </Link>
            <p className="mt-3 text-gray-300 text-sm leading-relaxed">
              A plataforma do professor profissional.<br />
              Carreira. Direitos. Saúde.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-gold mb-4">Navegação</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><Link href="/cursos" className="hover:text-gold-light transition-colors">Cursos</Link></li>
              <li><Link href="/curriculo-professor" className="hover:text-gold-light transition-colors">LP Currículo</Link></li>
              <li><Link href="/blog" className="hover:text-gold-light transition-colors">Blog</Link></li>
              <li><Link href="/sobre" className="hover:text-gold-light transition-colors">Sobre</Link></li>
              <li><Link href="/contato" className="hover:text-gold-light transition-colors">Contato</Link></li>
              <li><Link href="/assinatura" className="hover:text-gold-light transition-colors">Assinatura</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-gold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><Link href="/privacidade" className="hover:text-gold-light transition-colors">Política de Privacidade</Link></li>
              <li><Link href="/cancelamento" className="hover:text-gold-light transition-colors">Política de Cancelamento</Link></li>
              <li><Link href="/privacidade" className="hover:text-gold-light transition-colors">Termos de Uso</Link></li>
            </ul>
            <h3 className="font-semibold text-gold mb-4 mt-6">Contato</h3>
            <p className="text-gray-300 text-sm">
              <a href="mailto:atendimento@excellentia-edu.com" className="hover:text-gold-light transition-colors">
                atendimento@excellentia-edu.com
              </a>
            </p>
            <p className="text-gray-300 text-sm mt-2">São Paulo, Brasil</p>
          </div>
        </div>

        <div className="border-t border-navy-light mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>CACFL Educacional — CNPJ 50.939.805/0001-73 — © 2026 Excellentia. Todos os Direitos Reservados.</p>
          <p>Desenvolvido com ♥ para os professores do Brasil</p>
        </div>
      </div>
    </footer>
  )
}
