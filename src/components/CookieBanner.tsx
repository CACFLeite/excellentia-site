'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setVisible(true)
    }
  }, [])

  const handleAcceptAll = () => {
    localStorage.setItem('cookie-consent', 'all')
    setVisible(false)
  }

  const handleEssentialOnly = () => {
    localStorage.setItem('cookie-consent', 'essential')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-white border border-gold/30 rounded-2xl shadow-lg p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
        <p className="text-gray-600 text-sm leading-relaxed flex-1">
          Usamos cookies essenciais para o funcionamento do site e cookies de análise para melhorar
          sua experiência. Ao continuar, você concorda com nossa{' '}
          <Link href="/privacidade" className="text-gold hover:underline font-medium">
            Política de Privacidade
          </Link>
          .
        </p>
        <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
          <button
            onClick={handleEssentialOnly}
            className="border-2 border-gold text-gold hover:bg-gold hover:text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors whitespace-nowrap"
          >
            Apenas essenciais
          </button>
          <button
            onClick={handleAcceptAll}
            className="bg-gold hover:bg-yellow-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors whitespace-nowrap"
          >
            Aceitar todos
          </button>
        </div>
      </div>
    </div>
  )
}
