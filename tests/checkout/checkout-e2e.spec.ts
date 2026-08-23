import { test } from '../../fixtures/app.fixture';
import { testData } from '../../data/test-data';

/**
 * CHECKOUT PAGE and Payment Flow
 *
 * Smoke test that checkout page and payment flow work.
 * Fully testing all checkout steps
 * 1. TODO WRITE ANNOTATION
 */

test.describe('Checkout page and payment flow', () => {
  test(
    '@checkout-page @smoke checkout page should load and clearly goes through the payment flow until reaching success page',
    async ({ productPage, checkoutPage, swedbankLoginPage }) => {
      // Open product page directly and add it to the cart
      await productPage.openProductDirectly();
      await productPage.addToCart();

      // Open checkout page and verify that it works correctly.
      // Goes through all the steps of the checkout process,
      // including selecting a payment method and confirming the payment.
      await checkoutPage.open();

      // 1 STEPS
      const expectedTotalAmount = await checkoutPage.getCheckoutTotalAmount();
      await checkoutPage.fillCustomerCheckoutDetails(testData.customer);
      await checkoutPage.clickContinueButton();

      // 2 STEPS
      await checkoutPage.expectCourierButtonVisible();
      await checkoutPage.expectCourierButtonChecked();
      // await checkoutPage.expectPickupButtonVisible();
      // await checkoutPage.clickPickupButton();
      // await checkoutPage.expectPickupModalVisible();
      // await checkoutPage.clickPickupModalButton();
      // await checkoutPage.expectPickupButtonChecked();
      // await checkoutPage.clickCourierButton();
      // await checkoutPage.expectCourierModalVisible();
      // await checkoutPage.clickCourierModalButton();
      // await checkoutPage.expectCourierButtonChecked();
      // await checkoutPage.();
      await checkoutPage.clickContinueButton();

      // 3 STEPS
      await checkoutPage.expectSwedbankImageVisible();
      await checkoutPage.clickSwedbankImage();
      await checkoutPage.checkRulesCheckbox();
      await checkoutPage.checkPrivacyCheckbox();
      await checkoutPage.clickBuyButton();

      // SWEDBANK LOGIN PAGE
      await swedbankLoginPage.waitForBankPage();
      await swedbankLoginPage.expectDropdownControlToBeVisible();
      await swedbankLoginPage.dropdownControlClick();
      await swedbankLoginPage.selectSmartIdUser();
      await swedbankLoginPage.expectNativeSelected();
      await swedbankLoginPage.clickEnterButton();

      // SWEDBANK CUSTOMER SELECT PAGE
      await swedbankLoginPage.waitForProfilePage();
      await swedbankLoginPage.expectCustomerSelectToBeVisible();
      await swedbankLoginPage.selectMyselfCustomer();
      await swedbankLoginPage.expectSubmitCustomerButtonToBeVisible();
      await swedbankLoginPage.submitCustomerButtonClick();

      // SWEDBANK ALLOWING ACCESS PAGE
      await swedbankLoginPage.waitForConsentPage();
      await swedbankLoginPage.expectAllowingAccessTitleToBeVisible();
      await swedbankLoginPage.expectConfirmConsentButtonToBeVisible();
      await swedbankLoginPage.confirmConsentButtonClick();

      // SWEDBANK PAYMENT CONFIRMATION PAGE
      await swedbankLoginPage.waitForPaymentConfirmationPage();
      await swedbankLoginPage.expectPaymentConfirmationTitleToBeVisible();
      await swedbankLoginPage.expectConfirmationAmountToMatch(expectedTotalAmount);
      await swedbankLoginPage.clickSignWithMobileIdButton();

      // CHECKOUT SUCCESS PAGE
      await checkoutPage.waitforCheckoutSuccessPage();
      await checkoutPage.expectCheckoutSuccessPageTitleVisible();
    },
  );
});