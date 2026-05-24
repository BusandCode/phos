import { NavLink } from 'react-router-dom'
import { Home, List, Plus, User } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Home', to: '/', icon: Home },
  { label: 'Feed', to: '/feed', icon: List },
  { label: 'Profile', to: '/profile', icon: User },
]

export default function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-20 border-t flex items-center justify-around px-4 py-3"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
      }}
    >
      {/* Left tabs */}
      {NAV_ITEMS.slice(0, 2).map(({ label, to, icon: Icon }) => (
        <NavLink
          key={label}
          to={to}
          className="flex flex-col items-center gap-1"
          style={({ isActive }) => ({
            color: isActive ? 'var(--color-accent)' : 'var(--color-text-muted)',
          })}
        >
          <Icon size={20} />
          <span className="text-xs">{label}</span>
        </NavLink>
      ))}

      {/* Center Report FAB */}
      <NavLink
        to="/report"
        className="flex flex-col items-center -mt-6"
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-md"
          style={{ backgroundColor: 'var(--color-accent)' }}
        >
          <Plus size={24} className="text-white" />
        </div>
        <span
          className="text-xs mt-1"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Report
        </span>
      </NavLink>

      {/* Right tabs */}
      {NAV_ITEMS.slice(2).map(({ label, to, icon: Icon }) => (
        <NavLink
          key={label}
          to={to}
          className="flex flex-col items-center gap-1"
          style={({ isActive }) => ({
            color: isActive ? 'var(--color-accent)' : 'var(--color-text-muted)',
          })}
        >
          <Icon size={20} />
          <span className="text-xs">{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}