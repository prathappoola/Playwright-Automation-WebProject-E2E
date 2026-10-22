import { test as base, expect } from '@playwright/test';
import { HomePage } from '../PageObjects/HomePage.js';
import { LoginPage } from '../PageObjects/loginPage.js';

type AuthenticatedSession = {
    homePage: {
        AddToCart(): Promise<void>;
        AddToCartForZaraCoat2(): Promise<void>;
        VerifyHomeButtonPresent(): Promise<void>;
        LogoutFromApplication(): Promise<void>;
    };
};

type CustomFixtures = {
    authenticatedSession: AuthenticatedSession;
};

export const test = base.extend<CustomFixtures>({
    authenticatedSession: async ({ page }, use) => {
        const username = process.env.PLAYWRIGHT_USERNAME;
        const password = process.env.PLAYWRIGHT_PASSWORD;

        if (!username || !password) {
            throw new Error(
                'Set PLAYWRIGHT_USERNAME and PLAYWRIGHT_PASSWORD before running the tests.'
            );
        }

        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);

        await loginPage.OpenApplication();
        await loginPage.VerifyLoginText();
        await loginPage.LoginToApplication(username, password);
        await homePage.VerifyHomeButtonPresent();

        try {
            await use({ homePage });
        } finally {
            await homePage.LogoutFromApplication();
            await loginPage.VerifyLoginText();
        }
    },
});

export { expect };
