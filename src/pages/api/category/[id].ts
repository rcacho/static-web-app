import type { NextApiRequest, NextApiResponse } from 'next'
import { DatabaseConnector } from '@/utils/DatabaseConnector'
import { Category } from '@/interfaces/Category'
import { CategoryDAO } from '@/utils/dao/CategoryDAO'
import { UserDAO } from '@/utils/dao/UserDAO'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, body, method } = req
  const id = parseInt(query.id as string, 10)
  const db: DatabaseConnector = new DatabaseConnector()
  const dao: CategoryDAO = new CategoryDAO(db)
  const userDAO: UserDAO = new UserDAO(db)

  const category: Category = {
    category_id: id,
    category_name: body.category_name,
    admin_id: body.admin_id,
    color: body.color,
    icon: body.icon
  }

  let adminStatus = await userDAO.isAdmin(category.admin_id)

  if (!adminStatus) {
    res.status(401).json({ result: 'User not permitted to make changes' })
    return
  }

  switch (method) {
    case 'PUT':
      await dao.updateCategory(category)
      res
        .status(200)
        .json({ result: `Successfully update row with event_id = ${id}` })
      break
    case 'DELETE':
      await dao.deleteCategory(category)
      res
        .status(200)
        .json({ result: `Successfully deleted row with category_id = ${id}` })
      break
    default:
      res.setHeader('Allow', ['PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
