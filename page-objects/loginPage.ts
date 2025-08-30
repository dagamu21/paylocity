import { Page } from "@playwright/test"
import { HelperBase } from "./helperBase"
    


export class LoginPage extends HelperBase {
    constructor (page: Page) {
        super(page)
    }

    async navigateToLoginPage() {
        await this.page.goto('/Prod/')
    }

    async performLogin() {
        const username = process.env.USER ?? ""
        const password = process.env.PASSWORD ?? ""       
        await this.page.locator('#Username').fill(username)
        await this.page.locator('#Password').fill(password)
        await this.page.getByRole('button', { name: 'Log In' }).click()
    }
    
    async performInvalidLogin() {
        const username = "invalidUser"
        const password = "invalidPassword"       
        await this.page.locator('#Username').fill(username)
        await this.page.locator('#Password').fill(password)
        await this.page.getByRole('button', { name: 'Log In' }).click()
    }

    async performLogout() {
        await this.page.locator('[href="/Prod/Account/LogOut"]').click()
    }
}