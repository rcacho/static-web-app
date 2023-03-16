import { DatabaseConnector } from '../DatabaseConnector'
import { EventObject } from '@/interfaces/EventObject'

export class EventLogDao{
    db: DatabaseConnector

    constructor(db: DatabaseConnector) {
        this.db = db
    }
    
    async addEventObject(eventObject: EventObject) {
        const query = `INSERT INTO dbo.EventLog (event_id, last_modified_date, admin_action, admin_id)
        OUTPUT INSERTED.admin_action
        VALUES (CONVERT(event_id, '${eventObject.event_id}'), '${eventObject.last_modified_date}', '${eventObject.admin_action}', '${eventObject.admin_id}')`
        const resultset = await this.db.ConnectAndQuery(query)
        return resultset.recordset
    }
    
    async getEventLog() {
        const query = `SELECT * FROM dbo.EventLog`
        const resultset = await this.db.ConnectAndQuery(query)
        return resultset.recordset
    }
}