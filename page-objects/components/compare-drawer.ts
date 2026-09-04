import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../base-page';
import { ComparePage } from '../pages/compare-page';

export class CompareDrawer extends BasePage {
  private readonly drawer: Locator;
  private readonly compareButton: Locator;
  private readonly removeButton: Locator;
  private readonly closeButton: Locator;
  private readonly products: Locator;

  constructor(page: Page) {
    super(page);
    this.drawer = page.locator('[class*="ProductsCompareDrawer_content"]');
    this.compareButton = this.drawer.getByRole('link', { name: 'Palyginti', exact: true });
    this.removeButton = this.drawer.getByRole('button', { name: 'Pašalinti viską' });
    this.closeButton = this.drawer.getByRole('button', { name: 'Uždaryti' });
    this.products = this.drawer.locator('[class*="CompareCard_cardContainer"]');
  }

  async expectDrawerToBeVisible() {
    await expect(this.drawer).toBeVisible();
  }

  async expectDrawerToBeHidden() {
    await expect(this.drawer).toBeHidden();
  }

  async clickCompare(): Promise<ComparePage> {
    await this.compareButton.click();
    return new ComparePage(this.page);
  }

  async clickRemove() {
    await this.removeButton.click();
    await expect(this.drawer).toBeHidden();
  }

  async clickClose() {
    await this.closeButton.click();
    await expect(this.drawer).toBeHidden();
  }

  async expectProductsCount(count: number = 0) {
    await expect(this.products).toHaveCount(count);
  }
}