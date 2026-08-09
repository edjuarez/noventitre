import { test, expect } from '@playwright/test';

test.describe('Navegación principal de Noventitre', () => {
  
  test('El Home carga correctamente y muestra productos destacados', async ({ page }) => {
    // 1. Navegar al inicio
    await page.goto('/');

    // 2. Verificar el título de la pestaña
    await expect(page).toHaveTitle(/Noventitre/);

    // 3. Verificar que exista un título o sección específica (ajusta el texto a tu UI real)
    const featuredSection = page.getByRole('heading', { name: 'Mi mundo', exact: false });
    await expect(featuredSection).toBeVisible();

    // 4. Verificar que al menos un producto (tarjeta/imagen) esté renderizado
    // Asumiendo que tus tarjetas de producto tienen un enlace o un rol de 'article' o 'img'
    const firstProduct = page.locator('a img, article img').first();
    await expect(firstProduct).toBeVisible();
  });
});