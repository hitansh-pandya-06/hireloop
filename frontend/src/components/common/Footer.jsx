import React from 'react'
import {
  Layers,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Heart,
  ExternalLink,
} from 'lucide-react'

export default function Footer({ onNavigate }) {
  const steps = [
    'Onboard',
    'Discover',
    'Prepare',
    'Apply / Track',
    'Shortlist',
    'Hire',
  ]

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Visual Loop Strip */}
      <div className="border-b border-slate-800/80 bg-slate-950/40 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-400">
            <Sparkles className="w-4 h-4" />
            <span>The Continuous Loop:</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs">
            {steps.map((step, idx) => (
              <React.Fragment key={step}>
                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-200 border border-slate-700/80 font-medium">
                  {step}
                </span>
                {idx < steps.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 hidden sm:inline" />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Enterprise-grade privacy</span>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-white shadow-md">
                <Layers className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white font-display">
                Hire<span className="text-brand-400">Loop</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Personalized job discovery and streamlined recruitment in one platform.
              Bridging the gap between ambitious talent at every career stage and forward-thinking hiring teams.
            </p>
            <div className="pt-2 text-xs text-slate-400 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
              All systems operational • AI Match Engine v2.4 Active
            </div>
          </div>

          {/* For Job Seekers */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              For Job Seekers
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate?.('job-seekers')}
                  className="hover:text-white transition-colors text-left"
                >
                  Stage-Specific Matching
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate?.('job-seekers')}
                  className="hover:text-white transition-colors text-left"
                >
                  AI Interview Coach
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate?.('job-seekers')}
                  className="hover:text-white transition-colors text-left"
                >
                  Career Returners Track
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate?.('job-seekers')}
                  className="hover:text-white transition-colors text-left"
                >
                  Live HR AMA Sessions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate?.('job-seekers')}
                  className="hover:text-white transition-colors text-left"
                >
                  Transparent Application Tracker
                </button>
              </li>
            </ul>
          </div>

          {/* For Recruiters */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              For Recruiters
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate?.('recruiters')}
                  className="hover:text-white transition-colors text-left"
                >
                  AI Applicant Ranking
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate?.('recruiters')}
                  className="hover:text-white transition-colors text-left"
                >
                  Unified Candidate Profiles
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate?.('recruiters')}
                  className="hover:text-white transition-colors text-left"
                >
                  One-Click Shortlist Actions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate?.('recruiters')}
                  className="hover:text-white transition-colors text-left"
                >
                  Automatic Candidate Updates
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate?.('about')}
                  className="hover:text-white transition-colors text-left"
                >
                  Request Recruiter Demo
                </button>
              </li>
            </ul>
          </div>

          {/* Platform & Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Company & Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate?.('about')}
                  className="hover:text-white transition-colors text-left"
                >
                  About HireLoop
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate?.('about')}
                  className="hover:text-white transition-colors text-left"
                >
                  Why It Matters
                </button>
              </li>
              <li>
                <span className="text-slate-400">Security & GDPR</span>
              </li>
              <li>
                <span className="text-slate-400">Privacy Policy</span>
              </li>
              <li>
                <span className="text-slate-400">Terms of Service</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} HireLoop Inc. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Designed for human potential with thoughtful AI.
          </p>
        </div>
      </div>
    </footer>
  )
}
