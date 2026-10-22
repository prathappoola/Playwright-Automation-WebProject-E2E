import { test } from '@playwright/test';
import { HomePage } from '../PageObjects/HomePage.js';
import { CheckOutPage } from '../PageObjects/CheckOut.js';
import { PlacceOrderPage } from '../PageObjects/PlaceOrder.js';
import { LoginPage } from '../PageObjects/loginPage.js';

async function loginToApplication(page) {
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
    return loginPage;
}

test('E2E Scenario 1', async ({ page }) => {
    const loginPageInstance = await loginToApplication(page);
    const homePageInstance = new HomePage(page);
    const checkOutPageInstance = new CheckOutPage(page);
    const placeOrderInstance = new PlacceOrderPage(page);

    await homePageInstance.AddToCart();
    await homePageInstance.VerifyHomeButtonPresent();

    await checkOutPageInstance.VerifyMyCartText();
    await checkOutPageInstance.CheckOut();
    await checkOutPageInstance.VerifyPaymentMethodText();

    await placeOrderInstance.EnterCVVCode('123');
    await placeOrderInstance.SelectCountryFromDropDown('India');
    await placeOrderInstance.EnterNameOnCard('Prathap Poola');
    await placeOrderInstance.ClickOnPlaceOrderButton();
    await placeOrderInstance.VerifyPlaceOrderText();

    await homePageInstance.LogoutFromApplication();
    await loginPageInstance.VerifyLoginText();
});

test(' @Regression E2E Scenario for ZARA COAT 2', async ({ page }) => {
    const loginPageInstance = await loginToApplication(page);
    const homePageInstance = new HomePage(page);
    await homePageInstance.AddToCartForZaraCoat2();
    const checkOutPageInstance = new CheckOutPage(page);
    const placeOrderInstance = new PlacceOrderPage(page);

    await homePageInstance.AddToCart();
    await homePageInstance.VerifyHomeButtonPresent();

    await checkOutPageInstance.VerifyMyCartText();
    await checkOutPageInstance.CheckOut();
    await checkOutPageInstance.VerifyPaymentMethodText();

    await placeOrderInstance.EnterCVVCode('123');
    await placeOrderInstance.SelectCountryFromDropDown('India');
    await placeOrderInstance.EnterNameOnCard('Prathap Poola');
    await placeOrderInstance.ClickOnPlaceOrderButton();
    await placeOrderInstance.VerifyPlaceOrderText();

    await homePageInstance.LogoutFromApplication();
    await loginPageInstance.VerifyLoginText();
});