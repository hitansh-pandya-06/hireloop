import React from 'react'

/**
 * Reusable Badge Component
 * Used for career stages, skills, match scores, and tags
 */
export default function Badge({
  children,
  variant = 'brand',
  size = 'md',
  dot = false,
  icon: Icon,
  className = '',
}) {
  const variants = {
    brand: 'bg-brand-50 text-brand-700 border-brand-200/80',
    accent: 'bg-accent-50 text-accent-700 border-accent-200/80',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    info: 'bg-sky-50 text-sky-700 border-sky-200',
    stageStudent: 'bg-blue-50 text-blue-700 border-blue-200',
    stageSenior: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    stageReturner: 'bg-amber-50 text-amber-700 border-amber-200',
  }

  const dotColors = {
    brand: 'bg-brand-500',
    accent: 'bg-accent-500',
    neutral: 'bg-slate-400',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    info: 'bg-sky-500',
    stageStudent: 'bg-blue-500',
    stageSenior: 'bg-indigo-500',
    stageReturner: 'bg-amber-500',
  }

  const sizes = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3 py-1.5 gap-2 font-medium',
  }

  return (
    <span
      className={`inline-flex items-center rounded-full border transition-colors ${
        variants[variant] || variants.brand
      } ${sizes[size] || sizes.md} ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            dotColors[variant] || 'bg-brand-500'
          }`}
        />
      )}
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      <span>{children}</span>
    </span>
  )
}
