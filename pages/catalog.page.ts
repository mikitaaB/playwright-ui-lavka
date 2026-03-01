import { Page, Locator } from '@playwright/test';
import { ProductCard } from '../components/product-card.component';
import { BasePage } from './base.page';

export class CatalogPage extends BasePage {
    readonly productsContainer: Locator;
    readonly categoryFilter: Locator;

    constructor(page: Page) {
        super(page);
        this.productsContainer = page.locator('.catalog__products');
        this.categoryFilter = page.locator('.catalog__content li.your-choice__item');
    }

    async waitForProducts() {
        await this.productsContainer.waitFor({ state: 'visible' });
    }

    async getFirstProductCard(): Promise<ProductCard> {
        const first = this.productsContainer.locator('.product-card').first();
        return new ProductCard(first);
    }

    async verifyCategoryFilter(text: string) {
        await this.categoryFilter.filter({ hasText: text }).waitFor({ state: 'visible' });
    }
}
