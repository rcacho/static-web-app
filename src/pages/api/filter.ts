import { FilterDAO } from '@/utils/dao/FilterDAO'
import { NextApiRequest, NextApiResponse } from 'next'
import { DatabaseConnector } from '@/utils/DatabaseConnector'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method } = req
  const db: DatabaseConnector = new DatabaseConnector()
  const filterDAO: FilterDAO = new FilterDAO(db)

  const { user_id, categories } = body

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
