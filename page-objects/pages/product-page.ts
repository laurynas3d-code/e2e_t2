import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../base-page';
import { CartDrawerPage } from './cart-drawer-page';

export class ProductPage extends BasePage {
  private readonly productTitle: Locator;
  private readonly productBreadcrumbs: Locator;
  private readonly planDropdown: Locator;
  private readonly addToCartButton: Locator;
  private readonly payNowOption: Locator;

  constructor(page: Page) {
    super(page);
    this.productTitle = this.page.getByRole('heading', { level: 1 });
    this.productBreadcrumbs = this.page.locator('[class*="ProductBreadcrumbs_container"] a')
    this.planDropdown = this.page
      .locator('[class*="ProductOptionDropdownSelect_container"]')
      .getByRole('button', { expanded: false });
    this.payNowOption = this.page.getByRole('radio', {
      name: /Mokant iš karto/i,
    });
    this.addToCartButton = this.page
      .locator('[class*="ProductSummary_container"]')
      .getByRole('button', { name: /Pridėti į krepšelį/i });
  }

  async expectProductTitleVisible() {
    await expect(this.productTitle).toBeVisible({ timeout: 15000 });
    const text = await this.productTitle.textContent();
    expect(text?.trim().length).toBeGreaterThan(0);
  }

  async expectBreadcrumbsVisible() {
    await expect(this.productBreadcrumbs.first()).toBeVisible();
  }

  async expectPlanDropdownVisible() {
    await expect(this.planDropdown).toBeVisible();
  }

  async expectAddToCartButtonVisible() {
    // Wait for the button to be visible, as it may take some time to load
    await expect(this.addToCartButton).toBeVisible({ timeout: 15000 });
  }

  async selectPayNow() {
    await this.payNowOption.check();
    await expect(this.payNowOption).toBeChecked();
  }

  async addToCart(): Promise<CartDrawerPage> {
    await this.addToCartButton.click();
    return new CartDrawerPage(this.page); // new cart page object
  }
}