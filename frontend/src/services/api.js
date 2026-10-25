/**
 * HireLoop Unified API Client
 * Connects React frontend directly to FastAPI + SQLite backend endpoints
 * so all posted jobs, applications, and status updates are persisted.
 */

const API_BASE = import.meta.env?.VITE_API_BASE || 'http://127.0.0.1:8000/api'

/**
 * Health check to verify FastAPI + SQLite connection
 */
export async function checkBackendHealthApi() {
  try {
    const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(3000) })
    if (res.ok) {
      return await res.json()
    }
  } catch (err) {
    console.warn('Backend health check failed:', err.message)
  }
  return null
}

/**
 * Auth: Login with email/password
 */
export async function loginApi(email, password) {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    if (res.ok) {
      return await res.json()
    }
  } catch (err) {
    console.warn('API login error:', err.message)
  }
  return null
}

/**
 * Auth: Register user
 */
export async function registerApi(userData) {
  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })
    if (res.ok) {
      return await res.json()
    }
  } catch (err) {
    console.warn('API register error:', err.message)
  }
  return null
}

/**
 * Fetch and normalize active jobs from backend SQLite
 */
export async function fetchJobsApi(stage = '', search = '') {
  try {
    const params = new URLSearchParams()
    if (stage && stage !== 'all') params.append('stage', stage)
    if (search) params.append('search', search)

    const res = await fetch(`${API_BASE}/jobs/?${params.toString()}`)
    if (res.ok) {
      const data = await res.json()
      if (Array.isArray(data) && data.length > 0) {
        return data.map((job) => ({
          ...job,
          workplaceType: job.workplace_type || job.workplaceType || 'Remote',
          salaryRange: job.salary_range || job.salaryRange || '$140,000 - $185,000',
          stageFocus: job.stage_focus || job.stageFocus || 'All Stages',
          matchScore:
            job.matchScore ||
            (job.stage_focus?.toLowerCase().includes('returner')
              ? 96
              : job.stage_focus?.toLowerCase().includes('student')
              ? 92
              : 95),
          stageBenefit:
            job.stageBenefit ||
            (job.stage_focus?.toLowerCase().includes('returner')
              ? 'Explicitly welcomes career pauses; offers structured onboarding ramp-up and a dedicated mentor.'
              : job.stage_focus?.toLowerCase().includes('student')
              ? 'Evaluates personal capstones, open-source work, and technical potential over years of experience.'
              : 'Direct architectural ownership and high-impact cross-functional team leadership.'),
          skills: Array.isArray(job.skills)
            ? job.skills
            : typeof job.skills === 'string'
            ? job.skills.split(',').map((s) => s.trim()).filter(Boolean)
            : ['React', 'TypeScript', 'System Design'],
          postedAt: job.postedAt || 'Recently',
        }))
      }
    }
  } catch (err) {
    console.warn('API fetchJobs fallback:', err.message)
  }
  return null
}

/**
 * Create a new job requisition in SQLite
 */
export async function createJobApi(jobData) {
  try {
    const res = await fetch(`${API_BASE}/jobs/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobData),
    })
    if (res.ok) {
      return await res.json()
    }
  } catch (err) {
    console.warn('API createJob error:', err.message)
  }
  return null
}

/**
 * Fetch applications, optionally filtered by job_id or candidate_id
 */
export async function fetchApplicationsApi(jobId = null, candidateId = null) {
  try {
    const params = new URLSearchParams()
    if (jobId) params.append('job_id', jobId)
    if (candidateId) params.append('candidate_id', candidateId)
    const url = params.toString() ? `${API_BASE}/applications/?${params.toString()}` : `${API_BASE}/applications/`
    const res = await fetch(url)
    if (res.ok) {
      return await res.json()
    }
  } catch (err) {
    console.warn('API fetchApplications fallback:', err.message)
  }
  return null
}

/**
 * Create a new candidate application and persist in SQLite
 */
export async function createApplicationApi(jobId, candidateId = 1, candidateNotes = '') {
  try {
    const numericCandId = typeof candidateId === 'number' ? candidateId : 1
    const res = await fetch(`${API_BASE}/applications/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        job_id: Number(jobId),
        candidate_id: numericCandId,
        candidate_notes: candidateNotes,
      }),
    })
    if (res.ok) {
      return await res.json()
    }
  } catch (err) {
    console.warn('API createApplication error:', err.message)
  }
  return null
}

/**
 * 1-Click Update Application Pipeline Status (persisted in SQLite)
 */
export async function updateApplicationStatusApi(appId, newStatus, notes = '') {
  try {
    const res = await fetch(`${API_BASE}/applications/${appId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus, notes }),
    })
    if (res.ok) {
      return await res.json()
    }
  } catch (err) {
    console.warn('API updateApplicationStatus fallback:', err.message)
  }
  return null
}

/**
 * Notifications: List notifications
 */
export async function fetchNotificationsApi(userId = null) {
  try {
    const url = userId ? `${API_BASE}/notifications/?user_id=${userId}` : `${API_BASE}/notifications/`
    const res = await fetch(url)
    if (res.ok) {
      return await res.json()
    }
  } catch (err) {
    console.warn('API fetchNotifications fallback:', err.message)
  }
  return null
}

/**
 * Notifications: Mark as read
 */
export async function markNotificationReadApi(notifId) {
  try {
    const res = await fetch(`${API_BASE}/notifications/${notifId}/read`, {
      method: 'PATCH',
    })
    if (res.ok) {
      return await res.json()
    }
  } catch (err) {
    console.warn('API markNotificationRead error:', err.message)
  }
  return null
}

/**
 * Notifications: Mark all as read
 */
export async function markAllNotificationsReadApi() {
  try {
    const res = await fetch(`${API_BASE}/notifications/read-all`, {
      method: 'PATCH',
    })
    if (res.ok) {
      return await res.json()
    }
  } catch (err) {
    console.warn('API markAllNotificationsRead error:', err.message)
  }
  return null
}
