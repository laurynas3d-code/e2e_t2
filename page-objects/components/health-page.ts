import { expect, Page } from '@playwright/test';
import { BasePage } from '../base-page';

export class HealthPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // if no path - check current page health, if path is provided - check health of that path
  async checkPageHealth(path?: string) {
    const response = path
      ? await this.page.goto(path, { waitUntil: 'domcontentloaded' })
      : await this.page.reload({ waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(200);
  }
}