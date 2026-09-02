import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../base-page';

export class AuthDrawer extends BasePage {
  private readonly authDrawerClose: Locator;
  private readonly authDrawerHeader: Locator;

  constructor(page: Page) {
    super(page);
    // Initialize the authDrawerClose locator to find the 'Uždaryti' button within a div.
    this.authDrawerClose = page.locator('div').filter({ has: page.getByRole('button', { name: 'Uždaryti' }) });
    this.authDrawerHeader = page.getByRole('heading', { name: 'Sveiki sugrįžę!', level: 2 });
  }

  async expectAuthDrawerToBeOpen() {
    await expect(this.authDrawerClose).toBeVisible();
    await expect(this.authDrawerHeader).toBeVisible();
  }

  async closeAuthDrawer() {
    await this.authDrawerClose.click();
  }
}