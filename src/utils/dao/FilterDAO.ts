import { DatabaseConnector } from '../DatabaseConnector'

export class FilterDAO {
  db: DatabaseConnector

  constructor(db: DatabaseConnector) {
    this.db = db
  }

  async getFilters(user_id: string) {
    const query = `SELECT category_id FROM dbo.filter WHERE user_id = '${user_id}'`
    const resultset = await this.db.ConnectAndQuery(query)
    return resultset.recordset
  }

  async setFilters(user_id: string, categories: number[]) {
    let delQuery = `DELETE FROM dbo.filter WHERE user_id = '${user_id}'`
    await this.db.ConnectAndQuery(delQuery)
    let newQuery = this.addFilterQueryString(user_id, categories)
    await this.db.ConnectAndQuery(newQuery)
  }

  addFilterQueryString(user_id: string, categories: number[]) {
    let query = ''
    for (let i = 0; i < categories.length; i++) {
      let currQuery = `INSERT INTO dbo.filter (user_id, category_id) VALUES ('${user_id}', ${categories[i]});\n`
      query += currQuery
    }
    return query
  }
}
