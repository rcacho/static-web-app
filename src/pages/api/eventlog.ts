import { EventLogDao } from '@/utils/dao/EventLogDAO'
import { DatabaseConnector } from '@/utils/DatabaseConnector'
import { EventObject } from '@/interfaces/EventObject'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method } = req
  const db: DatabaseConnector = new DatabaseConnector()
  const eventLogDAO: EventLogDao = new EventLogDao(db)

  const eventLog: EventObject = {
    event_id: body.event_id,
    last_modified_date: body.last_modified_date,
    admin_action: body.admin_action,
    admin_id: body.admin_id,
  }

  let recordset

  switch (method) {
    case 'GET':
      recordset = await eventLogDAO.getEventLog()
      res.status(200).json({ result: recordset })
      break
    case 'POST':
      recordset = await eventLogDAO.addEventObject(eventLog)
      res.status(200).json({ result: 'Successfully added eventlog' })
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}