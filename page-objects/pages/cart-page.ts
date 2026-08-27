import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../base-page';

export class CartPage extends BasePage {
  private readonly cartItems: Locator;
  private readonly cartTable: Locator;
  //private readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartTable = this.page.locator('[class*="Cart_cartTable"]');
    this.cartItems = this.cartTable.locator('[class*="CartItem_cartItem"]');
    //this.checkoutButton = this.page.getByRole('button', { name: /Pirkti/i });
  }

  async expectAtLeastOneItemVisible() {
    await expect(this.cartItems.first()).toBeVisible();
  }

  async getItemCount() {
    return await this.cartItems.count();
  }

  // async gotoCheckout(): Promise<CheckoutPage> {
  //   await this.checkoutButton.click();
  //   return new CheckoutPage(this.page);
  // }
}