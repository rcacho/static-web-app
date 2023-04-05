import { ConfidentialClientApplication } from '@azure/msal-node'
import { Client } from '@microsoft/microsoft-graph-client'

export class GraphAPIManager {
  msalConfig = {
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

  tokenRequest = {
    scopes: [process.env.GRAPH_ENDPOINT + '/.default']
  }

  msalClient: ConfidentialClientApplication

  constructor() {
    this.msalClient = new ConfidentialClientApplication(this.msalConfig)
  }

  getAuthenticatedClient = async () => {
    const tokenResponse = await this.msalClient.acquireTokenByClientCredential(
      this.tokenRequest
    )
    // Initialize Graph client
    const client = Client.init({
      // Use the provided access token to authenticate requests
      authProvider: (done) => {
        done(null, tokenResponse!.accessToken)
      }
    })

    return client
  }

  async getAdminStatus(userId: string) {
    try {
      const graphClient = await this.getAuthenticatedClient()
      const users = await graphClient.api(`/users/${userId}/memberOf`).get()

      const groups = users.value as { id: string }[]

      const isAdmin = groups.reduce(
        (prev, curr) =>
          prev || curr.id === process.env.AZURE_AD_B2C_GROUP_ADMIN_ID,
        false
      )

      return isAdmin
    } catch (err: any) {
      throw err
    }
  }

  async getUsers() {
    try {
      const graphClient = await this.getAuthenticatedClient()
      const users = await graphClient
        .api('/users')
        .select('id,givenName,displayName,email')
        .get()
      return users
    } catch (err: any) {
      throw err
    }
  }

  async addAdmin(userId: string) {
    try {
      const graphClient = await this.getAuthenticatedClient()
      const requestBody = {
        '@odata.id': `https://graph.microsoft.com/v1.0/users/${userId}`
      }
      await graphClient
        .api(`/groups/${process.env.AZURE_AD_B2C_GROUP_ADMIN_ID}/members/$ref`)
        .post(requestBody)
      return
    } catch (err: any) {
      throw err
    }
  }

  async removeAdmin(userId: string) {
    try {
      const graphClient = await this.getAuthenticatedClient()
      await graphClient
        .api(
          `/groups/${process.env.AZURE_AD_B2C_GROUP_ADMIN_ID}/members/${userId}/$ref`
        )
        .delete()
    } catch (err: any) {
      throw err
    }
  }

  async getAdmins() {
    try {
      const graphClient = await this.getAuthenticatedClient()
      const admins = await graphClient
        .api(`/groups/${process.env.AZURE_AD_B2C_GROUP_ADMIN_ID}/members`)
        .select('id,givenName,displayName,email')
        .get()
      return admins
    } catch (err: any) {
      throw err
    }
  }
}
