import { test } from '../../fixtures/app.fixture';
import { testData } from '../../data/test-data';

/**
 * CATEGORY PAGE LOAD
 *
 * Smoke test that category page renders.
 */

test.describe('Category page', () => {
  test(
    '@category-page @smoke category page should load, show heading and has at least one product. Check search suggestions are visible and have at least one suggestion.',
    async ({ categoryPage }) => {
      // For different category pages, need to use CategoryPage class constructor with needed category slug.
      // const categoryPage = new CategoryPage(page, testData.categorySlugs.headphones);
      await categoryPage.open();
      await categoryPage.dismissCookieBanner();
      await categoryPage.expectCategoryHeadingToBeVisible();
      await categoryPage.expectAtLeastOneProductToBeVisible();
      await categoryPage.typeInCategorySearch(testData.search.validTerm);
      await categoryPage.expectSuggestionsHeaderToBeVisible();
      await categoryPage.expectSuggestionsCountToBeGreaterThanZero();
    },
  );
});