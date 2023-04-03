import { DatabaseConnector } from '../DatabaseConnector'
import { Event } from '@/interfaces/Event'
import { DatabaseError } from '@/exceptions/DatabaseError'

const sql = require('mssql')

export class EventDAO {
  db: DatabaseConnector

  constructor(db: DatabaseConnector) {
    this.db = db
  }

  async addEvent(oid: string, event: Event) {
    let event_id: number = 0
    const request = await this.db.CreateRequest()

    request
      .input('oid', sql.UniqueIdentifier, oid)
      .input('category_id', sql.Int, event.category_id)
      .input('event_date', sql.DateTime, event.event_date)
      .input('description', sql.VarChar(255), event.event_description)
      .output('e_id', sql.Int, event_id)

    await request.execute('calendar.insert_event')
    return event_id
  }

  async getEvent() {
    const query = `SELECT id AS event_id, event_date, category_id, event_description FROM calendar.event WHERE is_deleted = 0`
    const resultset = await this.db.ConnectAndQuery(query)
    return resultset.recordset
  }

  async updateEvent(oid: string, event: Event) {
    try {
      const request = await this.db.CreateRequest()

      request
        .input('oid', sql.UniqueIdentifier, oid)
        .input('event_id', sql.Int, event.event_id)
        .input('category_id', sql.Int, event.category_id)
        .input('event_date', sql.DateTime, event.event_date)
        .input('description', sql.VarChar(255), event.event_description)

      await request.execute('calendar.update_event')
    } catch (err: any) {
      throw new DatabaseError(err.msg)
    }
  }

  async deleteEvent(oid: string, event: Event) {
    const request = await this.db.CreateRequest()

    request
      .input('oid', sql.UniqueIdentifier, oid)
      .input('event_id', sql.Int, event.event_id)

    await request.execute('calendar.delete_event')
    return
  }
}
