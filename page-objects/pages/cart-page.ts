import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../base-page';

export class CartPage extends BasePage {
  private readonly cartItems: Locator;
  private readonly cartTable: Locator;

  constructor(page: Page) {
    super(page);
    this.cartTable = this.page.locator('[class*="Cart_cartTable"]');
    this.cartItems = this.cartTable.locator('[class*="CartItem_cartItem"]');
  }

  async expectAtLeastOneItemToBeVisible() {
    await expect(this.cartItems.first()).toBeVisible();
  }

  async getItemCount() {
    return await this.cartItems.count();
  }
}