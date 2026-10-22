import { expect, test, Locator, Page } from '@playwright/test';

export class PlaceOrderPage {


    readonly page:Page;
    readonly CVVCode: Locator;
    readonly NameOnCard: Locator;
    readonly SelectCountry: Locator;
    readonly placeOrderButton: Locator;
    readonly orderConfirmation: Locator;


    constructor(page:Page) {
        this.page = page;
       const paymentInputs = page.locator('.payment__cc input');
       this.CVVCode = paymentInputs.nth(1);
       this.NameOnCard = paymentInputs.nth(2);
       this.SelectCountry = page.getByRole('textbox', { name: 'Select Country' });
       this.placeOrderButton = page.getByText('Place Order', { exact: true }).last();
       this.orderConfirmation = page.getByRole('heading', { name: 'Thankyou for the order.' });
   }

   async EnterCVVCode(cvvcode = '123') {
       await expect(this.CVVCode).toBeVisible();
       await this.CVVCode.fill(cvvcode);
   }

   async SelectCountryFromDropDown(country = 'India') {
       await this.SelectCountry.fill('');
       await this.SelectCountry.pressSequentially(country, { delay: 100 });
       await this.page.getByRole('button', { name: new RegExp(country) }).last().click();
       await expect(this.SelectCountry).toHaveValue(country, { timeout: 15000 });
   }

   async EnterNameOnCard(name = 'Prathap Poola') {
       await expect(this.NameOnCard).toBeVisible();
       await this.NameOnCard.fill(name);
   }

   async ClickOnPlaceOrderButton() {
       await this.placeOrderButton.scrollIntoViewIfNeeded();
       await this.placeOrderButton.click();
   }

   async VerifyPlaceOrderText() {
       await expect(this.orderConfirmation).toBeVisible({ timeout: 20000 });
   }
}
