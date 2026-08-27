import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../base-page';
import { HealthPage } from '../components/health-page';
import { testData } from '../../data/test-data';
import { ProductPage } from './product-page';

type CategorySlug = (typeof testData.categorySlugs)[keyof typeof testData.categorySlugs];


export class CategoryPage extends BasePage {
  private healthChecker: HealthPage;
  private readonly categorySlug: CategorySlug;
  private readonly categoryHeading: string;
  private readonly categoryProduct: Locator;
  private readonly categorySearchInput: Locator;
  private readonly suggestionsHeader: Locator;
  private readonly suggestionCards: Locator;

  constructor(page: Page, categorySlug: CategorySlug = testData.categorySlugs.mobilePhones) {
    super(page);
    this.healthChecker = new HealthPage(page);
    this.categorySlug = categorySlug;
    this.categoryHeading = testData.categoryNames[this.categorySlug];
    this.categoryProduct = this.page.locator('.productPhoto');
    this.categorySearchInput = this.page.locator('input.search-input').getByPlaceholder('Paieška');
    this.suggestionsHeader = this.page.getByRole('heading', { name: 'Siūlomos paieškos', level: 4 });
    this.suggestionCards = this.page.locator('a[class*="CategorySearchSuggestion_link"]');
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
    ).toBeVisible();
  }

  async expectAtLeastOneProductVisible() {
    await expect(
      this.categoryProduct
        .first()
    ).toBeVisible();
  }

  async getProductCount() {
    return await this.categoryProduct.count();
  }

  async openFirstProduct(): Promise<ProductPage> {
    await this.categoryProduct.first().click();
    await this.page.waitForLoadState('domcontentloaded');
    return new ProductPage(this.page);
  }

  async typeInCategorySearch(query: string) {
    await this.categorySearchInput.fill(query);
  }

  async expectSuggestionsToBeVisible() {
    await expect(this.suggestionsHeader).toBeVisible();
  }

  async expectSuggestionsCountToBeGreaterThanZero() {
    const cardsCount = await this.suggestionCards.count();
    expect(cardsCount).toBeGreaterThan(0);
  }
}
