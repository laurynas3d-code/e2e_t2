import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../base-page';

export class FabMenu extends BasePage {
  private readonly scrollToTopButton: Locator;
  private readonly showCompareButton: Locator;
  private readonly showNotificationsButton: Locator;

  constructor(page: Page) {
    super(page);
    this.scrollToTopButton = this.page.getByRole('button', { name: 'Eiti į viršų' });
    this.showCompareButton = this.page.getByRole('button', { name: 'Rodyti palyginimą' });
    this.showNotificationsButton = this.page.getByRole('button', { name: 'Rodyti pranešimus' });
  }

  async clickScrollToTop() {
    await this.scrollToTopButton.click();
  }

  async clickShowCompare() {
    await this.showCompareButton.click();
  }

  async clickShowNotifications() {
    await this.showNotificationsButton.click();
  }
}