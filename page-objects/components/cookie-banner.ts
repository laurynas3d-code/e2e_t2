import { Page, Locator } from '@playwright/test';

export class CookieBanner {
  private readonly acceptButton: Locator;

  constructor(private page: Page) {
    this.acceptButton = this.page.locator('#cybotBanner').getByRole('button', {
      name: 'Sutinku su visais',
    }).first();
  }

  async acceptIfVisible() {
    // Give the banner a very short opportunity to appear
    // If it is not present, return false
    if (await this.acceptButton.isVisible({ timeout: 5000 })) {
      await this.acceptButton.click();
    }
  }
}