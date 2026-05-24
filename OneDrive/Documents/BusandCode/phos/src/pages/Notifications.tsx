import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
  ShieldAlert,
  Flame,
  Zap,
  Wind,
  Car,
  AlertTriangle,
  Heart,
  CheckCheck,
} from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import BottomNav from '@/components/layout/BottomNav'

type NotificationType = 'new_report' | 'status_change' | 'alert'

type Notification = {
  id: string
  type: NotificationType
  title: string
  message: string
  time: string
  read: boolean
  category?: string
}

const CATEGORY_ICON: Record<string, React.ReactNode> = {
  violence: <ShieldAlert size={16} />,
  fire: <Flame size={16} />,
  accident: <Car size={16} />,
  flooding: <Wind size={16} />,
  power_outage: <Zap size={16} />,
  medical: <Heart size={16} />,
  theft: <AlertTriangle size={16} />,
  other: <AlertTriangle size={16} />,
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'alert',
    title: 'New incident near you',
    message: 'Armed robbery reported on Broad Street, Lagos Island.',
    time: '5 mins ago',
    read: false,
    category: 'violence',
  },
  {
    id: '2',
    type: 'status_change',
    title: 'Your report was verified',
    message: 'Building fire near Ikeja has been verified by a responder.',
    time: '30 mins ago',
    read: false,
    category: 'fire',
  },
  {
    id: '3',
    type: 'alert',
    title: 'New incident near you',
    message: 'Flooding reported on Lekki-Epe Expressway.',
    time: '1 hr ago',
    read: false,
    category: 'flooding',
  },
  {
    id: '4',
    type: 'status_change',
    title: 'Incident resolved',
    message: 'The power outage in Surulere has been marked as resolved.',
    time: '2 hrs ago',
    read: true,
    category: 'power_outage',
  },
  {
    id: '5',
    type: 'new_report',
    title: 'New incident near you',
    message: 'Road accident reported on Third Mainland Bridge.',
    time: '3 hrs ago',
    read: true,
    category: 'accident',
  },
  {
    id: '6',
    type: 'status_change',
    title: 'Your report was verified',
    message: 'Suspected gas leak on Victoria Island has been verified.',
    time: '5 hrs ago',
    read: true,
    category: 'other',
  },
  {
    id: '7',
    type: 'alert',
    title: 'Medical emergency nearby',
    message: 'Medical emergency reported near Ojota Bus Stop.',
    time: '6 hrs ago',
    read: true,
    category: 'medical',
  },
]

const TYPE_COLOR: Record<NotificationType, string> = {
  alert: 'var(--color-danger)',
  status_change: 'var(--color-success)',
  new_report: 'var(--color-accent)',
}

export default function Notifications() {
  const [notifications, setNotifications] =
    useState<Notification[]>(MOCK_NOTIFICATIONS)

  const unreadCount = notifications.filter((n) => !n.read).length

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  function markRead(id: string) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const unread = notifications.filter((n) => !n.read)
  const read = notifications.filter((n) => n.read)

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <Navbar />

      <main className="px-5 py-6 max-w-xl mx-auto space-y-6 pb-32">

        {/* Header row */}
        <div className="flex items-center justify-between">
          <div>
            <h2
              className="text-base font-semibold"
              style={{
                fontFamily: 'var(--font-heading)',
                color: 'var(--color-text)',
              }}
            >
              Notifications
            </h2>
            <p
              className="text-xs mt-0.5"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {unreadCount > 0
                ? `${unreadCount} unread`
                : 'All caught up'}
            </p>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="flex items-center gap-1.5 text-xs font-medium"
              style={{ color: 'var(--color-accent)' }}
            >
              <CheckCheck size={14} />
              Mark all read
            </button>
          )}
        </div>

        {/* Unread */}
        {unread.length > 0 && (
          <div className="space-y-3">
            <p
              className="text-xs font-medium uppercase tracking-widest"
              style={{ color: 'var(--color-text-muted)' }}
            >
              New
            </p>
            {unread.map((n) => (
              <NotificationCard
                key={n.id}
                notification={n}
                onRead={markRead}
              />
            ))}
          </div>
        )}

        {/* Read */}
        {read.length > 0 && (
          <div className="space-y-3">
            <p
              className="text-xs font-medium uppercase tracking-widest"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Earlier
            </p>
            {read.map((n) => (
              <NotificationCard
                key={n.id}
                notification={n}
                onRead={markRead}
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {notifications.length === 0 && (
          <div
            className="text-center py-20"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <p className="text-sm">No notifications yet.</p>
            <p
              className="text-xs mt-1"
              style={{ color: 'var(--color-text-subtle)' }}
            >
              You'll be notified of incidents near you.
            </p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}

// ── Sub-component ──

type NotificationCardProps = {
  notification: Notification
  onRead: (id: string) => void
}

function NotificationCard({ notification: n, onRead }: NotificationCardProps) {
  return (
    <Card
      className="border cursor-pointer"
      style={{
        backgroundColor: n.read
          ? 'var(--color-surface)'
          : 'var(--color-accent-light)',
        borderColor: n.read
          ? 'var(--color-border)'
          : 'var(--color-accent-glow)',
      }}
      onClick={() => onRead(n.id)}
    >
      <CardContent className="px-4 py-4">
        <div className="flex items-start gap-3">

          {/* Icon */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
            style={{
              backgroundColor: `${TYPE_COLOR[n.type]}18`,
              color: TYPE_COLOR[n.type],
            }}
          >
            {n.category
              ? CATEGORY_ICON[n.category] ?? <AlertTriangle size={16} />
              : <AlertTriangle size={16} />}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <p
                className="text-sm font-medium leading-snug"
                style={{ color: 'var(--color-text)' }}
              >
                {n.title}
              </p>
              {!n.read && (
                <span
                  className="w-2 h-2 rounded-full shrink-0 mt-1.5"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                />
              )}
            </div>
            <p
              className="text-xs mt-1 leading-relaxed"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {n.message}
            </p>
            <p
              className="text-xs mt-1.5"
              style={{ color: 'var(--color-text-subtle)' }}
            >
              {n.time}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}