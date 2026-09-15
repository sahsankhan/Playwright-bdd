import type { BrowserContext, Page } from '@playwright/test';
import type { AuthPage } from '../pageObjects/AuthPage';
import type { CheckoutPage } from '../pageObjects/CheckoutPage';
import type { HomePage } from '../pageObjects/HomePage';

declare module '@cucumber/cucumber' {
  interface IWorld {
    page: Page;
    context: BrowserContext;
    authPage: AuthPage;
    homePage: HomePage;
    checkoutPage: CheckoutPage;
    account?: { email: string; password: string };
    productName?: string;
  }
}

export {};
