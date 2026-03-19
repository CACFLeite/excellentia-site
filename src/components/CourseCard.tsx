import Link from 'next/link'

interface CourseCardProps {
  title: string
  description: string
  status: 'active' | 'coming-soon'
  price?: string
  href?: string
  icon?: string
}

export default function CourseCard({
  title,
  description,
  status,
  price,
  href,
  icon,
}: CourseCardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden border-2 transition-transform hover:-translate-y-1 ${
      status === 'active' ? 'border-gold' : 'border-gray-200'
    }`}>
      <div className={`h-2 ${status === 'active' ? 'bg-gold' : 'bg-gray-300'}`} />
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="text-4xl">{icon || '📚'}</div>
          {status === 'active' ? (
            <span className="bg-gold text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              Disponível
            </span>
          ) : (
            <span className="bg-gray-100 text-gray-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              Em breve
            </span>
          )}
        </div>
        <h3 className="text-xl font-bold text-navy mb-2">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">{description}</p>
        {price && status === 'active' && (
          <p className="text-gold font-bold text-lg mb-4">{price}</p>
        )}
        {status === 'active' && href ? (
          <Link
            href={href}
            className="btn-primary w-full block text-center"
          >
            Assinar agora
          </Link>
        ) : (
          <button
            disabled
            className="w-full bg-gray-100 text-gray-400 font-semibold px-6 py-3 rounded-lg cursor-not-allowed"
          >
            Em breve
          </button>
        )}
      </div>
    </div>
  )
}
