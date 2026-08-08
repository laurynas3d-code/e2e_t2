import { test, expect } from '@playwright/test'
import { dismissCookieBanner } from './helpers/layout'

/**
 * AUTH / LOGIN DRAWER (Medium value)
 *
 * Smoke test that login drawer opens. Does NOT test actual login (OAuth, external redirect).
 * When guest clicks account menu, LoginSubmenu shows "Sveiki sugrįžę!" and "Prisijungti".
 */
test.describe('Auth drawer', () => {
  test('it should open login drawer when clicking account menu', async ({ page }) => {
    await page.goto('/privatiems')

    await dismissCookieBanner(page)

    // Click account menu - "Paskyros meniu" (guest sees login submenu)
    await page.getByLabel('Paskyros meniu').first().click()

    // LoginSubmenu drawer: "Sveiki sugrįžę!" heading and "Prisijungti" button
    await expect(page.getByRole('heading', { name: 'Sveiki sugrįžę!' })).toBeVisible({ timeout: 5000 })
    await expect(page.getByRole('button', { name: 'Prisijungti' })).toBeVisible()
  })
})
