import { expect, type Page, type Locator } from '@playwright/test';
import { BasePage } from '../base-page';
import { SearchResultsPage } from '../pages/search-results-page';

export class SearchComponent extends BasePage {
  private readonly searchButton: Locator;
  private readonly searchInput: Locator;
  private readonly searchCloseButton: Locator;

  constructor(page: Page) {
    super(page);

    this.searchButton = page.getByRole('button', { name: 'Atidaryti paiešką', exact: true });
    this.searchInput = page.locator('input.search-input').getByPlaceholder('Paieška');
    this.searchCloseButton = page.getByRole('button', { name: 'Uždaryti paiešką', exact: true });
  }

  async open() {
    await super.open();
  }

  async openSearch() {
    await this.searchButton.click();
    await expect(this.searchInput).toBeVisible();
  }

  async closeSearch() {
    await this.searchCloseButton.click();
    await expect(this.searchButton).toBeVisible();
    await expect(this.page.locator('html')).not.toHaveClass('search-active');
    await expect(this.searchInput).toHaveAttribute('tabindex', '-1');
  }

  async performSearchInput(query: string) {
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
    return new SearchResultsPage(this.page);
  }
}