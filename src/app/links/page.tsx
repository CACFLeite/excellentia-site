'use client'

import Link from 'next/link'

// ─── Adicionar ou remover links aqui ───────────────────────────────────────
const LINKS = [
  {
    emoji: '🎓',
    label: 'Currículo Gratuito em 24h',
    description: 'Monte seu currículo profissional com a gente',
    href: '/curriculo-professor',
  },
  {
    emoji: '📖',
    label: 'Blog — Carreira Docente',
    description: 'Artigos sobre carreira, direitos e saúde do professor',
    href: '/blog',
  },
  // { emoji: '🛒', label: 'Assinar a Plataforma', description: '...', href: '/assinatura' },
]
// ────────────────────────────────────────────────────────────────────────────

export default function LinksPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#0a2749',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {/* Cabeçalho */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            backgroundColor: '#b07908',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            fontSize: '2rem',
          }}
        >
          🎓
        </div>
        <h1
          style={{
            color: '#ffffff',
            fontSize: '1.5rem',
            fontWeight: 700,
            margin: '0 0 0.5rem',
            letterSpacing: '-0.02em',
          }}
        >
          Excellentia
        </h1>
        <p
          style={{
            color: '#94a3b8',
            fontSize: '0.9rem',
            margin: 0,
            maxWidth: 280,
          }}
        >
          A plataforma do professor profissional
        </p>
      </div>

      {/* Links */}
      <div
        style={{
          width: '100%',
          maxWidth: 400,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.875rem',
        }}
      >
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              backgroundColor: '#b07908',
              color: '#ffffff',
              borderRadius: '0.875rem',
              padding: '1rem 1.25rem',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              transition: 'background-color 0.15s ease, transform 0.1s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#8a5e06'
              ;(e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#b07908'
              ;(e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'
            }}
          >
            <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{link.emoji}</span>
            <div>
              <div style={{ lineHeight: 1.3 }}>{link.label}</div>
              {link.description && (
                <div
                  style={{
                    fontSize: '0.78rem',
                    color: 'rgba(255,255,255,0.75)',
                    fontWeight: 400,
                    marginTop: '0.2rem',
                  }}
                >
                  {link.description}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Rodapé */}
      <p
        style={{
          color: '#475569',
          fontSize: '0.75rem',
          marginTop: '2.5rem',
          textAlign: 'center',
        }}
      >
        © 2026 Excellentia · CACFL Educacional LTDA
      </p>
    </main>
  )
}
