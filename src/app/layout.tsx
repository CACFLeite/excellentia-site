import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Excellentia — Profissionalizar a educação',
  description: 'Para professores que querem crescer. Para escolas que querem parar de improvisar. Carreira. Direitos. Saúde. Compliance.',
  keywords: 'professor, carreira docente, gestão de carreira, escola particular, NR1, Lei Lucas, compliance escolar, professionalização educação',
  authors: [{ name: 'Caio Leite' }],
  openGraph: {
    title: 'Excellentia — Profissionalizar a educação',
    description: 'Para professores que querem crescer. Para escolas que querem parar de improvisar.',
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
