export interface Appointment {
  id?: string
  date: string
  day: string
  time: string
  location: string
  petName: string
  petAge: number
  userId?: string
  reason: string
  vetName?: string
  status?: "Scheduled" | "Completed" | "Cancelled"
}
