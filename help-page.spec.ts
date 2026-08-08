import { test, expect } from '@playwright/test'
import { dismissCookieBanner } from './helpers/layout'

/**
 * HELP PAGE (Medium value, low effort)
 *
 * Smoke test that help/support page loads. Critical for support and legal access.
 */
test.describe('Help page', () => {
  test('it should load help page', async ({ page }) => {
    await page.goto('/pagalba')

    await dismissCookieBanner(page)

    // Help page has search input with placeholder "Paieška"
    await expect(page.getByPlaceholder('Paieška')).toBeVisible({ timeout: 15000 })
  })
})
