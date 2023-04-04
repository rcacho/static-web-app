import { InternalErrorHandler } from '@/utils/InternalErrorHandler'
import { getOid, withAuthMiddleware } from '@/utils/middleware/Auth'
import type { NextApiRequest, NextApiResponse } from 'next'
import { NotificationCheckDAO } from '@/utils/dao/NotificationCheckDAO'
import { DatabaseConnector } from '@/utils/DatabaseConnector'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  const db: DatabaseConnector = new DatabaseConnector()
  const notificationDAO: NotificationCheckDAO = new NotificationCheckDAO(db)

  const oid = getOid(req)

  await InternalErrorHandler(req, res, async () => {
    switch (method) {
      case 'PUT':
        await notificationDAO.check_notifications(oid)
        res.status(200).json({
          result: `Successfully checked notifications for user '${oid}'`
        })
        break
      default:
        res.setHeader('Allow', ['PUT'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  })
}

export default withAuthMiddleware('authenticate')(handler)
