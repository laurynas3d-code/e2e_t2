import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../base-page';

export class CartDrawerPage extends BasePage {
  private readonly cartDrawer: Locator;
  private readonly cartItem: Locator;
  private readonly emptyCartMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.cartDrawer = this.page.locator('[class*="CartDrawer_container"]');
    // The cart item is identified by the "Remove Item" button, which is a child of the cart drawer
    this.cartItem = this.cartDrawer.getByRole('button', { name: /Pašalinti prekę/i });
    this.emptyCartMessage = this.cartDrawer.getByRole('heading', { name: /Krepšelis tuščias/i });
  }

  async expectAtLeastOneItemInCart() {
    await expect(this.cartItem.first()).toBeVisible();
  }

  async getItemCount() {
    return await this.cartItem.count();
  }

  async goToCartPage() {
    await this.cartDrawer.getByRole('link', { name: 'Peržiūrėti krepšelį' }).click();
  }

  async removeItem() {
    await this.cartItem.first().click();
  }

  async removeAllItems() {
    while (await this.getItemCount() > 0) {
      const itemCount = await this.getItemCount();
      await this.removeItem();
      await expect(this.cartItem).toHaveCount(itemCount - 1);
    }
  }

  async expectCartEmpty() {
    await expect(this.cartItem).toHaveCount(0);
    await expect(this.emptyCartMessage).toBeVisible();
  }

  async closeDrawer() {
    await this.cartDrawer.getByRole('button', { name: 'Uždaryti' }).click();
  }

  async expectDrawerClosed() {
    await expect(this.cartDrawer).not.toBeVisible();
  }
}