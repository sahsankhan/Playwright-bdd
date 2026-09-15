const { expect } = require('@playwright/test');

/** @param {import('@playwright/test').Page} page @param {string} uiBaseUrl */
class CheckoutPage {
  constructor(page, uiBaseUrl) {
    this.page = page;
    this.uiBaseUrl = uiBaseUrl;
  }

  async open() {
    await this.page.goto(`${this.uiBaseUrl}/checkout`);
  }

  async expectProductInCart(productName) {
    const title = this.page.locator('[data-test="product-title"]').first();
    await expect(title).toContainText(productName);
  }

  async proceedFromCart() {
    await this.page.locator('[data-test="proceed-1"]').click();
  }

  async proceedWhenLoggedIn() {
    await this.page.locator('[data-test="proceed-2"]').click();
  }

  async fillAddress() {
    await this.page.locator('[data-test="country"]').selectOption({ value: 'NL' }).catch(async () => {
      await this.page.locator('[data-test="country"]').selectOption({ label: /netherlands/i });
    });
    await this.page.locator('[data-test="postal_code"]').fill('3511AB');
    await this.page.locator('[data-test="house_number"]').fill('12');
    await this.page.locator('[data-test="street"]').fill('Test Street');
    await this.page.locator('[data-test="city"]').fill('Utrecht');
    await this.page.locator('[data-test="state"]').fill('Utrecht');
  }

  async proceedFromAddress() {
    const proceed = this.page.locator('[data-test="proceed-3"]');
    await expect(proceed).toBeEnabled();
    await proceed.click();
  }

  async payCashOnDelivery() {
    await this.page.locator('[data-test="payment-method"]').selectOption('cash-on-delivery');
    const finish = this.page.locator('[data-test="finish"]');
    await expect(finish).toBeEnabled();
    await finish.click();
  }

  async expectOrderConfirmed() {
    const confirmation = this.page.locator('[data-test="payment-success-message"], #order-confirmation').first();
    await expect(confirmation).toBeVisible();
  }
}

module.exports = { CheckoutPage };
