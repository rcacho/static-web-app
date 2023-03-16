import type { NextApiRequest, NextApiResponse } from 'next'
import { DatabaseConnector } from '@/utils/DatabaseConnector'
import { EventObject } from '@/interfaces/EventObject'
import { EventLogDao } from '@/utils/dao/EventLogDAO'
import { UserDAO } from '@/utils/dao/UserDAO'
import { NotificationDAO } from '@/utils/dao/NotificationDAO'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, body, method } = req
  const id = parseInt(query.id as string, 10)
  const db: DatabaseConnector = new DatabaseConnector()
  const eventLogDAO: EventLogDao = new EventLogDao(db)
  const userDAO: UserDAO = new UserDAO(db)
  const notificationDAO: NotificationDAO = new NotificationDAO(db)

  const eventlog: EventObject = {
    event_id: body.event_id,
    last_modified_date: body.last_modified_date,
    admin_action: body.admin_action,
    admin_id: body.admin_id,
  }

  switch (method) {
    case 'PUT':
      if (notificationDAO.added == true) {
        await eventLogDAO.addEventObject(eventlog)
        res
            .status(200)
            .json({ result: `Successfully added eventLog` })
        notificationDAO.added = false;
      }
      break
    default:
      res.setHeader('Allow', 'PUT')
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
