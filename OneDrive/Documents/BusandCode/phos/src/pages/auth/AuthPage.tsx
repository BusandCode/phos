import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  ChevronRight,
} from 'lucide-react'

type Tab = 'login' | 'register'

type LoginForm = {
  email: string
  password: string
}

type RegisterForm = {
  full_name: string
  email: string
  phone: string
  password: string
}

const INITIAL_LOGIN: LoginForm = {
  email: '',
  password: '',
}

const INITIAL_REGISTER: RegisterForm = {
  full_name: '',
  email: '',
  phone: '',
  password: '',
}

export default function AuthPage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [loginForm, setLoginForm] = useState<LoginForm>(INITIAL_LOGIN)
  const [registerForm, setRegisterForm] =
    useState<RegisterForm>(INITIAL_REGISTER)

  function updateLogin<K extends keyof LoginForm>(
    key: K,
    value: LoginForm[K]
  ) {
    setError('')
    setLoginForm((prev) => ({ ...prev, [key]: value }))
  }

  function updateRegister<K extends keyof RegisterForm>(
    key: K,
    value: RegisterForm[K]
  ) {
    setError('')
    setRegisterForm((prev) => ({ ...prev, [key]: value }))
  }

  function canLogin() {
    return loginForm.email.trim() !== '' && loginForm.password.length >= 6
  }

  function canRegister() {
    return (
      registerForm.full_name.trim() !== '' &&
      registerForm.email.trim() !== '' &&
      registerForm.phone.trim() !== '' &&
      registerForm.password.length >= 6
    )
  }

  async function handleLogin() {
    setLoading(true)
    setError('')
    try {
      // Supabase auth will go here
      await new Promise((r) => setTimeout(r, 1000))
      navigate('/')
    } catch {
      setError('Invalid email or password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleRegister() {
    setLoading(true)
    setError('')
    try {
      // Supabase auth will go here
      await new Promise((r) => setTimeout(r, 1000))
      navigate('/')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-5 py-10"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {/* Logo */}
      <div className="mb-8 text-center">
        <h1
          className="text-3xl font-bold tracking-tight"
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--color-text)',
          }}
        >
          Phos
        </h1>
        <p
          className="text-sm mt-1"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Community safety, together.
        </p>
      </div>

      <Card
        className="w-full max-w-sm border"
        style={{
          backgroundColor: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
        }}
      >
        <CardContent className="px-6 py-6 space-y-5">

          {/* Tab toggle */}
          <div
            className="grid grid-cols-2 rounded-xl p-1"
            style={{ backgroundColor: 'var(--color-bg)' }}
          >
            {(['login', 'register'] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTab(t)
                  setError('')
                  setShowPassword(false)
                }}
                className="py-2 rounded-lg text-sm font-medium transition-colors"
                style={{
                  backgroundColor:
                    tab === t ? 'var(--color-surface)' : 'transparent',
                  color:
                    tab === t
                      ? 'var(--color-text)'
                      : 'var(--color-text-muted)',
                  boxShadow:
                    tab === t ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                }}
              >
                {t === 'login' ? 'Sign in' : 'Create account'}
              </button>
            ))}
          </div>

          {/* Error */}
          {error && (
            <p
              className="text-xs px-3 py-2 rounded-lg"
              style={{
                backgroundColor: '#fef2f2',
                color: 'var(--color-danger)',
                borderLeft: '3px solid var(--color-danger)',
              }}
            >
              {error}
            </p>
          )}

          {/* ── Login form ── */}
          {tab === 'login' && (
            <div className="space-y-4">
              <InputField
                icon={<Mail size={15} />}
                type="email"
                placeholder="Email address"
                value={loginForm.email}
                onChange={(v) => updateLogin('email', v)}
              />
              <InputField
                icon={<Lock size={15} />}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={loginForm.password}
                onChange={(v) => updateLogin('password', v)}
                suffix={
                  <button
                    onClick={() => setShowPassword((p) => !p)}
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                }
              />

              <div className="text-right">
                <button
                  className="text-xs font-medium"
                  style={{ color: 'var(--color-accent)' }}
                >
                  Forgot password?
                </button>
              </div>

              <Button
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium"
                disabled={!canLogin() || loading}
                onClick={handleLogin}
                style={{
                  backgroundColor: canLogin()
                    ? 'var(--color-accent)'
                    : 'var(--color-surface-alt)',
                  color: canLogin() ? '#ffffff' : 'var(--color-text-muted)',
                }}
              >
                {loading ? 'Signing in...' : (
                  <>Sign in <ChevronRight size={15} /></>
                )}
              </Button>
            </div>
          )}

          {/* ── Register form ── */}
          {tab === 'register' && (
            <div className="space-y-4">
              <InputField
                icon={<User size={15} />}
                type="text"
                placeholder="Full name"
                value={registerForm.full_name}
                onChange={(v) => updateRegister('full_name', v)}
              />
              <InputField
                icon={<Mail size={15} />}
                type="email"
                placeholder="Email address"
                value={registerForm.email}
                onChange={(v) => updateRegister('email', v)}
              />
              <InputField
                icon={<Phone size={15} />}
                type="tel"
                placeholder="+234 800 000 0000"
                value={registerForm.phone}
                onChange={(v) => updateRegister('phone', v)}
              />
              <InputField
                icon={<Lock size={15} />}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password (min. 6 characters)"
                value={registerForm.password}
                onChange={(v) => updateRegister('password', v)}
                suffix={
                  <button
                    onClick={() => setShowPassword((p) => !p)}
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                }
              />

              <Button
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium"
                disabled={!canRegister() || loading}
                onClick={handleRegister}
                style={{
                  backgroundColor: canRegister()
                    ? 'var(--color-accent)'
                    : 'var(--color-surface-alt)',
                  color: canRegister() ? '#ffffff' : 'var(--color-text-muted)',
                }}
              >
                {loading ? 'Creating account...' : (
                  <>Create account <ChevronRight size={15} /></>
                )}
              </Button>

              <p
                className="text-xs text-center"
                style={{ color: 'var(--color-text-subtle)' }}
              >
                By signing up you agree to our terms of service.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// ── Reusable input field ──

type InputFieldProps = {
  icon: React.ReactNode
  type: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  suffix?: React.ReactNode
}

function InputField({
  icon,
  type,
  placeholder,
  value,
  onChange,
  suffix,
}: InputFieldProps) {
  return (
    <div
      className="flex items-center gap-2 px-3 py-3 rounded-xl border"
      style={{
        backgroundColor: 'var(--color-bg)',
        borderColor: 'var(--color-border)',
      }}
    >
      <span style={{ color: 'var(--color-text-muted)' }}>{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 text-sm bg-transparent outline-none"
        style={{ color: 'var(--color-text)' }}
      />
      {suffix}
    </div>
  )
}