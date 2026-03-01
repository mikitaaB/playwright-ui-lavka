import { test as base } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { CatalogPage } from '../pages/catalog.page';
import { CartPage } from '../pages/cart.page';

export const test = base.extend<{
    homePage: HomePage;
    catalogPage: CatalogPage;
    cartPage: CartPage;
}>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
    catalogPage: async ({ page }, use) => {
        const catalogPage = new CatalogPage(page);
        await use(catalogPage);
    },
    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },
});

export { expect } from '@playwright/test';
