import { NextApiRequest, NextApiResponse } from 'next'
import { ConfidentialClientApplication } from '@azure/msal-node'
import { Client } from '@microsoft/microsoft-graph-client'

const tokenRequest = {
  scopes: [process.env.GRAPH_ENDPOINT + '/.default']
}

const getAuthenticatedClient = (accessToken: string) => {
  // Initialize Graph client
  const client = Client.init({
    // Use the provided access token to authenticate requests
    authProvider: (done) => {
      done(null, accessToken)
    }
  })

  return client
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  if (method !== 'POST') {
    res.status(405).json({ error: 'Unrecognized method' })
    return
  }

  res.status(200).json({
    version: '1.0.0',
    action: 'Continue',
    isAdmin: true,
    is_admin: true,
    isadmin: true,
    job_title: 'bob_the_builder'
  })
}
