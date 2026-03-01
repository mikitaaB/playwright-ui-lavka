import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
    readonly cartCounter: Locator;
    readonly cartItems: Locator;

    constructor(page: Page) {
        super(page);
        this.cartCounter = page.locator('div.cart .cart__title--counter');
        this.cartItems = page.locator('.cart-list__items .cart-item');
    }

    async waitForCartLoad() {
        await this.cartItems.first().waitFor({ state: 'visible' });
    }

    getCartItem(index: number) {
        return new CartItemComponent(this.cartItems.nth(index));
    }
}

class CartItemComponent {
    constructor(private readonly item: Locator) { }

    async getProductName(): Promise<string> {
        return await this.item.locator('.cart-item__text').nth(1).innerText();
    }

    async getSize(): Promise<string> {
        return await this.item.locator('.cart-item__text', { hasText: 'Размер' }).innerText();
    }

    async getHeight(): Promise<string> {
        return await this.item.locator('.cart-item__text', { hasText: 'Рост' }).innerText();
    }

    async getPrice(): Promise<string> {
        return await this.item.locator('.cart-item__price--nowrap').innerText();
    }
}
