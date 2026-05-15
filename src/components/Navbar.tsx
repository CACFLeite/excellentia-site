'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const navItems = [
  { label: 'Início', href: '/' },
  { label: 'Professores', href: '/formacoes' },
  { label: 'Escolas', href: '/escolas' },
  { label: 'Inteligência Educacional', href: '/inteligencia-educacional' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Contato', href: '/contato' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="excellentia-nav-surface sticky top-0 z-50 border-b border-gold-light/10 text-white shadow-[0_18px_50px_rgba(2,6,11,.22)] backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-6">
          <Link href="/" className="flex h-20 w-28 shrink-0 items-center overflow-hidden sm:w-32" onClick={() => setMenuOpen(false)}>
            <Image
              src="/logo.png"
              alt="Excellentia"
              width={180}
              height={180}
              className="h-24 w-24 max-w-none object-contain sm:h-28 sm:w-28"
              priority
            />
          </Link>

          <div className="hidden items-center gap-5 lg:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm font-semibold transition-colors hover:text-gold-light">
                {item.label}
              </Link>
            ))}
            <Link
              href="/admin/login"
              className="rounded-full border border-gold-light/50 bg-gold px-5 py-2.5 text-sm font-black text-white shadow-lg shadow-gold/20 transition hover:-translate-y-0.5 hover:bg-yellow-600"
            >
              Acessar painel
            </Link>
          </div>

          <button
            className="rounded-md p-2 transition-colors hover:bg-white/10 lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-gold-light/10 bg-[#06101c]/95 lg:hidden">
          <div className="flex flex-col gap-1 px-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-3 font-semibold transition-colors hover:bg-white/10 hover:text-gold-light"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/admin/login"
              className="mt-2 rounded-2xl bg-gold px-3 py-3 text-center font-black text-white transition-colors hover:bg-yellow-600"
              onClick={() => setMenuOpen(false)}
            >
              Acessar painel
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
