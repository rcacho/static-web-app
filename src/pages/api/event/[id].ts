import { getOid, isAdmin, withAuthMiddleware } from '@/utils/middleware/Auth'
import type { NextApiRequest, NextApiResponse } from 'next'
import { DatabaseConnector } from '@/utils/DatabaseConnector'
import { Event } from '@/interfaces/Event'
import { EventDAO } from '@/utils/dao/EventDAO'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query, body, method } = req
  const id = parseInt(query.id as string, 10)
  const db: DatabaseConnector = new DatabaseConnector()
  const eventDAO: EventDAO = new EventDAO(db)

  const event: Event = {
    event_date: body.event_date,
    event_description: body.event_description,
    category_id: body.category_id,
    event_id: id
  }

  const oid = getOid(req)

  const adminStatus = isAdmin(req)

  if (!adminStatus) {
    res.status(401).json({ result: 'User not permitted to make changes' })
    return
  }

  switch (method) {
    case 'PUT':
      try {
        await eventDAO.updateEvent(oid, event)
        res
          .status(200)
          .json({ result: `Successfully update row with event_id = ${id}` })
      } catch (err: any) {
        res.status(500).json({ error: err.msg })
      }
      break
    case 'DELETE':
      await eventDAO.deleteEvent(oid, event)
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
