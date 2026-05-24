export type UserRole = 'citizen' | 'responder' | 'admin'

export interface Profile {
  id: string
  full_name: string
  avatar_url?: string
  phone?: string
  role: UserRole
  location?: string
  created_at: string
}

export type ProfileInsert = Omit<Profile, 'created_at'>
export type ProfileUpdate = Partial<Omit<Profile, 'id' | 'created_at'>>