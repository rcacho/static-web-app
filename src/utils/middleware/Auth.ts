import { addCORS } from './Cors'
import { NextApiRequest, NextApiResponse } from 'next'
import { decode, JwtPayload, verify } from 'jsonwebtoken'
import { JwksClient } from 'jwks-rsa'
import { label, Middleware } from 'next-api-middleware'

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
  req.url
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith('Bearer ')
    ) {
      throw new Error('Missing bearer token')
    }

    const idToken = req.headers.authorization!.substring(7)

    const parsed = decode(idToken, { complete: true })

    const kid = parsed?.header.kid
    if (!kid) {
      throw new Error('Malformed IdToken')
    }

    const client = new JwksClient({
      jwksUri:
        'https://t3am319.b2clogin.com/t3am319.onmicrosoft.com/B2C_1_SISOPolicy/discovery/v2.0/keys'
    })

    let signingKey = await getSigningKeyPromise(kid!, client)

    const decodedAndVerified = verify(idToken, signingKey) as JwtPayload

    if (decodedAndVerified.aud !== process.env.AZURE_AD_B2C_CLIENT_ID) {
      throw new Error('The authentication is for the wrong application')
    }

    next()
  } catch (err) {
    console.log(err)
    res.status(401).json({ result: err })
  }
}

export const withAuthMiddleware = label(
  {
    addCORS,
    authenticate
  },
  ['addCORS']
)
