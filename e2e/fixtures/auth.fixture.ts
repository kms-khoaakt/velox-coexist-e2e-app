import { test as base, type Page } from "@playwright/test";
import { LoginPage } from "@pages/login.page";
import { VALID_USER } from "@helpers/users";

/** Extends `test` with `securePage` — already signed in as the valid user. */
export const test = base.extend<{ securePage: Page }>({
  securePage: async ({ page }, use) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(VALID_USER.username, VALID_USER.password);
    await use(page);
  },
});
export { expect } from "@playwright/test";
