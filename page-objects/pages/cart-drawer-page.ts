import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../base-page';
import { CartPage } from './cart-page';

export class CartDrawerPage extends BasePage {
  private readonly cartDrawer: Locator;
  private readonly cartItem: Locator;
  private readonly buyButton: Locator;
  private readonly emptyCartMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.cartDrawer = this.page.locator('[class*="Drawer_drawerContainer"]');
    // The cart item is identified by the "Remove Item" button, which is a child of the cart drawer
    this.cartItem = this.cartDrawer.getByRole('button', { name: /Pašalinti prekę/i });
    this.buyButton = this.cartDrawer.getByRole('button', { name: 'Pirkti' });
    this.emptyCartMessage = this.cartDrawer.getByRole('heading', { name: /Krepšelis tuščias/i });
  }

  async expectDrawerVisible() {
    await expect(this.cartDrawer).toBeVisible();
  }

  async expectAtLeastOneItemInCart() {
    await expect(this.cartItem.first()).toBeVisible();
  }

  async getItemCount() {
    return await this.cartItem.count();
  }

  async goToCartPage(): Promise<CartPage> {
    await this.buyButton.click();
    return new CartPage(this.page); // new cart page object
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