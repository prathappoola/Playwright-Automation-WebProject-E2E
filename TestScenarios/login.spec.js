import { test } from './fixtures.js';
import { HomePage } from '../PageObjects/HomePage.js';
import { CheckOutPage } from '../PageObjects/CheckOut.js';
import { PlacceOrderPage } from '../PageObjects/PlaceOrder.js';

test('E2E Scenario 1', async ({ page, logoutPage }) => {
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
});
