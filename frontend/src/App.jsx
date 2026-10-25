import React, { useState } from 'react'
import { Navbar, Footer } from './components/common'
import Home from './pages/Home'
import ForJobSeekers from './pages/ForJobSeekers'
import ForRecruiters from './pages/ForRecruiters'
import About from './pages/About'
import DesignSystemPreview from './pages/DesignSystemPreview'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import CandidateDashboard from './pages/CandidateDashboard'
import RecruiterDashboard from './pages/RecruiterDashboard'
import { AuthProvider, useAuth } from './context/AuthContext'

function MainLayout() {
  const { user, logout } = useAuth()
  const [currentPage, setCurrentPage] = useState('home')
  const [navParams, setNavParams] = useState(null)

  const handleNavigate = (pageId, params = null) => {
    setCurrentPage(pageId)
    setNavParams(params)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleLogout = () => {
    logout()
    setCurrentPage('home')
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-brand-100 selection:text-brand-900">
      {/* Reusable Global Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {/* Public Marketing Pages */}
        {currentPage === 'home' && <Home onNavigate={handleNavigate} />}
        {currentPage === 'job-seekers' && (
          <ForJobSeekers onNavigate={handleNavigate} />
        )}
        {currentPage === 'recruiters' && (
          <ForRecruiters onNavigate={handleNavigate} />
        )}
        {currentPage === 'about' && <About onNavigate={handleNavigate} />}
        {currentPage === 'design-system' && <DesignSystemPreview />}

        {/* Authentication Pages */}
        {currentPage === 'login' && <Login onNavigate={handleNavigate} />}
        {currentPage === 'signup' && (
          <SignUp
            onNavigate={handleNavigate}
            initialRole={navParams?.role || 'candidate'}
          />
        )}

        {/* Protected Dashboard Views */}
        {currentPage === 'candidate-dashboard' && (
          <CandidateDashboard onNavigate={handleNavigate} />
        )}
        {currentPage === 'recruiter-dashboard' && (
          <RecruiterDashboard onNavigate={handleNavigate} />
        )}
      </main>

      {/* Reusable Global Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  )
}
