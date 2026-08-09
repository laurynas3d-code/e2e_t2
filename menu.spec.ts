import { test, expect } from '@playwright/test'
import { dismissCookieBanner } from './helpers/layout'

test('@menu-top it should show top menu', async ({ page }) => {
  await page.goto('/privatiems')

  await expect(page.getByRole('link', { name: 'Privatiems' }).first()).toBeVisible()
  await expect(page.getByRole('link', { name: 'Verslui' }).first()).toBeVisible()
  await expect(page.getByRole('link', { name: 'Pildyk' }).first()).toBeVisible()
  await expect(page.getByRole('link', { name: 'Ekspertų patarimai' }).first()).toBeVisible()
  await expect(page.getByRole('link', { name: 'Smart Master' }).first()).toBeVisible()
  await expect(page.getByRole('link', { name: 'Pagalba' }).first()).toBeVisible()
  await expect(page.getByRole('link', { name: 'Salonai' }).first()).toBeVisible()
})

test('@menu-main it should show main menu', async ({ page }) => {
  await page.goto('/privatiems')

  await expect(page.getByRole('button', { name: 'E-parduotuvė' }).first()).toBeVisible()
  await expect(page.getByRole('button', { name: 'Planai' }).first()).toBeVisible()
  await expect(page.getByRole('button', { name: 'Internetas' }).first()).toBeVisible()
  await expect(page.getByRole('button', { name: 'Paslaugos' }).first()).toBeVisible()
  await expect(page.getByRole('button', { name: 'Akcijos' }).first()).toBeVisible()
})

test('@menu-navigate it should be able to navigate with main menu links', async ({ page }) => {
  await page.goto('/privatiems')

  await dismissCookieBanner(page)

  await page.getByRole('button', { name: 'E-parduotuvė' }).first().click()

  await page.getByRole('button', { name: 'Telefonai' }).first().hover()

  await page.getByRole('link', { name: 'Visi telefonai' }).first().click()

  await page.waitForURL('**/privatiems/mobilieji-telefonai**')

  await expect(page.getByRole('heading', { name: 'Mobilieji telefonai' })).toBeVisible()
})
