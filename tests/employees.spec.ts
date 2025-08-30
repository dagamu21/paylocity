import { LoginPage } from "../page-objects/loginPage";
import { EmployeesPage } from "../page-objects/employeesPage";
import { test, expect } from "@playwright/test";    


test.describe.serial('Employees tests: add update and delete workflow', () => {
    let employee: { firstName: string; lastName: string; dependents: number }

    test.beforeAll(async ({ page }) => {
        const employeesPage = new EmployeesPage(page)
        employee = await employeesPage.setEmployeeInfo("", "", 0)
    })

    test.beforeEach(async ({ page }) => {      
        const loginPage = new LoginPage(page)
        await loginPage.navigateToLoginPage()
        await loginPage.performLogin()
    })

    test('add employee', async ({ page }) => {      
        const employeesPage = new EmployeesPage(page)
        await employeesPage.addEmployee(employee.firstName, employee.lastName, employee.dependents)
        const row = page.locator('tbody tr', { hasText: `${employee.firstName}` })
        await expect(row).toContainText(employee.firstName)
        const deductionPerPaycheck = employeesPage.calculateDeductionPerPaycheck(employee.dependents)
        await expect(row).toContainText(deductionPerPaycheck.toFixed(2))
        const netPayPerPaycheck = employeesPage.calculateNetPayPerPaycheck(employee.dependents)
        await expect(row).toContainText(netPayPerPaycheck.toFixed(2))  
        const annualNetPay = 52000 // sumption is annual pay is always 52000
        await expect(row).toContainText(annualNetPay.toFixed(2))
    })  

    test('update employee after creation', async ({ page }) => {      
        const employeesPage = new EmployeesPage(page)
        await employeesPage.updateEmployee(employee)
        const row = page.locator('tbody tr', { hasText: `${employee.firstName}` })
        await expect(row).toContainText(employee.firstName)
        const deductionPerPaycheck = employeesPage.calculateDeductionPerPaycheck(employee.dependents)
        await expect(row).toContainText(deductionPerPaycheck.toFixed(2))
        const netPayPerPaycheck = employeesPage.calculateNetPayPerPaycheck(employee.dependents)
        await expect(row).toContainText(netPayPerPaycheck.toFixed(2))  
        const annualNetPay = 52000 // asumption is annual pay is always 52000
        await expect(row).toContainText(annualNetPay.toFixed(2))
    })  

    test('delete employee after creation', async ({ page }) => {      
        const employeesPage = new EmployeesPage(page)
        await employeesPage.deleteEmployee(employee)
        const row = page.locator('tbody tr', { hasText: `${employee.firstName}` })
        await expect(row).not.toBeVisible()
    })
})