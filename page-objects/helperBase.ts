import { Page } from "@playwright/test"

export class HelperBase {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    calculateDeductionPerPaycheck(dependents: number): number {
        const baseCost = 1000
        const dependentCost = 500 * dependents
        const payPeriods = 26
        return (baseCost + dependentCost) / payPeriods
    }

    calculateNetPayPerPaycheck(dependents: number): number {
        const grossPerPaycheck = 2000
        const deduction = this.calculateDeductionPerPaycheck(dependents)
        return grossPerPaycheck - deduction
    }


}