import { test, expect } from '@playwright/test'
import { dismissCookieBanner } from './helpers/layout'

/**
 * ADD TO CART → CART DRAWER (HIGH priority)
 *
 * Tests the core conversion flow: add product to cart, cart drawer shows item.
 *
 * INSTRUCTIONS:
 * 1. Navigate to a category page, e.g. /privatiems/mobilieji-telefonai
 * 2. Click the first product in the grid (or use a known SKU link if UAT has stable products)
 * 3. On product page: click "Pridėti į krepšelį" button
 *    - Product config may require options (color, plan, etc.) - pick first available if needed
 *    - Wait for add to complete (loader/button state)
 * 4. Cart drawer should auto-open (via ?section=cart query) or click "Atidaryti krepšelį"
 * 5. Assert: drawer visible, at least one item in cart (not "Jūsų krepšelis tuščias")
 *
 * NOTES:
 * - UAT product availability may vary; consider using a fixture or known-in-stock SKU
 * - Products with required options may open ProductSummaryDrawer before add - handle that flow
 * - If too flaky on UAT, consider running this only on staging/mocked environment
 */
test.describe('Add to cart flow', () => {
  test('it should add product to cart and show item in cart drawer', async ({ page }) => {
    // 1. Navigate to category page (Phones)
    await page.goto('/privatiems/mobilieji-telefonai')
    await dismissCookieBanner(page)

    // 2. Select first product in grid and go to details
    const firstProduct = page.locator('.productPhoto').first()
    await firstProduct.click()

    // 3. On product page, click "Pridėti į krepšelį"
    // Note: Some products might require plan selection first, 
    // but usually "Pridėti į krepšelį" for simple products works directly.
    const addToCartButton = page.getByRole('button', { name: 'Pridėti į krepšelį' })
    await expect(addToCartButton).toBeVisible()
    await addToCartButton.click()

    // 4. Verification: Check if cart drawer contains items
    // Using a more generic approach if it doesn't auto-open
    const cartButton = page.locator('button[aria-label="Krepšelis"], .cart-button, a[href*="checkout"]').first()
    if (await cartButton.isVisible()) {
      await cartButton.click()
    }

    // Assert that the cart is not empty
    await expect(page.getByText('Jūsų krepšelis tuščias')).not.toBeVisible()
    await expect(page.locator('.cart-item, [class*="cartItem"]')).toBeVisible()
  })
})
