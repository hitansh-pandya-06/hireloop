import React, { useState, useEffect } from 'react'
import {
  Layers,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  UserCheck,
  Briefcase,
  HelpCircle,
  Database,
} from 'lucide-react'
import Button from './Button'
import NotificationBell from './NotificationBell'
import { checkBackendHealthApi } from '../../services/api'

/**
 * Reusable Navbar Component with NotificationBell & Live Backend Indicator
 */
export default function Navbar({
  currentPage = 'home',
  onNavigate,
  user = null,
  onLogout,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [backendOnline, setBackendOnline] = useState(false)

  useEffect(() => {
    async function checkHealth() {
      const res = await checkBackendHealthApi()
      if (res && res.status === 'ok') {
        setBackendOnline(true)
      }
    }
    checkHealth()
  }, [])

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'job-seekers', label: 'For Job Seekers' },
    { id: 'recruiters', label: 'For Recruiters' },
    { id: 'about', label: 'Why HireLoop' },
  ]

  const handleLinkClick = (id) => {
    setMobileMenuOpen(false)
    onNavigate?.(id)
  }

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        {/* Brand Logo & Live Status */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-600/20 group-hover:scale-105 transition-transform duration-200">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-2xl tracking-tight text-slate-900 font-display">
                  Hire<span className="text-brand-600">Loop</span>
                </span>
                <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
              </div>
              <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 hidden sm:block">
                Connected Hiring Journey
              </p>
            </div>
          </button>

          {backendOnline && (
            <div
              title="FastAPI + SQLite Live Backend Connected"
              className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-semibold text-emerald-700 shadow-2xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <Database className="w-3 h-3 text-emerald-600" />
              <span>Backend Connected</span>
            </div>
          )}
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 p-1.5 rounded-full border border-slate-200/60">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => handleLinkClick(link.id)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-150 ${
                  isActive
                    ? 'bg-white text-brand-700 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                {link.label}
              </button>
            )
          })}
        </nav>

        {/* Right Actions: Notifications Bell + Auth CTAs */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              {/* Live Notifications Bell Dropdown */}
              <NotificationBell onNavigate={onNavigate} />

              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  handleLinkClick(
                    user.role === 'recruiter'
                      ? 'recruiter-dashboard'
                      : 'candidate-dashboard'
                  )
                }
              >
                {user.role === 'recruiter' ? 'Recruiter Hub' : 'My Dashboard'}
              </Button>
              <Button variant="secondary" size="sm" onClick={onLogout}>
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <NotificationBell onNavigate={onNavigate} />

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLinkClick('login')}
              >
                Log In
              </Button>
              <Button
                variant="accent"
                size="sm"
                rightIcon={ArrowRight}
                onClick={() => handleLinkClick('signup')}
              >
                Get Started
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center gap-2">
          <NotificationBell onNavigate={onNavigate} />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleLinkClick(link.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium flex items-center justify-between ${
                  currentPage === link.id
                    ? 'bg-brand-50 text-brand-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{link.label}</span>
                {currentPage === link.id && (
                  <span className="w-2 h-2 rounded-full bg-brand-600" />
                )}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            {user ? (
              <>
                <Button
                  variant="primary"
                  className="w-full justify-center"
                  onClick={() =>
                    handleLinkClick(
                      user.role === 'recruiter'
                        ? 'recruiter-dashboard'
                        : 'candidate-dashboard'
                    )
                  }
                >
                  {user.role === 'recruiter' ? 'Recruiter Hub' : 'My Dashboard'}
                </Button>
                <Button
                  variant="secondary"
                  className="w-full justify-center"
                  onClick={onLogout}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="secondary"
                  className="w-full justify-center"
                  onClick={() => handleLinkClick('login')}
                >
                  Log In
                </Button>
                <Button
                  variant="accent"
                  className="w-full justify-center"
                  rightIcon={ArrowRight}
                  onClick={() => handleLinkClick('signup')}
                >
                  Get Started Free
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
