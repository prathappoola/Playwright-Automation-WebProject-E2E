import { expect } from '@playwright/test';

export class HomePage {
    constructor(page) {
        this.page = page;
        this.addToCartButton = page.getByRole('button', { name: 'Add To Cart' }).first();
        this.cartButton = page.getByRole('button', { name: /Cart/ }).first();
        this.signOutButton = page.getByRole('button', { name: 'Sign Out' });
        this.homeButton = page.getByRole('button', { name: 'HOME' });
        this.AddToCartButtonForZaraCoat2 = page.locator('button').filter({ hasText: 'Add To Cart' }).nth(1)
    }

    async AddToCart() {
        await this.addToCartButton.click();
        await this.page.waitForTimeout(2000);
        await this.cartButton.click();
    }

    async VerifyHomeButtonPresent() {
        await expect(this.homeButton).toBeVisible({ timeout: 15000 });
    }

    async AddToCartForZaraCoat2() {
        await this.AddToCartButtonForZaraCoat2.click();
    }

    async LogoutFromApplication() {
        await this.signOutButton.click();
    }
}
