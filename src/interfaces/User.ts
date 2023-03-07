export type User = {
  user_id: string | string[] | undefined
  first_name: string
  last_name: string
  is_admin: number | null
  last_login: Date
}
