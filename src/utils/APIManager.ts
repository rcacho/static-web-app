import { Session } from 'next-auth'
import { getSession } from 'next-auth/react'

const apiPaths = {
  category: '/api/category',
  notifications: '/api/notification/[id]',
  events: '/api/event'
}

export class APIManager {
  static instance: APIManager
  currSession: Session | null
  sessionId: number | null

  public static async getInstance() {
    if (this.instance == undefined) {
      this.instance = new APIManager(await getSession())
    }
    return this.instance
  }

  public async getCategory() {
    return await this.fetch(apiPaths.category, 'GET')
  }

  public async addCategory(data: any) {
    return await this.fetch(apiPaths.category, 'POST', data)
  }

  public async updateCategory(categoryId: number, data: any) {
    return await this.fetch(apiPaths.category + `/${categoryId}`, 'PUT', data)
  }

  public async deleteCategory(categoryId: number) {
    return await this.fetch(apiPaths.category + `/${categoryId}`, 'DELETE')
  }

  public async getEvent() {
    return await this.fetch(apiPaths.events, 'GET')
  }

  public async addEvent(data: any) {
    return await this.fetch(apiPaths.events, 'POST', data)
  }

  private fetch(url: string, method: string, data?: any) {
    var options
    if (data) {
      options = {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    } else {
      options = { method: method }
    }
    return fetch(url, options).then((res) => res.json())
  }

  private constructor(session: Session | null) {
    this.currSession = session
    this.sessionId = 0 // @TODO: Implement this after login sessions are merged.
  }
}
