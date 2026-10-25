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
  GraduationCap,
  Briefcase,
  RotateCcw,
  CheckCircle2,
  Layers,
  Bot,
  Video,
  LayoutGrid,
  ListFilter,
  UserCheck,
  MousePointerClick,
  Bell,
  ShieldCheck,
  TrendingUp,
  Users,
  Search,
  Award,
  Clock,
  ArrowUpRight,
  Check,
  X,
  Target,
  Zap,
} from 'lucide-react'

export default function Home({ onNavigate }) {
  // Active Career Stage Selector state for the interactive preview
  const [activeStage, setActiveStage] = useState('returner')

  const careerStages = [
    {
      id: 'student',
      title: 'Students & Fresh Graduates',
      shortDesc: 'Coursework to high-impact first career steps with skill-based matching.',
      icon: GraduationCap,
      badgeVariant: 'stageStudent',
      persona: {
        name: 'Alex Rivera',
        role: 'Aspiring Frontend Engineer',
        stageLabel: 'Student / Recent Grad',
        bio: 'B.S. in Computer Science (2024). Built open-source React components and hackathon award winner. Ready for fast-growth startups.',
        topMatch: 'Junior Frontend Developer at Linear (96% Match)',
        tailoredBenefit: 'Highlights project portfolios & potential over years-of-experience checklists.',
        coachPrompt: '"How do I effectively highlight my capstone project when competing against experienced applicants?"',
        coachResponse: '"Focus on technical decisions you owned: why you chose TypeScript, how you reduced bundle size by 34%, and real user metrics."',
      },
    },
    {
      id: 'senior',
      title: 'Senior Professionals',
      shortDesc: 'Strategic career mobility, peer benchmarks, and direct connections to hiring leadership.',
      icon: Briefcase,
      badgeVariant: 'stageSenior',
      persona: {
        name: 'David Vance',
        role: 'Staff Infrastructure Architect',
        stageLabel: 'Senior Professional (10+ yrs)',
        bio: 'Ex-Lead at Fintech unicorn. Specialized in high-throughput distributed systems, Kubernetes orchestration, and team mentorship.',
        topMatch: 'Principal Platform Engineer at Cloudflare (98% Match)',
        tailoredBenefit: 'Filters out noisy recruiter spam and surfaces high-autonomy leadership roles.',
        coachPrompt: '"How do I present cross-functional system re-architecture to the CTO and VP of Engineering?"',
        coachResponse: '"Frame the narrative around business risk mitigation, 99.999% uptime guarantees, and how you mentored 4 junior engineers into senior roles."',
      },
    },
    {
      id: 'returner',
      title: 'Returning After a Break',
      shortDesc: 'Bridging career pauses with skill refreshers, empathetic employers, and confident narratives.',
      icon: RotateCcw,
      badgeVariant: 'stageReturner',
      persona: {
        name: 'Elena Rostova',
        role: 'Senior React & Design Systems Specialist',
        stageLabel: 'Career Returner (3-yr Parent Care)',
        bio: '6 years of pre-break lead engineer experience. Completed Next.js 15 & Tailwind deep dives during career transition.',
        topMatch: 'Senior Design Systems Lead at GitLab (95% Match • Remote)',
        tailoredBenefit: 'Dedicated return-to-work partner companies with structured onboarding & flexible ramps.',
        coachPrompt: '"How do I address my 3-year caregiving gap without feeling apologetic or on the defensive?"',
        coachResponse: '"Own your journey with pride. Frame the gap concisely, then pivot directly to your up-to-date modern React and TypeScript portfolio projects."',
      },
    },
  ]

  const currentPersona =
    careerStages.find((s) => s.id === activeStage) || careerStages[2]

  // The 6-Step Connected Journey Timeline
  const timelineSteps = [
    {
      step: '01',
      title: 'Onboard',
      audience: 'Candidate & Recruiter',
      description:
        'Candidates select their career stage, core strengths, and work preferences. Recruiters calibrate role criteria in minutes.',
      pill: 'Context-First',
    },
    {
      step: '02',
      title: 'Discover',
      audience: 'For Job Seekers',
      description:
        'AI analyzes nuanced skills and career timing, scoring opportunities with transparent match percentages — no keyword stuffing.',
      pill: 'Smart Matching',
    },
    {
      step: '03',
      title: 'Prepare',
      audience: 'For Job Seekers',
      description:
        'Practice with an AI Interview Coach trained on company-specific questions, or join weekly live AMA sessions with HR leaders.',
      pill: 'Empowerment',
    },
    {
      step: '04',
      title: 'Apply & Track',
      audience: 'For Job Seekers',
      description:
        'One-click tailored applications with guaranteed transparent status tracking across every stage of the hiring pipeline.',
      pill: 'Zero Ghosting',
    },
    {
      step: '05',
      title: 'Shortlist',
      audience: 'For Recruiters',
      description:
        'Recruiters review AI-ranked applicant pools with objective "Why this candidate matches" summaries on a unified profile.',
      pill: 'AI-Ranked',
    },
    {
      step: '06',
      title: 'Hire',
      audience: 'Candidate & Recruiter',
      description:
        '1-click shortlist, offer, or respectful feedback. Automated notifications keep every candidate informed at every step.',
      pill: 'Connected Close',
    },
  ]

  // The 9 Core Features
  const features = [
    {
      id: 1,
      title: 'Career-Stage Onboarding',
      desc: 'Adapts onboarding flow whether you are a university graduate, senior principal, or re-entering after parental/care leave.',
      icon: GraduationCap,
      category: 'Job Seeker',
    },
    {
      id: 2,
      title: 'Personalized Job Matching',
      desc: 'Deep semantic matching that measures transferrable skills, stage readiness, and cultural synergy instead of brute text filters.',
      icon: Target,
      category: 'Job Seeker',
    },
    {
      id: 3,
      title: 'AI Interview Coach',
      desc: 'Role- and company-specific chatbot offering simulated behavioral and technical prep with instant constructive feedback.',
      icon: Bot,
      category: 'Job Seeker',
    },
    {
      id: 4,
      title: 'Live HR Sessions',
      desc: 'Direct access to weekly Ask-Me-Anything sessions with real recruiters and talent leaders from hiring companies.',
      icon: Video,
      category: 'Job Seeker',
    },
    {
      id: 5,
      title: 'Application Tracking with Status',
      desc: 'Transparent Kanban & timeline tracking: Applied → Under Review → Shortlisted → Selected / Rejected with zero uncertainty.',
      icon: LayoutGrid,
      category: 'Job Seeker',
    },
    {
      id: 6,
      title: 'AI-Ranked Applicant Lists',
      desc: 'Recruiters receive pre-ranked candidates scored against role requirements with plain-English rationales for each match.',
      icon: ListFilter,
      category: 'Recruiter',
    },
    {
      id: 7,
      title: 'Unified Candidate Profiles',
      desc: 'Everything on one screen: stage context, verified work, AI score, portfolio links, and interview notes without tab-hopping.',
      icon: UserCheck,
      category: 'Recruiter',
    },
    {
      id: 8,
      title: 'One-Click Shortlist / Select / Reject',
      desc: 'Fast, decisive action buttons that move candidates seamlessly across pipeline stages in a single click.',
      icon: MousePointerClick,
      category: 'Recruiter',
    },
    {
      id: 9,
      title: 'Automatic Status Notifications',
      desc: 'Every recruiter action automatically triggers timely, respectful status notifications to the candidate dashboard and email.',
      icon: Bell,
      category: 'Connected',
    },
  ]

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-white via-brand-50/30 to-slate-50">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-brand-100/40 via-accent-100/30 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs sm:text-sm font-semibold tracking-wide shadow-2xs">
              <Sparkles className="w-4 h-4 text-brand-600" />
              <span>A Smarter, Connected Hiring Journey</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12] font-display">
              Personalized job discovery & streamlined recruitment in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-700 via-brand-600 to-accent-600">
                one connected platform
              </span>
            </h1>

            {/* Sub-line */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Generic job boards treat everyone the same. HireLoop adapts to your career stage — whether you're a student, a senior leader, or returning after a break — while giving recruiters AI-ranked talent and zero-friction hiring.
            </p>

            {/* Dual CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="accent"
                size="lg"
                rightIcon={ArrowRight}
                onClick={() => onNavigate?.('signup', { role: 'candidate' })}
                className="w-full sm:w-auto shadow-md"
              >
                I'm a Job Seeker
              </Button>
              <Button
                variant="primary"
                size="lg"
                rightIcon={ArrowRight}
                onClick={() => onNavigate?.('signup', { role: 'recruiter' })}
                className="w-full sm:w-auto shadow-md"
              >
                I'm a Recruiter
              </Button>
            </div>

            <p className="text-xs text-slate-400 font-medium">
              Free for candidates • No credit card required for recruiter trial
            </p>
          </div>

          {/* Interactive Loop Illustration */}
          <div className="mt-16 max-w-5xl mx-auto">
            <div className="relative p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xl overflow-hidden">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-600">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">
                      The Continuous HireLoop Cycle
                    </h3>
                    <p className="text-xs text-slate-500">
                      Synchronized lifecycle connecting candidates and recruiters in real-time
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-semibold text-slate-700">
                    Live Platform Feedback Loop Active
                  </span>
                </div>
              </div>

              {/* Loop Node Diagram */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 pt-6">
                {[
                  {
                    num: '01',
                    name: 'Onboard',
                    sub: 'Stage Selection',
                    color: 'border-blue-200 bg-blue-50/60 text-blue-900',
                  },
                  {
                    num: '02',
                    name: 'Discover',
                    sub: 'AI Match Scores',
                    color: 'border-brand-200 bg-brand-50/60 text-brand-900',
                  },
                  {
                    num: '03',
                    name: 'Prepare',
                    sub: 'Interview Coach',
                    color: 'border-accent-200 bg-accent-50/60 text-accent-900',
                  },
                  {
                    num: '04',
                    name: 'Apply / Track',
                    sub: 'Transparent Pill',
                    color: 'border-purple-200 bg-purple-50/60 text-purple-900',
                  },
                  {
                    num: '05',
                    name: 'Shortlist',
                    sub: 'AI Ranked List',
                    color: 'border-teal-200 bg-teal-50/60 text-teal-900',
                  },
                  {
                    num: '06',
                    name: 'Hire',
                    sub: '1-Click Decision',
                    color: 'border-emerald-200 bg-emerald-50/60 text-emerald-900',
                  },
                ].map((node, i) => (
                  <div
                    key={node.num}
                    className={`p-3 sm:p-4 rounded-2xl border text-center transition-all duration-200 hover:scale-105 shadow-2xs ${node.color}`}
                  >
                    <div className="text-[11px] font-mono font-bold opacity-60">
                      STEP {node.num}
                    </div>
                    <div className="font-bold text-sm sm:text-base mt-1">
                      {node.name}
                    </div>
                    <div className="text-[11px] opacity-75 mt-0.5 font-medium truncate">
                      {node.sub}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE THREE-PILLAR STRIP */}
      <section className="border-y border-slate-200/90 bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="pt-4 md:pt-0 md:px-6 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                One Connected Platform
              </h3>
              <p className="text-sm text-slate-600 mt-1 max-w-xs">
                No disjointed job boards, messy spreadsheets, or lost emails. Everything connects from first match to offer.
              </p>
            </div>

            <div className="pt-4 md:pt-0 md:px-6 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-accent-50 text-accent-600 flex items-center justify-center mb-3">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                Personalized for Job Seekers
              </h3>
              <p className="text-sm text-slate-600 mt-1 max-w-xs">
                Customized guidance tailored to students, seniors, and career-break returners with AI interview prep.
              </p>
            </div>

            <div className="pt-4 md:pt-0 md:px-6 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                Efficient for Recruiters
              </h3>
              <p className="text-sm text-slate-600 mt-1 max-w-xs">
                AI-ranked candidate shortlists, unified candidate profiles, and one-click actions with automated candidate updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CAREER-STAGE SELECTOR PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="brand" className="mb-3">
            Career-Stage Intelligence
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Because a graduate, an architect, and a returner need entirely different platforms
          </h2>
          <p className="text-slate-600 mt-3 text-base">
            Select a career stage below to experience how HireLoop tailors jobs, matching rationale, and AI coaching.
          </p>
        </div>

        {/* The 3 Stage Cards Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {careerStages.map((stage) => {
            const Icon = stage.icon
            const isSelected = activeStage === stage.id
            return (
              <div
                key={stage.id}
                onClick={() => setActiveStage(stage.id)}
                className={`cursor-pointer rounded-2xl p-6 border transition-all duration-200 text-left relative ${
                  isSelected
                    ? 'bg-white border-brand-500 shadow-lg ring-2 ring-brand-500/20 -translate-y-1'
                    : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isSelected
                        ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  {isSelected && (
                    <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-200">
                      Active Preview
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  {stage.title}
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {stage.shortDesc}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-brand-600">
                  <span>Explore Persona</span>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? 'translate-x-1' : ''
                    }`}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Dynamic Persona & AI Coach Live Preview Card */}
        <div className="mt-10 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 sm:p-10 shadow-2xl border border-slate-700 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
            {/* Candidate Profile Details */}
            <div className="lg:w-1/2 space-y-4">
              <div className="flex items-center gap-3">
                <Badge variant={currentPersona.badgeVariant} size="lg">
                  {currentPersona.persona.stageLabel}
                </Badge>
                <span className="text-xs text-slate-400">Sample Candidate Flow</span>
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-tight text-white font-display">
                  {currentPersona.persona.name}
                </h3>
                <p className="text-brand-300 text-sm font-medium">
                  {currentPersona.persona.role}
                </p>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
                "{currentPersona.persona.bio}"
              </p>

              <div className="p-4 rounded-xl bg-brand-950/80 border border-brand-800/80 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-brand-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-accent-400" />
                  <span>Personalized Advantage:</span>
                </div>
                <p className="text-xs text-slate-200">
                  {currentPersona.persona.tailoredBenefit}
                </p>
                <div className="pt-1 text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Top Recommendation: {currentPersona.persona.topMatch}</span>
                </div>
              </div>
            </div>

            {/* AI Coach Chat Preview */}
            <div className="lg:w-1/2 w-full bg-slate-950/90 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-accent-500/20 text-accent-400 flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">
                      HireLoop AI Interview Coach
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Stage & Company Calibrated Simulation
                    </div>
                  </div>
                </div>
                <Badge variant="accent" size="sm">
                  Live Feedback
                </Badge>
              </div>

              {/* Chat Dialog */}
              <div className="space-y-3 text-xs">
                {/* Candidate Prompt */}
                <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Candidate practice query:
                  </span>
                  <p className="italic text-slate-100">
                    {currentPersona.persona.coachPrompt}
                  </p>
                </div>

                {/* AI Coach Response */}
                <div className="p-3.5 rounded-xl bg-brand-900/40 border border-brand-700/60 text-brand-100 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-300 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-accent-400" /> AI Coach Guidance:
                  </span>
                  <p>{currentPersona.persona.coachResponse}</p>
                </div>
              </div>

              <Button
                variant="accent"
                size="sm"
                className="w-full mt-2"
                rightIcon={ArrowRight}
                onClick={() => onNavigate?.('job-seekers')}
              >
                Try the AI Interview Coach Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS: THE 6-STEP TIMELINE */}
      <section className="bg-slate-100/60 py-20 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="brand" className="mb-3">
              Connected Architecture
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
              How HireLoop Works: From Application to Decision
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              Six synchronized steps uniting candidate preparation with recruiter decision-making in one clear timeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {timelineSteps.map((item) => (
              <Card key={item.step} className="bg-white hover:border-brand-300 transition-all">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-md border border-brand-200/80">
                      STEP {item.step}
                    </span>
                    <Badge variant="neutral" size="sm">
                      {item.audience}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="bg-slate-50/50">
                  <span className="text-xs font-semibold text-slate-500">
                    Feature Focus:
                  </span>
                  <Badge variant="brand" size="sm">
                    {item.pill}
                  </Badge>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 5. THE 9 CORE FEATURES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="accent" className="mb-3">
            Full-Spectrum Platform
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Nine connected features powering the new standard in hiring
          </h2>
          <p className="text-slate-600 mt-3 text-base">
            Equipping candidates with unfair advantages and recruiters with zero wasted motion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon
            return (
              <Card
                key={feat.id}
                interactive
                className="p-6 space-y-4 hover:border-brand-400"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-200 text-brand-700 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <Badge
                    variant={
                      feat.category === 'Job Seeker'
                        ? 'stageStudent'
                        : feat.category === 'Recruiter'
                        ? 'stageSenior'
                        : 'accent'
                    }
                    size="sm"
                  >
                    {feat.category}
                  </Badge>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-lg">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </Card>
            )
          })}
        </div>
      </section>

      {/* 6. WHY IT MATTERS: STATUS QUO VS. HIRELOOP */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3 py-1 rounded-full bg-accent-500/20 text-accent-400 border border-accent-500/30 text-xs font-bold uppercase tracking-wider">
              The Fundamental Shift
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-4 font-display">
              Why HireLoop Matters: Fixing Broken Hiring
            </h2>
            <p className="text-slate-400 mt-3 text-base">
              The traditional hiring journey is exhausting for job seekers and overwhelming for recruiters. Here is how HireLoop fixes both sides.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Column 1: Broken Status Quo */}
            <div className="p-8 rounded-3xl bg-slate-800/50 border border-slate-700/80 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                  <X className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    The Broken Status Quo
                  </h3>
                  <p className="text-xs text-rose-300">
                    High friction, keyword filtering & ghosting
                  </p>
                </div>
              </div>

              <ul className="space-y-4 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                    ✕
                  </div>
                  <span>
                    <strong>Black-hole applications:</strong> 72% of candidates never receive a single update or rejection note after applying.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                    ✕
                  </div>
                  <span>
                    <strong>Unforgiving keyword parsers:</strong> Career pauses and non-traditional backgrounds get automatically purged before human eyes see them.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                    ✕
                  </div>
                  <span>
                    <strong>Recruiter burnout:</strong> Talent teams spend 85% of their working hours manually triaging 800+ noisy, mismatched resumes.
                  </span>
                </li>
              </ul>
            </div>

            {/* Column 2: The HireLoop Way */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-brand-900/60 to-brand-950/80 border border-brand-600/60 space-y-6 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    The HireLoop Connected Model
                  </h3>
                  <p className="text-xs text-emerald-300">
                    Transparent, stage-adaptive & AI-ranked
                  </p>
                </div>
              </div>

              <ul className="space-y-4 text-sm text-slate-200">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span>
                    <strong>Guaranteed status transparency:</strong> Live status pills update in real time from Applied to Selected with zero silence.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span>
                    <strong>Career-stage adaptation:</strong> Returners and graduates get tailored coaching, skill context, and welcoming partner teams.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span>
                    <strong>Instant AI ranking with rationale:</strong> Recruiters spend less time sorting and more time engaging top-fit talent with 1-click decisions.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-brand-800 via-brand-700 to-brand-900 text-white p-10 sm:p-16 text-center shadow-2xl overflow-hidden">
          {/* Subtle background ring */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-accent-500/20 blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <Badge variant="accent" size="lg">
              Start Today
            </Badge>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight font-display">
              Ready for a hiring journey that actually connects?
            </h2>

            <p className="text-brand-100 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
              Join thousands of job seekers advancing their careers and hundreds of hiring teams closing top candidates in record time.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="accent"
                size="lg"
                rightIcon={ArrowRight}
                onClick={() => onNavigate?.('signup', { role: 'candidate' })}
                className="w-full sm:w-auto"
              >
                Sign Up as a Job Seeker
              </Button>
              <Button
                variant="secondary"
                size="lg"
                rightIcon={ArrowRight}
                onClick={() => onNavigate?.('signup', { role: 'recruiter' })}
                className="w-full sm:w-auto bg-white text-slate-900 hover:bg-slate-100"
              >
                Post Jobs as a Recruiter
              </Button>
            </div>

            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-brand-200">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Free candidate accounts
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 14-day recruiter trial
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> SOC2 & GDPR compliant
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
