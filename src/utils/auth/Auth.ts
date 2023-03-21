import { NextApiRequest, NextApiResponse } from 'next'
import { IncomingHttpHeaders } from 'http'
import { decode, JwtPayload, verify } from 'jsonwebtoken'
import { JwksClient } from 'jwks-rsa'

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

export async function authenticate(req: NextApiRequest, res: NextApiResponse) {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer ')
  ) {
    res.status(401).json({ result: 'Missing bearer token' })
  }

  const idToken = req.headers.authorization!.substring(7)

  const parsed = decode(idToken, { complete: true })

  console.log('PARSED: ', parsed)

  const kid = parsed?.header.kid
  if (!kid) {
    res.status(401).json({ result: 'Malformed IdToken' })
  }

  const client = new JwksClient({
    jwksUri:
      'https://t3am319.b2clogin.com/t3am319.onmicrosoft.com/B2C_1_SISOPolicy/discovery/v2.0/keys'
  })

  let signingKey = await getSigningKeyPromise(kid!, client)

  const decodedAndVerified = verify(idToken, signingKey) as JwtPayload

  console.log('DECODED:', decodedAndVerified)

  const exp = Number(decodedAndVerified.exp!)

  if (new Date(exp * 1000) < new Date()) {
    res.status(401).json({ result: 'Expired authentication' })
  }

  if (decodedAndVerified.aud !== process.env.AZURE_AD_B2C_CLIENT_ID) {
    res
      .status(401)
      .json({ result: 'The authentication is for the wrong application' })
  }
}
