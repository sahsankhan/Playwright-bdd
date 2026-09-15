const { When, Then } = require('@cucumber/cucumber');

When('the customer opens the catalog', async function () {
  await this.homePage.open();
});

Then('product cards are visible', async function () {
  await this.homePage.expectProductCards();
});
