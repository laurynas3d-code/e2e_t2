import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../base-page';
import { HealthPage } from '../components/health-page';
import { testData } from '../../data/test-data';

export class HomePage extends BasePage {
  private readonly planaiButton: Locator;
  private readonly searchButton: Locator;
  private readonly searchInput: Locator;
  private readonly cartButton: Locator;
  private readonly monthStarsHeading: Locator;


  constructor(page: Page) {
    super(page);

    this.planaiButton = this.page.getByRole('button', { name: 'Planai', exact: true })
    this.searchButton = this.page.getByRole('button', { name: 'Atidaryti paiešką' })
    this.searchInput = this.page.getByPlaceholder('Paieška')
    this.cartButton = this.page.getByRole('button', { name: 'Atidaryti krepšelį' })
    this.monthStarsHeading = this.page.getByRole('heading', {
      name: 'Mėnesio žvaigždės',
      exact: true,
    })
  }

  async dismissCookieBanner() {
    await super.dismissCookieBanner();
  }

  async expectHeaderNavigationToBeVisible() {
    await expect(
      this.planaiButton,
    ).toBeVisible()
  }

  async openSearch() {
    const openSearchButton = this.searchButton;
    await expect(openSearchButton).toBeVisible();
    await openSearchButton.click();
  }

  async expectSearchInputToBeVisible() {
    await expect(this.searchInput).toBeVisible()

  }

  async expectCartToBeVisible() {
    await expect(
      this.cartButton,
    ).toBeVisible()
  }

  async expectMainContentToBeVisible() {
    await expect(
      this.monthStarsHeading,
    ).toBeVisible()
  }

  async expectHomepageElementsToBeVisible() {
    await this.expectHeaderNavigationToBeVisible();
    await this.openSearch();
    await this.expectSearchInputToBeVisible();
    await this.expectCartToBeVisible();
    await this.expectMainContentToBeVisible();
  }
}