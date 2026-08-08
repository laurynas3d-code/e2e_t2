import { test, expect } from '@playwright/test'
import { dismissCookieBanner } from './helpers/layout'

/**
 * CHECKOUT PAGE LOAD (LOW priority)
 *
 * Smoke test that checkout page loads. Does NOT complete checkout (forms, payment, etc).
 *
 * INSTRUCTIONS:
 * 1. Checkout requires items in cart - either:
 *    a) Run after add-to-cart (shared cart state) - complex, may need test.describe.serial
 *    b) Mock/stub cart API to return items - requires interception
 *    c) Skip when cart empty, or use a fixture that seeds cart via API
 *
 * 2. Navigate to /privatiems/checkout with cart containing items
 * 3. Assert:
 *    - Page loads (no crash, loader eventually disappears)
 *    - Checkout form/summary visible - Checkout component renders Summary, Form, Contacts
 *    - Or redirect to error/crash page if cart invalid
 *
 * NOTES:
 * - Checkout uses CheckoutStructuredQuery - depends on GraphQL backend
 * - Without items, may show loader indefinitely or redirect - document expected behavior
 * - Keep this test minimal - full checkout flow should use staging/mocks
 */
test.describe('Checkout page load', () => {
  test('it should load checkout page when cart has items', async ({ page }) => {
    // 1. Add product to cart
    await page.goto('/privatiems/mobilieji-telefonai')
    await dismissCookieBanner(page)
    await page.locator('.productPhoto').first().click()
    await page.getByRole('button', { name: 'Pridėti į krepšelį' }).click()

    // 2. Navigate to checkout
    await page.goto('/privatiems/checkout')

    // 3. Assert checkout UI visible (Contact information is usually the first step)
    const contactHeader = page.getByRole('heading', { name: /Kontaktinė informacija/i }).first()
    await expect(contactHeader).toBeVisible({ timeout: 15000 })

    // 4. Verify checkout summary is visible
    await expect(page.locator('[class*="summary"], .checkout-summary')).toBeVisible()
  })
})
