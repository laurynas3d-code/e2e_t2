import { test, expect } from '@playwright/test'
import { dismissCookieBanner } from './helpers/layout'

/**
 * CART PAGE → CHECKOUT ENTRY (HIGH priority)
 *
 * Tests that cart page loads and checkout navigation works.
 *
 * INSTRUCTIONS:
 * 1. Empty cart scenario:
 *    - Go to /privatiems/pirkimas/pirkiniu-krepselis (or verslui equivalent)
 *    - Assert empty state visible ("Jūsų krepšelis tuščias" or similar)
 *    - Checkout button may be hidden or disabled when empty - verify expected behavior
 *
 * 2. With items scenario (optional, depends on add-to-cart fixture):
 *    - Either seed cart via API/add-to-cart flow, or run after add-to-cart test
 *    - Navigate to cart page
 *    - Assert cart summary visible, items listed
 *    - Click "Pirkti" / "Eiti į apmokėjimą" (checkout button - see CartSummary.tsx for exact text)
 *    - Assert redirect to /privatiems/checkout (or verslui/checkout)
 *
 * SELECTORS:
 * - Cart page route: /{store}/pirkimas/pirkiniu-krepselis (store = privatiems | verslui)
 * - Empty cart text: "Jūsų krepšelis tuščias" (or from CartDrawerNoItems / cart empty state)
 * - Checkout button: Check CartSummary.tsx - uses getOrderLead, CART_CHECKOUT_TYPE_REDIRECT etc.
 */
test.describe('Cart page to checkout', () => {
  test('it should show empty cart state when cart is empty', async ({ page }) => {
    await page.goto('/privatiems/pirkimas/pirkiniu-krepselis')

    await dismissCookieBanner(page)

    // Cart page uses Cart component - empty state heading: "Krepšelis tuščias" (Cart.tsx)
    await expect(page.getByRole('heading', { name: /Krepšelis tuščias/i })).toBeVisible({ timeout: 10000 })
  })

  test('it should navigate to checkout when cart has items', async ({ page }) => {
    // 1. Add product to cart first
    await page.goto('/privatiems/mobilieji-telefonai')
    await dismissCookieBanner(page)
    await page.locator('.productPhoto').first().click()
    await page.getByRole('button', { name: 'Pridėti į krepšelį' }).click()

    // 2. Go to cart page (full page)
    await page.goto('/privatiems/pirkimas/pirkiniu-krepselis')

    // 3. Verify item is present
    await expect(page.locator('.cart-item, [class*="cartItem"]')).toBeVisible()

    // 4. Click checkout button (Usually "Pirkti")
    const checkoutButton = page.getByRole('button', { name: /Pirkti|Tęsti/i }).first()
    await checkoutButton.click()

    // 5. Assert navigation to checkout page
    await expect(page).toHaveURL(/.*checkout/)
  })
})
