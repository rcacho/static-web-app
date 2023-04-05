import { loginRequest, msalInstance } from '@/authConfig'
import { AuthenticationResult } from '@azure/msal-browser'

const apiPaths = {
  category: (categoryId?: number) =>
    `/api/category${categoryId ? '/' + categoryId : ''}`,
  events: (eventId?: number) => `/api/event${eventId ? '/' + eventId : ''}`,
  user: () => `/api/user`,
  userLogin: (userId: number) => `/api/user/check_notifications/${userId}`,
  admin: () => 'api/user/admin',
  adminMembership: () => 'api/admin-membership',
  notifications: () => `/api/notification`,
  notificationCheck: () => `/api/notification-check`,
  filter: () => `/api/filter`
}

export class APIManager {
  static instance: APIManager

  auth?: AuthenticationResult

  get accessToken() {
    return this.auth?.idToken
  }

  public static async getInstance() {
    if (this.instance == undefined) {
      this.instance = new APIManager()
    }
    return this.instance
  }

  public async getFilter() {
    return await this.fetch(apiPaths.filter(), 'GET')
  }

  public async setFilter(data: any) {
    return await this.fetch(apiPaths.filter(), 'PUT', data)
  }

  public async getCategory() {
    return await this.fetch(apiPaths.category(), 'GET')
  }

  public async addCategory(data: any) {
    return await this.fetch(apiPaths.category(), 'POST', data)
  }

  public async updateCategory(categoryId: number, data: any) {
    return await this.fetch(apiPaths.category(categoryId), 'PUT', data)
  }

  public async deleteCategory(categoryId: number, data: any) {
    return await this.fetch(apiPaths.category(categoryId), 'DELETE', data)
  }

  public async getEvent() {
    return await this.fetch(apiPaths.events(), 'GET')
  }

  public async addEvent(data: any) {
    return await this.fetch(apiPaths.events(), 'POST', data)
  }

  public async editEvent(eventId: number, data: any) {
    return await this.fetch(apiPaths.events(eventId), 'PUT', data)
  }

  public async deleteEvent(eventId: number, data: any) {
    return await this.fetch(apiPaths.events(eventId), 'DELETE', data)
  }

  public async getNotification() {
    return await this.fetch(apiPaths.notifications(), 'GET')
  }

  public async setLastNotificationCheck() {
    return await this.fetch(apiPaths.notificationCheck(), 'PUT')
  }

  private isExpired(result: AuthenticationResult) {
    return result.expiresOn && new Date() > result.expiresOn
  }

  public async getUsers() {
    return await this.fetch(apiPaths.user(), 'GET')
  }

  public async getAdmins() {
    return await this.fetch(apiPaths.admin(), 'GET')
  }

  public async addAdmin(userId: string) {
    await this.fetch(apiPaths.admin(), 'POST', { userId: userId })
  }

  public async removeAdmin(userId: string) {
    await this.fetch(apiPaths.admin(), 'DELETE', { userId: userId })
  }

  public async checkAdminMembership(userId: string) {
    const res = await this.fetch(apiPaths.adminMembership(), 'POST', {
      objectId: userId
    })
    return res.extension_IsAdmin
  }

  private async fetch(url: string, method: string, data?: any) {
    if (!this.auth || this.isExpired(this.auth)) {
      const account = msalInstance.getAllAccounts()[0]
      if (!account) {
        throw Error(
          `No active account! Please attempt to login before retrying the request`
        )
      }

      const response = await msalInstance.acquireTokenSilent({
        ...loginRequest,
        account: account
      })

      this.auth = response
    }

    // @ts-ignore
    var options
    if (data) {
      options = {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.accessToken}`,
          'X-Custom-Authorization': `Bearer ${this.accessToken}`
        },
        body: JSON.stringify(data)
      }
    } else {
      options = {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'X-Custom-Authorization': `Bearer ${this.accessToken}`
        },
        method: method
      }
    }
    console.log('acccesstoken:', this.accessToken)
    return fetch(url, options).then((res) => {
      if (res.status !== 200) {
        throw new Error(
          `Request to ${url} failed with status code: ${res.status}`
        )
      }

      return res.json()
    })
  }

  private constructor() {}
}
