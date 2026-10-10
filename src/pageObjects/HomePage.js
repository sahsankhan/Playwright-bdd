const { expect } = require('@playwright/test');
const config = require('../config');
const { fetchInStockProduct } = require('../support/catalog');

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

  async search(productName) {
    await this.open();
    await this.page.locator('[data-test="search-query"]').fill(productName);
    await this.page.locator('[data-test="search-submit"]').click();
  }

  async expectListed(productName) {
    await expect(this.page.locator('[data-test="search-term"]')).toContainText(productName);
    await expect(this.page.locator('[data-test="product-name"]').filter({ hasText: productName }).first()).toBeVisible();
  }

  async addFirstProductToCart() {
    const product = await fetchInStockProduct(config.apiBaseUrl);
    await this.page.goto(`${this.uiBaseUrl}/product/${product.id}`);
    const add = this.page.locator('[data-test="add-to-cart"]');
    await expect(add).toBeEnabled();
    await add.click();
    await this.page.locator('[data-test="nav-cart"]').click();
    return product.name;
  }
}

module.exports = { HomePage };
