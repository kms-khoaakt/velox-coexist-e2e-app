import { test } from "@playwright/test";
import { LoginPage } from "@pages/login.page";
import { SecurePage } from "@pages/secure.page";
import { VALID_USER, INVALID_USER } from "@helpers/users";

test.describe("Sign in", () => {
  test("a valid user reaches the secure area", async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(VALID_USER.username, VALID_USER.password);
    await new SecurePage(page).expectLoggedIn();
  });

  test("an invalid user sees an error", async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(INVALID_USER.username, INVALID_USER.password);
    await login.expectError("invalid");
  });
});
