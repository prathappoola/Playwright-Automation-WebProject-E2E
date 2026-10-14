import { expect } from '@playwright/test';

export class LogoutPage {
    constructor(page) {
        this.page = page;
        this.signOutButton = page.getByRole('button', { name: 'Sign Out' });
        this.loginText = page.getByRole('heading', { name: 'Log in' });
    }

    async LogoutFromApplication() {
        await this.signOutButton.click();
    }

    async VerifyLoginText() {
        await expect(this.loginText).toBeVisible({ timeout: 15000 });
    }
}

