import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Excellentia — Links',
  description: 'A plataforma do professor profissional. Carreira. Direitos. Saúde.',
}

export default function LinksLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
