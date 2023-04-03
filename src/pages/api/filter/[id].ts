import { withAuthMiddleware } from '@/utils/middleware/Auth'
import { FilterDAO } from '@/utils/dao/FilterDAO'
import { NextApiRequest, NextApiResponse } from 'next'
import { DatabaseConnector } from '@/utils/DatabaseConnector'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body } = req
  const db: DatabaseConnector = new DatabaseConnector()
  const filterDAO: FilterDAO = new FilterDAO(db)

  const user_id = query.id as string

  const { categories } = body

  switch (method) {
    case 'GET':
      let recordset = await filterDAO.getFilters(user_id)
      res.status(200).json({ filters: recordset })
      break
    case 'PUT':
      await filterDAO.setFilters(user_id, categories)
      res.status(200).json({ message: 'Successfully set new filters' })
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default withAuthMiddleware('authenticate')(handler)
