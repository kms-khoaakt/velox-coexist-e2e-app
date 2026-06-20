import { test, expect } from "../fixtures/auth.fixture";
import { SecurePage } from "@pages/secure.page";

test("a signed-in user can log out", async ({ securePage }) => {
  const secure = new SecurePage(securePage);
  await secure.expectLoggedIn();
  await secure.logout();
  await expect(securePage.locator('[data-test="username"]')).toBeVisible();
});
