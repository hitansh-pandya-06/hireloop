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
  Modal,
} from '../components/common'
import {
  Sparkles,
  ArrowRight,
  Briefcase,
  GraduationCap,
  RotateCcw,
  Star,
  Send,
  CheckCircle2,
  Sliders,
  ExternalLink,
} from 'lucide-react'

export default function DesignSystemPreview() {
  const [modalOpen, setModalOpen] = useState(false)
  const [btnLoading, setBtnLoading] = useState(false)

  const simulateLoading = () => {
    setBtnLoading(true)
    setTimeout(() => setBtnLoading(false), 2000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Intro Header */}
      <div className="border-b border-slate-200 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          HireLoop Foundation
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
          Design System & Component Library
        </h1>
        <p className="mt-2 text-slate-600 max-w-2xl text-base">
          Maritime Teal (`#0E525E`) for trust and calm guidance, Warm Coral (`#E8631C`) for energy and motivation. Built with clean rounded cards, accessible contrast, and tactile feedback.
        </p>
      </div>

      {/* 1. Color Palette Tokens */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-600"></span>
            1. Brand Color Palette & Semantics
          </h2>
          <span className="text-xs text-slate-500 font-mono">Tailwind Configured</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          <div className="p-4 rounded-2xl bg-brand-600 text-white shadow-xs">
            <div className="text-xs font-semibold uppercase tracking-wider opacity-80">Primary Teal</div>
            <div className="text-lg font-bold mt-1">#0E525E</div>
            <div className="text-[11px] opacity-75 mt-0.5">Trustworthy & Reliable</div>
          </div>
          <div className="p-4 rounded-2xl bg-brand-50 text-brand-900 border border-brand-200">
            <div className="text-xs font-semibold uppercase tracking-wider opacity-80">Brand Light</div>
            <div className="text-lg font-bold mt-1">#F0F9FA</div>
            <div className="text-[11px] opacity-75 mt-0.5">Tinted Backgrounds</div>
          </div>
          <div className="p-4 rounded-2xl bg-accent-500 text-white shadow-xs">
            <div className="text-xs font-semibold uppercase tracking-wider opacity-80">Warm Accent</div>
            <div className="text-lg font-bold mt-1">#E8631C</div>
            <div className="text-[11px] opacity-75 mt-0.5">Human & Motivating</div>
          </div>
          <div className="p-4 rounded-2xl bg-accent-50 text-accent-900 border border-accent-200">
            <div className="text-xs font-semibold uppercase tracking-wider opacity-80">Accent Light</div>
            <div className="text-lg font-bold mt-1">#FFF8F1</div>
            <div className="text-[11px] opacity-75 mt-0.5">Subtle Highlights</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 text-white">
            <div className="text-xs font-semibold uppercase tracking-wider opacity-80">Slate 900</div>
            <div className="text-lg font-bold mt-1">#0F172A</div>
            <div className="text-[11px] opacity-75 mt-0.5">Headings & High Contrast</div>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-500 text-white">
            <div className="text-xs font-semibold uppercase tracking-wider opacity-80">Success</div>
            <div className="text-lg font-bold mt-1">#10B981</div>
            <div className="text-[11px] opacity-75 mt-0.5">Offers & High Match</div>
          </div>
        </div>
      </section>

      {/* 2. Buttons */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-accent-500"></span>
          2. Reusable Buttons & States
        </h2>

        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Variants
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" rightIcon={ArrowRight}>
                  Primary Action
                </Button>
                <Button variant="accent" leftIcon={Sparkles}>
                  Accent Warm
                </Button>
                <Button variant="secondary">
                  Secondary White
                </Button>
                <Button variant="outline">
                  Outline Teal
                </Button>
                <Button variant="ghost">
                  Ghost Button
                </Button>
                <Button variant="danger">
                  Danger / Reject
                </Button>
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Sizes & Interactive States
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm" variant="primary">Small Button</Button>
                <Button size="md" variant="primary">Medium (Default)</Button>
                <Button size="lg" variant="primary">Large Hero CTA</Button>
                <Button
                  variant="primary"
                  loading={btnLoading}
                  onClick={simulateLoading}
                >
                  {btnLoading ? 'Simulating...' : 'Click to Test Loading'}
                </Button>
                <Button variant="primary" disabled>
                  Disabled State
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* 3. Badges and Career Stages */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-500"></span>
          3. Badges & Career Stage Indicators
        </h2>

        <Card className="p-6 space-y-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Candidate Career Stages (Core HireLoop Personalization)
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="stageStudent" icon={GraduationCap} size="lg">
                Student & Fresh Graduate
              </Badge>
              <Badge variant="stageSenior" icon={Briefcase} size="lg">
                Senior & Experienced Professional
              </Badge>
              <Badge variant="stageReturner" icon={RotateCcw} size="lg">
                Returning After Career Break
              </Badge>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Match Scores & Tech Skill Badges
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="success" dot size="md">98% AI Match</Badge>
              <Badge variant="brand" dot size="md">92% AI Match</Badge>
              <Badge variant="warning" dot size="md">74% Match</Badge>
              <Badge variant="neutral">Python</Badge>
              <Badge variant="neutral">FastAPI</Badge>
              <Badge variant="neutral">React.js</Badge>
              <Badge variant="neutral">PostgreSQL</Badge>
              <Badge variant="neutral">Machine Learning</Badge>
            </div>
          </div>
        </Card>
      </section>

      {/* 4. Status Pills (Application Tracking) */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          4. Application Tracker Status Pills (Transparent Pipeline)
        </h2>

        <Card className="p-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
            Unified Status States for Candidate Tracker & Recruiter Actions
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <StatusPill status="applied" size="lg" />
            <StatusPill status="under_review" size="lg" />
            <StatusPill status="shortlisted" size="lg" />
            <StatusPill status="selected" size="lg" />
            <StatusPill status="rejected" size="lg" />
          </div>
        </Card>
      </section>

      {/* 5. Cards & Elevation */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
          5. Reusable Cards & Interactive Surface
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Default */}
          <Card>
            <CardHeader>
              <Badge variant="brand" className="w-fit mb-2">Stage Adaptation</Badge>
              <CardTitle>Personalized Journey</CardTitle>
              <CardDescription>
                Tailored job recommendations and interview tips aligned with where you are in your career.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-500">
                Default clean card with soft shadow and rounded 16px radius.
              </p>
            </CardContent>
            <CardFooter>
              <span className="text-xs text-slate-400">Step 1 of 6</span>
              <Button size="sm" variant="ghost" rightIcon={ArrowRight}>Explore</Button>
            </CardFooter>
          </Card>

          {/* Card 2: Interactive Lift */}
          <Card interactive onClick={() => alert('Card clicked!')}>
            <CardHeader>
              <Badge variant="accent" className="w-fit mb-2">Interactive Lift</Badge>
              <CardTitle>Hover & Click State</CardTitle>
              <CardDescription>
                Hover over this card to see smooth elevation shift and border highlight micro-animation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-500">
                Used for clickable job listings and candidate profiles.
              </p>
            </CardContent>
            <CardFooter>
              <span className="text-xs text-accent-600 font-medium">Click to test</span>
              <ArrowRight className="w-4 h-4 text-accent-500" />
            </CardFooter>
          </Card>

          {/* Card 3: Brand Gradient */}
          <Card variant="brand">
            <CardHeader>
              <Badge variant="accent" className="w-fit mb-2">AI Engine</Badge>
              <CardTitle className="text-white">Smart Match 2.0</CardTitle>
              <CardDescription className="text-brand-100">
                Transparent ranking explaining why a candidate aligns with a company culture.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-xs text-brand-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero keyword stuffing bias</span>
              </div>
            </CardContent>
            <CardFooter className="border-brand-700">
              <span className="text-xs text-brand-200">Live AI</span>
              <Button size="sm" variant="accent">Try Coach</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* 6. Modal Dialog */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
          6. Accessible Modal Dialog
        </h2>

        <Card className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Interactive Dialog Preview
            </h3>
            <p className="text-sm text-slate-600 mt-0.5">
              Backdrop blur, escape key listener, click-outside dismissal, and accessible DOM structure.
            </p>
          </div>
          <Button variant="primary" onClick={() => setModalOpen(true)}>
            Open Test Modal
          </Button>
        </Card>

        {/* The Modal */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Candidate Profile Review"
          description="Confirm action for Maya Lin (Senior Full-Stack Engineer)"
          footer={
            <>
              <Button variant="secondary" size="sm" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  alert('Candidate shortlisted! Notification queued.')
                  setModalOpen(false)
                }}
              >
                Confirm Shortlist
              </Button>
            </>
          }
        >
          <div className="space-y-4 text-sm text-slate-600">
            <div className="p-3 bg-brand-50 rounded-xl border border-brand-200/80 flex items-center justify-between">
              <div>
                <div className="font-semibold text-brand-900">AI Match Score: 96%</div>
                <div className="text-xs text-brand-700">High alignment in Python, Distributed Systems, and Team Mentorship.</div>
              </div>
              <Badge variant="success">Top Tier</Badge>
            </div>
            <p>
              Shortlisting this candidate will automatically send an encouraging notification to their dashboard and trigger interview scheduling.
            </p>
          </div>
        </Modal>
      </section>
    </div>
  )
}
