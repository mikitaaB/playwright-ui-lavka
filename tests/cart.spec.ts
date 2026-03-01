import { test, expect } from '../fixtures/test.fixture';
import { BASE_URL, CART_URL, SUB_CATEGORY_NAME_DRESS, CATEGORY_NAME_CLOTHES, EXPECTED_CART_ITEMS } from '../constants';
import { closeInitialDialog } from '../utils/helpers.ts';
import { SizeSelectorModal } from '../components/size-selector.component';
import { ProductData } from '../types/product.types.ts';

test.describe('Корзина', () => {
	test.beforeEach(async ({ page, homePage }) => {
		await homePage.navigate(BASE_URL);
		await closeInitialDialog(page);
	});

	test('Добавление товара', async ({ page, catalogPage, cartPage }) => {
		const productData: ProductData = {
			title: '',
			price: '',
			size: '',
			height: '',
		};

		await page.getByRole('button', { name: 'Каталог' }).click();
		const catalogDropMenu = page.locator('div.drop-menu.drop-menu--catalog');
		await catalogDropMenu.getByRole('link', { name: CATEGORY_NAME_CLOTHES, exact: true }).hover();
		const dressesLink = catalogDropMenu.getByRole('link', { name: SUB_CATEGORY_NAME_DRESS, exact: true });
		await expect(dressesLink).toBeVisible();
		await dressesLink.click();

		await expect(page).toHaveURL(/\/catalog\/cat-platia-i-sarafany-\d+/);

		await catalogPage.waitForProducts();
		await catalogPage.verifyCategoryFilter(SUB_CATEGORY_NAME_DRESS);

		const firstProduct = await catalogPage.getFirstProductCard();
		await firstProduct.addToCart();

		const sizeModal = new SizeSelectorModal(page);
		await sizeModal.waitForVisible();
		const { size, height } = await sizeModal.selectFirstSizeAndHeight();
		productData.size = size;
		productData.height = height;
		await sizeModal.confirm();

		const successModal = page.locator('.v-modal[role="dialog"]');
		await expect(successModal).toBeVisible();
		productData.title = await successModal.locator('.success-add-modal__text.success-add-modal__text--title').innerText();
		productData.price = await successModal.locator('.success-add-modal__price').innerText();

		const checkoutButton = successModal.locator('.success-add-modal__buttons button').filter({ hasText: 'Оформить заказ' });
		await expect(checkoutButton).toBeEnabled();
		await checkoutButton.click();

		await page.waitForURL(CART_URL);
		await cartPage.waitForCartLoad();

		await expect(cartPage.cartCounter).toHaveText(new RegExp(String.raw`${EXPECTED_CART_ITEMS}\s+товар`));

		const cartItem = cartPage.getCartItem(0);
		expect(await cartItem.getProductName()).toBe(productData.title);
		expect(await cartItem.getSize()).toBe(`Размер ${productData.size}`);
		expect(await cartItem.getHeight()).toBe(`Рост ${productData.height}`);
		expect(await cartItem.getPrice()).toBe(productData.price);
	});
});