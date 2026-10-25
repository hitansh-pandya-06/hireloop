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
  Bot,
  Video,
  Send,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  Briefcase,
  GraduationCap,
  RotateCcw,
  ShieldCheck,
  ThumbsUp,
  MessageSquare,
  Award,
  ChevronRight,
  UserCheck,
} from 'lucide-react'

export default function ForJobSeekers({ onNavigate }) {
  // AI Interview Coach Interactive Simulator state
  const [selectedCompany, setSelectedCompany] = useState('Stripe')
  const [selectedRole, setSelectedRole] = useState('Frontend Engineer')
  const [selectedStage, setSelectedStage] = useState('returner')
  const [candidateResponse, setCandidateResponse] = useState(
    'During my 3-year career break for family care, I maintained my skills by contributing to modern React 19 open-source projects, mastering TypeScript, and building a full-stack design system with Tailwind CSS.'
  )
  const [isEvaluating, setIsEvaluating] = useState(false)
  const [coachFeedback, setCoachFeedback] = useState({
    score: 95,
    summary:
      'Superb narrative! You owned the caregiving pause with confidence, bridged directly to modern tech updates, and highlighted tangible open-source deliverables.',
    strengths: [
      'Proactive tone that removes any defensive posture',
      'Specific mentions of modern tech stack (React 19, TypeScript, Tailwind)',
      'Concrete evidence via open-source contributions',
    ],
    proTip:
      'To make this an 10/10: Mention one specific performance metric or complex challenge you solved in that open-source project.',
  })

  // Live HR Sessions state
  const [bookedSessions, setBookedSessions] = useState({})

  const hrSessions = [
    {
      id: 1,
      title: 'Navigating Technical Interviews After a Career Break',
      host: 'Marcus Sterling',
      role: 'Head of Engineering Talent',
      company: 'Cloudflare',
      date: 'Tomorrow, 4:00 PM EST',
      duration: '45 mins',
      spotsLeft: 8,
      attendees: 42,
      category: 'Career Returners',
      badgeVariant: 'stageReturner',
    },
    {
      id: 2,
      title: 'Breaking Into Tech: Standout Portfolios for Grads',
      host: 'Aisha Al-Mansoor',
      role: 'Senior Tech Recruiter',
      company: 'Notion',
      date: 'Thursday, 2:00 PM EST',
      duration: '60 mins',
      spotsLeft: 14,
      attendees: 78,
      category: 'Students & Grads',
      badgeVariant: 'stageStudent',
    },
    {
      id: 3,
      title: 'Staff+ Engineering: What VPs & CTOs Really Look For',
      host: 'Jonathan Vance',
      role: 'VP of People & Culture',
      company: 'Datadog',
      date: 'Next Tuesday, 5:30 PM EST',
      duration: '50 mins',
      spotsLeft: 5,
      attendees: 110,
      category: 'Senior Pros',
      badgeVariant: 'stageSenior',
    },
  ]

  const handleSimulateCoach = () => {
    setIsEvaluating(true)
    setTimeout(() => {
      setIsEvaluating(false)
      if (selectedStage === 'student') {
        setCoachFeedback({
          score: 93,
          summary:
            'Strong foundation! Your passion shines through, and focusing on your capstone architecture demonstrates real-world software engineering discipline.',
          strengths: [
            'Highlighted full-stack system architecture rather than just tutorial code',
            'Demonstrated eagerness to learn and team collaboration',
          ],
          proTip:
            'Quantify the impact: mention how many students or beta testers interacted with your capstone app.',
        })
      } else if (selectedStage === 'senior') {
        setCoachFeedback({
          score: 97,
          summary:
            'Exceptional executive communication. You framed engineering decisions around uptime SLAs, team mentorship, and business outcomes.',
          strengths: [
            'Strategic risk management focus',
            'Cross-functional alignment with Product & Security',
            'Mentorship track record articulated clearly',
          ],
          proTip:
            'Be ready to drill into a failure post-mortem: interviewers love hearing how you handled an outage.',
        })
      } else {
        setCoachFeedback({
          score: 96,
          summary:
            'Warm, dignified, and highly competent. Shows recruiters that you are refreshed, motivated, and fully up-to-date with modern production tooling.',
          strengths: [
            'Empathetic and self-assured storytelling',
            'Direct alignment with Stripe culture of high craftsmanship',
          ],
          proTip:
            'Link directly to your GitHub repo so the interviewer can review your clean commit history.',
        })
      }
    }, 1200)
  }

  const handleToggleRSVP = (sessionId) => {
    setBookedSessions((prev) => ({
      ...prev,
      [sessionId]: !prev[sessionId],
    }))
  }

  return (
    <div className="space-y-20 py-12">
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
        <Badge variant="accent" size="lg">
          For Candidates & Job Seekers
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display max-w-3xl mx-auto">
          A job search that understands{' '}
          <span className="text-brand-600">where you are in life</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          No generic advice. No resume black holes. HireLoop customizes your job matches, interview coaching, and employer connections to your exact career stage.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Button
            variant="accent"
            size="lg"
            rightIcon={ArrowRight}
            onClick={() => onNavigate?.('signup', { role: 'candidate' })}
          >
            Create Your Free Candidate Profile
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              const el = document.getElementById('coach-demo')
              el?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Try AI Coach Simulator
          </Button>
        </div>
      </section>

      {/* 2. Three Stage Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Student */}
          <Card className="p-6 space-y-4 border-t-4 border-t-blue-500">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <Badge variant="stageStudent">Graduates & Students</Badge>
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Showcase Potential Over Years
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Standard filters demand 3+ years experience for junior roles. HireLoop evaluates coursework, capstones, hackathon projects, and fundamental aptitude.
            </p>
            <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Portfolio & GitHub project evaluation
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Entry-level salary transparency benchmarks
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Mock technical interviews for first-timers
              </li>
            </ul>
          </Card>

          {/* Senior */}
          <Card className="p-6 space-y-4 border-t-4 border-t-indigo-600">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Briefcase className="w-6 h-6" />
              </div>
              <Badge variant="stageSenior">Senior Professionals</Badge>
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Discreet Strategic Mobility
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Cut through recruiter spam and low-level pitches. Direct access to founding engineers, VPs, and hiring managers seeking high-leverage leaders.
            </p>
            <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Confidential browsing & incognito mode
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Staff/Principal system design interview prep
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Total compensation negotiation guidance
              </li>
            </ul>
          </Card>

          {/* Returner */}
          <Card className="p-6 space-y-4 border-t-4 border-t-amber-500">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <RotateCcw className="w-6 h-6" />
              </div>
              <Badge variant="stageReturner">Career Returners</Badge>
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Care Breaks Treated with Respect
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Resume pauses shouldn't derail great careers. Connect with return-to-work partner companies that value your wisdom, resilience, and maturity.
            </p>
            <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Returner-friendly employers with ramp-on onboarding
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Gap narrative coaching that radiates confidence
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Flexible & asynchronous remote opportunities
              </li>
            </ul>
          </Card>
        </div>
      </section>

      {/* 3. INTERACTIVE AI INTERVIEW COACH DEMO */}
      <section
        id="coach-demo"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24"
      >
        <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-10 border border-slate-800 shadow-2xl space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <div className="flex items-center gap-2 text-accent-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Bot className="w-4 h-4" />
                <span>Interactive Simulator</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-display">
                Try the AI Interview Coach
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Calibrated to company interview culture, specific role expectations, and your career stage.
              </p>
            </div>
            <Badge variant="accent" size="lg">
              Live Mock Simulation
            </Badge>
          </div>

          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Company */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Target Company
              </label>
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="Stripe">Stripe (Developer-focused & Rigorous)</option>
                <option value="Notion">Notion (Design & High Craft)</option>
                <option value="Cloudflare">Cloudflare (Distributed Systems)</option>
                <option value="Datadog">Datadog (Scalability & Observability)</option>
              </select>
            </div>

            {/* Role */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Target Role
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="Frontend Engineer">Frontend Engineer</option>
                <option value="Full-Stack Developer">Full-Stack Developer</option>
                <option value="Engineering Manager">Engineering Manager</option>
                <option value="Data Scientist">Data Scientist</option>
              </select>
            </div>

            {/* Stage */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Your Career Stage
              </label>
              <select
                value={selectedStage}
                onChange={(e) => {
                  setSelectedStage(e.target.value)
                  if (e.target.value === 'student') {
                    setCandidateResponse(
                      'In my university capstone project, I built a real-time collaborative code editor using WebSockets and React. We scaled it to 500 concurrent student users during finals week.'
                    )
                  } else if (e.target.value === 'senior') {
                    setCandidateResponse(
                      'I led the migration from our legacy monolithic architecture to event-driven microservices on Kubernetes, reducing p99 latency from 450ms to 85ms while coaching 5 junior engineers.'
                    )
                  } else {
                    setCandidateResponse(
                      'During my 3-year career break for family care, I maintained my skills by contributing to modern React 19 open-source projects, mastering TypeScript, and building a full-stack design system.'
                    )
                  }
                }}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="returner">Returning After Career Break</option>
                <option value="student">Student / Recent Graduate</option>
                <option value="senior">Senior Professional (7+ years)</option>
              </select>
            </div>
          </div>

          {/* Active Question Prompt */}
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-accent-400 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Simulated {selectedCompany} Interview Question:</span>
            </div>
            <p className="text-base text-white font-medium">
              {selectedStage === 'returner'
                ? `"Walk us through how your professional perspective has evolved over the past few years, and how you ensured your technical toolset is primed for high-speed delivery at ${selectedCompany}?"`
                : selectedStage === 'student'
                ? `"Tell us about a technical project where you faced an unexpected architectural roadblock, and how you verified your solution without a senior engineer spoon-feeding the answer?"`
                : `"Describe a time you navigated high organizational ambiguity or technical trade-offs while mentoring your team through an ambitious roadmap."`}
            </p>
          </div>

          {/* User Input Sandbox */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Your practice response:</span>
              <span>Edit text freely or test the tailored sample</span>
            </div>
            <textarea
              rows={3}
              value={candidateResponse}
              onChange={(e) => setCandidateResponse(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-white rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 leading-relaxed font-sans"
            />

            <div className="flex justify-end">
              <Button
                variant="accent"
                size="md"
                loading={isEvaluating}
                onClick={handleSimulateCoach}
                leftIcon={Sparkles}
              >
                {isEvaluating ? 'AI Evaluating Answer...' : 'Evaluate with AI Coach'}
              </Button>
            </div>
          </div>

          {/* Coach Feedback Display */}
          {coachFeedback && (
            <div className="p-6 rounded-2xl bg-brand-950/70 border border-brand-700/80 space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                    {coachFeedback.score}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      AI Coach Evaluation Score
                    </h4>
                    <p className="text-xs text-slate-300">
                      Evaluated for clarity, confidence, and role alignment
                    </p>
                  </div>
                </div>
                <Badge variant="success" size="sm">
                  Top Decile Answer
                </Badge>
              </div>

              <p className="text-sm text-slate-200 leading-relaxed">
                {coachFeedback.summary}
              </p>

              <div className="space-y-2 pt-2 border-t border-brand-800/70">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Key Strengths Detected:
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5">
                  {coachFeedback.strengths.map((st, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{st}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-xl border border-accent-500/30 text-xs text-accent-200 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-accent-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-accent-300">Coach Pro Tip: </strong>
                  {coachFeedback.proTip}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. LIVE HR SESSIONS WITH REAL RECRUITERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div>
            <Badge variant="brand" className="mb-2">
              Human Connections
            </Badge>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              Live HR Ask-Me-Anything Sessions
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-xl">
              Meet real hiring managers, learn what makes applicants stand out, and ask questions anonymously in free weekly Zoom AMAs.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-brand-600" /> Over 1,200 candidates booked this month
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hrSessions.map((session) => {
            const isBooked = bookedSessions[session.id]
            return (
              <Card key={session.id} className="flex flex-col justify-between">
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant={session.badgeVariant} size="sm">
                      {session.category}
                    </Badge>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {session.duration}
                    </span>
                  </div>
                  <CardTitle className="text-lg leading-snug">
                    {session.title}
                  </CardTitle>
                  <CardDescription className="pt-2 text-xs text-slate-600">
                    Hosted by <strong>{session.host}</strong> ({session.role} at {session.company})
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs text-slate-700">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-brand-600" />
                      {session.date}
                    </span>
                    <span className="text-amber-600 font-semibold">
                      {isBooked ? 'Spot Reserved!' : `${session.spotsLeft} spots left`}
                    </span>
                  </div>
                </CardContent>

                <CardFooter className="bg-slate-50/60">
                  <span className="text-xs text-slate-500">
                    {session.attendees + (isBooked ? 1 : 0)} Attending
                  </span>
                  <Button
                    variant={isBooked ? 'outline' : 'primary'}
                    size="sm"
                    onClick={() => handleToggleRSVP(session.id)}
                    leftIcon={isBooked ? CheckCircle2 : Video}
                  >
                    {isBooked ? 'RSVP Confirmed' : 'Book Free Seat'}
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </section>

      {/* 5. TRANSPARENT APPLICATION TRACKING PREVIEW */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-4 mb-10">
            <Badge variant="success" size="lg">
              Our Zero-Ghosting Guarantee
            </Badge>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              Track applications with 100% transparency
            </h2>
            <p className="text-slate-600 text-sm max-w-xl mx-auto">
              Know the exact stage of your application the moment a recruiter opens it.
            </p>
          </div>

          <Card className="max-w-4xl mx-auto p-6 bg-white shadow-md">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
              <div>
                <h4 className="font-bold text-slate-900 text-base">
                  Live Application Feed Sample
                </h4>
                <p className="text-xs text-slate-500">
                  Real-time updates delivered to your dashboard and inbox
                </p>
              </div>
              <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Active Tracking
              </span>
            </div>

            <div className="divide-y divide-slate-100 pt-2">
              <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="font-bold text-slate-900 text-sm">
                    Senior Frontend Specialist — Linear
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Applied 3 days ago • AI Fit: 96%
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusPill status="shortlisted" />
                  <span className="text-xs text-brand-700 font-medium hidden sm:inline">
                    Interview scheduled for Thursday
                  </span>
                </div>
              </div>

              <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="font-bold text-slate-900 text-sm">
                    Design Systems Engineer — Figma
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Applied yesterday • AI Fit: 92%
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusPill status="under_review" />
                  <span className="text-xs text-slate-500 hidden sm:inline">
                    Hiring Manager reviewing profile
                  </span>
                </div>
              </div>

              <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="font-bold text-slate-900 text-sm">
                    Platform Infrastructure Lead — Cloudflare
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Applied 1 week ago • AI Fit: 98%
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusPill status="selected" />
                  <span className="text-xs text-emerald-700 font-semibold hidden sm:inline">
                    Offer Letter Sent! 🎉
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* 6. Bottom CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="text-3xl font-extrabold text-slate-900 font-display">
          Your next career chapter starts here
        </h2>
        <p className="text-slate-600 text-sm max-w-lg mx-auto">
          Create a personalized profile in 3 minutes. No resume parsing headaches.
        </p>
        <Button
          variant="accent"
          size="lg"
          rightIcon={ArrowRight}
          onClick={() => onNavigate?.('signup', { role: 'candidate' })}
        >
          Sign Up Free as a Job Seeker
        </Button>
      </section>
    </div>
  )
}
