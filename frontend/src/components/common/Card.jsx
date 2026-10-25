import React from 'react'

/**
 * Reusable Card component with warm rounded corners and subtle depth
 */
export function Card({
  children,
  className = '',
  interactive = false,
  variant = 'default',
  onClick,
  ...props
}) {
  const variants = {
    default: 'bg-white border-slate-200/80 shadow-xs',
    subtle: 'bg-slate-50/70 border-slate-200/60 shadow-none',
    elevated: 'bg-white border-slate-100 shadow-md',
    brand: 'bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 text-white border-brand-700 shadow-lg',
    accent: 'bg-accent-50/50 border-accent-200/80 shadow-xs',
  }

  const interactiveStyles = interactive
    ? 'cursor-pointer hover:shadow-md hover:-translate-y-0.5 hover:border-slate-300 transition-all duration-200'
    : ''

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border ${variants[variant] || variants.default} ${interactiveStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className = '', ...props }) {
  return (
    <div className={`p-6 pb-3 ${className}`} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ children, className = '', as: Component = 'h3', ...props }) {
  return (
    <Component
      className={`text-lg font-bold tracking-tight text-slate-900 ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}

export function CardDescription({ children, className = '', ...props }) {
  return (
    <p className={`text-sm text-slate-600 mt-1 leading-relaxed ${className}`} {...props}>
      {children}
    </p>
  )
}

export function CardContent({ children, className = '', ...props }) {
  return (
    <div className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className = '', ...props }) {
  return (
    <div
      className={`p-6 pt-3 border-t border-slate-100 flex items-center justify-between ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
