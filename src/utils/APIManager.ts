const apiPaths = {
  category: (categoryId?: number) => `/api/category/${categoryId ?? ''}`,
  events: (eventId?: number) => `/api/event/${eventId ?? ''}`,
  notifications: (userId: number) => `/api/notification/${userId}`,
  user: (userId?: number) => `/api/user/${userId ?? ''}`,
  userLogin: (userId: number) => `/api/user/login/${userId}`
}

export class APIManager {
  static instance: APIManager

  public static async getInstance() {
    if (this.instance == undefined) {
      this.instance = new APIManager()
    }
    return this.instance
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

  public async getNotification(userId: number) {
    return await this.fetch(apiPaths.notifications(userId), 'GET')
  }

  public async addUser(data: any) {
    return await this.fetch(apiPaths.user(), 'POST', data)
  }

  public async getUser(userId: number) {
    return await this.fetch(apiPaths.user(userId), 'GET')
  }

  public async editUser(userId: number, data: any) {
    return await this.fetch(apiPaths.user(userId), 'PUT', data)
  }

  public async setUserLastLogin(userId: number) {
    return await this.fetch(apiPaths.userLogin(userId), 'PUT')
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

  private constructor() {}
}
