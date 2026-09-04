import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../base-page';

export class ComparePage extends BasePage {
  private readonly comparePageHeading: Locator;
  private readonly products: Locator;

  constructor(page: Page) {
    super(page);
    this.comparePageHeading = page.getByRole('heading', { name: 'Produktų palyginimas', level: 1 });
    this.products = this.page.locator('[class*="ProductsGridItem_productCard"]');// Adjust the selector based on your actual HTML structure
  }

  async expectComparePageHeadingToBeVisible() {
    await expect(this.comparePageHeading).toBeVisible();
  }

  async expectProductsCount(count: number = 0) {
    await expect(this.products).toHaveCount(count);
  }
}