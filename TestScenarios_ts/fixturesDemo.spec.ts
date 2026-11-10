import { test, expect } from './fixtures';

test('Fixtures demo authenticates and logs out', async ({ page, authenticatedSession }) => {
    const { homePage } = authenticatedSession;

    await homePage.VerifyHomeButtonPresent();
    await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
});