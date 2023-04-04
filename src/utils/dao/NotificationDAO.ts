import { DatabaseConnector } from '../DatabaseConnector'

export class NotificationDAO {
  db: DatabaseConnector

  constructor(db: DatabaseConnector) {
    this.db = db
  }
  async getNotifications(oid: string) {
    const query = `
    SELECT 
      calendar.event.id
     ,calendar.event.event_description
     ,calendar.event.event_date
     ,calendar.event.user_id
     ,calendar.notification.time_added
     ,calendar.category.id AS category_id
     ,calendar.category.name AS category_name
     ,calendar.notification.update_type
    FROM calendar.notification
    INNER JOIN calendar.event ON calendar.event.id = calendar.notification.event_id
    INNER JOIN calendar.app_user ON calendar.app_user.id = calendar.event.user_id
    INNER JOIN calendar.category ON calendar.event.category_id = calendar.category.id
    WHERE calendar.notification.time_added >= COALESCE((SELECT MAX(checked_at) 
                                                        FROM calendar.notification_check
                                                        WHERE active_directory_oid = '${oid}'), 0)`

    const resultset = await this.db.ConnectAndQuery(query)
    return resultset.recordset
  }
}
