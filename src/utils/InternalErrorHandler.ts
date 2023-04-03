import { NextApiRequest, NextApiResponse } from 'next'

export const InternalErrorHandler = async (
  _req: NextApiRequest,
  res: NextApiResponse,
  fn: () => Promise<void>
) => {
  try {
    await fn()
  } catch (err) {
    res.status(500).json({ result: `Request failed with error: ${err}` })
  }
}
