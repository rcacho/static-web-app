import { DatabaseConnector } from '../DatabaseConnector'

export class FilterDAO {
  db: DatabaseConnector

  constructor(db: DatabaseConnector) {
    this.db = db
  }

  async getFilters(oid: string) {
    const query = `
    SELECT category_id 
    FROM calendar.category_filter
    WHERE user_id = 
      (SELECT user_id 
       FROM calendar.app_user 
       WHERE active_directory_oid = '${oid}')`
    const resultset = await this.db.ConnectAndQuery(query)
    return resultset.recordset
  }

  async setFilters(oid: string, categories: number[]) {
    let delQuery = `
    DELETE FROM calendar.category_filter     
    WHERE user_id = 
    (SELECT user_id 
     FROM calendar.app_user 
     WHERE active_directory_oid = '${oid}')`
    await this.db.ConnectAndQuery(delQuery)
    let newQuery = this.addFilterQueryString(oid, categories)
    await this.db.ConnectAndQuery(newQuery)
  }

  addFilterQueryString(oid: string, categories: number[]) {
    let query = ''
    for (let i = 0; i < categories.length; i++) {
      let currQuery = `EXEC calendar.insert_filter @category_id = ${categories[i]}, @oid = '${oid}'`
      query += currQuery
    }
    return query
  }
}
