import { getOid, withAuthMiddleware } from '@/utils/middleware/Auth'
import type { NextApiRequest, NextApiResponse } from 'next'
import { DatabaseConnector } from '@/utils/DatabaseConnector'
import { NotificationDAO } from '@/utils/dao/NotificationDAO'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = new DatabaseConnector()
  const notificationDAO: NotificationDAO = new NotificationDAO(db)
  const { method } = req

  const oid = getOid(req)

  switch (method) {
    case 'GET':
      const recordset = await notificationDAO.getNotifications(oid)
      res.status(200).json({ result: recordset })
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default withAuthMiddleware('authenticate')(handler)
