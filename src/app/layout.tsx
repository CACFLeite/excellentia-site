import type { Metadata } from 'next'
import { IBM_Plex_Sans, Plus_Jakarta_Sans } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-brand',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Excellentia — Governança e compliance para escolas de excelência',
  description: 'Formações, protocolos, evidências e inteligência educacional para escolas que precisam formar, comprovar e proteger.',
  keywords: 'governança educacional, compliance escolar, formações escolares, NR1, Lei Lucas, LGPD escolas, PGR escolas, evidências escolares',
  authors: [{ name: 'Caio Leite' }],
  openGraph: {
    title: 'Excellentia — Governança e compliance para escolas de excelência',
    description: 'Formações, protocolos, evidências e inteligência educacional para uma gestão escolar mais segura e estruturada.',
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
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID

  return (
    <html lang="pt-BR">
      <head>
        {pixelId && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${pixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}
      </head>
      <body className={`${ibmPlexSans.variable} ${plusJakartaSans.variable}`}>
        {children}
      </body>
    </html>
  )
}
