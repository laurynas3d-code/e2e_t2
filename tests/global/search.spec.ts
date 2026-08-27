import { test, expect } from '../../fixtures/app.fixture';
import { testData } from '../../data/test-data';

/**
 * SEARCH WITH RESULTS (MEDIUM priority)
 *
 * Tests that executing a search returns results.
 *
 * INSTRUCTIONS:
 * 1. Go to homepage, dismiss cookie banner
 * 2. Click "Atidaryti paiešką" (aria-label) to open search
 * 3. Type a search query in the "Paieška" placeholder input
 *    - Use a term that returns results on UAT, e.g. "telefonas", "iPhone", or product name
 *    - Wait for results to load (debounced - may need waitForResponse or waitForSelector)
 * 4. Assert results appear:
 *    - Products tab may show product cards
 *    - Content/Help tabs may show different result types
 *    - Or assert "Rezultatų nėra" / empty state if query is intentionally empty
 *
 * NOTES:
 * - Search is debounced - add appropriate wait (e.g. 500ms-1s) before asserting
 * - UAT content varies - use a generic product term likely to have results
 * - Search page route: /paieska?q=<query> - results may load via client-side fetch
 */
test.describe('Search functionality', () => {
  test.beforeEach(async ({ searchComponent }) => {
    await searchComponent.open();
    await searchComponent.dismissCookieBanner();
  });

  test('@search-header-success @search should display search results for a successful search',
    async ({ searchComponent }) => {
      await searchComponent.openSearch();
      await searchComponent.closeSearch();
      await searchComponent.openSearch();
      const searchResultsPage = await searchComponent.performSearchInput(testData.search.validTerm);
      await searchResultsPage.performSuccessfulSearch(testData.search.validTerm);
    }
  );

  test('@search-header-failure @search should display no results message for an unsuccessful search',
    async ({ searchComponent }) => {
      await searchComponent.openSearch();
      const searchResultsPage = await searchComponent.performSearchInput(testData.search.invalidTerm);
      await searchResultsPage.performUnsuccessfulSearch(testData.search.invalidTerm);
    }
  );
});