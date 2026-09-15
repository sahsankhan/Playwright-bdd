const { expect } = require('@playwright/test');

/** @param {import('@playwright/test').Page} page @param {string} uiBaseUrl */
class AuthPage {
  constructor(page, uiBaseUrl) {
    this.page = page;
    this.uiBaseUrl = uiBaseUrl;
  }

  uniqueAccount() {
    const stamp = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
    return {
      email: `qa.bdd.${stamp}@example.com`,
      password: `Hyb!${stamp}Qa#9`,
    };
  }

  async registerUnique() {
    const account = this.uniqueAccount();
    await this.page.goto(`${this.uiBaseUrl}/auth/register`);
    await this.page.locator('[data-test="first-name"]').fill('Bdd');
    await this.page.locator('[data-test="last-name"]').fill('Tester');
    await this.page.locator('[data-test="dob"]').fill('1990-01-15');
    await this.page.locator('[data-test="country"]').selectOption({ value: 'NL' }).catch(async () => {
      await this.page.locator('[data-test="country"]').selectOption({ label: /netherlands/i });
    });
    await this.page.locator('[data-test="postal_code"]').fill('3511AB');
    await this.page.locator('[data-test="house_number"]').fill('12');
    await this.page.locator('[data-test="street"]').fill('Test Street');
    await this.page.locator('[data-test="city"]').fill('Utrecht');
    await this.page.locator('[data-test="state"]').fill('Utrecht');
    await this.page.locator('[data-test="phone"]').fill('5550100123');
    await this.page.locator('[data-test="email"]').fill(account.email);
    await this.page.locator('[data-test="password"]').fill(account.password);
    await this.page.locator('[data-test="register-submit"]').click();
    await expect(this.page).toHaveURL(/login/i);
    return account;
  }

  async signIn(email, password) {
    await this.page.goto(`${this.uiBaseUrl}/auth/login`);
    await this.page.locator('[data-test="email"]').fill(email);
    await this.page.locator('[data-test="password"]').fill(password);
    await this.page.locator('[data-test="login-submit"]').click();
    await expect(this.page.locator('[data-test="nav-menu"]')).toBeVisible();
  }
}

module.exports = { AuthPage };
