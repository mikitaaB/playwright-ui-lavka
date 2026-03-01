import { Page, Locator, expect } from '@playwright/test';

export class SizeSelectorModal {
    private readonly modal: Locator;

    constructor(page: Page) {
        this.modal = page.locator('.v-modal[role="dialog"] .options-selector-modal');
    }

    async waitForVisible() {
        await this.modal.waitFor({ state: 'visible' });
    }

    async selectFirstSizeAndHeight(): Promise<{ size: string; height: string }> {
        const sizeOption = this.modal
            .locator('.options-selector', { hasText: 'Выберите размер' })
            .locator('ul.options-selector__list li')
            .first();
        const size = await sizeOption.innerText();
        await sizeOption.click();

        const heightOption = this.modal
            .locator('.options-selector', { hasText: 'Выберите рост' })
            .locator('ul.options-selector__list li')
            .first();
        const height = await heightOption.innerText();
        await heightOption.click();

        return { size, height };
    }

    async confirm() {
        await this.modal
            .locator('.options-selector-modal__buttons button')
            .filter({ hasText: 'Выбрать' })
            .click();
        await this.modal.waitFor({ state: 'hidden' });
        await expect(this.modal).not.toBeVisible();
    }
}
