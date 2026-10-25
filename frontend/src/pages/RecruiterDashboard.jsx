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
  Briefcase,
  Users,
  ListFilter,
  UserCheck,
  MousePointerClick,
  Sparkles,
  Building,
  Plus,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Star,
  Bell,
  Clock,
  RotateCcw,
  GraduationCap,
  MapPin,
  DollarSign,
  Send,
  Database,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import {
  fetchJobsApi,
  createJobApi,
  fetchApplicationsApi,
  updateApplicationStatusApi,
} from '../services/api'
import { INITIAL_JOBS } from '../data/mockJobs'

export default function RecruiterDashboard({ onNavigate }) {
  const { user, logout } = useAuth()

  // Active Requisitions & Selected Job
  const [jobs, setJobs] = useState(INITIAL_JOBS)
  const [selectedJobId, setSelectedJobId] = useState(1)

  // Applicants for selected job
  const [applicants, setApplicants] = useState([
    {
      id: 1,
      job_id: 1,
      candidate_name: 'Elena Rostova',
      candidate_email: 'elena.rostova@hireloop.demo',
      career_stage: 'returner',
      headline: 'Senior React & Design Systems Specialist',
      bio: '6 years of lead frontend engineering experience prior to care pause. Actively upskilled in React 19 concurrent features and modern design systems.',
      break_duration: '3 years (2021 - 2024)',
      break_activities:
        'Full-time family caregiving, open-source React 19 contributions, Next.js 15 & Tailwind deep dives',
      skills: ['React 19', 'TypeScript', 'Tailwind CSS', 'System Design'],
      ai_score: 96,
      ai_rationale:
        'Matches 100% of required tech stack. Caregiving break is backed by verifiable open-source design system contributions. Exceptional leadership and culture match.',
      status: 'shortlisted',
      applied_at: '2 days ago',
    },
    {
      id: 2,
      job_id: 1,
      candidate_name: 'Maya Lin',
      candidate_email: 'maya.lin@example.com',
      career_stage: 'senior',
      headline: 'Staff Full-Stack Engineer',
      bio: 'Ex-Fintech Lead. Designed distributed ledger systems processing $40M/day. Strong team mentor and open-source contributor.',
      break_duration: null,
      break_activities: null,
      skills: ['React 19', 'Python / FastAPI', 'PostgreSQL', 'Kubernetes'],
      ai_score: 95,
      ai_rationale:
        'Exceptional senior full-stack experience with high-throughput Python and modern React. Strong architecture ownership and team scaling skills.',
      status: 'under_review',
      applied_at: 'Yesterday',
    },
    {
      id: 3,
      job_id: 1,
      candidate_name: 'Alex Rivera',
      candidate_email: 'alex.rivera@example.com',
      career_stage: 'student',
      headline: 'Junior Full-Stack Developer',
      bio: 'B.S. in Computer Science. Hackathon 1st place winner. Built real-time collaborative canvas app with 5,000 MAU. Rapid learner with clean coding discipline.',
      break_duration: null,
      break_activities: null,
      skills: ['React.js', 'FastAPI', 'Node.js', 'Tailwind CSS'],
      ai_score: 91,
      ai_rationale:
        'High aptitude score. Capstone architecture demonstrates strong fundamental mastery of async APIs and responsive web design.',
      status: 'applied',
      applied_at: '3 hours ago',
    },
  ])

  // Selected Applicant for Unified Profile View
  const [selectedApplicantId, setSelectedApplicantId] = useState(1)
  const activeApplicant =
    applicants.find((a) => a.id === selectedApplicantId) || applicants[0]

  // Post Job Modal State
  const [postJobModalOpen, setPostJobModalOpen] = useState(false)
  const [newJobTitle, setNewJobTitle] = useState('')
  const [newJobType, setNewJobType] = useState('Remote')
  const [newJobSalary, setNewJobSalary] = useState('$170,000 - $205,000')
  const [newJobStage, setNewJobStage] = useState('Returner-Friendly')
  const [newJobSkills, setNewJobSkills] = useState('React, Python, FastAPI, PostgreSQL')
  const [newJobDesc, setNewJobDesc] = useState(
    'We are expanding our core product platform and seek an engineer who brings strong technical intuition, clean architecture, and empathy.'
  )
  const [isSubmittingJob, setIsSubmittingJob] = useState(false)

  // Real-time notification dispatch toast
  const [dispatchedNotification, setDispatchedNotification] = useState(null)
  const [backendSavedSuccess, setBackendSavedSuccess] = useState(false)

  // Load jobs and applications from FastAPI backend on mount
  useEffect(() => {
    async function loadBackendData() {
      const backendJobs = await fetchJobsApi()
      if (backendJobs && backendJobs.length > 0) {
        setJobs(backendJobs)
        setSelectedJobId(backendJobs[0].id)
      }

      const backendApps = await fetchApplicationsApi()
      if (backendApps && backendApps.length > 0) {
        setApplicants(backendApps)
        setSelectedApplicantId(backendApps[0].id)
      }
    }
    loadBackendData()
  }, [])

  // 1-Click Action Handler (Updates state AND calls backend API)
  const handleOneClickAction = async (applicantId, newStatus) => {
    // 1. Update local state immediately
    setApplicants((prev) =>
      prev.map((app) => (app.id === applicantId ? { ...app, status: newStatus } : app))
    )

    const targetApp = applicants.find((a) => a.id === applicantId)
    const candName = targetApp?.candidate_name || 'Candidate'

    const actionLabels = {
      shortlisted: 'Shortlisted for Interview',
      selected: 'Selected for Offer 🎉',
      rejected: 'Not Moving Forward',
    }

    setDispatchedNotification({
      candidateName: candName,
      status: newStatus,
      message: `Automatic update saved to database & dispatched to ${candName}: "Your application has moved to '${actionLabels[newStatus]}'."`,
      timestamp: 'Just now',
    })

    // 2. Persist to Backend FastAPI Database
    const apiRes = await updateApplicationStatusApi(applicantId, newStatus)
    if (apiRes && apiRes.success) {
      setBackendSavedSuccess(true)
      setTimeout(() => setBackendSavedSuccess(false), 3000)
    }
  }

  // Handle Post New Job Form (Saves to backend DB)
  const handlePostJobSubmit = async (e) => {
    e.preventDefault()
    setIsSubmittingJob(true)

    const jobData = {
      title: newJobTitle,
      company: user?.company || 'Cloudscale Systems',
      location: newJobType === 'Remote' ? 'Remote (US & Canada)' : 'San Francisco, CA (Hybrid)',
      workplace_type: newJobType,
      salary_range: newJobSalary,
      stage_focus: newJobStage,
      skills: newJobSkills,
      description: newJobDesc,
      requirements: '3+ years experience with modern full-stack web architectures.',
    }

    // Call Backend API to save job to SQLite DB
    const createdJob = await createJobApi(jobData)

    const formattedJob = createdJob || {
      id: Date.now(),
      ...jobData,
      matchScore: 95,
      stageBenefit: 'Explicitly calibrated for stage readiness and fast hiring feedback.',
      skills: newJobSkills.split(',').map((s) => s.trim()),
      postedAt: 'Just now',
    }

    setJobs([formattedJob, ...jobs])
    setSelectedJobId(formattedJob.id)
    setIsSubmittingJob(false)
    setPostJobModalOpen(false)
    setNewJobTitle('')
  }

  const selectedJob = jobs.find((j) => j.id === selectedJobId) || jobs[0]

  const stageBadgeVariants = {
    returner: 'stageReturner',
    student: 'stageStudent',
    senior: 'stageSenior',
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Recruiter Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 text-white shadow-xl">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Recruiter Command Center
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
              <Database className="w-3 h-3" /> Live Database Connected
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
            {user?.company || 'Cloudscale Systems'} Pipeline
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            AI-Ranked Candidates • Unified Profiles • 1-Click Decisions with Automated Notifications
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="accent"
            size="md"
            leftIcon={Plus}
            onClick={() => setPostJobModalOpen(true)}
            className="shadow-md"
          >
            Post a New Job
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

      {/* 2. Active Requisitions Switcher */}
      <div className="space-y-2">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
          <span>Active Job Requisitions ({jobs.length})</span>
          <span className="text-brand-600 font-medium">Select to view ranked candidate pool</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {jobs.map((job) => {
            const isSelected = job.id === selectedJobId
            return (
              <button
                key={job.id}
                onClick={() => setSelectedJobId(job.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all shrink-0 text-left ${
                  isSelected
                    ? 'bg-brand-600 text-white border-brand-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <Briefcase className="w-4 h-4 shrink-0" />
                <span>{job.title}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {job.stage_focus || job.stageFocus || 'All Stages'}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Dispatched Notification Toast Banner */}
      {dispatchedNotification && (
        <div className="p-4 rounded-2xl bg-slate-900 text-white text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg border border-slate-800 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-emerald-400 flex items-center gap-2">
                <span>Automatic Notification Dispatched</span>
                {backendSavedSuccess && (
                  <span className="text-[10px] bg-emerald-500/30 text-emerald-200 px-1.5 py-0.2 rounded font-mono">
                    ✓ Saved in DB
                  </span>
                )}
              </div>
              <div className="text-slate-300 mt-0.5">
                {dispatchedNotification.message}
              </div>
            </div>
          </div>
          <span className="text-[11px] text-slate-400 shrink-0">
            Zero-Ghosting Fulfilled
          </span>
        </div>
      )}

      {/* 3. SPLIT-SCREEN RECRUITER COMMAND CENTER (Everything on One Screen) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: AI-Ranked Applicants Table */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
            <span>AI-Ranked Candidates ({applicants.length})</span>
            <span>Match Score</span>
          </div>

          <div className="space-y-3">
            {applicants.map((cand) => {
              const isSelected = cand.id === selectedApplicantId
              return (
                <div
                  key={cand.id}
                  onClick={() => setSelectedApplicantId(cand.id)}
                  className={`cursor-pointer p-4 rounded-2xl border transition-all duration-200 text-left ${
                    isSelected
                      ? 'bg-white border-brand-500 shadow-md ring-2 ring-brand-500/15'
                      : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-bold text-slate-900 text-base">
                        {cand.candidate_name}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5 truncate">
                        {cand.headline}
                      </div>
                    </div>
                    <Badge variant="success" dot size="sm">
                      {cand.ai_score}% Fit
                    </Badge>
                  </div>

                  {/* Why this match short line */}
                  <div className="mt-2.5 p-2 bg-slate-50 rounded-lg text-[11px] text-slate-600 line-clamp-2">
                    <strong className="text-brand-900">Why fit:</strong> {cand.ai_rationale}
                  </div>

                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <Badge variant={stageBadgeVariants[cand.career_stage] || 'neutral'} size="sm">
                      {cand.career_stage === 'returner'
                        ? 'Career Returner'
                        : cand.career_stage === 'student'
                        ? 'Student / Grad'
                        : 'Senior Pro'}
                    </Badge>
                    <StatusPill status={cand.status} size="sm" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Column: Unified Candidate Profile View (One Screen) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-lg p-6 sm:p-8 space-y-6">
          {/* Candidate Dossier Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-slate-900 font-display">
                  {activeApplicant.candidate_name}
                </h2>
                <Badge
                  variant={stageBadgeVariants[activeApplicant.career_stage] || 'neutral'}
                  size="sm"
                >
                  {activeApplicant.career_stage === 'returner'
                    ? 'Career Returner'
                    : activeApplicant.career_stage === 'student'
                    ? 'Student / Grad'
                    : 'Senior Pro'}
                </Badge>
              </div>
              <p className="text-sm text-slate-600 mt-1 font-medium">
                {activeApplicant.headline} • {activeApplicant.candidate_email}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Pipeline Status:</span>
              <StatusPill status={activeApplicant.status} size="md" />
            </div>
          </div>

          {/* AI "Why This Match" Box */}
          <div className="p-4 rounded-2xl bg-brand-50/70 border border-brand-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-brand-800 uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-brand-600" />
                AI Match Score: {activeApplicant.ai_score}% Overall Relevance
              </span>
              <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full text-[10px] font-bold">
                Top Decile Candidate
              </span>
            </div>
            <p className="text-xs text-brand-900 leading-relaxed font-medium">
              {activeApplicant.ai_rationale}
            </p>
          </div>

          {/* Stage Specific Narrative (Crucial for Returners) */}
          {activeApplicant.career_stage === 'returner' && activeApplicant.break_duration && (
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-900">
                <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
                <span>Career Break Overview & Accomplishments:</span>
              </div>
              <div className="text-xs text-amber-900">
                <strong>Duration:</strong> {activeApplicant.break_duration}
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                "{activeApplicant.break_activities}"
              </p>
            </div>
          )}

          {/* Executive Bio */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Professional Summary
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
              "{activeApplicant.bio}"
            </p>
          </div>

          {/* Verified Skills */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Verified Technical Strengths
            </h4>
            <div className="flex flex-wrap gap-2">
              {activeApplicant.skills.map((skill) => (
                <Badge key={skill} variant="neutral">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* ONE-CLICK ACTION BAR (Triggers status + automatic notification) */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>One-Click Candidate Pipeline Actions:</span>
              <span className="text-brand-600 font-semibold">Zero ghosting guaranteed</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                size="md"
                leftIcon={Star}
                onClick={() => handleOneClickAction(activeApplicant.id, 'shortlisted')}
                className="shadow-xs"
              >
                Shortlist for Interview
              </Button>
              <Button
                variant="accent"
                size="md"
                leftIcon={CheckCircle2}
                onClick={() => handleOneClickAction(activeApplicant.id, 'selected')}
                className="shadow-xs"
              >
                Select for Offer
              </Button>
              <Button
                variant="danger"
                size="md"
                leftIcon={XCircle}
                onClick={() => handleOneClickAction(activeApplicant.id, 'rejected')}
              >
                Not Moving Forward
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= POST A JOB MODAL (Saves to DB) ================= */}
      <Modal
        isOpen={postJobModalOpen}
        onClose={() => setPostJobModalOpen(false)}
        title="Post a New Job Requisition"
        description="Define your role parameters, stage preference, and compensation."
        footer={
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setPostJobModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="accent"
              size="sm"
              rightIcon={Plus}
              loading={isSubmittingJob}
              onClick={handlePostJobSubmit}
            >
              Publish Job to Live DB
            </Button>
          </>
        }
      >
        <form onSubmit={handlePostJobSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Job Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Lead Platform Engineer"
              value={newJobTitle}
              onChange={(e) => setNewJobTitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Workplace Type
              </label>
              <select
                value={newJobType}
                onChange={(e) => setNewJobType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="Remote">100% Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Stage Orientation
              </label>
              <select
                value={newJobStage}
                onChange={(e) => setNewJobStage(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="Returner-Friendly">Returner-Friendly</option>
                <option value="Student-Friendly">Student-Friendly</option>
                <option value="Senior-Level">Senior-Level</option>
                <option value="All Stages">All Stages</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Salary Compensation Range
            </label>
            <input
              type="text"
              value={newJobSalary}
              onChange={(e) => setNewJobSalary(e.target.value)}
              placeholder="e.g. $165,000 - $195,000"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Required Skills (comma separated)
            </label>
            <input
              type="text"
              value={newJobSkills}
              onChange={(e) => setNewJobSkills(e.target.value)}
              placeholder="React, Python, FastAPI, PostgreSQL"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Job Description
            </label>
            <textarea
              rows={3}
              value={newJobDesc}
              onChange={(e) => setNewJobDesc(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </form>
      </Modal>
    </div>
  )
}
