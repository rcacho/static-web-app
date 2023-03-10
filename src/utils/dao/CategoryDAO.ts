import { DatabaseConnector } from '../DatabaseConnector'
import { Category } from '@/interfaces/Category'

export class CategoryDAO {
  db: DatabaseConnector

  constructor(db: DatabaseConnector) {
    this.db = db
  }

  async addCategory(category: Category) {
    const query = `INSERT INTO dbo.category (category_name, admin_id, color, icon) VALUES ('${category.category_name}', '${category.admin_id}', '${category.color}', '${category.icon}')`
    await this.db.ConnectAndQuery(query)
  }

  async getCategory() {
    const query = `SELECT * FROM dbo.category`
    const resultset = await this.db.ConnectAndQuery(query)
    return resultset.recordset
  }

  async updateCategory(category: Category) {
    const query = `UPDATE dbo.category 
        SET category_name = '${category.category_name}', admin_id = '${category.admin_id}', color='${category.color}', icon='${category.icon}'
        WHERE category_id = ${category.category_id}`
    await this.db.ConnectAndQuery(query)
  }

  async deleteCategory(category: Category) {
    const query = `DELETE FROM dbo.category WHERE category_id=${category.category_id}`
    await this.db.ConnectAndQuery(query)
  }
}
