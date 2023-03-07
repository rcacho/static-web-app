import { Notification } from '@/interfaces/Notification'
import { User } from '@/interfaces/User'
import { DatabaseConnector } from '../DatabaseConnector'

export class NotificationDAO {
  db: DatabaseConnector

  constructor(db: DatabaseConnector) {
    this.db = db
  }

  async addNotification(notification: Notification) {
    const query = `INSERT INTO dbo.notification (event_id, admin_id, time_added, update_type)
                   VALUES (${notification.event_id}, '${notification.admin_id}', GETUTCDATE(), ${notification.update_type})`
    await this.db.ConnectAndQuery(query)
  }

  async getNotifications(uid: string) {
    const query = `SELECT dbo.event.event_id, dbo.event.event_date, dbo.event.admin_id, dbo.notification.time_added, dbo.category.category_id, dbo.category.category_name, dbo.calendar_user.first_name, dbo.calendar_user.last_name
    FROM dbo.notification
    INNER JOIN dbo.event ON dbo.event.event_id = dbo.notification.event_id
    INNER JOIN dbo.calendar_user ON dbo.calendar_user.user_id = dbo.event.admin_id
    INNER JOIN dbo.category ON dbo.event.category_id = dbo.category.category_id
    WHERE dbo.notification.time_added >= (
        SELECT last_login
        FROM dbo.calendar_user
        WHERE user_id = '${uid}'
    )`

    const resultset = await this.db.ConnectAndQuery(query)
    return resultset.recordset
  }
}
