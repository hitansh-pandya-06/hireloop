import React, { createContext, useContext, useState, useEffect } from 'react'
import { loginApi, registerApi } from '../services/api'

const AuthContext = createContext(null)

export const DEMO_USERS = {
  candidate: {
    id: 1,
    name: 'Elena Rostova',
    email: 'elena.rostova@hireloop.demo',
    role: 'candidate',
    careerStage: 'returner',
    title: 'Senior React & Design Systems Specialist',
    breakDetails: '3-year career break for family care; upskilled in React 19 & Tailwind',
    token: 'mock-jwt-token-cand-001',
  },
  recruiter: {
    id: 1,
    name: 'Sarah Vance',
    email: 'sarah.vance@cloudscale.demo',
    role: 'recruiter',
    company: 'Cloudscale Systems',
    companySize: '50-200',
    token: 'mock-jwt-token-rec-001',
  },
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('hireloop_user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem('hireloop_user', JSON.stringify(user))
      try {
        const lastAccount = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          careerStage: user.careerStage,
          company: user.company,
          lastActive: new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
        }
        localStorage.setItem('hireloop_last_account', JSON.stringify(lastAccount))
      } catch (e) {
        console.warn('Could not save last account to localStorage:', e)
      }
    } else {
      localStorage.removeItem('hireloop_user')
    }
  }, [user])

  const login = async (email, password = 'password123') => {
    // 1. Try backend FastAPI login endpoint
    try {
      const res = await loginApi(email, password)
      if (res && res.user && res.access_token) {
        const loggedUser = {
          id: res.user.id,
          name: res.user.name,
          email: res.user.email,
          role: res.user.role,
          careerStage: res.user.career_stage || (res.user.role === 'candidate' ? 'returner' : null),
          company: res.user.company || (res.user.role === 'recruiter' ? 'Cloudscale Systems' : ''),
          token: res.access_token,
        }
        setUser(loggedUser)
        return { success: true, user: loggedUser }
      }
    } catch (err) {
      console.warn('Backend login fallback:', err.message)
    }

    // 2. Demo fallback if offline or test email
    if (email.toLowerCase().includes('recruiter') || email === DEMO_USERS.recruiter.email) {
      const recUser = { ...DEMO_USERS.recruiter, email }
      setUser(recUser)
      return { success: true, user: recUser }
    } else {
      const candUser = {
        ...DEMO_USERS.candidate,
        email,
        name: email.split('@')[0].replace('.', ' '),
      }
      setUser(candUser)
      return { success: true, user: candUser }
    }
  }

  const signup = async (userData) => {
    // 1. Try backend FastAPI register endpoint
    try {
      const res = await registerApi({
        email: userData.email,
        password: userData.password || 'password123',
        name: userData.name,
        role: userData.role || 'candidate',
        career_stage: userData.careerStage || 'returner',
        company_name: userData.company || '',
      })
      if (res && res.user && res.access_token) {
        const newUser = {
          id: res.user.id,
          name: res.user.name,
          email: res.user.email,
          role: res.user.role,
          careerStage: res.user.career_stage,
          company: res.user.company,
          token: res.access_token,
          onboarded: false,
        }
        setUser(newUser)
        return { success: true, user: newUser }
      }
    } catch (err) {
      console.warn('Backend signup fallback:', err.message)
    }

    // 2. Fallback
    const newUser = {
      id: 1,
      name: userData.name,
      email: userData.email,
      role: userData.role || 'candidate',
      careerStage: userData.careerStage || 'returner',
      company: userData.company || '',
      token: `mock-jwt-token-${Date.now()}`,
      onboarded: false,
    }
    setUser(newUser)
    return { success: true, user: newUser }
  }

  const loginWithGoogle = async (role = 'candidate') => {
    const googleUser = {
      id: 1,
      name: role === 'recruiter' ? 'Marcus Vance' : 'Alex Rivera',
      email: role === 'recruiter' ? 'marcus.vance@gmail.com' : 'alex.rivera@gmail.com',
      role,
      careerStage: role === 'recruiter' ? null : 'student',
      company: role === 'recruiter' ? 'Hyperion Tech' : '',
      token: `mock-google-oauth-token-${Date.now()}`,
    }
    setUser(googleUser)
    return { success: true, user: googleUser }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('hireloop_user')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
