import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../PageObjects/loginPage.js';
import { LogoutPage } from '../PageObjects/Logout.js';

export const test = base.extend({
    loginPage: async ({ page }, use) => {
        const username = process.env.PLAYWRIGHT_USERNAME;
        const password = process.env.PLAYWRIGHT_PASSWORD;

        if (!username || !password) {
            throw new Error(
                'Set PLAYWRIGHT_USERNAME and PLAYWRIGHT_PASSWORD before running the tests.'
            );
        }

        const loginPage = new LoginPage(page);
        await loginPage.OpenApplication();
        await loginPage.VerifyLoginText();
        await loginPage.LoginToApplication(username, password);
        await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible({
            timeout: 15000,
        });

        await use(loginPage);
    },

    logoutPage: async ({ page, loginPage }, use) => {
        const logoutPage = new LogoutPage(page);
        await use(logoutPage);
        await logoutPage.LogoutFromApplication();
        await logoutPage.VerifyLoginText();
    },
});

export { expect };
