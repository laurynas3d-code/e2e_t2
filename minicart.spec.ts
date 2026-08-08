import { test, expect } from '@playwright/test'
import { dismissCookieBanner } from './helpers/layout'

test('it should be able to toggle minicart', async ({ page }) => {
  await page.goto('/privatiems')

  await dismissCookieBanner(page)

  await page.getByLabel('Atidaryti krepšelį').first().click()

  await expect(page.getByText('Jūsų krepšelis tuščias')).toBeVisible()

  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await dialog.getByRole('button', { name: 'Uždaryti' }).filter({ hasText: 'Uždaryti' }).click()

  await expect(page.getByLabel('Atidaryti krepšelį').first()).toBeVisible()
  await expect(page.locator('html')).not.toHaveClass('cart-active')
  await expect(page.getByText('Jūsų krepšelis tuščias')).not.toBeVisible()
})
