import { Page } from '@playwright/test';
import { CookieBanner } from './components/cookie-banner';

export class BasePage {
  protected page: Page;
  private readonly cookieBanner: CookieBanner;

  constructor(page: Page) {
    this.page = page;
    this.cookieBanner = new CookieBanner(page);
  }

  async dismissCookieBanner() {
    await this.cookieBanner.acceptIfVisible();
  }
}