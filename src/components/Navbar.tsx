'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-navy text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Excellentia"
              width={180}
              height={180}
              className="h-20 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/cursos" className="hover:text-gold-light transition-colors font-medium">
              Cursos
            </Link>
            <Link href="/blog" className="hover:text-gold-light transition-colors font-medium">
              Blog
            </Link>
            <Link href="/sobre" className="hover:text-gold-light transition-colors font-medium">
              Sobre
            </Link>
            <Link href="/contato" className="hover:text-gold-light transition-colors font-medium">
              Contato
            </Link>
            <Link
              href="/assinatura"
              className="bg-gold hover:bg-yellow-600 text-white font-semibold px-5 py-2 rounded-lg transition-colors"
            >
              Assinar
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-navy-light transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-navy-dark border-t border-navy-light">
          <div className="px-4 py-4 flex flex-col gap-4">
            <Link
              href="/cursos"
              className="hover:text-gold-light transition-colors font-medium py-2"
              onClick={() => setMenuOpen(false)}
            >
              Cursos
            </Link>
            <Link
              href="/blog"
              className="hover:text-gold-light transition-colors font-medium py-2"
              onClick={() => setMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/sobre"
              className="hover:text-gold-light transition-colors font-medium py-2"
              onClick={() => setMenuOpen(false)}
            >
              Sobre
            </Link>
            <Link
              href="/contato"
              className="hover:text-gold-light transition-colors font-medium py-2"
              onClick={() => setMenuOpen(false)}
            >
              Contato
            </Link>
            <Link
              href="/assinatura"
              className="bg-gold hover:bg-yellow-600 text-white font-semibold px-5 py-3 rounded-lg transition-colors text-center"
              onClick={() => setMenuOpen(false)}
            >
              Assinar
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
