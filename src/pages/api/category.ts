import type { NextApiRequest, NextApiResponse } from 'next'
import { DatabaseConnector } from '@/utils/DatabaseConnector'
import { Category } from '@/interfaces/Category'
import { CategoryDAO } from '@/utils/dao/CategoryDAO'
import { UserDAO } from '@/utils/dao/UserDAO'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method } = req
  const db: DatabaseConnector = new DatabaseConnector()
  const dao: CategoryDAO = new CategoryDAO(db)
  const userDAO: UserDAO = new UserDAO(db)
  const category: Category = {
    category_name: body.category_name,
    admin_id: body.admin_id,
    color: body.color,
    icon: body.icon,
    category_id: null
  }
  switch (method) {
    case 'GET':
      const recordset = await dao.getCategory()
      res.status(200).json({ result: recordset })
      break
    case 'POST':
      let adminStatus = await userDAO.isAdmin(category.admin_id)
      if (!adminStatus) {
        res.status(401).json({ result: 'User not permitted to make changes' })
        return
      }
      await dao.addCategory(category)
      res.status(200).json({ result: 'Successfully added new category' })
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
