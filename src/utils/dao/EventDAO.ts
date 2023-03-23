import { DatabaseConnector } from '../DatabaseConnector'
import { Event } from '@/interfaces/Event'

export class EventDAO {
  db: DatabaseConnector

  constructor(db: DatabaseConnector) {
    this.db = db
  }

  async addEvent(event: Event) {
    const query = `INSERT INTO dbo.event (event_date, event_description, admin_id, category_id)
        OUTPUT INSERTED.event_id
        VALUES (CONVERT(date, '${event.event_date}'), '${event.event_description}', '${event.admin_id}', '${event.category_id}')`
    const resultset = await this.db.ConnectAndQuery(query)
    return resultset.recordset
  }

  async getEvent() {
    const query = `SELECT * FROM dbo.event`
    const resultset = await this.db.ConnectAndQuery(query)
    return resultset.recordset
  }

  async updateEvent(event: Event) {
    const query = `UPDATE dbo.event
        SET event_date = CONVERT(date, '${event.event_date}'), event_description = '${event.event_description}', admin_id = '${event.admin_id}', category_id = ${event.category_id}
        WHERE event_id = ${event.event_id}`
    await this.db.ConnectAndQuery(query)
    return
  }

  async deleteEvent(event: Event) {
    const query = `DELETE FROM dbo.event WHERE event_id=${event.event_id}`
    await this.db.ConnectAndQuery(query)
    return
  }
  
}
