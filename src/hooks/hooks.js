const { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium, firefox, webkit, devices } = require('@playwright/test');
const { AuthPage } = require('../pageObjects/AuthPage');
const { HomePage } = require('../pageObjects/HomePage');
const { CheckoutPage } = require('../pageObjects/CheckoutPage');
const config = require('../config');

setDefaultTimeout(config.timeoutMs);

let browser;

BeforeAll(async function () {
  const launcher = { firefox, webkit, chromium }[config.browser] || chromium;
  browser = await launcher.launch({
    headless: config.headless,
    slowMo: config.headless ? 0 : 250,
  });
});

Before(async function () {
  const chrome = devices['Desktop Chrome'];
  this.context = await browser.newContext({
    ...(config.browser === 'firefox' || config.browser === 'webkit' ? {} : chrome),
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1,
  });
  this.page = await this.context.newPage();
  this.authPage = new AuthPage(this.page, config.uiBaseUrl);
  this.homePage = new HomePage(this.page, config.uiBaseUrl);
  this.checkoutPage = new CheckoutPage(this.page, config.uiBaseUrl);
});

After(async function (scenario) {
  if (scenario.result?.status === Status.FAILED && this.page) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    await this.attach(screenshot, 'image/png');
  }
  if (this.page) {
    await this.page.close();
  }
  if (this.context) {
    await this.context.close();
  }
});

AfterAll(async function () {
  if (browser) {
    await browser.close();
  }
});
