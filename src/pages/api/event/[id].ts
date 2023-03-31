import { isAdmin, withAuthMiddleware } from '@/utils/middleware/Auth'
import type { NextApiRequest, NextApiResponse } from 'next'
import { DatabaseConnector } from '@/utils/DatabaseConnector'
import { Event } from '@/interfaces/Event'
import { EventDAO } from '@/utils/dao/EventDAO'
import { Notification } from '@/interfaces/Notification'
import { NotificationDAO } from '@/utils/dao/NotificationDAO'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query, body, method } = req
  const id = parseInt(query.id as string, 10)
  const db: DatabaseConnector = new DatabaseConnector()
  const eventDAO: EventDAO = new EventDAO(db)
  const notificationDAO: NotificationDAO = new NotificationDAO(db)

  const event: Event = {
    event_date: body.event_date,
    event_description: body.event_description,
    admin_id: body.admin_id,
    category_id: body.category_id,
    event_id: id
  }

  let adminStatus = isAdmin(req)

  if (!adminStatus) {
    res.status(401).json({ result: 'User not permitted to make changes' })
    return
  }

  switch (method) {
    case 'PUT':
      await eventDAO.updateEvent(event)
      const notification: Notification = {
        event_id: event.event_id as number,
        admin_id: event.admin_id,
        time_added: null,
        update_type: 1
      }
      await notificationDAO.addNotification(notification)
      res
        .status(200)
        .json({ result: `Successfully update row with event_id = ${id}` })
      break
    case 'DELETE':
      await eventDAO.deleteEvent(event)
      res
        .status(200)
        .json({ result: `Successfully deleted row with event_id = ${id}` })
      break
    default:
      res.setHeader('Allow', ['PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default withAuthMiddleware('authenticate')(handler)
