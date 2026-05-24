export type NotificationType = 'new_report' | 'status_change' | 'comment' | 'alert'

export interface Notification {
  id: string
  user_id: string
  type: NotificationType
  title: string
  message: string
  report_id?: string
  read: boolean
  created_at: string
}