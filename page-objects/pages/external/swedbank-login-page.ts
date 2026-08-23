import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../../base-page';
import { testData } from '../../../data/test-data';

export class SwedbankLoginPage extends BasePage {
  private readonly swedbankPageUrl: string = testData.urls.bank.swedbankLoginPage;
  private readonly swedbankProfilePageUrl: string = testData.urls.bank.swedbankProfilePage;
  private readonly swedbankConsentPageUrl: string = testData.urls.bank.swedbankConsentPage;
  private readonly swedbankPaymentConfirmationPageUrl: string = testData.urls.bank.swedbankPaymentConfirmationPage;
  private readonly dropdownControl: Locator;
  private readonly nativeSelect: Locator;
  private readonly enterButton: Locator;
  private readonly customerSelect: Locator;
  private readonly submitCustomerButton: Locator;
  private readonly allowingAccessTitle: Locator;
  private readonly confirmConsentButton: Locator;
  private readonly confirmationTitle: Locator;
  private readonly signButton: Locator;

  constructor(page: Page) {
    super(page);

    this.dropdownControl = page.locator('button.ui-dropdown__control');
    this.nativeSelect = page.locator('select.ui-dropdown__select');
    this.enterButton = page.getByRole('button', { name: 'Enter', exact: true });
    this.customerSelect = page.locator('#form-customers-regnumber');
    this.submitCustomerButton = page.locator('ui-form[name="customersForm"]').getByTestId('approveButton');
    this.allowingAccessTitle = page.getByRole('heading', { name: 'Allowing access' });
    this.confirmConsentButton = page.locator('ui-buttonbar#buttons').getByTestId('approveButton');
    this.confirmationTitle = page.getByRole('heading', { name: 'Payment confirmation' });
    this.signButton = page.getByRole('button', { name: /Sign with mobile-id PIN2/i });
  }

  //WAIT FOR BANK PAGES
  async waitForBankPage() {
    await this.page.waitForURL(this.swedbankPageUrl);
  }

  async waitForProfilePage() {
    await this.page.waitForURL(this.swedbankProfilePageUrl);
  }

  async waitForConsentPage() {
    await this.page.waitForURL(this.swedbankConsentPageUrl);
  }

  async waitForPaymentConfirmationPage() {
    await this.page.waitForURL(this.swedbankPaymentConfirmationPageUrl);
  }

  //SMART ID STEPS
  async expectDropdownControlToBeVisible() {
    await expect(this.dropdownControl).toBeVisible();
  }

  async dropdownControlClick() {
    await this.dropdownControl.click();
  }

  async selectSmartIdUser() {
    await this.nativeSelect.selectOption('111111');
  }

  async expectNativeSelected() {
    await expect(this.nativeSelect).toHaveValue('111111');
  }

  async clickEnterButton() {
    await this.enterButton.click();
  }

  // CUSTOMER SELECT STEPS
  async expectCustomerSelectToBeVisible() {
    await expect(this.customerSelect).toBeVisible();
  }

  async selectMyselfCustomer() {
    await this.customerSelect.selectOption('123123123123');
  }

  async expectSubmitCustomerButtonToBeVisible() {
    await expect(this.submitCustomerButton).toBeVisible();
  }

  async submitCustomerButtonClick() {
    await this.submitCustomerButton.click();
  }

  // ALLOWING ACCESS STEPS
  async expectAllowingAccessTitleToBeVisible() {
    await expect(this.allowingAccessTitle).toBeVisible();
  }

  async expectConfirmConsentButtonToBeVisible() {
    await expect(this.confirmConsentButton).toBeVisible();
  }

  async confirmConsentButtonClick() {
    await this.confirmConsentButton.click();
  }

  // PAYMENT CONFIRMATION STEPS
  async expectPaymentConfirmationTitleToBeVisible() {
    await expect(this.confirmationTitle).toBeVisible();
  }

  async expectConfirmationAmountToMatch(expectedAmount: string) {
    const formattedAmount = expectedAmount.replace(',', '.');

    const amountField = this.page.locator('ui-field', { hasText: 'Amount' });
    await expect(amountField).toContainText(formattedAmount);
  }

  async clickSignWithMobileIdButton() {
    await expect(this.signButton).toBeEnabled();
    await this.signButton.click();
  }
}