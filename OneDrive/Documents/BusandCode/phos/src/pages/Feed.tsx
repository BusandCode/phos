import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin, Clock, SlidersHorizontal, Search } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import BottomNav from '@/components/layout/BottomNav'

type ReportStatus = 'pending' | 'verified' | 'resolved' | 'dismissed'

type Report = {
  id: string
  title: string
  category: string
  status: ReportStatus
  address: string
  time: string
  upvotes: number
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

const ALL_REPORTS: Report[] = [
  {
    id: '1',
    title: 'Armed robbery on Lagos Island',
    category: 'Violence',
    status: 'pending',
    address: 'Broad Street, Lagos Island',
    time: '12 mins ago',
    upvotes: 14,
  },
  {
    id: '2',
    title: 'Building fire near Ikeja',
    category: 'Fire',
    status: 'verified',
    address: 'Oba Akran Ave, Ikeja',
    time: '34 mins ago',
    upvotes: 32,
  },
  {
    id: '3',
    title: 'Road accident blocking traffic',
    category: 'Accident',
    status: 'verified',
    address: 'Third Mainland Bridge',
    time: '1 hr ago',
    upvotes: 8,
  },
  {
    id: '4',
    title: 'Power outage — entire street dark',
    category: 'Power Outage',
    status: 'pending',
    address: 'Surulere, Lagos',
    time: '2 hrs ago',
    upvotes: 5,
  },
  {
    id: '5',
    title: 'Flooding on major road',
    category: 'Flooding',
    status: 'resolved',
    address: 'Lekki-Epe Expressway',
    time: '3 hrs ago',
    upvotes: 21,
  },
  {
    id: '6',
    title: 'Suspected gas leak on Victoria Island',
    category: 'Hazard',
    status: 'verified',
    address: 'Adeola Odeku St, VI',
    time: '4 hrs ago',
    upvotes: 17,
  },
  {
    id: '7',
    title: 'Stolen vehicle reported',
    category: 'Theft',
    status: 'pending',
    address: 'Yaba, Lagos',
    time: '5 hrs ago',
    upvotes: 6,
  },
  {
    id: '8',
    title: 'Medical emergency near bus stop',
    category: 'Medical',
    status: 'resolved',
    address: 'Ojota Bus Stop, Lagos',
    time: '6 hrs ago',
    upvotes: 11,
  },
]

const FILTERS: { label: string; value: ReportStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Verified', value: 'verified' },
  { label: 'Resolved', value: 'resolved' },
]

export default function Feed() {
  const [activeFilter, setActiveFilter] = useState<ReportStatus | 'all'>('all')
  const [search, setSearch] = useState('')

  const filtered = ALL_REPORTS.filter((r) => {
    const matchesFilter = activeFilter === 'all' || r.status === activeFilter
    const matchesSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.category.toLowerCase().includes(search.toLowerCase()) ||
      r.address.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar />

      <main className="px-5 py-6 max-w-xl mx-auto space-y-5 pb-32">

        {/* Page title */}
        <div>
          <h2
            className="text-base font-semibold"
            style={{
              fontFamily: 'var(--font-heading)',
              color: 'var(--color-text)',
            }}
          >
            Incident feed
          </h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
            {filtered.length} report{filtered.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Search */}
        <div
          className="flex items-center gap-2 px-3 py-2.5 rounded-xl border"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
          }}
        >
          <Search size={15} style={{ color: 'var(--color-text-muted)' }} />
          <input
            type="text"
            placeholder="Search incidents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-sm bg-transparent outline-none"
            style={{ color: 'var(--color-text)' }}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="text-xs"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className="shrink-0 px-4 py-1.5 rounded-full text-xs font-medium border transition-colors"
              style={{
                backgroundColor:
                  activeFilter === f.value
                    ? 'var(--color-accent)'
                    : 'var(--color-surface)',
                color:
                  activeFilter === f.value
                    ? '#ffffff'
                    : 'var(--color-text-muted)',
                borderColor:
                  activeFilter === f.value
                    ? 'var(--color-accent)'
                    : 'var(--color-border)',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Report list */}
        {filtered.length === 0 ? (
          <div
            className="text-center py-16"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <p className="text-sm">No incidents found.</p>
            <p className="text-xs mt-1" style={{ color: 'var(--color-text-subtle)' }}>
              Try a different filter or search term.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((report) => (
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

                    {/* Status dot */}
                    <div className="mt-1.5 shrink-0">
                      <span
                        className="block w-2 h-2 rounded-full"
                        style={{ backgroundColor: STATUS_DOT[report.status] }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-medium leading-snug"
                        style={{ color: 'var(--color-text)' }}
                      >
                        {report.title}
                      </p>
                      <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                        <span
                          className="text-xs"
                          style={{ color: 'var(--color-text-muted)' }}
                        >
                          {report.category}
                        </span>
                        <span
                          className="text-xs"
                          style={{ color: 'var(--color-text-subtle)' }}
                        >
                          ·
                        </span>
                        <span
                          className="text-xs"
                          style={{ color: 'var(--color-text-subtle)' }}
                        >
                          {STATUS_LABEL[report.status]}
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

                    {/* Time + upvotes */}
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span
                        className="text-xs flex items-center gap-1"
                        style={{ color: 'var(--color-text-subtle)' }}
                      >
                        <Clock size={10} />
                        {report.time}
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        ↑ {report.upvotes}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}