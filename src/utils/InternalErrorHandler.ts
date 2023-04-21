import { DatabaseError } from '@/exceptions/DatabaseError'
import { NextApiRequest, NextApiResponse } from 'next'

export const InternalErrorHandler = async (
  _req: NextApiRequest,
  res: NextApiResponse,
  fn: () => Promise<void>
) => {
  try {
    await fn()
  } catch (err) {
    const originalError = (err as DatabaseError).originalError
    if (
      typeof originalError == 'string' &&
      originalError.includes('Violation of UNIQUE KEY constraint')
    ) {
      res.status(409).json({ result: `Request failed with conflict: ${err}` })
    } else {
      res.status(500).json({ result: `Request failed with error: ${err}` })
    }
  }
}
