import { EventDAO } from '@/utils/dao/EventDAO'
import { DatabaseConnector } from '@/utils/DatabaseConnector'
import { Event } from '@/interfaces/Event'
import type { NextApiRequest, NextApiResponse } from 'next'
import { UserDAO } from '@/utils/dao/UserDAO'
import { Notification } from '@/interfaces/Notification'
import { NotificationDAO } from '@/utils/dao/NotificationDAO'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method, query } = req
  const db: DatabaseConnector = new DatabaseConnector()
  const eventDAO: EventDAO = new EventDAO(db)
  const userDAO: UserDAO = new UserDAO(db)
  const notificationDAO: NotificationDAO = new NotificationDAO(db)

  const event: Event = {
    event_date: body.event_date,
    event_description: body.event_description,
    admin_id: body.admin_id,
    category_id: body.category_id,
    event_id: null
  }

  let recordset

  switch (method) {
    case 'GET':
      recordset = await eventDAO.getEvent()
      res.status(200).json({ result: recordset })
      break
    case 'POST':
      let adminStatus = await userDAO.isAdmin(event.admin_id)
      if (!adminStatus) {
        res.status(401).json({ result: 'User not permitted to make changes' })
        return
      }
      recordset = await eventDAO.addEvent(event)
      if (recordset.length !== 1) {
        res.status(400).json({ result: 'Failed to add new event' })
        return
      }
      const event_id: Number = recordset[0].event_id
      const notification: Notification = {
        event_id: event_id,
        admin_id: event.admin_id,
        update_type: 0,
        time_added: null
      }
      notificationDAO.addNotification(notification)
      res.status(200).json({ result: 'Successfully added new event' })
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
