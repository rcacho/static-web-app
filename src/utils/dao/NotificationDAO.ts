import { Notification } from '@/interfaces/Notification'
import { DatabaseConnector } from '../DatabaseConnector'

export class NotificationDAO {
  db: DatabaseConnector

  constructor(db: DatabaseConnector) {
    this.db = db
  }
  async getNotifications(uid: string) {
    const query = `SELECT dbo.event.event_id, dbo.event.event_description, dbo.event.event_date, dbo.event.admin_id, dbo.notification_2.time_added, dbo.category.category_id, dbo.category.category_name, dbo.calendar_user.first_name, dbo.calendar_user.last_name, dbo.notification_2.update_type
    FROM dbo.notification_2
    INNER JOIN dbo.event ON dbo.event.event_id = dbo.notification_2.event_id
    INNER JOIN dbo.calendar_user ON dbo.calendar_user.user_id = dbo.event.admin_id
    INNER JOIN dbo.category ON dbo.event.category_id = dbo.category.category_id
    WHERE dbo.notification_2_2.time_added >= (
        SELECT notification_check
        FROM dbo.calendar_user
        WHERE user_id = '${uid}'
    )`

    const resultset = await this.db.ConnectAndQuery(query)
    return resultset.recordset
  }
}
