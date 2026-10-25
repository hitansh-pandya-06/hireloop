import React, { useState, useEffect } from 'react'
import { Card, Badge, StatusPill, Button, Modal } from '../common'
import {
  Kanban,
  Clock,
  Briefcase,
  CheckCircle2,
  Calendar,
  Eye,
  Star,
  XCircle,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Bot,
  Video,
  FileText,
  MapPin,
  DollarSign,
  Search,
  Database,
  RefreshCw,
} from 'lucide-react'
import { fetchApplicationsApi } from '../../services/api'

export default function ApplicationTracker({ onNavigate, onLaunchCoach }) {
  const [viewMode, setViewMode] = useState('kanban') // 'kanban' or 'timeline'
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAppModal, setSelectedAppModal] = useState(null)
  const [isSyncing, setIsSyncing] = useState(false)

  // Realistic sample applications in various pipeline stages
  const [applications, setApplications] = useState([
    {
      id: 'app-1',
      title: 'Senior Full-Stack Engineer',
      company: 'Cloudscale Systems',
      location: 'Remote (US & Canada)',
      salary: '$165,000 - $195,000',
      status: 'shortlisted',
      matchScore: 96,
      appliedDate: 'Oct 23, 2026',
      lastUpdated: 'Yesterday at 3:15 PM',
      timeline: [
        {
          stage: 'applied',
          date: 'Oct 23, 2026 • 10:42 AM',
          title: 'Application Submitted',
          desc: 'Application and stage narrative transmitted to hiring team.',
        },
        {
          stage: 'under_review',
          date: 'Oct 24, 2026 • 2:10 PM',
          title: 'Profile Evaluated by Sarah Vance',
          desc: 'High alignment with telemetry stack and mentoring culture noted.',
        },
        {
          stage: 'shortlisted',
          date: 'Oct 25, 2026 • 3:15 PM',
          title: 'Shortlisted for Technical Interview',
          desc: 'Interview scheduled with Director of Platform Architecture for Thursday at 2:00 PM EST.',
        },
      ],
      interviewer: 'David Vance (Director of Platform Architecture)',
      interviewDate: 'Thursday, 2:00 PM EST',
    },
    {
      id: 'app-2',
      title: 'Design Systems Lead',
      company: 'GitLab',
      location: 'Remote (Worldwide)',
      salary: '$170,000 - $205,000',
      status: 'under_review',
      matchScore: 94,
      appliedDate: 'Oct 25, 2026',
      lastUpdated: '4 hours ago',
      timeline: [
        {
          stage: 'applied',
          date: 'Oct 25, 2026 • 9:15 AM',
          title: 'Application Submitted',
          desc: 'Profile transmitted with focus on asynchronous component systems.',
        },
        {
          stage: 'under_review',
          date: 'Oct 25, 2026 • 1:30 PM',
          title: 'Hiring Team Review',
          desc: 'Assigned to Lead Product Designer for portfolio and WCAG accessibility check.',
        },
      ],
    },
    {
      id: 'app-3',
      title: 'Lead Frontend Architect',
      company: 'Automattic',
      location: 'Remote',
      salary: '$180,000 - $210,000',
      status: 'selected',
      matchScore: 98,
      appliedDate: 'Oct 15, 2026',
      lastUpdated: 'Today at 11:00 AM',
      timeline: [
        {
          stage: 'applied',
          date: 'Oct 15, 2026',
          title: 'Application Submitted',
          desc: 'Matched through Career Returner partnership track.',
        },
        {
          stage: 'shortlisted',
          date: 'Oct 18, 2026',
          title: 'Technical Discussion',
          desc: 'Completed practical system architecture trial.',
        },
        {
          stage: 'selected',
          date: 'Today • 11:00 AM',
          title: 'Formal Offer Letter Extended! 🎉',
          desc: 'Offer package sent for review with flexible 30-day onboarding ramp.',
        },
      ],
      offerDetails: 'Base: $195,000 + Equity + Unlimited PTO & Remote Stipend',
    },
    {
      id: 'app-4',
      title: 'Staff React Specialist',
      company: 'Stripe',
      location: 'San Francisco, CA / Remote',
      salary: '$190,000 - $225,000',
      status: 'applied',
      matchScore: 91,
      appliedDate: 'Today',
      lastUpdated: '1 hour ago',
      timeline: [
        {
          stage: 'applied',
          date: 'Today • 2:00 PM',
          title: 'Application Queued',
          desc: 'Application delivered directly to Developer Experience hiring group.',
        },
      ],
    },
  ])

  const loadLiveApps = async () => {
    setIsSyncing(true)
    try {
      const data = await fetchApplicationsApi()
      if (data && data.length > 0) {
        setApplications(data)
      }
    } finally {
      setIsSyncing(false)
    }
  }

  useEffect(() => {
    loadLiveApps()
  }, [])

  const columns = [
    {
      id: 'applied',
      title: 'Applied',
      color: 'border-sky-200 bg-sky-50/50 text-sky-800',
      badgeColor: 'info',
    },
    {
      id: 'under_review',
      title: 'Under Review',
      color: 'border-amber-200 bg-amber-50/50 text-amber-800',
      badgeColor: 'warning',
    },
    {
      id: 'shortlisted',
      title: 'Shortlisted',
      color: 'border-teal-200 bg-teal-50/50 text-teal-800',
      badgeColor: 'brand',
    },
    {
      id: 'selected',
      title: 'Selected / Offer',
      color: 'border-emerald-200 bg-emerald-50/50 text-emerald-800',
      badgeColor: 'success',
    },
    {
      id: 'rejected',
      title: 'Not Selected',
      color: 'border-slate-200 bg-slate-50/50 text-slate-700',
      badgeColor: 'neutral',
    },
  ]

  const filteredApps = applications.filter((app) => {
    return (
      app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.company.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  return (
    <div className="space-y-6">
      {/* Top Header & View Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-display">
              Transparent Application Pipeline
            </h2>
            <Badge variant="success" dot size="sm">
              Live DB Synced
            </Badge>
            <button
              onClick={loadLiveApps}
              title="Refresh live status from database"
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-brand-600' : ''}`} />
            </button>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time status tracking with automated updates whenever a recruiter takes action.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'kanban'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Kanban Board</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('timeline')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'timeline'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Timeline View</span>
            </button>
          </div>
        </div>
      </div>

      {/* ================= VIEW 1: KANBAN BOARD ================= */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
          {columns.map((col) => {
            const colApps = filteredApps.filter((a) => a.status === col.id)
            return (
              <div
                key={col.id}
                className="flex flex-col bg-slate-100/70 rounded-2xl p-3 border border-slate-200/80 min-w-[220px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 px-1 border-b border-slate-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    {col.title}
                  </span>
                  <span className="w-5 h-5 rounded-full bg-white text-slate-700 font-bold text-[11px] flex items-center justify-center border border-slate-200">
                    {colApps.length}
                  </span>
                </div>

                {/* Cards in this column */}
                <div className="pt-3 space-y-3 flex-1">
                  {colApps.length === 0 ? (
                    <div className="text-center py-8 text-[11px] text-slate-400 font-medium">
                      No applications
                    </div>
                  ) : (
                    colApps.map((app) => (
                      <Card
                        key={app.id}
                        interactive
                        onClick={() => setSelectedAppModal(app)}
                        className="p-4 bg-white shadow-2xs hover:shadow-md transition-all cursor-pointer border-slate-200 space-y-3"
                      >
                        <div className="flex items-start justify-between gap-1">
                          <div>
                            <h4 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug line-clamp-2">
                              {app.title}
                            </h4>
                            <p className="text-[11px] font-semibold text-brand-700 mt-0.5">
                              {app.company}
                            </p>
                          </div>
                          <Badge variant="success" size="sm">
                            {app.matchScore}%
                          </Badge>
                        </div>

                        {app.interviewDate && (
                          <div className="p-2 bg-brand-50 rounded-lg border border-brand-200 text-[10px] text-brand-900 flex items-center gap-1.5 font-medium">
                            <Calendar className="w-3 h-3 text-brand-600 shrink-0" />
                            <span className="truncate">{app.interviewDate}</span>
                          </div>
                        )}

                        {app.offerDetails && (
                          <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-200 text-[10px] text-emerald-900 font-semibold flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span>Offer Package Ready!</span>
                          </div>
                        )}

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                          <span>Updated {app.lastUpdated}</span>
                          <span className="text-brand-600 font-semibold group-hover:underline">
                            Details →
                          </span>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ================= VIEW 2: DETAILED TIMELINE ================= */}
      {viewMode === 'timeline' && (
        <div className="space-y-6">
          {filteredApps.map((app) => (
            <Card key={app.id} className="p-6 bg-white border border-slate-200 shadow-xs space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-900">
                      {app.title}
                    </h3>
                    <Badge variant="success" dot size="sm">
                      {app.matchScore}% Match
                    </Badge>
                  </div>
                  <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-3">
                    <span className="font-semibold text-slate-800">
                      {app.company}
                    </span>
                    <span>• {app.location}</span>
                    <span className="text-emerald-700 font-medium">
                      • {app.salary}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <StatusPill status={app.status} size="md" />
                  <Button
                    variant="ghost"
                    size="sm"
                    rightIcon={Bot}
                    onClick={() => {
                      if (onLaunchCoach) onLaunchCoach(app.company, app.title)
                    }}
                  >
                    Practice Role
                  </Button>
                </div>
              </div>

              {/* Sequential Event Timeline */}
              <div className="space-y-4 pl-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Application Lifecycle History:
                </div>
                <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {app.timeline.map((evt, idx) => (
                    <div key={idx} className="relative">
                      {/* Step Indicator Dot */}
                      <span className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-brand-600 border-2 border-white shadow-xs" />
                      <div className="text-xs text-slate-400 font-medium">
                        {evt.date}
                      </div>
                      <div className="text-sm font-bold text-slate-900 mt-0.5">
                        {evt.title}
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {evt.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* ================= APPLICATION DETAIL MODAL ================= */}
      {selectedAppModal && (
        <Modal
          isOpen={!!selectedAppModal}
          onClose={() => setSelectedAppModal(null)}
          title={selectedAppModal.title}
          description={`${selectedAppModal.company} • Applied ${selectedAppModal.appliedDate}`}
          footer={
            <div className="flex items-center justify-between w-full">
              <span className="text-xs text-slate-400">
                Application ID: {selectedAppModal.id}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedAppModal(null)}
                >
                  Close
                </Button>
                <Button
                  variant="accent"
                  size="sm"
                  leftIcon={Bot}
                  onClick={() => {
                    setSelectedAppModal(null)
                    if (onLaunchCoach) {
                      onLaunchCoach(selectedAppModal.company, selectedAppModal.title)
                    }
                  }}
                >
                  Practice Interview with AI
                </Button>
              </div>
            </div>
          }
        >
          <div className="space-y-4 text-xs sm:text-sm text-slate-700">
            {/* Status & Match Summary */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Current Pipeline Status:
                </div>
                <div className="mt-1">
                  <StatusPill status={selectedAppModal.status} size="lg" />
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  AI Fit Score:
                </div>
                <div className="text-xl font-extrabold text-emerald-600 mt-1">
                  {selectedAppModal.matchScore}%
                </div>
              </div>
            </div>

            {/* If Interview Scheduled */}
            {selectedAppModal.interviewDate && (
              <div className="p-4 rounded-xl bg-brand-50 border border-brand-200 space-y-1.5">
                <div className="font-bold text-brand-900 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-brand-600" />
                  <span>Confirmed Interview Scheduled</span>
                </div>
                <div className="text-xs text-brand-800">
                  <strong>Date & Time:</strong> {selectedAppModal.interviewDate}
                </div>
                <div className="text-xs text-brand-800">
                  <strong>Interviewer:</strong> {selectedAppModal.interviewer}
                </div>
              </div>
            )}

            {/* If Offer Extended */}
            {selectedAppModal.offerDetails && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1.5">
                <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Offer Letter Details</span>
                </div>
                <div className="text-xs text-emerald-800">
                  {selectedAppModal.offerDetails}
                </div>
              </div>
            )}

            {/* Event Audit Trail */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Timeline Audit Trail
              </h4>
              <div className="space-y-2 border-l-2 border-slate-200 pl-3">
                {selectedAppModal.timeline.map((evt, idx) => (
                  <div key={idx} className="text-xs">
                    <span className="font-bold text-slate-800">{evt.title}</span> —{' '}
                    <span className="text-slate-500">{evt.date}</span>
                    <p className="text-slate-600 mt-0.5">{evt.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
