import { test, expect } from '@playwright/test'
import { dismissCookieBanner } from './helpers/layout'

/**
 * CATEGORY PAGE LOAD (High value, low effort)
 *
 * Smoke test that category/PLP page renders. Catches catalog, SSR, url-resolver regressions.
 */
test.describe('Category page', () => {
  test('it should load category page and show heading', async ({ page }) => {
    await page.goto('/privatiems/mobilieji-telefonai')

    await dismissCookieBanner(page)

    await expect(page.getByRole('heading', { name: 'Mobilieji telefonai' })).toBeVisible({ timeout: 15000 })
  })

  test('it should load verslui category page', async ({ page }) => {
    await page.goto('/verslui/mobilus-telefonai')

    await dismissCookieBanner(page)

    await expect(page.getByRole('heading', { name: 'Mobilus telefonai' })).toBeVisible({ timeout: 15000 })
  })
})
