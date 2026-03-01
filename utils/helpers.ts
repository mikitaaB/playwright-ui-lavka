import { expect, Page } from '@playwright/test';

export async function closeInitialDialog(page: Page) {
    const dialog = page.locator('.v-modal[role="dialog"].sale');
    try {
        await dialog.waitFor({ state: 'visible', timeout: 5000 });
    } catch {
        return;
    }
    if (await dialog.isVisible()) {
        await dialog.locator('span.v-modal__close').click();
        await dialog.waitFor({ state: 'hidden', timeout: 5000 });
        await expect(dialog).not.toBeVisible();
    }
}
