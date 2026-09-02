import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../base-page';

export class MiniCart extends BasePage {
  private readonly miniCartClose: Locator;

  constructor(page: Page) {
    super(page);
    // Initialize the miniCartClose locator to find the 'Uždaryti' button within a div.
    // In our situation this is best way to check minicart is open.
    this.miniCartClose = page.locator('div').filter({ has: page.getByRole('button', { name: 'Uždaryti' }) });
  }

  async expectMiniCartToBeOpen() {
    await expect(this.miniCartClose).toBeVisible();
  }

  async closeMiniCart() {
    await this.miniCartClose.click();
  }

  async checkCartStatus() {
    const emptyMessage = this.page.getByText('Jūsų krepšelis tuščias');
    const fullCartHeader = this.page.getByRole('heading', { name: 'Krepšelis', level: 1 });

    // „expect.toPass“ is a custom matcher that will retry the provided function until it passes
    //  or the timeout is reached. This is useful for waiting for asynchronous operations to complete,
    //  such as loading content in a mini cart. In this case, it will keep checking the cart status until
    //  either the empty message or the full cart header becomes visible, or until the timeout is reached.
    await expect(async () => {
      if (await emptyMessage.isVisible()) {
        await expect(this.page.getByRole('button', { name: 'Eiti į katalogą' })).toBeVisible();
        console.log('Cart is empty');
      } else if (await fullCartHeader.isVisible()) {
        await expect(this.page.getByText(/įrenginys|įrenginiai/i).first()).toBeVisible();
        console.log('Cart has items');
      } else {
        throw new Error('Cart content is not loaded yet...');
      }
    }).toPass(); // Use the custom matcher to retry until the cart status is determined or timeout occurs
  }
}