import { DatabaseConnector } from '../DatabaseConnector'
import { Category } from '@/interfaces/Category'
import { DatabaseError } from '@/exceptions/DatabaseError'

export class CategoryDAO {
  db: DatabaseConnector

  constructor(db: DatabaseConnector) {
    this.db = db
  }

  async addCategory(oid: string, category: Category) {
    const query = `EXEC calendar.insert_category @oid = ${oid}, @name = ${category.category_name}, @icon = ${category.icon}, @color = ${category.color}`
    try {
      await this.db.ConnectAndQuery(query)
    } catch (err: any) {
      throw new DatabaseError(err.msg)
    }
  }

  async getCategory() {
    const query = `SELECT name, icon, color FROM calendar.category`
    try {
      const resultset = await this.db.ConnectAndQuery(query)
      return resultset.recordset
    } catch (err: any) {
      throw new DatabaseError(err.msg)
    }
  }

  async updateCategory(category: Category) {
    const query = `
      UPDATE calendar.category 
      SET 
        category_name = '${category.category_name}'
       ,color='${category.color}'
       ,icon='${category.icon}'
      WHERE category_id = ${category.category_id}`
    try {
      await this.db.ConnectAndQuery(query)
    } catch (err: any) {
      throw new DatabaseError(err.msg)
    }
  }

  async deleteCategory(category: Category) {
    const query = `DELETE FROM calendar.category WHERE id = ${category.category_id}`
    try {
      await this.db.ConnectAndQuery(query)
    } catch (err: any) {
      throw new DatabaseError(err.msg)
    }
  }
}
