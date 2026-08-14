# E2E tests

This project contains Playwright end-to-end tests for the Tele2 e-shop.

## Setup

1. Install dependencies:
   npm install

2. Run tests:
   npx playwright test

3. Run specific test:
   npx playwright test e2e/tests/cart/add-to-cart.spec.ts

## Environments

- UAT: https://uat.tele2.lt
- TEST: https://test.tele2.lt

Set ENV_URL for custom target:
ENV_URL=https://uat.tele2.lt npx playwright test