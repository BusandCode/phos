import { Card, CardContent } from '@/components/ui/card'
import { MapPin, Clock, ChevronRight } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import BottomNav from '@/components/layout/BottomNav'

type Report = {
  id: string
  title: string
  category: string
  status: 'pending' | 'verified' | 'resolved' | 'dismissed'
  address: string
  time: string
  upvotes: number
}

const MOCK_REPORTS: Report[] = [
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
]

const STATUS_DOT: Record<Report['status'], string> = {
  pending: '#d97706',
  verified: '#2563eb',
  resolved: '#16a34a',
  dismissed: '#94a3b8',
}

export default function Home() {
  return (
     <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar />
     

      <main className="px-5 py-6 max-w-xl mx-auto space-y-8 pb-32">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Active', value: '12', color: 'var(--color-danger)' },
            { label: 'Verified', value: '5', color: 'var(--color-accent)' },
            { label: 'Resolved', value: '38', color: 'var(--color-success)' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center py-4 rounded-xl"
              style={{ backgroundColor: 'var(--color-surface)' }}
            >
              <span
                className="text-2xl font-bold"
                style={{
                  color: stat.color,
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

        {/* Map placeholder */}
        <div
          className="rounded-xl h-40 flex flex-col items-center justify-center gap-2 border"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
          }}
        >
          <MapPin size={22} style={{ color: 'var(--color-text-muted)' }} />
          <p
            className="text-sm"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Map coming soon
          </p>
        </div>

        {/* Live feed */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Live feed
            </h2>
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
        </div>
      </main>

      {/* FAB */}
      {/* <div className="fixed bottom-24 right-5 z-20">
        <button
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-md"
          style={{ backgroundColor: 'var(--color-accent)' }}
        >
          <Plus size={22} className="text-white" />
        </button>
      </div> */}

      {/* Bottom nav */}
      <BottomNav />
    </div>
  )
}