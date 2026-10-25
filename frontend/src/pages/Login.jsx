import React, { useState } from 'react'
import {
  Button,
  Card,
  Badge,
} from '../components/common'
import {
  Layers,
  ArrowRight,
  Mail,
  Lock,
  Sparkles,
  UserCheck,
  Briefcase,
  AlertCircle,
} from 'lucide-react'
import { useAuth, DEMO_USERS } from '../context/AuthContext'

export default function Login({ onNavigate }) {
  const { login, loginWithGoogle } = useAuth()
  
  // Read previously logged in account from localStorage
  const [lastAccount, setLastAccount] = useState(() => {
    try {
      const saved = localStorage.getItem('hireloop_last_account')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  const [email, setEmail] = useState(() => lastAccount?.email || '')
  const [password, setPassword] = useState(() => (lastAccount ? 'password123' : ''))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Please provide your email and password.')
      return
    }

    setLoading(true)
    try {
      const res = await login(email, password)
      if (res.success) {
        if (res.user.role === 'recruiter') {
          onNavigate('recruiter-dashboard')
        } else {
          onNavigate('candidate-dashboard')
        }
      }
    } catch (err) {
      setError('Invalid login credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleQuickResume = async () => {
    if (!lastAccount) return
    setLoading(true)
    setError('')
    try {
      const res = await login(lastAccount.email, password || 'password123')
      if (res.success) {
        if (res.user.role === 'recruiter') {
          onNavigate('recruiter-dashboard')
        } else {
          onNavigate('candidate-dashboard')
        }
      }
    } catch (err) {
      setError('Could not auto-login with previous account. Please enter password below.')
    } finally {
      setLoading(false)
    }
  }

  const handleClearLastAccount = (e) => {
    e.stopPropagation()
    localStorage.removeItem('hireloop_last_account')
    setLastAccount(null)
    setEmail('')
    setPassword('')
  }

  const handleDemoLogin = async (role) => {
    setLoading(true)
    const demo = DEMO_USERS[role]
    const res = await login(demo.email, 'password123')
    if (res.success) {
      if (role === 'recruiter') {
        onNavigate('recruiter-dashboard')
      } else {
        onNavigate('candidate-dashboard')
      }
    }
    setLoading(false)
  }

  const handleGoogleAuth = async () => {
    setLoading(true)
    const res = await loginWithGoogle('candidate')
    if (res.success) {
      onNavigate('candidate-dashboard')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-700 to-brand-500 text-white flex items-center justify-center mx-auto shadow-md shadow-brand-500/20">
            <Layers className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Welcome back to HireLoop
          </h1>
          <p className="text-sm text-slate-600">
            Access your personalized journey or recruiter pipeline.
          </p>
        </div>

        <Card className="p-6 sm:p-8 bg-white shadow-xl border border-slate-200">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Recently Logged In Account Banner */}
          {lastAccount && (
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-brand-50 to-indigo-50/60 border border-brand-200 space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-900 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-brand-600" />
                  <span>Previous Account Detected</span>
                </span>
                <button
                  type="button"
                  onClick={handleClearLastAccount}
                  className="text-[11px] text-slate-400 hover:text-slate-600 underline"
                  title="Remove this account shortcut"
                >
                  Clear
                </button>
              </div>

              <div className="flex items-center justify-between gap-3 p-3 bg-white rounded-xl border border-brand-200/80 shadow-2xs">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center shrink-0 shadow-xs">
                    {lastAccount.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-sm text-slate-900 truncate">
                      {lastAccount.name}
                    </div>
                    <div className="text-xs text-slate-500 truncate">
                      {lastAccount.email}
                    </div>
                    <div className="text-[10px] text-brand-600 font-medium capitalize mt-0.5">
                      {lastAccount.role === 'recruiter'
                        ? `Recruiter • ${lastAccount.company || 'Cloudscale Systems'}`
                        : `Job Seeker • ${lastAccount.careerStage || 'Returner'}`}
                    </div>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleQuickResume}
                  disabled={loading}
                  rightIcon={ArrowRight}
                  className="shrink-0"
                >
                  1-Click Resume
                </Button>
              </div>
              <div className="text-[10px] text-slate-500 flex items-center justify-between">
                <span>Auto-prefilled in the fields below.</span>
                {lastAccount.lastActive && <span>Active: {lastAccount.lastActive}</span>}
              </div>
            </div>
          )}

          {/* Quick Demo Logins Banner */}
          <div className="mb-6 p-4 rounded-2xl bg-brand-50/70 border border-brand-200 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-brand-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-accent-500" />
              <span>Instant 1-Click Demo Logins:</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('candidate')}
                className="p-2.5 rounded-xl bg-white border border-brand-200 hover:border-brand-400 text-left transition-all text-xs shadow-2xs group"
              >
                <div className="font-bold text-slate-900 flex items-center justify-between">
                  <span>Job Seeker</span>
                  <UserCheck className="w-3.5 h-3.5 text-brand-600" />
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5 truncate">
                  Elena Rostova (Returner)
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('recruiter')}
                className="p-2.5 rounded-xl bg-white border border-brand-200 hover:border-brand-400 text-left transition-all text-xs shadow-2xs group"
              >
                <div className="font-bold text-slate-900 flex items-center justify-between">
                  <span>Recruiter</span>
                  <Briefcase className="w-3.5 h-3.5 text-brand-600" />
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5 truncate">
                  Sarah Vance (Cloudscale)
                </div>
              </button>
            </div>
          </div>

          {/* Credentials Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault()
                    alert('Password reset instructions sent to registered email in live mode.')
                  }}
                  className="text-xs text-brand-600 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              rightIcon={ArrowRight}
              className="w-full justify-center mt-2 shadow-sm"
            >
              {loading ? 'Signing in...' : 'Sign In to HireLoop'}
            </Button>
          </form>

          {/* Social Auth Option */}
          <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
            <button
              type="button"
              onClick={handleGoogleAuth}
              className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Sign in with Google</span>
            </button>
          </div>

          <div className="mt-6 text-center text-xs text-slate-500">
            Don't have an account yet?{' '}
            <button
              type="button"
              onClick={() => onNavigate('signup')}
              className="font-bold text-brand-600 hover:underline"
            >
              Sign Up
            </button>
          </div>
        </Card>
      </div>
    </div>
  )
}
