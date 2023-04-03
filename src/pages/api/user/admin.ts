import { isAdmin, withAuthMiddleware } from '@/utils/middleware/Auth'
import type { NextApiRequest, NextApiResponse } from 'next'
import { GraphAPIManager } from '@/utils/GraphAPIManager'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req
  const graph: GraphAPIManager = new GraphAPIManager()
  switch (method) {
    case 'GET':
      try {
        const admins = await graph.getAdmins()
        res.status(200).json({ admins: admins.value })
      } catch (err: any) {
        res.status(500).json({ message: err.message })
      }
      break
    case 'POST':
      if (!body.userId || body.userId === null) {
        res
          .status(400)
          .json({ error: 'Please include user id in request body' })
        return
      }
      if (!isAdmin(req)) {
        res.status(401).json({ result: 'User not permitted to make changes' })
        return
      }
      try {
        await graph.addAdmin(body.userId)
        res.status(200).json({
          message: `Successfully added admin for user with id = ${body.userId}`
        })
      } catch (err: any) {
        res.status(500).json({ error: err.message })
      }
      break
    case 'DELETE':
      if (!body.userId || body.userId === null) {
        res
          .status(400)
          .json({ error: 'Please include user id in request body' })
        return
      }
      if (!isAdmin(req)) {
        res.status(401).json({ result: 'User not permitted to make changes' })
        return
      }
      try {
        await graph.removeAdmin(body.userId)
        res.status(200).json({
          message: `Successfully deleted admin for user with id = ${body.userId}`
        })
      } catch (err: any) {
        res.status(500).json({ error: err.message })
      }
      break
  }
}

export default withAuthMiddleware('authenticate')(handler)
