import { LoginPage } from "../page-objects/loginPage";

import { test, expect } from "@playwright/test";    

test('log in with valid credentials', async ({ page }) => {      
    const loginPage = new LoginPage(page)
    await loginPage.navigateToLoginPage()
    await loginPage.performLogin()
    await expect(page).toHaveURL('/Prod/Benefits');
})



test('log out after logging in', async ({ page }) => {      
    const loginPage = new LoginPage(page)
    await loginPage.navigateToLoginPage()
    await loginPage.performLogin()
    await loginPage.performLogout()
    await expect(page).toHaveURL('/Prod/Account/LogIn');
})  


test('fail to log in with invalid credentials', async ({ page }) => {      
    const loginPage = new LoginPage(page)
    await loginPage.navigateToLoginPage()
    await loginPage.performInvalidLogin()
    await expect(page.locator('li:has-text("The specified username or password is incorrect.")')).toBeVisible()
})