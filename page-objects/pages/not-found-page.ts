import { expect, type Page, type Locator } from '@playwright/test';
import { BasePage } from '../base-page';
import { testData } from '../../data/test-data';

export class NotFoundPage extends BasePage {
  private readonly errorHeading: Locator;

  constructor(page: Page) {
    super(page);

    this.errorHeading = this.page.getByRole('heading', { name: /O nee|neegzistuoja|404/i, level: 1 }).or(this.page.getByText(/Kažkas čia ne taip/));
  }

  async open() {
    await super.open(testData.urls.notFound);
  }

  async expectErrorHeadingToBeVisible() {
    await expect(this.errorHeading).toBeVisible();
  }
}
