import React, { useState } from 'react'
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  StatusPill,
} from '../components/common'
import {
  Sparkles,
  ArrowRight,
  ListFilter,
  UserCheck,
  MousePointerClick,
  Bell,
  CheckCircle2,
  XCircle,
  Briefcase,
  Users,
  Clock,
  TrendingUp,
  ShieldCheck,
  Star,
  Zap,
  ExternalLink,
  ChevronRight,
} from 'lucide-react'

export default function ForRecruiters({ onNavigate }) {
  // Candidate pool for the interactive recruiter simulator
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: 'Maya Lin',
      role: 'Staff Full-Stack Engineer',
      stage: 'Senior Professional (8 yrs)',
      badgeVariant: 'stageSenior',
      score: 96,
      skills: ['React 19', 'Python / FastAPI', 'PostgreSQL', 'System Design'],
      location: 'San Francisco, CA (Remote)',
      summary:
        'Ex-Fintech Lead. Designed distributed ledger systems processing $40M/day. Strong team mentor and open-source contributor.',
      whyMatch:
        'Matches 100% of required tech stack. Experience leading cross-functional teams directly aligns with your scale roadmap.',
      status: 'under_review',
    },
    {
      id: 2,
      name: 'Elena Rostova',
      role: 'Senior React & Design Systems Specialist',
      stage: 'Career Returner (3-yr Parent Care)',
      badgeVariant: 'stageReturner',
      score: 94,
      skills: ['React 19', 'Tailwind CSS', 'TypeScript', 'Accessibility'],
      location: 'Austin, TX (Remote)',
      summary:
        '6 years of high-scale UI engineering prior to care pause. Actively upskilled in React 19 concurrent features and modern state machines.',
      whyMatch:
        'Exceptional design system depth. Eager to take ownership of frontend consistency with high maturity and resilience.',
      status: 'under_review',
    },
    {
      id: 3,
      name: 'Alex Rivera',
      role: 'Junior Full-Stack Developer',
      stage: 'Student / Recent Graduate',
      badgeVariant: 'stageStudent',
      score: 91,
      skills: ['React.js', 'FastAPI', 'Node.js', 'Tailwind CSS'],
      location: 'Toronto, Canada (Hybrid)',
      summary:
        'Hackathon 1st place winner. Built real-time collaborative canvas app with 5,000 MAU. Rapid learner with clean coding discipline.',
      whyMatch:
        'High aptitude score. Capstone architecture demonstrates strong fundamental mastery of async APIs and responsive web design.',
      status: 'under_review',
    },
  ])

  const [selectedCandidateId, setSelectedCandidateId] = useState(1)
  const [lastNotification, setLastNotification] = useState(null)

  const activeCandidate =
    candidates.find((c) => c.id === selectedCandidateId) || candidates[0]

  const handleAction = (candidateId, newStatus) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, status: newStatus } : c))
    )

    const candidate = candidates.find((c) => c.id === candidateId)
    const actionLabel =
      newStatus === 'shortlisted'
        ? 'Shortlisted for Interview'
        : newStatus === 'selected'
        ? 'Selected for Offer'
        : 'Not Selected'

    setLastNotification({
      candidateName: candidate.name,
      status: newStatus,
      message: `Automatic update sent to ${candidate.name}: "Your application for Senior Full-Stack Engineer has been updated to '${actionLabel}'."`,
      timestamp: 'Just now',
    })
  }

  return (
    <div className="space-y-20 py-12">
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
        <Badge variant="brand" size="lg">
          For Modern Hiring Teams
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display max-w-3xl mx-auto">
          Hire the top 5% without spending{' '}
          <span className="text-brand-600">80% of your time screening</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          HireLoop ranks applicants by deep contextual skill alignment, consolidates profiles into one single screen, and automates candidate communication in one click.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Button
            variant="primary"
            size="lg"
            rightIcon={ArrowRight}
            onClick={() => onNavigate?.('signup', { role: 'recruiter' })}
          >
            Start Free 14-Day Recruiter Trial
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => onNavigate?.('about')}
          >
            Request Enterprise Demo
          </Button>
        </div>
      </section>

      {/* 2. Key Metrics Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-brand-600 font-display">
              85%
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mt-1">
              Time Saved Screening
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-brand-600 font-display">
              4.2x
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mt-1">
              Faster Pipeline to Offer
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-brand-600 font-display">
              98%
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mt-1">
              Candidate Satisfaction
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-brand-600 font-display">
              0
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mt-1">
              Candidate Ghosting
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE RECRUITER SIMULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div>
            <Badge variant="accent" className="mb-2">
              Interactive Recruiter Sandbox
            </Badge>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              AI-Ranked Candidates & Unified Profile Viewer
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-xl">
              Experience how your team will evaluate candidates on HireLoop. Click a candidate below to view their unified profile and test 1-click status actions.
            </p>
          </div>
          <div className="p-3 bg-brand-50 border border-brand-200 rounded-xl text-xs text-brand-800 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-brand-600" />
            <span>Active Job: <strong>Senior Full-Stack Engineer</strong> (Remote)</span>
          </div>
        </div>

        {/* The Sandbox Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Ranked Candidates List */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider px-2">
              <span>AI-Ranked Applicant Pool</span>
              <span>Relevance Score</span>
            </div>

            {candidates.map((cand) => {
              const isSelected = cand.id === selectedCandidateId
              return (
                <div
                  key={cand.id}
                  onClick={() => setSelectedCandidateId(cand.id)}
                  className={`cursor-pointer p-4 rounded-2xl border transition-all duration-200 ${
                    isSelected
                      ? 'bg-white border-brand-500 shadow-md ring-2 ring-brand-500/15'
                      : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-bold text-slate-900 text-base">
                        {cand.name}
                      </div>
                      <div className="text-xs text-slate-500">{cand.role}</div>
                    </div>
                    <Badge variant="success" dot size="sm">
                      {cand.score}% Fit
                    </Badge>
                  </div>

                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <Badge variant={cand.badgeVariant} size="sm">
                      {cand.stage}
                    </Badge>
                    <StatusPill status={cand.status} size="sm" />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Column: Unified Candidate Profile & 1-Click Actions */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-lg p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold text-slate-900 font-display">
                    {activeCandidate.name}
                  </h3>
                  <Badge variant={activeCandidate.badgeVariant} size="sm">
                    {activeCandidate.stage}
                  </Badge>
                </div>
                <p className="text-sm text-slate-500 mt-1">
                  {activeCandidate.role} • {activeCandidate.location}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium">Status:</span>
                <StatusPill status={activeCandidate.status} size="md" />
              </div>
            </div>

            {/* AI "Why This Match" Box */}
            <div className="p-4 rounded-2xl bg-brand-50/70 border border-brand-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-brand-800 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-brand-600" />
                  AI Match Breakdown ({activeCandidate.score}% Overall Fit)
                </span>
                <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full text-[11px]">
                  Verified Match
                </span>
              </div>
              <p className="text-xs text-brand-900 leading-relaxed font-medium">
                {activeCandidate.whyMatch}
              </p>
            </div>

            {/* Executive Bio */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Candidate Summary
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                "{activeCandidate.summary}"
              </p>
            </div>

            {/* Verified Skills */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Skills & Verification
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeCandidate.skills.map((skill) => (
                  <Badge key={skill} variant="neutral">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* 1-Click Action Buttons */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>One-Click Candidate Pipeline Actions:</span>
                <span>Instantly updates candidate</span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="primary"
                  size="md"
                  leftIcon={Star}
                  onClick={() => handleAction(activeCandidate.id, 'shortlisted')}
                >
                  Shortlist for Interview
                </Button>
                <Button
                  variant="accent"
                  size="md"
                  leftIcon={CheckCircle2}
                  onClick={() => handleAction(activeCandidate.id, 'selected')}
                >
                  Select for Offer
                </Button>
                <Button
                  variant="danger"
                  size="md"
                  leftIcon={XCircle}
                  onClick={() => handleAction(activeCandidate.id, 'rejected')}
                >
                  Not Moving Forward
                </Button>
              </div>
            </div>

            {/* Automated Notification Toast Simulator */}
            {lastNotification && (
              <div className="p-4 rounded-2xl bg-slate-900 text-white text-xs space-y-1.5 animate-in slide-in-from-bottom-2 duration-200">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
                    <Bell className="w-3.5 h-3.5" /> Automatic Notification Dispatched
                  </span>
                  <span>{lastNotification.timestamp}</span>
                </div>
                <p className="text-slate-200 italic font-sans">
                  {lastNotification.message}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. RECRUITER 5-STEP WORKFLOW */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="brand" className="mb-2">
              Workflow Efficiency
            </Badge>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              One connected recruitment workflow
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              From job post to verified hire with zero administrative waste.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                step: '01',
                title: 'Post Job',
                desc: 'Define must-haves and nice-to-haves with simple sliders.',
              },
              {
                step: '02',
                title: 'AI Scores',
                desc: 'Our engine evaluates semantic skills & stage suitability.',
              },
              {
                step: '03',
                title: 'Review Pool',
                desc: 'Candidates arrive pre-ranked with plain-English rationales.',
              },
              {
                step: '04',
                title: '1-Click Action',
                desc: 'Shortlist or select in one click with automated calendar sync.',
              },
              {
                step: '05',
                title: 'Auto-Notify',
                desc: 'Candidates receive prompt updates so your employer brand shines.',
              },
            ].map((wf) => (
              <div
                key={wf.step}
                className="p-5 rounded-2xl bg-white border border-slate-200 text-center space-y-2 shadow-xs"
              >
                <div className="font-mono text-xs font-bold text-brand-600">
                  STEP {wf.step}
                </div>
                <div className="font-bold text-slate-900 text-base">
                  {wf.title}
                </div>
                <div className="text-xs text-slate-500 leading-relaxed">
                  {wf.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Bottom Call to Action */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="text-3xl font-extrabold text-slate-900 font-display">
          Modernize your hiring pipeline today
        </h2>
        <p className="text-slate-600 text-sm max-w-lg mx-auto">
          Post your first role in under 5 minutes and see your AI-ranked applicant pool instantly.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            variant="primary"
            size="lg"
            rightIcon={ArrowRight}
            onClick={() => onNavigate?.('signup', { role: 'recruiter' })}
          >
            Start Free 14-Day Recruiter Trial
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => onNavigate?.('about')}
          >
            Request Enterprise Demo
          </Button>
        </div>
      </section>
    </div>
  )
}
