import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Excellentia — A plataforma do professor profissional',
  description: 'Carreira. Direitos. Saúde. Tudo que nenhuma faculdade te ensinou sobre ser professor.',
  keywords: 'professor, carreira docente, gestão de carreira, escola particular, currículo professor',
  authors: [{ name: 'Caio Leite' }],
  openGraph: {
    title: 'Excellentia — A plataforma do professor profissional',
    description: 'Carreira. Direitos. Saúde. Tudo que nenhuma faculdade te ensinou sobre ser professor.',
    url: 'https://excellentia-edu.com',
    siteName: 'Excellentia',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
