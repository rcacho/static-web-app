import { NextApiRequest, NextApiResponse } from 'next'
import { label, Middleware } from 'next-api-middleware'
import Cors from 'cors'

const cors = Cors({
  allowedHeaders: ['Authorization'],
  methods: ['POST', 'GET', 'PUT']
})

export const addCORS: Middleware = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => Promise<void>
) => {
  cors(req, res, (_: any) => {
    next()
  })
}

export const withCORSMiddlware = label({
  addCORS
})
