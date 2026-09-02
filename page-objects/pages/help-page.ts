import { expect, type Page, type Locator } from '@playwright/test';
import { BasePage } from '../base-page';

export class HelpPage extends BasePage {
  private readonly helpPageHeading: Locator;
  private readonly accordionButton: Locator;

  constructor(page: Page) {
    super(page);
    this.helpPageHeading = this.page.getByRole('heading', {
      name: 'Pagalba', level: 1
    });
    this.accordionButton = this.page.getByRole('button', {
      name: 'Įtari sukčiavimą? Pranešk!'
    });
  }

  async expectHelpPageReady() {
    await expect(this.helpPageHeading).toBeVisible();
    await expect(this.accordionButton).toBeVisible();
  }
}