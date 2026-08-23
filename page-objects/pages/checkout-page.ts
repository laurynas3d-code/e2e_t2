import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../base-page';
import { testData } from '../../data/test-data';
export class CheckoutPage extends BasePage {
  private readonly checkoutUrl: string;
  private readonly successPageUrl: string;
  private readonly priceElement: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly emailInput: Locator;
  private readonly customerTelephone: Locator;
  private readonly customerAddress: Locator;
  private readonly customerFlat: Locator;
  private readonly continueButton: Locator;
  private readonly courierButton: Locator;
  private readonly courierModalTitle: Locator;
  private readonly courierModalButton: Locator;
  private readonly pickupButton: Locator;
  private readonly pickupModalTitle: Locator;
  private readonly pickupModalButton: Locator;
  private readonly swedbankImage: Locator;
  private readonly rulesCheckbox: Locator;
  private readonly privacyCheckbox: Locator;
  private readonly buyButton: Locator;
  private readonly checkoutSuccessPageTitle: Locator;

  constructor(page: Page) {
    super(page);

    this.checkoutUrl = `${testData.urls.private_store}/checkout`;
    this.successPageUrl = `${this.checkoutUrl}/checkout/success`;
    this.priceElement = this.page
      .locator('div:has-text("Mokate šiandien:")')
      .locator('.font-Tele2Slab')
      .first();
    this.firstNameInput = page.locator('#customer_firstname');
    this.lastNameInput = page.locator('#customer_lastname');
    this.emailInput = page.locator('#customer_email');
    this.customerTelephone = page.locator('#customer_telephone');
    this.customerAddress = page.locator('#full_address');
    this.customerFlat = page.locator('#flat');
    this.continueButton = page.getByRole('button', { name: 'Tęsti' });
    this.courierButton = page.locator('button[value="customshipping_customshipping"]');
    this.courierModalTitle = page.getByText('Pristatymo adresas');
    this.courierModalButton = page.getByRole('button', { name: /Išsaugoti|Pasirinkti|Tęsti/i });
    this.pickupButton = page.locator('button[value="instore_pickup"]');
    this.pickupModalTitle = page.getByText('Pasirinkite saloną');
    this.pickupModalButton = page.getByRole('button', { name: /Išsaugoti|Pasirinkti|Tęsti/i });
    this.swedbankImage = page.getByAltText(/Swedbank/i);
    this.rulesCheckbox = page.getByRole('checkbox', { name: /pirkimo-pardavimo sąlygomis/i });
    this.privacyCheckbox = page.getByRole('checkbox', { name: /klientų privatumo politika/i });
    this.buyButton = page.getByRole('button', { name: /Pirkti|Apmokėti/i });
    this.checkoutSuccessPageTitle = page.getByRole('heading', { name: 'Užsakymas sėkmingas!', level: 1 });
  }

  async open() {
    await this.page.goto(this.checkoutUrl);
  }

  // 1 STEPS

  // Function for getting the total amount from the checkout page. Later it will be used to compare the total amount with the amount in the bank page.
  async getCheckoutTotalAmount(): Promise<string> {
    // Check for price element visibility and get its text content
    await this.priceElement.waitFor({ state: 'visible' });
    const fullPriceText = await this.priceElement.innerText(); // "60 €" OR "2,99 €"

    // Clean the price text to extract only the numeric value, removing any currency symbols or whitespace ("60" OR "2,99")
    const cleanPrice = fullPriceText.replace(/[^\d.,]/g, '').trim();
    return cleanPrice;
  }


  async fillFirstName(firstName: string) {
    await this.firstNameInput.fill(firstName);
  }

  async fillLastName(lastName: string) {
    await this.lastNameInput.fill(lastName);
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillCustomerTelephone(telephone: string) {
    await this.customerTelephone.fill(telephone);
  }

  async fillCustomerAddress(address: string) {
    await this.customerAddress.fill(address);
  }

  async fillCustomerFlat(flat: string) {
    await this.customerFlat.fill(flat);
    // Need to select the first option from the dropdown after filling the address
    const firstOption = this.page.getByRole('option').first();
    await firstOption.waitFor({ state: 'visible' });
    await firstOption.click();
  }

  async fillCustomerCheckoutDetails(customerData: typeof testData.customer) {
    await this.fillFirstName(customerData.firstName);
    await this.fillLastName(customerData.lastName);
    await this.fillEmail(customerData.email);
    await this.fillCustomerTelephone(customerData.customerTelephone);
    await this.fillCustomerAddress(customerData.customerAddress);
    await this.fillCustomerFlat(customerData.customerFlat);
  }

  async clickContinueButton() {
    await expect(this.continueButton).toBeVisible();
    await this.continueButton.click();
  }

  // 2 STEPS
  async expectCourierButtonVisible() {
    await expect(this.courierButton).toBeVisible();
  }

  async expectCourierButtonChecked() {
    await expect(this.courierButton).toBeChecked();
  }

  async clickCourierButton() {
    await this.courierButton.click();
  }

  async expectCourierModalVisible() {
    await expect(this.courierModalTitle).toBeVisible();
  }
  // TODO write courrier change address method

  async clickCourierModalButton() {
    await this.courierModalButton.click();
  }

  async expectPickupButtonVisible() {
    await expect(this.pickupButton).toBeVisible();
  }

  async expectPickupButtonChecked() {
    await expect(this.pickupButton).toBeChecked();
  }

  async clickPickupButton() {
    await this.pickupButton.click();
  }

  async expectPickupModalVisible() {
    await expect(this.pickupModalTitle).toBeVisible();
  }
  // TODO write POS selection method

  async clickPickupModalButton() {
    await this.pickupModalButton.click();
  }

  // 3 STEPS
  async expectSwedbankImageVisible() {
    await expect(this.swedbankImage).toBeVisible();
  }

  async clickSwedbankImage() {
    await this.swedbankImage.click();
  }

  async checkRulesCheckbox() {
    await this.rulesCheckbox.check();
    await expect(this.rulesCheckbox).toBeChecked();
  }

  async checkPrivacyCheckbox() {
    await this.privacyCheckbox.check();
    await expect(this.privacyCheckbox).toBeChecked();
  }

  async clickBuyButton() {
    await expect(this.buyButton).toBeEnabled();
    await this.buyButton.click();
  }

  // CHECKOUT SUCCESS PAGE
  async waitforCheckoutSuccessPage() {
    await this.page.waitForURL(this.successPageUrl);
  }

  async expectCheckoutSuccessPageTitleVisible() {
    await expect(this.checkoutSuccessPageTitle).toBeVisible();
  }
}