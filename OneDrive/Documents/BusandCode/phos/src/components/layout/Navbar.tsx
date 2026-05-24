import { Bell } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header
      className="sticky top-0 z-10 px-5 py-4 flex items-center justify-between border-b"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
      }}
    >
      {/* Logo */}
      <Link to="/">
        <h1
          className="text-lg font-bold tracking-tight"
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--color-text)',
          }}
        >
          Phos
        </h1>
      </Link>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <Link to="/notifications" className="relative">
          <Bell size={20} style={{ color: 'var(--color-text-muted)' }} />
          <span
            className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full"
            style={{ backgroundColor: 'var(--color-danger)' }}
          />
        </Link>

        {/* Avatar */}
        <Link to="/profile">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white"
            style={{ backgroundColor: 'var(--color-accent)' }}
          >
            JD
          </div>
        </Link>
      </div>
    </header>
  )
}