import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../base-page';
import { testData } from '../../data/test-data';

export class VoicePlansPage extends BasePage {
  private readonly planButton: Locator;
  private readonly drawer: Locator;
  private readonly heading: Locator;
  private readonly term: Locator;
  private readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.planButton = page.getByRole('button', {
      name: 'Plačiau',
      exact: true,
    }).first();
    this.drawer = page.locator('[role="dialog"]');
    this.heading = this.drawer.locator('h4').first();
    this.term = this.drawer.locator('input[name="priceplan"]').first();
    this.continueButton = this.drawer.getByRole('button', { name: 'Tęsti' });
  }

  async open() {
    await super.open(`${testData.urls.private_store}${testData.urls.plans}`);
  }

  async expectPlanButtonToBeVisible() {
    await expect(this.planButton).toBeVisible();
  }

  async clickPlanButton() {
    await this.planButton.click();
  }

  async expectPlanDrawerToBeReady() {
    await expect(this.drawer).toBeVisible();
    await expect(this.heading).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.term).toBeVisible();
    await expect(this.term).toBeChecked();
  }
}