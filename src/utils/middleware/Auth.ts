import { NextApiRequest, NextApiResponse } from 'next'
import { decode, JwtPayload, verify } from 'jsonwebtoken'
import { JwksClient } from 'jwks-rsa'
import { label, Middleware } from 'next-api-middleware'

const client = new JwksClient({
  jwksUri: `https://${process.env.AZURE_AD_B2C_TENANT_NAME}.b2clogin.com/${process.env.AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com/${process.env.AZURE_AD_B2C_PRIMARY_USER_FLOW}/discovery/v2.0/keys`
})

export const AdminAction = async (
  req: NextApiRequest,
  res: NextApiResponse,
  fn: () => Promise<void>
) => {
  if (!isAdmin(req)) {
    res.status(401).json({ result: 'User not permitted to make changes' })
    return
  }

  await fn()
}

export function isAdmin(req: NextApiRequest) {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer ')
  ) {
    throw new Error('Missing bearer token')
  }

  const idToken = req.headers.authorization!.substring(7)
  const parsed = decode(idToken, { complete: true })

  return (parsed?.payload as JwtPayload)['extension_IsAdmin'] as boolean
}

export function getOid(req: NextApiRequest) {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer ')
  ) {
    throw new Error('Missing bearer token')
  }

  const idToken = req.headers.authorization!.substring(7)
  const parsed = decode(idToken, { complete: true })

  return (parsed?.payload as JwtPayload)['oid']
}

function getSigningKeyPromise(kid: string, client: JwksClient) {
  return new Promise<string>((resolve, reject) => {
    try {
      client.getSigningKey(kid, (err, key) => {
        try {
          if (err) {
            reject(err)
          }
          if (!key) {
            reject(new Error('Unable to get key'))
          }
          const signingKey = key!.getPublicKey()
          resolve(signingKey)
        } catch (err) {
          reject(err)
        }
      })
    } catch (err) {
      reject(err)
    }
  })
}

const authenticate: Middleware = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => Promise<void>
) => {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith('Bearer ')
    ) {
      throw new Error('Missing bearer token')
    }

    const foo = req.headers['X-Custom-Authorization']

    let idToken = req.headers.authorization!.substring(7)

    const parsed = decode(idToken, { complete: true })

    let kid = parsed?.header.kid
    if (!kid) {
      idToken = (foo as string).substring(7)

      const parsed = decode(idToken, { complete: true })

      kid = parsed?.header.kid
    }

    let signingKey = await getSigningKeyPromise(kid!, client)

    const decodedAndVerified = verify(idToken, signingKey, {
      ignoreNotBefore: true
    }) as JwtPayload

    if (decodedAndVerified.aud !== process.env.AZURE_AD_B2C_CLIENT_ID) {
      throw new Error('The authentication is for the wrong application')
    }

    await next()
  } catch (err) {
    console.log(err)
    res.status(401).json({ result: `Authentication failed with error: ${err}` })
  }
}

export const withAuthMiddleware = label({
  authenticate
})
