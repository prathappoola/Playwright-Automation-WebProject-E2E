import { expect } from '@playwright/test';

export class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('#userEmail');
        this.passwordInput = page.locator('#userPassword');
        this.loginButton = page.locator('#login');
        this.loginText = page.getByRole('heading', { name: 'Log in' });
    }

    async OpenApplication() {
        await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
        await this.loginText.waitFor({ state: 'visible', timeout: 15000 });
    }

    async LoginToApplication(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async VerifyLoginText() {
        await expect(this.loginText).toBeVisible({ timeout: 15000 });
    }

    async CloseApplication() {
        await this.page.close();
    }
}