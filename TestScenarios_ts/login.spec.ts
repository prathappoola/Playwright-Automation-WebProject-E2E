import { test } from './fixtures';
import { CheckOutPage } from '../PageObjects _ts/CheckOut.js';
import { PlaceOrderPage } from '../PageObjects _ts/PlaceOrder.js';

test('E2E Scenario 1', async ({ page, authenticatedSession }) => {
    const { homePage } = authenticatedSession;
    const checkOutPageInstance = new CheckOutPage(page);
    const placeOrderInstance = new PlaceOrderPage(page);

    await homePage.AddToCart();

    await checkOutPageInstance.VerifyMyCartText();
    await checkOutPageInstance.CheckOut();
    await checkOutPageInstance.VerifyPaymentMethodText();

    await placeOrderInstance.EnterCVVCode('123');
    await placeOrderInstance.SelectCountryFromDropDown('India');
    await placeOrderInstance.EnterNameOnCard('Prathap Poola');
    await placeOrderInstance.ClickOnPlaceOrderButton();
    await placeOrderInstance.VerifyPlaceOrderText();
});

test(' @Regression E2E Scenario for ZARA COAT 2', async ({ page, authenticatedSession }) => {
    const { homePage } = authenticatedSession;
    await homePage.AddToCartForZaraCoat2();
    const checkOutPageInstance = new CheckOutPage(page);
    const placeOrderInstance = new PlaceOrderPage(page);

    await homePage.AddToCart();

    await checkOutPageInstance.VerifyMyCartText();
    await checkOutPageInstance.CheckOut();
    await checkOutPageInstance.VerifyPaymentMethodText();

    await placeOrderInstance.EnterCVVCode('123');
    await placeOrderInstance.SelectCountryFromDropDown('India');
    await placeOrderInstance.EnterNameOnCard('Prathap Poola');
    await placeOrderInstance.ClickOnPlaceOrderButton();
    await placeOrderInstance.VerifyPlaceOrderText();
});