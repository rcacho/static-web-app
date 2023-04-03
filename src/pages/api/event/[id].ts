import {
  AdminAction,
  getOid,
  withAuthMiddleware
} from '@/utils/middleware/Auth'
import type { NextApiRequest, NextApiResponse } from 'next'
import { DatabaseConnector } from '@/utils/DatabaseConnector'
import { Event } from '@/interfaces/Event'
import { EventDAO } from '@/utils/dao/EventDAO'
import { InternalErrorHandler } from '@/utils/InternalErrorHandler'

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

  await AdminAction(req, res, async () => {
    await InternalErrorHandler(req, res, async () => {
      switch (method) {
        case 'PUT':
          await eventDAO.updateEvent(oid, event)
          res
            .status(200)
            .json({ result: `Successfully update row with event_id = ${id}` })

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
    })
  })
}

export default withAuthMiddleware('authenticate')(handler)
