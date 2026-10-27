import { test, expect } from '@playwright/test';

async function addItem(page, text) {
  await page.locator('#root').getByRole('button', { name: 'Add', exact: true }).click();
  await page.getByPlaceholder('Type the text here...').fill(text);
  await page.getByRole('dialog').getByRole('button', { name: 'Add', exact: true }).click();
}

test.describe('Gestión de la lista de texto', () => {
  test('añade, selecciona, elimina y deshace', async ({ page }) => {
    await page.goto('/');

    await addItem(page, 'Item 1');
    await addItem(page, 'Item 2');
    await expect(page.getByRole('option')).toHaveCount(2);

    const deleteButton = page.getByRole('button', { name: 'Delete' });
    await expect(deleteButton).toBeDisabled();

    await page.getByRole('option', { name: 'Item 1' }).click();
    await expect(deleteButton).toBeEnabled();
    await deleteButton.click();
    await expect(page.getByRole('option')).toHaveText(['Item 2']);

    await page.getByRole('button', { name: 'Undo' }).click();
    await expect(page.getByRole('option')).toHaveCount(2);
  });

  test('no permite textos vacíos ni duplicados', async ({ page }) => {
    await page.goto('/');

    await page.locator('#root').getByRole('button', { name: 'Add', exact: true }).click();
    await page.getByRole('dialog').getByRole('button', { name: 'Add', exact: true }).click();
    await expect(page.getByText("The text can't be empty.")).toBeVisible();

    await page.getByPlaceholder('Type the text here...').fill('Item 1');
    await page.getByRole('dialog').getByRole('button', { name: 'Add', exact: true }).click();

    await page.locator('#root').getByRole('button', { name: 'Add', exact: true }).click();
    await page.getByPlaceholder('Type the text here...').fill('item 1');
    await page.getByRole('dialog').getByRole('button', { name: 'Add', exact: true }).click();
    await expect(page.getByText('An item with that text already exists in the list.')).toBeVisible();
    await expect(page.getByRole('option')).toHaveCount(1);
  });

  test('cambia el idioma de toda la interfaz', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('This is a technical proof')).toBeVisible();

    await page.getByRole('button', { name: 'ES' }).click();

    await expect(page.getByText('Esta es una prueba técnica')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Añadir' })).toBeVisible();
    await expect(page).toHaveTitle('Prueba técnica');
  });
});
