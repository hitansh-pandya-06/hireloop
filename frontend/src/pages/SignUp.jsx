import React, { useState } from 'react'
import {
  Button,
  Card,
  Badge,
} from '../components/common'
import {
  Layers,
  ArrowRight,
  UserCheck,
  Briefcase,
  GraduationCap,
  RotateCcw,
  Sparkles,
  Lock,
  Mail,
  User,
  Building,
  CheckCircle2,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function SignUp({ onNavigate, initialRole = 'candidate' }) {
  const { signup, loginWithGoogle } = useAuth()

  const [role, setRole] = useState(initialRole || 'candidate')
  const [careerStage, setCareerStage] = useState('returner')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [company, setCompany] = useState('')
  const [companyType, setCompanyType] = useState('Startup / SME')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!name || !email || !password) {
      setError('Please fill in all required fields.')
      return
    }

    setLoading(true)
    try {
      const res = await signup({
        name,
        email,
        password,
        role,
        careerStage: role === 'candidate' ? careerStage : null,
        company: role === 'recruiter' ? company : '',
        companyType: role === 'recruiter' ? companyType : null,
      })

      if (res.success) {
        if (role === 'candidate') {
          onNavigate('candidate-dashboard')
        } else {
          onNavigate('recruiter-dashboard')
        }
      }
    } catch (err) {
      setError('An error occurred during sign up. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    setLoading(true)
    const res = await loginWithGoogle(role)
    if (res.success) {
      if (role === 'candidate') {
        onNavigate('candidate-dashboard')
      } else {
        onNavigate('recruiter-dashboard')
      }
    }
    setLoading(false)
  }

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-8">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-700 to-brand-500 text-white flex items-center justify-center mx-auto shadow-md shadow-brand-500/20">
            <Layers className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Join the HireLoop Journey
          </h1>
          <p className="text-sm text-slate-600">
            Choose your role to get started with stage-adapted hiring.
          </p>
        </div>

        <Card className="p-6 sm:p-8 bg-white shadow-xl border border-slate-200">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
              {error}
            </div>
          )}

          {/* STEP 1: ROLE SELECTION CARDS */}
          <div className="space-y-3 mb-6">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              1. I am joining HireLoop as a:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Job Seeker */}
              <div
                onClick={() => setRole('candidate')}
                className={`cursor-pointer p-4 rounded-2xl border text-left transition-all ${
                  role === 'candidate'
                    ? 'border-brand-500 bg-brand-50/50 ring-2 ring-brand-500/20 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      role === 'candidate'
                        ? 'bg-brand-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <UserCheck className="w-5 h-5" />
                  </div>
                  {role === 'candidate' && (
                    <CheckCircle2 className="w-4 h-4 text-brand-600" />
                  )}
                </div>
                <div className="font-bold text-slate-900 text-sm">
                  Job Seeker
                </div>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  Personalized jobs, stage coaching & transparent tracking.
                </p>
              </div>

              {/* Recruiter */}
              <div
                onClick={() => setRole('recruiter')}
                className={`cursor-pointer p-4 rounded-2xl border text-left transition-all ${
                  role === 'recruiter'
                    ? 'border-brand-500 bg-brand-50/50 ring-2 ring-brand-500/20 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      role === 'recruiter'
                        ? 'bg-brand-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <Briefcase className="w-5 h-5" />
                  </div>
                  {role === 'recruiter' && (
                    <CheckCircle2 className="w-4 h-4 text-brand-600" />
                  )}
                </div>
                <div className="font-bold text-slate-900 text-sm">
                  Recruiter / Hiring Team
                </div>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  AI-ranked candidates, unified profiles & 1-click decisions.
                </p>
              </div>
            </div>
          </div>

          {/* STEP 2: STAGE SPECIFICS (IF CANDIDATE) OR COMPANY (IF RECRUITER) */}
          {role === 'candidate' ? (
            <div className="space-y-3 mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                2. Select Your Current Career Stage:
              </label>
              <div className="grid grid-cols-1 gap-2 text-xs">
                {[
                  {
                    id: 'returner',
                    label: 'Returning After a Career Break',
                    sub: 'Parenting, family care, sabbatical, or personal transition',
                    icon: RotateCcw,
                    badge: 'stageReturner',
                  },
                  {
                    id: 'student',
                    label: 'Student / Recent Graduate',
                    sub: 'Graduated within 0-2 years, coursework & capstone focus',
                    icon: GraduationCap,
                    badge: 'stageStudent',
                  },
                  {
                    id: 'senior',
                    label: 'Senior Professional',
                    sub: 'Experienced lead, staff, principal or executive level',
                    icon: Briefcase,
                    badge: 'stageSenior',
                  },
                ].map((st) => {
                  const Icon = st.icon
                  const isSelected = careerStage === st.id
                  return (
                    <div
                      key={st.id}
                      onClick={() => setCareerStage(st.id)}
                      className={`cursor-pointer p-3 rounded-xl border flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-white border-brand-500 shadow-xs ring-1 ring-brand-500/20'
                          : 'bg-white/60 border-slate-200 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`w-4 h-4 ${
                            isSelected ? 'text-brand-600' : 'text-slate-400'
                          }`}
                        />
                        <div>
                          <div className="font-bold text-slate-900">
                            {st.label}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {st.sub}
                          </div>
                        </div>
                      </div>
                      <Badge variant={st.badge} size="sm">
                        {isSelected ? 'Selected' : 'Pick'}
                      </Badge>
                    </div>
                  )
                })}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Stripe, Acme Corp"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Organization Type
                </label>
                <select
                  value={companyType}
                  onChange={(e) => setCompanyType(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="Startup / SME">Early-stage Startup / SME</option>
                  <option value="Enterprise">Mid-size to Enterprise</option>
                  <option value="Recruiting Agency">Recruiting / Talent Agency</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 3: ACCOUNT CREDENTIALS FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Lin"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Work or Personal Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  placeholder="maya@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  placeholder="Create a secure password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant={role === 'candidate' ? 'accent' : 'primary'}
              size="lg"
              loading={loading}
              rightIcon={ArrowRight}
              className="w-full justify-center mt-2 shadow-sm"
            >
              {loading
                ? 'Creating Account...'
                : role === 'candidate'
                ? 'Create Free Job Seeker Account'
                : 'Start Free Recruiter Trial'}
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
              <span>Continue with Google</span>
            </button>
          </div>

          <div className="mt-6 text-center text-xs text-slate-500">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="font-bold text-brand-600 hover:underline"
            >
              Sign In
            </button>
          </div>
        </Card>
      </div>
    </div>
  )
}
