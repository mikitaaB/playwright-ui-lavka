import { Locator } from '@playwright/test';

export class ProductCard {
    constructor(private readonly card: Locator) { }

    async addToCart() {
        await this.card.locator('.product-card__buy i.icon').click();
    }
}
