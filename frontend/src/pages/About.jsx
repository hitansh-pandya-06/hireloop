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
} from '../components/common'
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Heart,
  Users,
  Target,
  Send,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  Building2,
  Mail,
  MessageSquare,
} from 'lucide-react'

export default function About({ onNavigate }) {
  // Contact & Request Demo Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    inquiryType: 'recruiter-demo',
    teamSize: '10-50',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // FAQ Accordion state
  const [openFaq, setOpenFaq] = useState(null)

  const faqs = [
    {
      q: 'How does HireLoop adapt to different candidate career stages?',
      a: 'During onboarding, candidates select whether they are a student/recent grad, a senior professional, or returning after a career break. Our AI engine adjusts accordingly: students are evaluated on projects and potential, senior candidates get executive and system design prep, and returners get gap-narrative coaching and returner-friendly employer matching.',
    },
    {
      q: 'How does the AI applicant ranking work for recruiters?',
      a: 'Rather than using blunt keyword counts, our LLM-powered engine scores applicants based on semantic skill alignment, project complexity, and stage readiness. Recruiters receive plain-English rationales ("Why This Match") for every applicant.',
    },
    {
      q: 'Is HireLoop really free for job seekers?',
      a: 'Yes, 100% free. Job discovery, AI interview coaching sessions, transparent application tracking, and live HR AMAs are completely free for all candidates.',
    },
    {
      q: 'What happens when a recruiter shortlists or rejects a candidate?',
      a: 'In a single click, the recruiter advances or rejects the candidate. HireLoop instantly and automatically sends a respectful, transparent status notification to the candidate dashboard, completely eliminating ghosting.',
    },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 1000)
  }

  return (
    <div className="space-y-20 py-12">
      {/* 1. Header Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
        <Badge variant="brand" size="lg">
          Our Purpose & Mission
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display max-w-3xl mx-auto">
          Built to make hiring human again with{' '}
          <span className="text-brand-600">thoughtful AI</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          HireLoop was founded on a simple truth: generic job boards fail everyone. We bridge the gap between ambitious talent at every life stage and teams looking for verified, meaningful matches.
        </p>
      </section>

      {/* 2. Why HireLoop Was Founded (The Origin Story) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8 sm:p-10 space-y-6 bg-white shadow-md">
          <div className="flex items-center gap-3 text-brand-600 text-xs font-bold uppercase tracking-wider">
            <Target className="w-4 h-4" />
            <span>The Problem We Solved</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            The hiring market was trapped in two broken extremes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 leading-relaxed">
            <p>
              On one side, talented job seekers were submitting hundreds of resumes into automated applicant tracking systems (ATS), only to be rejected by keyword filters or ghosted for months without a single word of feedback. Brilliant parents returning after caregiving pauses were written off, and ambitious graduates couldn't get past 3-year experience barriers.
            </p>
            <p>
              On the other side, talent recruiters and hiring managers were drowning in 800+ unqualified applications per open requisition, spending 80% of their workday manually triaging resumes rather than having meaningful conversations with top-tier candidates.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-brand-50 border border-brand-200/80 text-sm text-brand-900 font-medium">
            "HireLoop was created as a continuous feedback loop: where candidates get stage-specific preparation and guaranteed status transparency, while recruiters get AI-ranked pools and zero-friction 1-click decision workflows."
          </div>
        </Card>
      </section>

      {/* 3. Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="accent" className="mb-2">
            Guiding Principles
          </Badge>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            The four values behind every line of code
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="font-bold text-slate-900 text-lg">
              Context Over Keywords
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We look at project depth, architectural decisions, and transferrable skills instead of blind text counters.
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-accent-50 text-accent-600 flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="font-bold text-slate-900 text-lg">
              Zero-Ghosting Rule
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every candidate deserves closure and clarity. Status changes trigger instant, courteous updates automatically.
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="font-bold text-slate-900 text-lg">
              Career Stage Dignity
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Caregiving breaks, parental leave, and non-linear transitions are honored as indicators of resilience and maturity.
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              04
            </div>
            <h3 className="font-bold text-slate-900 text-lg">
              AI for Human Time
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              AI should automate repetitive sorting so recruiters have time to hold real, empathetic human interviews.
            </p>
          </Card>
        </div>
      </section>

      {/* 4. CONTACT / REQUEST DEMO FORM */}
      <section
        id="contact-form"
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24"
      >
        <Card className="p-8 sm:p-12 bg-white shadow-xl border border-slate-200">
          <div className="max-w-xl mx-auto text-center space-y-3 mb-8">
            <Badge variant="brand">Get in Touch</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Request a Recruiter Demo or Contact Us
            </h2>
            <p className="text-sm text-slate-600">
              Tell us about your team or hiring goals. We respond within two business hours.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-emerald-900">
                Thank You, {formData.name || 'there'}!
              </h3>
              <p className="text-sm text-emerald-800 max-w-md mx-auto">
                We received your inquiry regarding{' '}
                <strong>
                  {formData.inquiryType === 'recruiter-demo'
                    ? 'Recruiter Platform Demo'
                    : 'Partnership & Inquiries'}
                </strong>
                . A senior talent specialist will contact you at{' '}
                <strong>{formData.email}</strong> shortly.
              </p>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSubmitted(false)}
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. sarah@company.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Company */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Tech Inc."
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                {/* Inquiry Type */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Inquiry Type
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) =>
                      setFormData({ ...formData, inquiryType: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="recruiter-demo">
                      Request Recruiter Platform Demo
                    </option>
                    <option value="enterprise">Enterprise Custom Pricing</option>
                    <option value="candidate-support">
                      Job Seeker Questions
                    </option>
                    <option value="partnership">Partner / Return-to-Work Program</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  How can we help? (Hiring volume, open roles, or questions)
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share details about your team or hiring challenges..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={isSubmitting}
                rightIcon={Send}
                className="w-full justify-center"
              >
                {isSubmitting ? 'Sending Request...' : 'Submit Request'}
              </Button>
            </form>
          )}
        </Card>
      </section>

      {/* 5. Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2 mb-8">
          <Badge variant="neutral">FAQ</Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i
            return (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full p-5 text-left flex items-center justify-between font-bold text-slate-900 text-sm hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-brand-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
