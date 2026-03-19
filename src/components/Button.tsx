import Link from 'next/link'

interface ButtonProps {
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  external?: boolean
}

export default function Button({
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  type = 'button',
  disabled = false,
  external = false,
}: ButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const variantClasses = {
    primary: 'bg-gold hover:bg-yellow-600 text-white font-semibold rounded-lg transition-colors duration-200',
    secondary: 'border-2 border-white text-white hover:bg-white hover:text-navy font-semibold rounded-lg transition-colors duration-200',
    outline: 'border-2 border-gold text-gold hover:bg-gold hover:text-white font-semibold rounded-lg transition-colors duration-200',
  }

  const baseClass = `inline-block ${sizeClasses[size]} ${variantClasses[variant]} ${className} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`

  if (href) {
    if (external) {
      return (
        <a href={href} className={baseClass} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={baseClass}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={baseClass}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
