import { icons } from '@/interfaces/Icons'

export type Category = {
  category_id: number | null
  category_name: string
  icon: keyof typeof icons
  color: string
}
