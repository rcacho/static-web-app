import { Session } from "next-auth";
import { getSession } from "next-auth/react";

const apiPaths = {
    category: "/api/category",
    notifications: "/api/notification/[id]",
}

export class APIInterface {
    static instance: APIInterface;
    currSession: Session | null;
    sessionId: number | null;

    public static async getInstance() {
        if (this.instance == undefined) {
            this.instance = new APIInterface(await getSession())
        }
        return this.instance;
    }

    public async getCategory() {
        return await this.fetch(apiPaths.category, "GET");
    }

    public async updateCategory(data: any) {
        return await this.fetch(apiPaths.category + `/${this.sessionId}`, "PUT", data)
    }

    public async deleteCategory() {
        return await this.fetch(apiPaths.category + `/${this.sessionId}`, "DELETE")
    }

    private async fetch(url: string, method: string, data?: any) {
        var options;
        if (data) {
            options = {
                method: method, 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        } else {
            options = {method: method}
        }
        const results = await fetch(url, options)
        return results.json();
    }

    private constructor(session: Session | null) {
        this.currSession = session
        this.sessionId = 0 // @TODO: Implement this after login sessions are merged.
    }
}