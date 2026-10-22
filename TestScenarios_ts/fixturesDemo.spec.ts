import { test, expect } from './fixtures.js';

test('Fixtures demo authenticates and logs out', async ({ page, authenticatedSession }) => {
    const { homePage } = authenticatedSession;

    await homePage.VerifyHomeButtonPresent();
    await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
});