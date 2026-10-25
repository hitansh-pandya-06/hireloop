import React from 'react'
import {
  Clock,
  Eye,
  Star,
  CheckCircle,
  XCircle,
  SendHorizontal,
} from 'lucide-react'

/**
 * StatusPill component for transparent application workflow tracking:
 * - applied: Candidate applied
 * - under_review: Recruiter is evaluating profile
 * - shortlisted: Candidate selected for interview/next step
 * - selected: Offer made / hired
 * - rejected: Not moving forward
 */
export default function StatusPill({ status = 'applied', size = 'md' }) {
  const configs = {
    applied: {
      label: 'Applied',
      icon: SendHorizontal,
      styles: 'bg-sky-50 text-sky-700 border-sky-200/80',
      dotClass: 'bg-sky-500',
    },
    under_review: {
      label: 'Under Review',
      icon: Eye,
      styles: 'bg-amber-50 text-amber-700 border-amber-200/80',
      dotClass: 'bg-amber-500 animate-pulse',
    },
    shortlisted: {
      label: 'Shortlisted',
      icon: Star,
      styles: 'bg-teal-50 text-teal-700 border-teal-200/80',
      dotClass: 'bg-teal-600',
    },
    selected: {
      label: 'Selected / Offer',
      icon: CheckCircle,
      styles: 'bg-emerald-50 text-emerald-800 border-emerald-200/80 font-semibold',
      dotClass: 'bg-emerald-600',
    },
    rejected: {
      label: 'Not Selected',
      icon: XCircle,
      styles: 'bg-slate-100 text-slate-600 border-slate-200',
      dotClass: 'bg-slate-400',
    },
  }

  const current = configs[status] || configs.applied
  const Icon = current.icon

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-medium',
  }

  return (
    <span
      className={`inline-flex items-center rounded-full border shadow-2xs select-none ${
        current.styles
      } ${sizeClasses[size] || sizeClasses.md}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${current.dotClass}`} />
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <span>{current.label}</span>
    </span>
  )
}
