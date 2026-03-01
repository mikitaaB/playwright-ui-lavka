import { expect, Page } from '@playwright/test';

export async function closeInitialDialog(page: Page) {
    const dialog = page.locator('[role="dialog"]');
    if (await dialog.isVisible()) {
        await dialog.locator('span.v-modal__close').click();
        await dialog.waitFor({ state: 'hidden' });
        await expect(dialog).not.toBeVisible();
    }
}
