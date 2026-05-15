import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="mt-auto bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
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
            <p className="mt-3 text-sm leading-relaxed text-gray-300">
              Governança e compliance para escolas de excelência.<br />
              Formação. Evidência. Gestão educacional.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-gold">Navegação</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/professores" className="transition-colors hover:text-gold-light">Professores</Link></li>
              <li><Link href="/escolas" className="transition-colors hover:text-gold-light">Escolas</Link></li>
              <li><Link href="/inteligencia-educacional" className="transition-colors hover:text-gold-light">Inteligência Educacional</Link></li>
              <li><Link href="/sobre" className="transition-colors hover:text-gold-light">Sobre</Link></li>
              <li><Link href="/contato" className="transition-colors hover:text-gold-light">Contato</Link></li>
              <li><Link href="/curriculo-professor" className="transition-colors hover:text-gold-light">LP Currículo</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-gold">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/privacidade" className="transition-colors hover:text-gold-light">Política de Privacidade</Link></li>
              <li><Link href="/cancelamento" className="transition-colors hover:text-gold-light">Política de Cancelamento</Link></li>
              <li><Link href="/privacidade" className="transition-colors hover:text-gold-light">Termos de Uso</Link></li>
            </ul>
            <h3 className="mb-4 mt-6 font-semibold text-gold">Contato</h3>
            <p className="text-sm text-gray-300">
              <a href="mailto:atendimento@excellentia-edu.com" className="transition-colors hover:text-gold-light">
                atendimento@excellentia-edu.com
              </a>
            </p>
            <p className="mt-1 text-sm text-gray-300">
              <a href="mailto:juridico@excellentia-edu.com" className="transition-colors hover:text-gold-light">
                juridico@excellentia-edu.com
              </a>{' '}
              <span className="text-xs text-gray-500">(jurídico/LGPD)</span>
            </p>
            <p className="mt-2 text-sm text-gray-300">São Paulo, Brasil</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-navy-light pt-8 text-sm text-gray-400 md:flex-row">
          <p>CACFL Educacional — CNPJ 50.939.805/0001-73 — © 2026 Excellentia. Todos os Direitos Reservados.</p>
          <p>Desenvolvido para uma educação mais segura, estruturada e preparada.</p>
        </div>
      </div>
    </footer>
  )
}
