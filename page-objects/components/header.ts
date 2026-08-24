import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../base-page';
export class Header extends BasePage {
  private readonly topMenuLinks: Locator[];
  private readonly mainMenuLinks: Locator[];
  private readonly phonesPageHeading: Locator;

  constructor(page: Page) {
    super(page);

    this.topMenuLinks = [
      page.getByRole('link', { name: 'Privatiems' }).first(),
      page.getByRole('link', { name: 'Verslui' }).first(),
      page.getByRole('link', { name: 'Pildyk' }).first(),
      page.getByRole('link', { name: 'Ekspertų patarimai' }).first(),
      page.getByRole('link', { name: 'Smart Master' }).first(),
      page.getByRole('link', { name: 'Pagalba' }).first(),
      page.getByRole('link', { name: 'Salonai' }).first()
    ];
    this.mainMenuLinks = [
      page.getByRole('button', { name: 'E-parduotuvė' }).first(),
      page.getByRole('button', { name: 'Planai' }).first(),
      page.getByRole('button', { name: 'Internetas' }).first(),
      page.getByRole('button', { name: 'Paslaugos' }).first(),
      page.getByRole('button', { name: 'Akcijos' }).first()
    ];
    this.phonesPageHeading = page.getByRole('heading', { name: 'Mobilieji telefonai' }).first();
  }

  async open() {
    await super.open();
  }

  async expectTopMenuToBeVisible() {
    for (const link of this.topMenuLinks) {
      // Check if the link is visible
      await expect(link).toBeVisible();
      // Check if the link is enabled
      await expect(link).toBeEnabled();
    }
  }

  async expectMainMenuToBeVisible() {
    for (const link of this.mainMenuLinks) {
      // Check if the link is visible
      await expect(link).toBeVisible();
      // Check if the link is enabled
      await expect(link).toBeEnabled();
    }
  }

  async navigateToMainMenuLink() {
    // Click the first link in the main menu
    const firstMenuLink = this.mainMenuLinks[0];
    await expect(firstMenuLink).toBeVisible();
    await firstMenuLink.click();

    // Hover over the "Telefonai" button in the main menu
    const telefonaiButton = this.page.getByRole('button', { name: 'Telefonai', exact: true });
    await expect(telefonaiButton).toBeVisible();
    await telefonaiButton.hover();

    const allPhonesLink = this.page.getByRole('link', { name: 'Visi telefonai', exact: true }).first();

    // Catch the case where the submenu link is not found or not visible after hovering
    if (!(await allPhonesLink.isVisible())) {
      throw new Error('Submenu link "Visi telefonai" not found or not visible after hovering on "Telefonai" button.');
    }

    await allPhonesLink.click();
    // Check if the URL contains "mobilieji-telefonai" and the heading is visible
    await this.page.waitForURL(/.*\/mobilieji-telefonai.*/);
    await expect(this.phonesPageHeading).toBeVisible();
  }
}