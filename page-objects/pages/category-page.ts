import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../base-page';
import { HealthPage } from '../components/health-page';
import { testData } from '../../data/test-data';

type CategorySlug = (typeof testData.categorySlugs)[keyof typeof testData.categorySlugs];


export class CategoryPage extends BasePage {
  private healthChecker: HealthPage;

  private readonly categorySlug: CategorySlug;
  private readonly categoryHeading: string;
  private readonly categoryProduct: Locator;

  constructor(page: Page, categorySlug: CategorySlug = testData.categorySlugs.mobilePhones) {
    super(page);
    this.healthChecker = new HealthPage(page);

    this.categorySlug = categorySlug;
    this.categoryHeading = testData.categoryNames[this.categorySlug];
    this.categoryProduct = this.page.locator('.productPhoto');
  }

  async open() {
    await this.page.goto(`${testData.urls.private_store}/${this.categorySlug}`);
  }

  async checkPageHealth() {
    await this.healthChecker.checkPageHealth(testData.urls.category);
  }

  async dismissCookieBanner() {
    await super.dismissCookieBanner();
  }

  async expectCategoryHeadingVisible() {
    await expect(
      this.page.getByRole('heading', { level: 1, name: this.categoryHeading, exact: true }),
    ).toBeVisible({ timeout: 15000 });
  }

  async expectAtLeastOneProductVisible() {
    await expect(
      this.categoryProduct,
    ).toBeVisible();
  }

  async getProductCount() {
    return await this.categoryProduct.count();
  }
}
