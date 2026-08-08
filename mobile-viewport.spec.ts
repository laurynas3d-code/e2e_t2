import { test, expect } from '@playwright/test'
import { dismissCookieBanner } from './helpers/layout'

/**
 * MOBILE VIEWPORT (Low effort, catches mobile-specific breakage)
 *
 * Runs key flows in mobile viewport. E-commerce is heavily mobile.
 * Add viewport to more tests via test.use() or project config if needed.
 */
test.describe('Mobile viewport', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('it should load page and show key UI on mobile', async ({ page }) => {
    await page.goto('/privatiems')

    await dismissCookieBanner(page)

    await expect(page.getByLabel('Meniu')).toBeVisible()
    await expect(page.getByLabel('Atidaryti krepšelį')).toBeVisible()
  })

  test('it should open cart drawer on mobile', async ({ page }) => {
    await page.goto('/privatiems')

    await dismissCookieBanner(page)

    await page.getByLabel('Atidaryti krepšelį').first().click()
    await expect(page.getByText(/Jūsų krepšelis tuščias|krepšelis/)).toBeVisible({ timeout: 5000 })
  })
})
