import { expect, type Page, type Locator } from '@playwright/test';
import { BasePage } from '../base-page';

export class SearchResultsPage extends BasePage {
  private readonly searchResults: Locator;
  private readonly noResultsMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.searchResults = page.locator('div[class*="ProductsGridItem_productCard"]');
    this.noResultsMessage = page.getByRole('heading', { name: /atsiprašome|nepavyko rasti/i, level: 1 });
  }

  async performSuccessfulSearch(query: string) {
    await this.page.waitForURL(new RegExp(`.*paieška.*q=${query}.*`, 'i'));
    await expect(this.searchResults.first()).toBeVisible();
    const resultsCount = await this.searchResults.count();
    expect(resultsCount).toBeGreaterThan(0);
  }

  async performUnsuccessfulSearch(query: string) {
    await this.page.waitForURL(new RegExp(`.*paieška.*q=${query}.*`, 'i'));
    await expect(this.searchResults.first()).not.toBeVisible();
    await expect(this.noResultsMessage).toBeVisible();
  }
}