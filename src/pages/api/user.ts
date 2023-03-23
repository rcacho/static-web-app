import { withAuthMiddleware } from '@/utils/auth/Auth'
import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@/interfaces/User'
import { UserDAO } from '@/utils/dao/UserDAO'
import { DatabaseConnector } from '@/utils/DatabaseConnector'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req
  const db: DatabaseConnector = new DatabaseConnector()
  const dao: UserDAO = new UserDAO(db)
  const user: User = {
    user_id: body.user_id,
    first_name: body.first_name,
    last_name: body.last_name,
    is_admin: body.is_admin,
    notification_check: body.notification_check
  }

  switch (method) {
    case 'POST':
      try {
        await dao.addUser(user)
        res.status(200).json({ result: 'Successfully added user' })
      } catch (err: any) {
        res.status(400).json({ error: err.msg })
      }
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default withAuthMiddleware('authenticate')(handler)
