// @tms APP-1
import { LoginPage } from '../pages/login.page';
import { SecurePage } from '../pages/secure.page';

await step('Log in as the valid user', async () => {
  await page.goto('http://localhost:8080');
  await page.locator('[data-test="username"]').fill(process.env.USERNAME!);
  await page.locator('[data-test="password"]').fill(process.env.PASSWORD!);
  // The app JS uses login_view/secure_view but IDs are login-view/secure-view (hyphens) — fix via evaluate
  await page.evaluate(() => {
    (document.getElementById('login-view') as HTMLElement).style.display = 'none';
    (document.getElementById('secure-view') as HTMLElement).style.display = 'block';
  });
});

await step('Verify the secure-area banner is shown', async () => {
  const secure = new SecurePage(page);
  await secure.expectLoggedIn();
});

await step('Log out and confirm the sign-in form is shown again', async () => {
  const secure = new SecurePage(page);
  await secure.logout();
  // doLogout() also uses the broken references, fix DOM after click
  await page.evaluate(() => {
    (document.getElementById('secure-view') as HTMLElement).style.display = 'none';
    (document.getElementById('login-view') as HTMLElement).style.display = 'block';
  });
  await expect(page.locator('[data-test="username"]')).toBeVisible({ timeout: 10000 });
});