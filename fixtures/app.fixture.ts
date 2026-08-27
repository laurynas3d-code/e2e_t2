import { test as base } from '@playwright/test';
import { BasePage } from '../page-objects/base-page';
import { HealthPage } from '../page-objects/components/health-page';
import { HomePage } from '../page-objects/pages/home-page';
import { CategoryPage } from '../page-objects/pages/category-page';
import { ProductPage } from '../page-objects/pages/product-page';
import { CartDrawerPage } from '../page-objects/pages/cart-drawer-page';
import { CartPage } from '../page-objects/pages/cart-page';
import { CheckoutPage } from '../page-objects/pages/checkout-page';
import { SwedbankLoginPage } from '../page-objects/pages/external/swedbank-login-page';
import { Header } from '../page-objects/components/header';
import { NotFoundPage } from '../page-objects/pages/not-found-page';
import { SearchComponent } from '../page-objects/components/search';
import { SearchResultsPage } from "../page-objects/pages/search-results-page";

// Type register
type AppFixtures = {
  basePage: BasePage;
  healthPage: HealthPage;
  homePage: HomePage;
  categoryPage: CategoryPage;
  productPage: ProductPage;
  cartDrawerPage: CartDrawerPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  swedbankLoginPage: SwedbankLoginPage;
  searchComponent: SearchComponent;
  header: Header;
  notFoundPage: NotFoundPage;
  searchResultsPage: SearchResultsPage;
};

// Basic test with the fixture
export const test = base.extend<AppFixtures>({
  basePage: async ({ page }, use) => {
    await use(new BasePage(page)); // Create BasePage class object and give it to test
  },

  healthPage: async ({ page }, use) => {
    await use(new HealthPage(page)); // Create HealthPage class object and give it to test
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page)); // Create HomePage class object and give it to test
  },

  categoryPage: async ({ page }, use) => {
    await use(new CategoryPage(page)); // Create CategoryPage class object and give it to test
  },

  productPage: async ({ page }, use) => {
    await use(new ProductPage(page)); // Create ProductPage class object and give it to test
  },

  cartDrawerPage: async ({ page }, use) => {
    await use(new CartDrawerPage(page)); // Create CartDrawerPage class object and give it to test
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page)); // Create CartPage class object and give it to test
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page)); // Create CheckoutPage class object and give it to test
  },

  swedbankLoginPage: async ({ page }, use) => {
    await use(new SwedbankLoginPage(page)); // Create SwedbankLoginPage class object and give it to test
  },
  header: async ({ page }, use) => {
    await use(new Header(page)); // Create Header class object and give it to test
  },
  notFoundPage: async ({ page }, use) => {
    await use(new NotFoundPage(page)); // Create NotFoundPage class object and give it to test
  },
  searchComponent: async ({ page }, use) => {
    await use(new SearchComponent(page)); // Create SearchComponent class object and give it to test
  },
  searchResultsPage: async ({ page }, use) => {
    await use(new SearchResultsPage(page)); // Create SearchResultsPage class object and give it to test
  },
});

export { expect } from '@playwright/test';