import type { NextApiRequest, NextApiResponse } from 'next'
import { UserDAO } from '@/utils/dao/UserDAO'
import { DatabaseConnector } from '@/utils/DatabaseConnector'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req
  const id = query.id as string
  const db: DatabaseConnector = new DatabaseConnector()
  const userDAO: UserDAO = new UserDAO(db)

  switch (method) {
    case 'PUT':
      await userDAO.login(id)
      res.status(200).json({ result: `Successfully logged in for user ${id}` })
      break
    default:
      res.setHeader('Allow', ['PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
