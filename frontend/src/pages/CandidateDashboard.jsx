import React, { useState, useEffect } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  StatusPill,
  Button,
  Modal,
} from '../components/common'
import {
  UserCheck,
  Sparkles,
  Briefcase,
  Bot,
  Video,
  LayoutGrid,
  Bell,
  ArrowRight,
  RotateCcw,
  GraduationCap,
  MapPin,
  DollarSign,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  Check,
  Send,
  Database,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import OnboardingWizard from '../components/candidate/OnboardingWizard'
import ApplicationTracker from '../components/candidate/ApplicationTracker'
import { INITIAL_JOBS } from '../data/mockJobs'
import { fetchJobsApi, createApplicationApi } from '../services/api'

export default function CandidateDashboard({ onNavigate }) {
  const { user, logout } = useAuth()

  // Track whether wizard is visible or completed
  const [isOnboarding, setIsOnboarding] = useState(false)
  const [candidateProfile, setCandidateProfile] = useState({
    careerStage: user?.careerStage || 'returner',
    headline: user?.title || 'Senior React & Design Systems Specialist',
    breakDetails: user?.breakDetails || '3-year career break for family care; upskilled in React 19 & Tailwind',
    skills: ['React 19', 'TypeScript', 'Tailwind CSS', 'System Design'],
    targetComp: '$165,000 - $195,000',
    preferredWorkplace: 'Remote',
  })

  // Tab State
  const [activeTab, setActiveTab] = useState('feed') // 'feed', 'applications', 'coach', 'sessions'

  // Job Feed State
  const [jobs, setJobs] = useState(INITIAL_JOBS)
  const [filterStage, setFilterStage] = useState('all') // 'all', 'high_match', 'returner', 'remote'
  const [searchQuery, setSearchQuery] = useState('')

  // Load real jobs from FastAPI backend on mount
  useEffect(() => {
    async function loadLiveJobs() {
      const liveJobs = await fetchJobsApi()
      if (liveJobs && liveJobs.length > 0) {
        setJobs(liveJobs)
      }
    }
    loadLiveJobs()
  }, [])

  // Apply Toast state
  const [applyModalJob, setApplyModalJob] = useState(null)
  const [appliedSuccessToast, setAppliedSuccessToast] = useState(null)

  const handleOnboardingComplete = (data) => {
    setCandidateProfile({
      ...candidateProfile,
      ...data,
      headline: data.targetRole || candidateProfile.headline,
      breakDetails: data.breakActivities || candidateProfile.breakDetails,
    })
    setIsOnboarding(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleApply = async (job) => {
    setApplyModalJob(null)
    
    // Save to FastAPI + SQLite backend
    const candId = typeof user?.id === 'number' ? user.id : 1
    const res = await createApplicationApi(
      job.id,
      candId,
      `1-Click Application from ${user?.name || 'Elena Rostova'} (${candidateProfile.careerStage})`
    )

    setAppliedSuccessToast({
      jobTitle: job.title,
      company: job.company,
      persisted: !!res?.success,
    })

    setTimeout(() => {
      setAppliedSuccessToast(null)
    }, 5000)
  }

  // Filtered Jobs
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))

    if (!matchesSearch) return false

    if (filterStage === 'high_match') return job.matchScore >= 94
    if (filterStage === 'returner') return job.stageFocus === 'Returner-Friendly'
    if (filterStage === 'remote') return job.workplaceType === 'Remote'
    return true
  })

  const stageLabels = {
    returner: 'Career Returner',
    student: 'Student / Recent Grad',
    senior: 'Senior Professional',
  }

  if (isOnboarding) {
    return (
      <div className="py-6">
        <OnboardingWizard
          initialStage={candidateProfile.careerStage}
          onComplete={handleOnboardingComplete}
        />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Candidate Stage Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-900 via-brand-800 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant={
                  candidateProfile.careerStage === 'returner'
                    ? 'stageReturner'
                    : candidateProfile.careerStage === 'student'
                    ? 'stageStudent'
                    : 'stageSenior'
                }
                size="md"
              >
                {stageLabels[candidateProfile.careerStage] || 'Career Returner'}
              </Badge>
              <span className="text-xs text-brand-200">
                • {candidateProfile.preferredWorkplace} • Verified Track
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
              Welcome back, {user?.name || 'Elena'}!
            </h1>
            <p className="text-xs sm:text-sm text-brand-100 leading-relaxed">
              {candidateProfile.headline}
            </p>

            {candidateProfile.careerStage === 'returner' && candidateProfile.breakDetails && (
              <div className="pt-1 text-xs text-brand-200 flex items-center gap-2">
                <RotateCcw className="w-3.5 h-3.5 text-accent-400 shrink-0" />
                <span className="truncate">
                  Stage Narrative: <em>{candidateProfile.breakDetails}</em>
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsOnboarding(true)}
              className="bg-white/10 hover:bg-white/20 text-white border-white/20"
            >
              Edit Preferences
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={logout}
              className="bg-white text-slate-900"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Success Apply Toast Notification */}
      {appliedSuccessToast && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between shadow-md animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
              ✓
            </div>
            <div>
              <div className="font-bold text-sm flex items-center gap-2">
                <span>Application Submitted Successfully!</span>
                {appliedSuccessToast.persisted && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-800 font-semibold uppercase tracking-wider">
                    Persisted to DB
                  </span>
                )}
              </div>
              <div className="text-xs text-emerald-700">
                Applied to <strong>{appliedSuccessToast.jobTitle}</strong> at {appliedSuccessToast.company}. Zero-ghosting tracking live in your tracker.
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab('applications')}
            className="text-emerald-800 font-semibold"
          >
            View in Tracker →
          </Button>
        </div>
      )}

      {/* 2. Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
        {[
          { id: 'feed', label: 'Personalized Job Feed', icon: Briefcase, count: filteredJobs.length },
          { id: 'applications', label: 'Application Tracker', icon: LayoutGrid, count: 4 },
          { id: 'coach', label: 'AI Interview Coach', icon: Bot },
          { id: 'sessions', label: 'Live HR AMAs', icon: Video },
        ].map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                isActive
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* ================= TAB 1: PERSONALIZED JOB FEED ================= */}
      {activeTab === 'feed' && (
        <div className="space-y-6">
          {/* Controls: Search and Stage Filter Pills */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search jobs by title, company, or skills (e.g. React, Python)..."
                className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-2xs"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              {[
                { id: 'all', label: 'All Matches' },
                { id: 'high_match', label: 'Top AI Fit (>92%)' },
                { id: 'returner', label: 'Returner-Friendly' },
                { id: 'remote', label: 'Remote Only' },
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setFilterStage(pill.id)}
                  className={`px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                    filterStage === pill.id
                      ? 'bg-brand-50 text-brand-700 border-brand-300 font-semibold'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* Job Feed Cards List */}
          <div className="space-y-4">
            {filteredJobs.length === 0 ? (
              <Card className="p-10 text-center text-slate-500">
                No matching jobs found for this search filter. Try adjusting your keywords.
              </Card>
            ) : (
              filteredJobs.map((job) => (
                <Card
                  key={job.id}
                  className="p-6 transition-all duration-200 hover:border-brand-300 hover:shadow-md bg-white space-y-4"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-slate-900">
                          {job.title}
                        </h3>
                        <Badge variant="success" dot size="sm">
                          {job.matchScore}% Match
                        </Badge>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5 flex flex-wrap items-center gap-3">
                        <span className="font-semibold text-slate-700">
                          {job.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1 text-slate-700 font-medium">
                          <DollarSign className="w-3 h-3 text-emerald-600" />{' '}
                          {job.salaryRange}
                        </span>
                        <span className="text-slate-400">• {job.postedAt}</span>
                      </div>
                    </div>

                    <Badge
                      variant={
                        job.stageFocus === 'Returner-Friendly'
                          ? 'stageReturner'
                          : job.stageFocus === 'Student-Friendly'
                          ? 'stageStudent'
                          : 'brand'
                      }
                      size="sm"
                    >
                      {job.stageFocus}
                    </Badge>
                  </div>

                  {/* Stage Benefit Pill */}
                  <div className="p-3 bg-brand-50/60 rounded-xl border border-brand-200/80 text-xs text-brand-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-accent-500 shrink-0" />
                    <span>
                      <strong>Why this fits your stage:</strong> {job.stageBenefit}
                    </span>
                  </div>

                  {/* Description preview */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {job.description}
                  </p>

                  {/* Skills pills */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Actions */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="text-xs text-slate-400">
                      Zero-Ghosting Policy • Fast 48hr feedback SLA
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        leftIcon={Bot}
                        onClick={() => setActiveTab('coach')}
                      >
                        Practice Role with AI
                      </Button>

                      <Button
                        variant="accent"
                        size="sm"
                        rightIcon={Send}
                        onClick={() => setApplyModalJob(job)}
                      >
                        1-Click Apply
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      )}

      {/* ================= TAB 2: APPLICATION TRACKER (STAGE 8) ================= */}
      {activeTab === 'applications' && (
        <ApplicationTracker
          onNavigate={onNavigate}
          onLaunchCoach={(company, title) => {
            setActiveTab('coach')
          }}
        />
      )}

      {/* ================= TAB 3: AI COACH SANDBOX ================= */}
      {activeTab === 'coach' && (
        <Card className="p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-accent-50 text-accent-600 flex items-center justify-center mx-auto">
            <Bot className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Interactive AI Interview Coach
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            Role-specific simulation calibrated to your career stage. Practice question prompts, receive instant constructive feedback, and boost your interview confidence.
          </p>
          <Button
            variant="accent"
            onClick={() => onNavigate('job-seekers')}
          >
            Launch Interview Coach Sandbox
          </Button>
        </Card>
      )}

      {/* ================= TAB 4: LIVE HR SESSIONS ================= */}
      {activeTab === 'sessions' && (
        <Card className="p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto">
            <Video className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Live HR Ask-Me-Anything Sessions
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            Connect directly with hiring managers from Cloudflare, Notion, and Datadog.
          </p>
          <Button
            variant="primary"
            onClick={() => onNavigate('job-seekers')}
          >
            Explore & RSVP for Upcoming Sessions
          </Button>
        </Card>
      )}

      {/* 1-Click Apply Confirmation Modal */}
      <Modal
        isOpen={!!applyModalJob}
        onClose={() => setApplyModalJob(null)}
        title={`Apply to ${applyModalJob?.title}`}
        description={`Submit application to ${applyModalJob?.company}`}
        footer={
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setApplyModalJob(null)}
            >
              Cancel
            </Button>
            <Button
              variant="accent"
              size="sm"
              rightIcon={Send}
              onClick={() => handleApply(applyModalJob)}
            >
              Confirm & Submit Application
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-xs sm:text-sm text-slate-600">
          <div className="p-4 bg-brand-50 rounded-xl border border-brand-200 space-y-2">
            <div className="font-bold text-brand-900">
              Profile Summary Transmitted:
            </div>
            <div>
              <strong>Career Stage:</strong>{' '}
              {stageLabels[candidateProfile.careerStage]}
            </div>
            {candidateProfile.careerStage === 'returner' && (
              <div>
                <strong>Break Narrative:</strong>{' '}
                {candidateProfile.breakDetails}
              </div>
            )}
            <div>
              <strong>Calculated Match:</strong> {applyModalJob?.matchScore}% Fit
            </div>
          </div>
          <p>
            Your application will be directly forwarded to the hiring team at{' '}
            <strong>{applyModalJob?.company}</strong> with our Zero-Ghosting guarantee.
          </p>
        </div>
      </Modal>
    </div>
  )
}
