/** @param {import('@playwright/test').Page} page @param {string} uiBaseUrl */
class HomePage {
  constructor(page, uiBaseUrl) {
    this.page = page;
    this.uiBaseUrl = uiBaseUrl;
  }

  async open() {
    await this.page.goto(`${this.uiBaseUrl}/`);
  }

  async expectProductCards() {
    const card = this.page.locator('[data-test="product-name"]').first();
    await card.waitFor({ state: 'visible' });
  }

  async addFirstProductToCart() {
    await this.open();
    const nameLocator = this.page.locator('[data-test="product-name"]').first();
    await nameLocator.waitFor({ state: 'visible' });
    const productName = (await nameLocator.innerText()).trim();
    await nameLocator.click();
    await this.page.locator('[data-test="add-to-cart"]').click();
    await this.page.locator('[data-test="nav-cart"]').click();
    return productName;
  }
}

module.exports = { HomePage };
