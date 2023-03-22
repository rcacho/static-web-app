import { DatabaseConnector } from '../DatabaseConnector'
import { Category } from '@/interfaces/Category'
import { DatabaseError } from '@/exceptions/DatabaseError'

export class CategoryDAO {
  db: DatabaseConnector

  constructor(db: DatabaseConnector) {
    this.db = db
  }

  async addCategory(category: Category) {
    const query = `INSERT INTO dbo.category (category_name, admin_id, color, icon) VALUES ('${category.category_name}', '${category.admin_id}', '${category.color}', '${category.icon}')`
    try {
      await this.db.ConnectAndQuery(query)
    } catch (err: any) {
      throw new DatabaseError(err.msg)
    }
  }

  async getCategory() {
    const query = `SELECT * FROM dbo.category`
    try {
      const resultset = await this.db.ConnectAndQuery(query)
      return resultset.recordset
    } catch (err: any) {
      throw new DatabaseError(err.msg)
    }
  }

  async updateCategory(category: Category) {
    const query = `UPDATE dbo.category 
        SET category_name = '${category.category_name}', admin_id = '${category.admin_id}', color='${category.color}', icon='${category.icon}'
        WHERE category_id = ${category.category_id}`
    try {
      await this.db.ConnectAndQuery(query)
    } catch (err: any) {
      throw new DatabaseError(err.msg)
    }
  }

  async deleteCategory(category: Category) {
    const query = `DELETE FROM dbo.category WHERE category_id=${category.category_id}`
    try {
      await this.db.ConnectAndQuery(query)
    } catch (err: any) {
      throw new DatabaseError(err.msg)
    }
  }
}
