import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Navigation,
  Upload,
  X,
  Check,
  AlertTriangle,
  Flame,
  Zap,
  Wind,
  Car,
  ShieldAlert,
  Heart,
} from 'lucide-react'
import BottomNav from '@/components/layout/BottomNav'

type Category = {
  value: string
  label: string
  icon: React.ReactNode
}

type FormData = {
  title: string
  description: string
  category: string
  address: string
  latitude: number | null
  longitude: number | null
  media: File[]
}

const CATEGORIES: Category[] = [
  { value: 'violence', label: 'Violence', icon: <ShieldAlert size={18} /> },
  { value: 'fire', label: 'Fire', icon: <Flame size={18} /> },
  { value: 'accident', label: 'Accident', icon: <Car size={18} /> },
  { value: 'flooding', label: 'Flooding', icon: <Wind size={18} /> },
  { value: 'power_outage', label: 'Power Outage', icon: <Zap size={18} /> },
  { value: 'medical', label: 'Medical', icon: <Heart size={18} /> },
  { value: 'theft', label: 'Theft', icon: <AlertTriangle size={18} /> },
  { value: 'other', label: 'Other', icon: <AlertTriangle size={18} /> },
]

const STEPS = ['Details', 'Location', 'Media']

const INITIAL_FORM: FormData = {
  title: '',
  description: '',
  category: '',
  address: '',
  latitude: null,
  longitude: null,
  media: [],
}

export default function ReportIncident() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormData>(INITIAL_FORM)
  const [locating, setLocating] = useState(false)
  const [locationError, setLocationError] = useState('')
  const [previews, setPreviews] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)

  // --- Handlers ---

  function updateForm<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function detectLocation() {
    setLocating(true)
    setLocationError('')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        updateForm('latitude', pos.coords.latitude)
        updateForm('longitude', pos.coords.longitude)
        setLocating(false)
      },
      () => {
        setLocationError('Could not detect location. Enter address manually.')
        setLocating(false)
      }
    )
  }

  function handleMediaChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    const valid = files.filter((f) =>
      f.type.startsWith('image/') || f.type.startsWith('video/')
    )
    const newPreviews = valid.map((f) => URL.createObjectURL(f))
    setForm((prev) => ({ ...prev, media: [...prev.media, ...valid] }))
    setPreviews((prev) => [...prev, ...newPreviews])
  }

  function removeMedia(index: number) {
    setForm((prev) => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index),
    }))
    setPreviews((prev) => prev.filter((_, i) => i !== index))
  }

  function canAdvance() {
    if (step === 0) return form.title.trim() !== '' && form.category !== ''
    if (step === 1) return form.address.trim() !== '' || form.latitude !== null
    return true
  }

  function handleSubmit() {
    // Supabase submit will go here
    setSubmitted(true)
  }

  // --- Success screen ---
  if (submitted) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center"
        style={{ backgroundColor: 'var(--color-bg)' }}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'var(--color-success)' }}
        >
          <Check size={28} className="text-white" />
        </div>
        <h2
          className="text-lg font-semibold"
          style={{
            fontFamily: 'var(--font-heading)',
            color: 'var(--color-text)',
          }}
        >
          Report submitted
        </h2>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Your incident has been logged. The community will be notified.
        </p>
        <Button
          className="mt-2"
          style={{ backgroundColor: 'var(--color-accent)' }}
          onClick={() => navigate('/')}
        >
          Back to home
        </Button>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-10 px-5 py-4 flex items-center gap-3 border-b"
        style={{
          backgroundColor: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
        }}
      >
        <button onClick={() => (step === 0 ? navigate(-1) : setStep(step - 1))}>
          <ChevronLeft size={22} style={{ color: 'var(--color-text)' }} />
        </button>
        <div className="flex-1">
          <h1
            className="text-sm font-semibold"
            style={{
              fontFamily: 'var(--font-heading)',
              color: 'var(--color-text)',
            }}
          >
            Report Incident
          </h1>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            Step {step + 1} of {STEPS.length} — {STEPS[step]}
          </p>
        </div>
      </header>

      {/* Progress bar */}
      <div
        className="h-1 transition-all duration-300"
        style={{
          backgroundColor: 'var(--color-surface-alt)',
        }}
      >
        <div
          className="h-1 transition-all duration-300"
          style={{
            backgroundColor: 'var(--color-accent)',
            width: `${((step + 1) / STEPS.length) * 100}%`,
          }}
        />
      </div>

      <main className="px-5 py-6 max-w-xl mx-auto pb-36 space-y-5">

        {/* ── Step 1: Details ── */}
        {step === 0 && (
          <>
            {/* Title */}
            <div className="space-y-2">
              <label
                className="text-xs font-medium uppercase tracking-widest"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Incident title
              </label>
              <input
                type="text"
                placeholder="e.g. Armed robbery near market"
                value={form.title}
                onChange={(e) => updateForm('title', e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm border outline-none"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text)',
                }}
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label
                className="text-xs font-medium uppercase tracking-widest"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Category
              </label>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((cat) => {
                  const active = form.category === cat.value
                  return (
                    <button
                      key={cat.value}
                      onClick={() => updateForm('category', cat.value)}
                      className="flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-colors text-left"
                      style={{
                        backgroundColor: active
                          ? 'var(--color-accent)'
                          : 'var(--color-surface)',
                        borderColor: active
                          ? 'var(--color-accent)'
                          : 'var(--color-border)',
                        color: active ? '#ffffff' : 'var(--color-text)',
                      }}
                    >
                      {cat.icon}
                      {cat.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label
                className="text-xs font-medium uppercase tracking-widest"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Description{' '}
                <span style={{ color: 'var(--color-text-subtle)' }}>
                  (optional)
                </span>
              </label>
              <textarea
                rows={4}
                placeholder="Describe what happened..."
                value={form.description}
                onChange={(e) => updateForm('description', e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm border outline-none resize-none"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text)',
                }}
              />
            </div>
          </>
        )}

        {/* ── Step 2: Location ── */}
        {step === 1 && (
          <>
            {/* GPS detect */}
            <Card
              className="border"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
              }}
            >
              <CardContent className="px-4 py-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className="text-sm font-medium"
                      style={{ color: 'var(--color-text)' }}
                    >
                      Use my location
                    </p>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {form.latitude
                        ? `${form.latitude.toFixed(4)}, ${form.longitude?.toFixed(4)}`
                        : 'Not detected yet'}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={detectLocation}
                    disabled={locating}
                    className="flex items-center gap-1.5 text-xs"
                  >
                    <Navigation size={13} />
                    {locating ? 'Detecting...' : form.latitude ? 'Re-detect' : 'Detect'}
                  </Button>
                </div>

                {locationError && (
                  <p
                    className="text-xs"
                    style={{ color: 'var(--color-danger)' }}
                  >
                    {locationError}
                  </p>
                )}

                {form.latitude && (
                  <div
                    className="w-full h-24 rounded-lg flex items-center justify-center border"
                    style={{
                      backgroundColor: 'var(--color-surface-alt)',
                      borderColor: 'var(--color-border)',
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <MapPin
                        size={16}
                        style={{ color: 'var(--color-accent)' }}
                      />
                      <span
                        className="text-xs"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        Location captured
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div
                className="flex-1 h-px"
                style={{ backgroundColor: 'var(--color-border)' }}
              />
              <span
                className="text-xs"
                style={{ color: 'var(--color-text-subtle)' }}
              >
                or enter manually
              </span>
              <div
                className="flex-1 h-px"
                style={{ backgroundColor: 'var(--color-border)' }}
              />
            </div>

            {/* Manual address */}
            <div className="space-y-2">
              <label
                className="text-xs font-medium uppercase tracking-widest"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Address
              </label>
              <div
                className="flex items-center gap-2 px-4 py-3 rounded-xl border"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <MapPin
                  size={15}
                  style={{ color: 'var(--color-text-muted)' }}
                />
                <input
                  type="text"
                  placeholder="e.g. Broad Street, Lagos Island"
                  value={form.address}
                  onChange={(e) => updateForm('address', e.target.value)}
                  className="flex-1 text-sm bg-transparent outline-none"
                  style={{ color: 'var(--color-text)' }}
                />
              </div>
            </div>
          </>
        )}

        {/* ── Step 3: Media ── */}
        {step === 2 && (
          <>
            <div className="space-y-2">
              <label
                className="text-xs font-medium uppercase tracking-widest"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Photos & videos{' '}
                <span style={{ color: 'var(--color-text-subtle)' }}>
                  (optional)
                </span>
              </label>

              {/* Upload area */}
              <label
                className="flex flex-col items-center justify-center gap-2 w-full h-36 rounded-xl border-2 border-dashed cursor-pointer transition-colors"
                style={{
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'var(--color-surface)',
                }}
              >
                <Upload
                  size={22}
                  style={{ color: 'var(--color-text-muted)' }}
                />
                <p
                  className="text-sm"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Tap to upload
                </p>
                <p
                  className="text-xs"
                  style={{ color: 'var(--color-text-subtle)' }}
                >
                  JPG, PNG, MP4 supported
                </p>
                <input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  className="hidden"
                  onChange={handleMediaChange}
                />
              </label>
            </div>

            {/* Previews */}
            {previews.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {previews.map((src, i) => (
                  <div key={i} className="relative rounded-xl overflow-hidden aspect-square">
                    {form.media[i]?.type.startsWith('video/') ? (
                      <video
                        src={src}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={src}
                        alt={`upload-${i}`}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <button
                      onClick={() => removeMedia(i)}
                      className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
                    >
                      <X size={11} className="text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Summary */}
            <Card
              className="border"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
              }}
            >
              <CardContent className="px-4 py-4 space-y-2">
                <p
                  className="text-xs font-medium uppercase tracking-widest mb-3"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Summary
                </p>
                {[
                  { label: 'Title', value: form.title },
                  { label: 'Category', value: form.category },
                  {
                    label: 'Location',
                    value:
                      form.address ||
                      (form.latitude
                        ? `${form.latitude.toFixed(4)}, ${form.longitude?.toFixed(4)}`
                        : '—'),
                  },
                  { label: 'Media', value: `${form.media.length} file(s)` },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between">
                    <span
                      className="text-xs"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {row.label}
                    </span>
                    <span
                      className="text-xs font-medium capitalize"
                      style={{ color: 'var(--color-text)' }}
                    >
                      {row.value || '—'}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </>
        )}
      </main>

      {/* Bottom CTA */}
      <div
        className="fixed bottom-20 left-0 right-0 px-5 pb-2 z-10"
        style={{ backgroundColor: 'var(--color-bg)' }}
      >
        <Button
          className="w-full py-8 text-[17px] font-medium flex items-center justify-center gap-2"
          disabled={!canAdvance()}
          onClick={() => {
            if (step < STEPS.length - 1) setStep(step + 1)
            else handleSubmit()
          }}
          style={{
            backgroundColor: canAdvance()
              ? 'var(--color-accent)'
              : 'var(--color-surface-alt)',
            color: canAdvance() ? '#ffffff' : 'var(--color-text-muted)',
          }}
        >
          {step < STEPS.length - 1 ? (
            <>
              Continue <ChevronRight size={16} />
            </>
          ) : (
            <>
              <Check size={16} /> Submit report
            </>
          )}
        </Button>
      </div>

      <BottomNav />
    </div>
  )
}