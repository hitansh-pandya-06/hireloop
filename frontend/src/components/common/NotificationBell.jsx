import React, { useState, useEffect, useRef } from 'react'
import {
  Bell,
  Check,
  CheckCircle2,
  Star,
  Clock,
  Sparkles,
  Eye,
  XCircle,
  Video,
  Bot,
} from 'lucide-react'
import {
  fetchNotificationsApi,
  markNotificationReadApi,
  markAllNotificationsReadApi,
} from '../../services/api'

export default function NotificationBell({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Shortlisted for Technical Interview! 🌟',
      message: 'Cloudscale Systems has shortlisted you for Senior Full-Stack Engineer.',
      notification_type: 'status_update',
      is_read: false,
      created_at: '10 mins ago',
    },
    {
      id: 2,
      title: 'Offer Letter Extended! 🎉',
      message: 'Automattic has extended an offer package for Lead Frontend Architect.',
      notification_type: 'status_update',
      is_read: false,
      created_at: '2 hours ago',
    },
    {
      id: 3,
      title: 'Upcoming HR AMA Reminder',
      message: 'Your seat is reserved for "Technical Interviews After a Career Break" tomorrow at 4:00 PM EST.',
      notification_type: 'session_reminder',
      is_read: true,
      created_at: 'Yesterday',
    },
  ])

  const dropdownRef = useRef(null)

  // Fetch real notifications from backend on mount and poll gently
  useEffect(() => {
    async function loadNotifs() {
      const data = await fetchNotificationsApi()
      if (data && data.length > 0) {
        setNotifications(data)
      }
    }
    loadNotifs()
  }, [])

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const unreadCount = notifications.filter((n) => !n.is_read).length

  const handleMarkAsRead = async (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    )
    await markNotificationReadApi(id)
  }

  const handleMarkAllAsRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })))
    await markAllNotificationsReadApi()
  }

  const getNotifIcon = (notif) => {
    if (notif.title.includes('Offer')) return <CheckCircle2 className="w-4 h-4 text-emerald-500" />
    if (notif.title.includes('Shortlisted')) return <Star className="w-4 h-4 text-brand-600" />
    if (notif.notification_type === 'session_reminder') return <Video className="w-4 h-4 text-accent-500" />
    return <Sparkles className="w-4 h-4 text-slate-500" />
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none"
        aria-label="View notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-accent-500 text-white text-[10px] font-extrabold flex items-center justify-center animate-pulse shadow-xs">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Header */}
          <div className="p-4 pb-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-sm font-display">
                Notifications
              </span>
              {unreadCount > 0 && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent-100 text-accent-700">
                  {unreadCount} new
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllAsRead}
                className="text-[11px] text-brand-600 hover:text-brand-800 font-semibold transition-colors"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 text-left">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No notifications right now.
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => {
                    handleMarkAsRead(n.id)
                    setIsOpen(false)
                    if (onNavigate) onNavigate('candidate-dashboard')
                  }}
                  className={`p-3.5 flex items-start gap-3 hover:bg-slate-50 cursor-pointer transition-colors ${
                    !n.is_read ? 'bg-brand-50/30' : 'bg-white'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">{getNotifIcon(n)}</div>
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <h4
                        className={`text-xs ${
                          !n.is_read
                            ? 'font-bold text-slate-900'
                            : 'font-semibold text-slate-700'
                        }`}
                      >
                        {n.title}
                      </h4>
                      {!n.is_read && (
                        <span className="w-2 h-2 rounded-full bg-accent-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug">
                      {n.message}
                    </p>
                    <div className="text-[10px] text-slate-400 pt-0.5">
                      {n.created_at || 'Just now'}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
            <span className="text-[11px] text-slate-500 font-medium">
              Zero-Ghosting Real-Time Feed
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
