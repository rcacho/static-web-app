import { withAuthMiddleware } from '@/utils/middleware/Auth'
import type { NextApiRequest, NextApiResponse } from 'next'
import { NotificationCheckDAO } from '@/utils/dao/NotificationCheckDAO'
import { DatabaseConnector } from '@/utils/DatabaseConnector'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req
  const id = query.id as string
  const db: DatabaseConnector = new DatabaseConnector()
  const userDAO: NotificationCheckDAO = new NotificationCheckDAO(db)

  switch (method) {
    case 'PUT':
      await userDAO.check_notifications(id)
      res.status(200).json({ result: `Successfully logged in for user ${id}` })
      break
    default:
      res.setHeader('Allow', ['PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default withAuthMiddleware('authenticate')(handler)
