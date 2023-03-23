import { withAuthMiddleware } from '@/utils/auth/Auth'
import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@/interfaces/User'
import { UserDAO } from '@/utils/dao/UserDAO'
import { DatabaseConnector } from '@/utils/DatabaseConnector'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body, method, query } = req
  const id = query.id as string
  const db: DatabaseConnector = new DatabaseConnector()
  const dao: UserDAO = new UserDAO(db)
  const user: User = {
    user_id: id,
    first_name: body.first_name,
    last_name: body.last_name,
    is_admin: body.is_admin,
    last_login: body.last_login
  }
  const admin_id = body.admin_id

  switch (method) {
    case 'GET':
      const recordset = await dao.getUser(user)
      res.status(200).json({ result: recordset })
      break
    case 'PUT':
      let adminStatus = await dao.isAdmin(admin_id)
      if (!adminStatus) {
        res.status(401).json({ result: 'User not permitted to make changes' })
        return
      }
      await dao.updateUser(user)
      res
        .status(200)
        .json({ result: `Successfully updated user with id=${id}` })
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default withAuthMiddleware('authenticate')(handler)
