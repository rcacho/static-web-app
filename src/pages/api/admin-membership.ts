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
  const { method, body } = req

  if (method !== 'POST') {
    res.status(405).json({ error: 'Unrecognized method' })
    return
  }

  if (!body.objectId || body.objectId === '') {
    res.status(400).json({ error: "Body field 'objectId' is required" })
    return
  }

  const msalConfig = {
    auth: {
      clientId: process.env.AZURE_AD_B2C_CLIENT_ID!,
      authority:
        process.env.AAD_ENDPOINT +
        '/' +
        `${process.env.AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com` +
        '/',
      clientSecret: process.env.AZURE_AD_B2C_CLIENT_SECRET
    }
  }

  const msalClient = new ConfidentialClientApplication(msalConfig)

  const tokenResponse = await msalClient.acquireTokenByClientCredential(
    tokenRequest
  )

  try {
    // use token to create Graph client
    const graphClient = getAuthenticatedClient(tokenResponse!.accessToken)

    // return profiles of users in Graph
    const users = await graphClient
      .api(`/users/${body.objectId}/memberOf`)
      .get()

    const groups = users.value as { id: string }[]

    const isAdmin = groups.reduce(
      (prev, curr) =>
        prev || curr.id === process.env.AZURE_AD_B2C_GROUP_ADMIN_ID,
      false
    )

    res.status(200).json({
      version: '1.0.0',
      action: 'Continue',
      extension_IsAdmin: isAdmin,
      jobTitle: 'bob_the_builder'
    })
  } catch (error) {
    res.status(500).json({ error })
  }
}
