import { withAuthMiddleware } from '@/utils/middleware/Auth'
import type { NextApiRequest, NextApiResponse } from 'next'
import { UserDAO } from '@/utils/dao/UserDAO'
import { DatabaseConnector } from '@/utils/DatabaseConnector'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req
  const id = query.id as string
  const db: DatabaseConnector = new DatabaseConnector()
  const dao: UserDAO = new UserDAO(db)

  switch (method) {
    case 'PUT':
      await dao.check_notifications(id)
      res
        .status(200)
        .json({ result: `Successfully updated user with id=${id}` })
      break
    default:
      res.setHeader('Allow', ['PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default withAuthMiddleware('authenticate')(handler)
