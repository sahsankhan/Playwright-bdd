const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const config = require('../config');
const { fetchInStockProduct } = require('../support/catalog');

When('the customer opens the catalog', async function () {
  await this.homePage.open();
});

Then('product cards are visible', async function () {
  await this.homePage.expectProductCards();
});

When('the customer opens an in-stock product', async function () {
  const product = await fetchInStockProduct(config.apiBaseUrl);
  this.productName = product.name;
  await this.page.goto(`${config.uiBaseUrl}/product/${product.id}`);
});

Then('the add to cart button is visible', async function () {
  await expect(this.page.locator('[data-test="add-to-cart"]')).toBeVisible();
  await expect(this.page.locator('[data-test="product-title"], h1').first()).toContainText(this.productName);
});

When('the customer searches for an in-stock product', async function () {
  const product = await fetchInStockProduct(config.apiBaseUrl);
  this.productName = product.name;
  await this.homePage.search(product.name);
});

Then('that product is listed', async function () {
  await this.homePage.expectListed(this.productName);
});
