import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
    readonly catalogButton: Locator;

    constructor(page: Page) {
        super(page);
        this.catalogButton = page.getByRole('button', { name: 'Каталог' });
    }
}
