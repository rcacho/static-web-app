import { AdminAction, withAuthMiddleware } from '@/utils/middleware/Auth'
import type { NextApiRequest, NextApiResponse } from 'next'
import { DatabaseConnector } from '@/utils/DatabaseConnector'
import { Category } from '@/interfaces/Category'
import { CategoryDAO } from '@/utils/dao/CategoryDAO'
import { InternalErrorHandler } from '@/utils/InternalErrorHandler'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query, body, method } = req

  const id = parseInt(query.id as string, 10)
  const db: DatabaseConnector = new DatabaseConnector()
  const dao: CategoryDAO = new CategoryDAO(db)

  const category: Category = {
    category_id: id,
    category_name: body.category_name,
    color: body.color,
    icon: body.icon
  }

  await AdminAction(req, res, async () => {
    await InternalErrorHandler(req, res, async () => {
      switch (method) {
        case 'PUT':
          await dao.updateCategory(category)
          res
            .status(200)
            .json({ result: `Successfully update row with event_id = ${id}` })
          break
        case 'DELETE':
          await dao.deleteCategory(category)
          res.status(200).json({
            result: `Successfully deleted row with category_id = ${id}`
          })

          break
        default:
          res.setHeader('Allow', ['PUT', 'DELETE'])
          res.status(405).end(`Method ${method} Not Allowed`)
      }
    })
  })
}

export default withAuthMiddleware('authenticate')(handler)
