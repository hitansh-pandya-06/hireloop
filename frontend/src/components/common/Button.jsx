import React from 'react'
import { Loader2 } from 'lucide-react'

/**
 * Reusable Button Component for HireLoop
 * Supports variants: primary (teal), accent (coral), secondary, ghost, danger
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  type = 'button',
  onClick,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none select-none'

  const variants = {
    // Primary: Deep Maritime Teal
    primary:
      'bg-brand-600 hover:bg-brand-700 text-white shadow-sm hover:shadow-brand-600/25 shadow-md focus:ring-brand-500',
    // Accent: Warm Coral / Amber for high-energy primary calls to action
    accent:
      'bg-accent-500 hover:bg-accent-600 text-white shadow-sm hover:shadow-accent-500/25 shadow-md focus:ring-accent-500',
    // Secondary: Clean white with subtle border
    secondary:
      'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-xs hover:border-slate-300 focus:ring-brand-500',
    // Ghost: Subtle hover background
    ghost:
      'bg-transparent hover:bg-slate-100 text-slate-700 hover:text-slate-900 focus:ring-brand-500',
    // Outline Teal:
    outline:
      'border-2 border-brand-600 text-brand-600 hover:bg-brand-50 focus:ring-brand-500',
    // Danger: For rejections / destructive actions
    danger:
      'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 focus:ring-rose-500',
  }

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 font-semibold',
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${
        sizes[size] || sizes.md
      } ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : LeftIcon ? (
        <LeftIcon className="w-4 h-4 shrink-0" />
      ) : null}

      <span>{children}</span>

      {!loading && RightIcon && <RightIcon className="w-4 h-4 shrink-0" />}
    </button>
  )
}
