const { Given, When, Then } = require('@cucumber/cucumber');

Given('the customer registers a unique account', async function () {
  this.account = await this.authPage.registerUnique();
});

Given('the customer signs in', async function () {
  await this.authPage.signIn(this.account.email, this.account.password);
});

When('they add a product to the cart from the catalog', async function () {
  this.productName = await this.homePage.addFirstProductToCart();
});

Then('the cart shows that product', async function () {
  await this.checkoutPage.expectProductInCart(this.productName);
});

When('they complete checkout with cash on delivery', async function () {
  await this.checkoutPage.proceedFromCart();
  await this.checkoutPage.proceedWhenLoggedIn();
  await this.checkoutPage.fillAddress();
  await this.checkoutPage.proceedFromAddress();
  await this.checkoutPage.payCashOnDelivery();
});

Then('the order is confirmed', async function () {
  await this.checkoutPage.expectOrderConfirmed();
});
