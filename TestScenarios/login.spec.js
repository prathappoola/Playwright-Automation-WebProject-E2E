import { test } from '@playwright/test';
import { LoginPage } from '../PageObjects/loginPage.js';
import { HomePage } from '../PageObjects/HomePage.js';
import { CheckOutPage } from '../PageObjects/CheckOut.js';
import { PlacceOrderPage } from '../PageObjects/PlaceOrder.js';

test('E2E Scenario 1', async ({ page }) => {
    const loginPageInstance = new LoginPage(page);
    const homePageInstance = new HomePage(page);
    const checkOutPageInstance = new CheckOutPage(page);
    const placeOrderInstance = new PlacceOrderPage(page);

    await loginPageInstance.OpenApplication();
    await loginPageInstance.VerifyLoginText();
    await loginPageInstance.LoginToApplication('poola415@gmail.com', 'Poola@2026!@#$');

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
    await loginPageInstance.CloseApplication();
});
