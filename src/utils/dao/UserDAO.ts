import { DatabaseConnector } from '../DatabaseConnector'

export class UserDAO {
  db: DatabaseConnector

  constructor(db: DatabaseConnector) {
    this.db = db
  }

  async check_notifications(uid: string) {
    const query = `UPDATE dbo.calendar_user
                   SET notification_check = GETUTCDATE() 
                   WHERE user_id = '${uid}'`
    await this.db.ConnectAndQuery(query)
  }
}
