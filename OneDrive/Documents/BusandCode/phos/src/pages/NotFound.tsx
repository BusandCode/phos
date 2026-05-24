import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-3"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <h1
        className="text-4xl font-bold"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
      >
        404
      </h1>
      <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
        This page doesn't exist.
      </p>
      <Link
        to="/"
        className="text-sm font-medium"
        style={{ color: 'var(--color-accent)' }}
      >
        Go home
      </Link>
    </div>
  )
}