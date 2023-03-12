import { DatabaseConnector } from '../DatabaseConnector'
import { User } from '@/interfaces/User'

export class UserDAO {
  db: DatabaseConnector

  constructor(db: DatabaseConnector) {
    this.db = db
  }

  async addUser(user: User) {
    const query = `INSERT INTO dbo.calendar_user (user_id, first_name, last_name, is_admin, last_login)
                       VALUES ('${user.user_id}', '${user.first_name}', '${user.last_name}', ${user.is_admin}, GETUTCDATE())`
    await this.db.ConnectAndQuery(query)
  }

  async getUser(user: User) {
    const query = `SELECT * FROM dbo.calendar_user WHERE user_id = '${user.user_id}'`
    const resultset = await this.db.ConnectAndQuery(query)
    return resultset.recordset
  }

  async updateUser(user: User) {
    const query = `UPDATE dbo.calendar_user 
                       SET first_name = '${user.first_name}', last_name = '${user.last_name}', is_admin = ${user.is_admin}
                       WHERE user_id = '${user.user_id}'`
    await this.db.ConnectAndQuery(query)
  }

  async deleteUser(user: User) {
    const query = `DELETE FROM dbo.calendar_user WHERE user_id = '${user.user_id}'`
    await this.db.ConnectAndQuery(query)
  }

  async isAdmin(uid: string) {
    const query = `SELECT is_admin FROM dbo.calendar_user WHERE user_id = '${uid}'`
    const resultset = await this.db.ConnectAndQuery(query)
    if (resultset.recordset.length !== 1) {
      return false
    }
    return resultset.recordset[0].is_admin
  }

  async login(uid: string) {
    const query = `UPDATE dbo.calendar_user
                   SET last_login = GETUTCDATE() 
                   WHERE user_id = '${uid}'`
    await this.db.ConnectAndQuery(query)
  }
}
