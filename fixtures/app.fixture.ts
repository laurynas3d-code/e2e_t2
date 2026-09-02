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
import { MiniCart } from '../page-objects/components/mini-cart';
import { AuthDrawer } from '../page-objects/components/auth-drawer';
import { HelpPage } from '../page-objects/pages/help-page';

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
  miniCart: MiniCart;
  authDrawer: AuthDrawer;
  helpPage: HelpPage;
};

// Basic test with the fixture. Create page objects and provide them to the test
export const test = base.extend<AppFixtures>({
  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },

  healthPage: async ({ page }, use) => {
    await use(new HealthPage(page));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  categoryPage: async ({ page }, use) => {
    await use(new CategoryPage(page));
  },

  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },

  cartDrawerPage: async ({ page }, use) => {
    await use(new CartDrawerPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  swedbankLoginPage: async ({ page }, use) => {
    await use(new SwedbankLoginPage(page));
  },
  header: async ({ page }, use) => {
    await use(new Header(page));
  },
  notFoundPage: async ({ page }, use) => {
    await use(new NotFoundPage(page));
  },
  searchComponent: async ({ page }, use) => {
    await use(new SearchComponent(page));
  },
  searchResultsPage: async ({ page }, use) => {
    await use(new SearchResultsPage(page));
  },
  miniCart: async ({ page }, use) => {
    await use(new MiniCart(page));
  },
  authDrawer: async ({ page }, use) => {
    await use(new AuthDrawer(page));
  },
  helpPage: async ({ page }, use) => {
    await use(new HelpPage(page));
  },
});

export { expect } from '@playwright/test';