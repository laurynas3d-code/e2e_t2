import { expect, Page } from '@playwright/test';
import { BasePage } from '../base-page';

export class HealthPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async checkPageHealth(path: string) {
    const response = await this.page.goto(path, {
      waitUntil: 'domcontentloaded',
    });
    expect(response?.status()).toBe(200);
  }
}