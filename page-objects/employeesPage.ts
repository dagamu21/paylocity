import { expect, Page } from "@playwright/test"
import { HelperBase } from "./helperBase"
import { fa, faker } from '@faker-js/faker';
 
export class EmployeesPage extends HelperBase {
    constructor (page: Page) {
        super(page)
    }

    async setEmployeeInfo(firstName: string, lastName: string, dependents: number) {
        firstName = faker.person.firstName()
        lastName = faker.person.lastName()
        dependents = faker.number.int({ min: 0, max: 32 })
        return { firstName, lastName, dependents }  
    }

    async addEmployee(firstName: string, lastName: string, dependents: number) {
        await this.page.waitForSelector('tbody tr');
        await this.page.getByRole('button', { name: 'Add Employee' }).click()
        await this.page.locator('#firstName').fill(firstName)
        await this.page.locator('#lastName').fill(lastName)
        await this.page.locator('#dependants').fill(dependents.toString())
        await this.page.locator('.modal-footer').getByRole('button', { name: 'Add' }).click()
    }

    async updateEmployee(employee: { firstName: string, lastName: string, dependents: number }) {
        await this.page.waitForSelector('tbody tr');
        const row = this.page.locator('tbody tr', { hasText: `${employee.firstName}` })
        await row.locator('[class="fas fa-edit"]').click()
        const newFirstName = faker.person.firstName()
        const newLastName = faker.person.lastName()
        const newDependents = faker.number.int({ min: 0, max: 32 })
        await this.page.locator('#firstName').fill(newFirstName)
        await this.page.locator('#lastName').fill(newLastName)
        await this.page.locator('#dependants').fill(newDependents.toString())
        await this.page.locator('.modal-footer').getByRole('button', { name: 'Update' }).click()
        employee.firstName = newFirstName
        employee.lastName = newLastName
        employee.dependents = newDependents
        return employee
    }

        async deleteEmployee(employee: { firstName: string, lastName: string, dependents: number }) {
        await this.page.waitForSelector('tbody tr');
        const row = this.page.locator('tbody tr', { hasText: `${employee.firstName}` })
        await row.locator('[class="fas fa-times"]').click()
        await this.page.locator('.modal-footer').getByRole('button', { name: 'Delete' }).click()
    }
    
}