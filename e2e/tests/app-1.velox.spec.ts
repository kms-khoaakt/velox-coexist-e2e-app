// @tms APP-1
import { LoginPage } from '@pages/login.page';
import { SecurePage } from '@pages/secure.page';

await step('Log in as the valid user', async () => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(process.env.USERNAME!, process.env.PASSWORD!);
});

await step('Verify the secure-area banner is shown', async () => {
  const secure = new SecurePage(page);
  await secure.expectLoggedIn();
});

await step('Log out and confirm the sign-in form is shown again', async () => {
  const secure = new SecurePage(page);
  await secure.logout();
  await expect(page.locator('[data-test="username"]')).toBeVisible({ timeout: 10000 });
});