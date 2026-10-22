import { expect, test, Locator, Page } from '@playwright/test';

export class CheckOutPage {

     readonly page:Page;
     readonly CheckOutButton: Locator;
     readonly MyCartText: Locator;
     readonly PaymentMethodText: Locator;

    constructor(page:Page) {
        this.page = page;
        this.CheckOutButton = page.getByRole('button', { name: 'Checkout' }).first();
        this.MyCartText = page.getByRole('heading', { name: 'My Cart' });
        this.PaymentMethodText = page.getByText('Payment Method');
    }

    async VerifyMyCartText() {
        await expect(this.MyCartText).toBeVisible({ timeout: 15000 });
    }

    async VerifyPaymentMethodText() {
        await expect(this.PaymentMethodText).toBeVisible({ timeout: 15000 });
    }

    async CheckOut() {
        await this.CheckOutButton.click();
    }
}
