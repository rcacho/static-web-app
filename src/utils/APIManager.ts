import { loginRequest, msalInstance } from '@/authConfig'

const apiPaths = {
  category: (categoryId?: number) => `/api/category/${categoryId ?? ''}`,
  events: (eventId?: number) => `/api/event/${eventId ?? ''}`,
  notifications: (userId: string) => `/api/notification/${userId}`,
  user: (userId?: number) => `/api/user/${userId ?? ''}`,
  userLogin: (userId: number) => `/api/user/login/${userId}`,
  filter: (userId: string) => `/api/filter/${userId}`
}

export class APIManager {
  static instance: APIManager

  accessToken?: string

  public static async getInstance() {
    if (this.instance == undefined) {
      this.instance = new APIManager()
    }
    return this.instance
  }

  public async getFilter(user_id: string) {
    return await this.fetch(apiPaths.filter(user_id), 'GET')
  }

  public async setFilter(user_id: string, data: number[]) {
    return await this.fetch(apiPaths.filter(user_id), 'PUT', data)
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

  public async getNotification(userId: string) {
    return await this.fetch(apiPaths.notifications(userId), 'GET')
  }
  // @ts-ignore
  public async addUser(data: any) {
    return await this.fetch(apiPaths.user(), 'POST', data)
  }
  // @ts-ignore
  public async getUser(userId: number) {
    return await this.fetch(apiPaths.user(userId), 'GET')
  }
  // @ts-ignore
  public async editUser(userId: number, data: any) {
    return await this.fetch(apiPaths.user(userId), 'PUT', data)
  }

  public async setUserLastLogin(userId: any) {
    return await this.fetch(apiPaths.userLogin(userId), 'PUT')
  }

  private async fetch(url: string, method: string, data?: any) {
    console.log(data)

    if (!this.accessToken) {
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
      this.accessToken = response.idToken
    }
    // @ts-ignore
    var options
    if (data) {
      options = {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.accessToken}`
        },
        body: JSON.stringify(data)
      }
    } else {
      options = {
        headers: { Authorization: `Bearer ${this.accessToken}` },
        method: method
      }
    }
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
