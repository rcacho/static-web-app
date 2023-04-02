export type User = {
  user_id: string | string[] | undefined | number
  first_name: string
  last_name: string
  is_admin: number | null
  notification_check: Date
}
