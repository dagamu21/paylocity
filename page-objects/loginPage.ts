import { Page } from "@playwright/test"
import { HelperBase } from "./helperBase"

export class LoginPage extends HelperBase {
    constructor (page: Page) {
        super(page)
    }

    async logInUsingValidCredentials() {
        await this.page.
    
}