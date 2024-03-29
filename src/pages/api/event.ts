import {
  AdminAction,
  getOid,
  withAuthMiddleware
} from '@/utils/middleware/Auth'
import { EventDAO } from '@/utils/dao/EventDAO'
import { DatabaseConnector } from '@/utils/DatabaseConnector'
import { Event } from '@/interfaces/Event'
import type { NextApiRequest, NextApiResponse } from 'next'
import { InternalErrorHandler } from '@/utils/InternalErrorHandler'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req
  const db: DatabaseConnector = new DatabaseConnector()
  const eventDAO: EventDAO = new EventDAO(db)

  const event: Event = {
    event_date: body.event_date,
    event_description: body.event_description,
    category_id: body.category_id,
    event_id: null
  }

  const oid = getOid(req)

  let recordset

  switch (method) {
    case 'GET':
      await InternalErrorHandler(req, res, async () => {
        recordset = await eventDAO.getEvent()
        res.status(200).json({ result: recordset })
      })
      break
    case 'POST':
      await AdminAction(req, res, async () => {
        await InternalErrorHandler(req, res, async () => {
          await eventDAO.addEvent(oid, event)
          res.status(200).json({ result: `Successfully added new event` })
        })
      })

      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default withAuthMiddleware('authenticate')(handler)
