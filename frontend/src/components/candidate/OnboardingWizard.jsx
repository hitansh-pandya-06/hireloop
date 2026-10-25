import React, { useState } from 'react'
import { Card, Button, Badge } from '../common'
import {
  GraduationCap,
  Briefcase,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Heart,
  Award,
  Layers,
  MapPin,
  DollarSign,
  Compass,
} from 'lucide-react'

export default function OnboardingWizard({ initialStage = 'returner', onComplete }) {
  const [step, setStep] = useState(1)

  // Stage Choice
  const [careerStage, setCareerStage] = useState(initialStage || 'returner')

  // Returner Specifics
  const [breakDuration, setBreakDuration] = useState('3 years (2021 - 2024)')
  const [breakActivities, setBreakActivities] = useState(
    'Full-time family caregiving, open-source React 19 contributions, completed advanced TypeScript & Next.js projects.'
  )
  const [returnReadiness, setReturnReadiness] = useState('Immediate (Full-time Remote or Hybrid)')

  // Student Specifics
  const [education, setEducation] = useState('B.S. in Computer Science (2024)')
  const [capstoneProject, setCapstoneProject] = useState(
    'Collaborative real-time canvas editor built with React, WebSockets, and Canvas API.'
  )

  // Senior Specifics
  const [experienceYears, setExperienceYears] = useState('8')
  const [leadershipScope, setLeadershipScope] = useState('Staff Engineer / Tech Lead')

  // Common Skills & Preferences
  const [selectedSkills, setSelectedSkills] = useState([
    'React 19',
    'TypeScript',
    'Tailwind CSS',
    'System Design',
  ])
  const [targetRole, setTargetRole] = useState('Senior Frontend / Full-Stack Specialist')
  const [preferredWorkplace, setPreferredWorkplace] = useState('Remote')
  const [targetComp, setTargetComp] = useState('$160,000 - $190,000')

  const availableSkills = [
    'React 19',
    'TypeScript',
    'Tailwind CSS',
    'Next.js',
    'Python',
    'FastAPI',
    'Node.js',
    'PostgreSQL',
    'System Design',
    'Design Systems',
    'Accessibility (WCAG)',
    'GraphQL',
    'Docker',
    'Kubernetes',
  ]

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill))
    } else {
      setSelectedSkills([...selectedSkills, skill])
    }
  }

  const handleFinish = () => {
    onComplete({
      careerStage,
      breakDuration: careerStage === 'returner' ? breakDuration : null,
      breakActivities: careerStage === 'returner' ? breakActivities : null,
      returnReadiness: careerStage === 'returner' ? returnReadiness : null,
      education: careerStage === 'student' ? education : null,
      capstoneProject: careerStage === 'student' ? capstoneProject : null,
      experienceYears: careerStage === 'senior' ? experienceYears : null,
      leadershipScope: careerStage === 'senior' ? leadershipScope : null,
      skills: selectedSkills,
      targetRole,
      preferredWorkplace,
      targetComp,
      onboarded: true,
    })
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6">
      {/* Wizard Step Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          <span>Candidate Onboarding Wizard</span>
          <span>Step {step} of 3</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-600 to-accent-500 transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      <Card className="p-6 sm:p-10 bg-white shadow-xl border border-slate-200 space-y-8">
        {/* ================= STEP 1: CAREER STAGE SELECTION ================= */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-brand-600 text-xs font-bold uppercase tracking-wider mb-1">
                <Compass className="w-4 h-4" />
                <span>Step 1: Your Career Stage</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                Where are you in your career journey?
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                HireLoop personalizes your job feed, interview practice questions, and employer matching based on this choice.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {/* Option A: Returner */}
              <div
                onClick={() => setCareerStage('returner')}
                className={`cursor-pointer p-5 rounded-2xl border text-left transition-all ${
                  careerStage === 'returner'
                    ? 'border-brand-500 bg-brand-50/60 ring-2 ring-brand-500/20 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                      <RotateCcw className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">
                        Returning After a Career Break
                      </h4>
                      <p className="text-xs text-slate-500">
                        Caregiving, parental leave, health sabbatical, or personal transition.
                      </p>
                    </div>
                  </div>
                  <Badge variant="stageReturner">Specialized Track</Badge>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-200/60 text-xs text-brand-800">
                  ✨ Unlocks returner-friendly employers with onboarding ramps and gap-narrative coaching.
                </div>
              </div>

              {/* Option B: Student */}
              <div
                onClick={() => setCareerStage('student')}
                className={`cursor-pointer p-5 rounded-2xl border text-left transition-all ${
                  careerStage === 'student'
                    ? 'border-brand-500 bg-brand-50/60 ring-2 ring-brand-500/20 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">
                        Student / Fresh Graduate
                      </h4>
                      <p className="text-xs text-slate-500">
                        Graduating soon or graduated within the last 0-2 years.
                      </p>
                    </div>
                  </div>
                  <Badge variant="stageStudent">Grad Track</Badge>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-200/60 text-xs text-brand-800">
                  ✨ Focuses on capstone projects, coding aptitude, and junior entry-level compensation.
                </div>
              </div>

              {/* Option C: Senior */}
              <div
                onClick={() => setCareerStage('senior')}
                className={`cursor-pointer p-5 rounded-2xl border text-left transition-all ${
                  careerStage === 'senior'
                    ? 'border-brand-500 bg-brand-50/60 ring-2 ring-brand-500/20 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">
                        Senior Professional (7+ Years)
                      </h4>
                      <p className="text-xs text-slate-500">
                        Senior, Staff, Principal engineer or Engineering Manager.
                      </p>
                    </div>
                  </div>
                  <Badge variant="stageSenior">Senior Track</Badge>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-200/60 text-xs text-brand-800">
                  ✨ Filters out recruiter noise; matches you with high-leverage roles and VP connections.
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <Button
                variant="primary"
                size="md"
                rightIcon={ArrowRight}
                onClick={() => setStep(2)}
              >
                Continue to Stage Deep-Dive
              </Button>
            </div>
          </div>
        )}

        {/* ================= STEP 2: STAGE DEEP-DIVE ================= */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-brand-600 text-xs font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4 text-accent-500" />
                <span>Step 2: Stage-Specific Context</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                {careerStage === 'returner'
                  ? 'Tell us about your career pause and accomplishments'
                  : careerStage === 'student'
                  ? 'Your studies, graduation, and capstones'
                  : 'Your experience and leadership impact'}
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                {careerStage === 'returner'
                  ? 'This context will be framed constructively so employers appreciate your dedication and technical currency.'
                  : 'Helps recruiters evaluate your actual technical scope.'}
              </p>
            </div>

            {/* A. If Returner */}
            {careerStage === 'returner' && (
              <div className="space-y-4 p-5 rounded-2xl bg-amber-50/50 border border-amber-200/80">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-900 mb-1.5">
                    Break Duration
                  </label>
                  <input
                    type="text"
                    value={breakDuration}
                    onChange={(e) => setBreakDuration(e.target.value)}
                    placeholder="e.g. 2.5 years (Jan 2022 - Present)"
                    className="w-full bg-white border border-amber-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-900 mb-1.5">
                    What did you do during your career break? (Upskilling, parenting, personal growth)
                  </label>
                  <textarea
                    rows={3}
                    value={breakActivities}
                    onChange={(e) => setBreakActivities(e.target.value)}
                    placeholder="e.g. Full-time family caregiving, open-source contributions, modern framework mastery..."
                    className="w-full bg-white border border-amber-200 rounded-xl p-3.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                  <span className="text-[11px] text-amber-800 mt-1 block">
                    💡 Our AI will summarize this into a confident, positive narrative on your unified profile.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-900 mb-1.5">
                    Desired Return Ramp
                  </label>
                  <select
                    value={returnReadiness}
                    onChange={(e) => setReturnReadiness(e.target.value)}
                    className="w-full bg-white border border-amber-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="Immediate (Full-time Remote or Hybrid)">
                      Immediate (Full-time Remote or Hybrid)
                    </option>
                    <option value="Flexible / Asynchronous Ramp (30-day gentle transition)">
                      Flexible / Asynchronous Ramp (30-day gentle transition)
                    </option>
                    <option value="Part-time to Full-time Returnship Program">
                      Part-time to Full-time Returnship Program
                    </option>
                  </select>
                </div>
              </div>
            )}

            {/* B. If Student */}
            {careerStage === 'student' && (
              <div className="space-y-4 p-5 rounded-2xl bg-blue-50/50 border border-blue-200/80">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-blue-900 mb-1.5">
                    Degree / Program & Graduation Year
                  </label>
                  <input
                    type="text"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    placeholder="e.g. B.S. in Computer Science (Univ of Toronto, 2024)"
                    className="w-full bg-white border border-blue-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-blue-900 mb-1.5">
                    Featured Capstone Project or Portfolio Work
                  </label>
                  <textarea
                    rows={3}
                    value={capstoneProject}
                    onChange={(e) => setCapstoneProject(e.target.value)}
                    placeholder="Describe your flagship project, technologies used, and real-world metrics..."
                    className="w-full bg-white border border-blue-200 rounded-xl p-3.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>
            )}

            {/* C. If Senior */}
            {careerStage === 'senior' && (
              <div className="space-y-4 p-5 rounded-2xl bg-indigo-50/50 border border-indigo-200/80">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-indigo-900 mb-1.5">
                      Total Years of Experience
                    </label>
                    <input
                      type="number"
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(e.target.value)}
                      className="w-full bg-white border border-indigo-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-indigo-900 mb-1.5">
                      Current Seniority / Scope
                    </label>
                    <select
                      value={leadershipScope}
                      onChange={(e) => setLeadershipScope(e.target.value)}
                      className="w-full bg-white border border-indigo-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="Staff Engineer / Tech Lead">Staff Engineer / Tech Lead</option>
                      <option value="Principal Architect">Principal Architect</option>
                      <option value="Engineering Manager / Director">Engineering Manager / Director</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <Button
                variant="ghost"
                size="md"
                leftIcon={ArrowLeft}
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button
                variant="primary"
                size="md"
                rightIcon={ArrowRight}
                onClick={() => setStep(3)}
              >
                Continue to Skills & Preferences
              </Button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: SKILLS & PREFERENCES ================= */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-brand-600 text-xs font-bold uppercase tracking-wider mb-1">
                <Award className="w-4 h-4 text-emerald-500" />
                <span>Step 3: Skills & Preferences</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                What are your superpowers and ideal role?
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Select your verified skills and target preferences to power your live match scores.
              </p>
            </div>

            {/* Target Role & Workplace */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Target Job Title
                </label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Workplace Preference
                </label>
                <select
                  value={preferredWorkplace}
                  onChange={(e) => setPreferredWorkplace(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="Remote">100% Remote</option>
                  <option value="Hybrid">Hybrid (Flexible in-office)</option>
                  <option value="On-site">On-site</option>
                </select>
              </div>
            </div>

            {/* Skills Pills Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Core Skills (Click to toggle)
              </label>
              <div className="flex flex-wrap gap-2">
                {availableSkills.map((sk) => {
                  const isChecked = selectedSkills.includes(sk)
                  return (
                    <button
                      key={sk}
                      type="button"
                      onClick={() => toggleSkill(sk)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                        isChecked
                          ? 'bg-brand-600 text-white border-brand-600 shadow-2xs scale-105'
                          : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                      }`}
                    >
                      {isChecked ? `✓ ${sk}` : `+ ${sk}`}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <Button
                variant="ghost"
                size="md"
                leftIcon={ArrowLeft}
                onClick={() => setStep(2)}
              >
                Back
              </Button>
              <Button
                variant="accent"
                size="lg"
                rightIcon={Sparkles}
                onClick={handleFinish}
                className="shadow-md"
              >
                Complete Onboarding & Generate Feed
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
