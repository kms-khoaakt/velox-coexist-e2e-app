import { Page, Locator, expect } from "@playwright/test";

/** The secure area shown after a successful sign-in. */
export class SecurePage {
  readonly banner: Locator;
  readonly logoutLink: Locator;

  constructor(private readonly page: Page) {
    this.banner = page.locator('[data-test="banner"]');
    this.logoutLink = page.locator('[data-test="logout"]');
  }

  async expectLoggedIn(): Promise<void> {
    await expect(this.banner).toContainText("secure area");
  }

  async logout(): Promise<void> {
    await this.logoutLink.click();
  }
}
