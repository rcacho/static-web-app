import { NextApiRequest, NextApiResponse } from 'next'
import { GraphAPIManager } from '@/utils/GraphAPIManager'
import { withAuthMiddleware } from '@/utils/middleware/Auth'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  if (method !== 'GET') {
    res.status(405).json({ error: 'Unrecognized method' })
    return
  }

  const graph: GraphAPIManager = new GraphAPIManager()

  try {
    const users = await graph.getUsers()
    res.status(200).json({ users: users.value })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}

export default withAuthMiddleware('authenticate')(handler)
