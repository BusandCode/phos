export type IncidentCategory =
  | 'theft'
  | 'fire'
  | 'accident'
  | 'violence'
  | 'flooding'
  | 'power_outage'
  | 'vandalism'
  | 'medical'
  | 'other'

export type ReportStatus = 'pending' | 'verified' | 'resolved' | 'dismissed'

export interface Report {
  id: string
  user_id: string
  title: string
  description: string
  category: IncidentCategory
  status: ReportStatus
  latitude: number
  longitude: number
  address?: string
  media_urls?: string[]
  upvotes: number
  created_at: string
  updated_at: string
}

export type ReportInsert = Omit<Report, 'id' | 'created_at' | 'updated_at' | 'upvotes'>
export type ReportUpdate = Partial<Omit<Report, 'id' | 'user_id' | 'created_at'>>