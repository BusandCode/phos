import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  ChevronRight,
  Check,
  Pencil,
  X,
  LogOut,
} from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import BottomNav from '@/components/layout/BottomNav'

type ReportStatus = 'pending' | 'verified' | 'resolved' | 'dismissed'

type UserProfile = {
  full_name: string
  email: string
  phone: string
  role: string
  avatar_initials: string
}

type Report = {
  id: string
  title: string
  category: string
  status: ReportStatus
  address: string
  time: string
}

const STATUS_DOT: Record<ReportStatus, string> = {
  pending: '#d97706',
  verified: '#2563eb',
  resolved: '#16a34a',
  dismissed: '#94a3b8',
}

const STATUS_LABEL: Record<ReportStatus, string> = {
  pending: 'Pending',
  verified: 'Verified',
  resolved: 'Resolved',
  dismissed: 'Dismissed',
}

const MOCK_USER: UserProfile = {
  full_name: 'John Doe',
  email: 'johndoe@email.com',
  phone: '+234 800 000 0000',
  role: 'citizen',
  avatar_initials: 'JD',
}

const MOCK_REPORTS: Report[] = [
  {
    id: '1',
    title: 'Armed robbery on Lagos Island',
    category: 'Violence',
    status: 'pending',
    address: 'Broad Street, Lagos Island',
    time: '12 mins ago',
  },
  {
    id: '2',
    title: 'Building fire near Ikeja',
    category: 'Fire',
    status: 'verified',
    address: 'Oba Akran Ave, Ikeja',
    time: '2 days ago',
  },
  {
    id: '3',
    title: 'Flooding on major road',
    category: 'Flooding',
    status: 'resolved',
    address: 'Lekki-Epe Expressway',
    time: '5 days ago',
  },
]

const STATS = [
  { label: 'Total', value: 12 },
  { label: 'Verified', value: 7 },
  { label: 'Resolved', value: 5 },
]

export default function Profile() {
  const [editing, setEditing] = useState(false)
  const [profile, setProfile] = useState<UserProfile>(MOCK_USER)
  const [draft, setDraft] = useState<UserProfile>(MOCK_USER)

  function updateDraft<K extends keyof UserProfile>(
    key: K,
    value: UserProfile[K]
  ) {
    setDraft((prev) => ({ ...prev, [key]: value }))
  }

  function handleSave() {
    setProfile(draft)
    setEditing(false)
  }

  function handleCancel() {
    setDraft(profile)
    setEditing(false)
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <Navbar />

      <main className="px-5 py-6 max-w-xl mx-auto space-y-6 pb-32">

        {/* Avatar + name */}
        <div className="flex flex-col items-center gap-3 py-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white"
            style={{ backgroundColor: 'var(--color-accent)' }}
          >
            {profile.avatar_initials}
          </div>
          <div className="text-center">
            <h2
              className="text-base font-semibold"
              style={{
                fontFamily: 'var(--font-heading)',
                color: 'var(--color-text)',
              }}
            >
              {profile.full_name}
            </h2>
            <span
              className="inline-flex items-center gap-1 text-xs mt-1 px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: 'var(--color-accent-light)',
                color: 'var(--color-accent)',
              }}
            >
              <Shield size={11} />
              {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center py-4 rounded-xl"
              style={{ backgroundColor: 'var(--color-surface)' }}
            >
              <span
                className="text-2xl font-bold"
                style={{
                  color: 'var(--color-accent)',
                  fontFamily: 'var(--font-display)',
                }}
              >
                {stat.value}
              </span>
              <span
                className="text-xs mt-1"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Profile info */}
        <Card
          className="border"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
          }}
        >
          <CardContent className="px-4 py-4 space-y-4">
            <div className="flex items-center justify-between">
              <p
                className="text-xs font-medium uppercase tracking-widest"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Personal info
              </p>
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-1 text-xs font-medium"
                  style={{ color: 'var(--color-accent)' }}
                >
                  <Pencil size={12} /> Edit
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-1 text-xs"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    <X size={12} /> Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-1 text-xs font-medium"
                    style={{ color: 'var(--color-success)' }}
                  >
                    <Check size={12} /> Save
                  </button>
                </div>
              )}
            </div>

            {/* Fields */}
            {[
              {
                key: 'full_name' as keyof UserProfile,
                label: 'Full name',
                icon: <User size={14} />,
                type: 'text',
              },
              {
                key: 'email' as keyof UserProfile,
                label: 'Email',
                icon: <Mail size={14} />,
                type: 'email',
              },
              {
                key: 'phone' as keyof UserProfile,
                label: 'Phone',
                icon: <Phone size={14} />,
                type: 'tel',
              },
            ].map((field) => (
              <div key={field.key} className="space-y-1">
                <label
                  className="text-xs flex items-center gap-1.5"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {field.icon}
                  {field.label}
                </label>
                {editing ? (
                  <input
                    type={field.type}
                    value={draft[field.key]}
                    onChange={(e) => updateDraft(field.key, e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-sm border outline-none"
                    style={{
                      backgroundColor: 'var(--color-bg)',
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text)',
                    }}
                  />
                ) : (
                  <p
                    className="text-sm px-1"
                    style={{ color: 'var(--color-text)' }}
                  >
                    {profile[field.key]}
                  </p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* My reports */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: 'var(--color-text-muted)' }}
            >
              My reports
            </h3>
            <button
              className="flex items-center gap-1 text-xs font-medium"
              style={{ color: 'var(--color-accent)' }}
            >
              See all <ChevronRight size={13} />
            </button>
          </div>

          <div className="space-y-3">
            {MOCK_REPORTS.map((report) => (
              <Card
                key={report.id}
                className="border cursor-pointer"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <CardContent className="px-4 py-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 shrink-0">
                      <span
                        className="block w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: STATUS_DOT[report.status],
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-medium leading-snug"
                        style={{ color: 'var(--color-text)' }}
                      >
                        {report.title}
                      </p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span
                          className="text-xs"
                          style={{ color: 'var(--color-text-muted)' }}
                        >
                          {report.category}
                        </span>
                        <span
                          className="text-xs flex items-center gap-1"
                          style={{ color: 'var(--color-text-subtle)' }}
                        >
                          <MapPin size={10} />
                          {report.address}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span
                        className="text-xs"
                        style={{ color: 'var(--color-text-subtle)' }}
                      >
                        {report.time}
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: STATUS_DOT[report.status] }}
                      >
                        {STATUS_LABEL[report.status]}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sign out */}
        <button
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium"
          style={{
            borderColor: 'var(--color-border)',
            color: 'var(--color-danger)',
            backgroundColor: 'var(--color-surface)',
          }}
        >
          <LogOut size={15} />
          Sign out
        </button>
      </main>

      <BottomNav />
    </div>
  )
}