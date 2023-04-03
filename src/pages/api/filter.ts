import { getOid, withAuthMiddleware } from '@/utils/middleware/Auth'
import { FilterDAO } from '@/utils/dao/FilterDAO'
import { NextApiRequest, NextApiResponse } from 'next'
import { DatabaseConnector } from '@/utils/DatabaseConnector'
import { InternalErrorHandler } from '@/utils/InternalErrorHandler'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req
  const db: DatabaseConnector = new DatabaseConnector()
  const filterDAO: FilterDAO = new FilterDAO(db)

  const { categories } = body

  const oid = getOid(req)

  switch (method) {
    case 'GET':
      await InternalErrorHandler(req, res, async () => {
        let recordset = await filterDAO.getFilters(oid)
        res.status(200).json({ filters: recordset })
      })

      break
    case 'PUT':
      await InternalErrorHandler(req, res, async () => {
        await filterDAO.setFilters(oid, categories)
        res.status(200).json({ message: 'Successfully set new filters' })
      })

      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default withAuthMiddleware('authenticate')(handler)
