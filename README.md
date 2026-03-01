# playwright-ui-lavka

## Description

### Тест-кейс: Добавление товара в корзину

#### Шаги:

1. Открыть сайт: [https://ramonki.by](https://ramonki.by)
2. Перейти в раздел **«Каталог» → «Одежда» → «Платья и сарафаны»**.
3. Выбрать любой товар и добавить его в **«Корзину»** с помощью иконки **«Корзина»**.
4. Перейти на страницу **«Корзина»**.
5. Проверить, что товар добавлен корректно:
   - **Название товара**
   - **Цена товара**
   - **Размер** (выбранный при добавлении)

#### Ожидаемый результат:
Товар должен быть добавлен в корзину с правильными параметрами:
- Название товара соответствует выбранному.
- Цена товара отображается корректно.
- Размер выбранного товара отображается в соответствии с тем, что был выбран при добавлении.

## Tech Stack
- Playwright, JavaScript, TypeScript

## How to run

1. Install node.js: https://nodejs.org/en/ (LTS)
2. Install dependencies
    ```
    npm install
    ```

- `npx playwright test` - runs the end-to-end tests. (headless mode)
- `npx playwright test --ui` - starts the interactive UI mode.
- `npx playwright test --project=chromium` - runs the tests only on Desktop Chrome.
