import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <CookieBanner />

      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/5511952133049?text=Olá!%20Vim%20pelo%20site%20da%20Excellentia"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar pelo WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg bg-[#25D366] hover:bg-[#1ebe57] transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="white"
          className="w-8 h-8"
        >
          <path d="M16 0C7.163 0 0 7.163 0 16c0 2.823.737 5.469 2.027 7.768L0 32l8.469-2.009A15.938 15.938 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 0 1-6.771-1.849l-.485-.288-5.027 1.192 1.213-4.897-.316-.5A13.267 13.267 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.878c-.398-.199-2.355-1.162-2.72-1.294-.365-.133-.631-.199-.897.199-.266.398-1.03 1.294-1.262 1.56-.232.266-.465.299-.863.1-.398-.199-1.682-.62-3.204-1.977-1.184-1.056-1.984-2.361-2.216-2.759-.232-.398-.025-.613.174-.811.179-.178.398-.465.597-.698.199-.232.266-.398.398-.664.133-.266.066-.498-.033-.697-.1-.199-.897-2.162-1.229-2.96-.324-.778-.653-.672-.897-.684-.232-.012-.498-.015-.764-.015-.266 0-.697.1-1.062.498-.365.398-1.394 1.362-1.394 3.324 0 1.962 1.427 3.858 1.626 4.124.199.266 2.808 4.286 6.803 5.999.951.41 1.693.655 2.272.839.954.304 1.822.261 2.508.158.765-.114 2.355-.963 2.688-1.893.332-.93.332-1.727.232-1.893-.1-.166-.365-.266-.763-.465z" />
        </svg>
      </a>
    </>
  )
}
