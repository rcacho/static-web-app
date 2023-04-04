import { DatabaseConnector } from '../DatabaseConnector'

export class NotificationCheckDAO {
  db: DatabaseConnector

  constructor(db: DatabaseConnector) {
    this.db = db
  }

  async check_notifications(oid: string) {
    const query = `EXEC calendar.insert_notification_check @oid = '${oid}'`
    await this.db.ConnectAndQuery(query)
  }
}
