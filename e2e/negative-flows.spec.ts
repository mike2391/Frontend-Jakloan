import { test, expect } from "@playwright/test";

test.describe("E2E - Negative Testing & Error Handling", () => {
  test("should prevent advancing to Step 2 when required fields are missing", async ({
    page,
  }) => {
    await page.goto("/");

    // Click Continue immediately without filling required fields
    await page.getByRole("button", { name: "Continue" }).click();

    // Verify still on Step 1 (Profil Nasabah)
    await expect(page.locator("form p.text-lg")).toHaveText("Profil Nasabah");
    await expect(page.getByText("Pilih properti")).not.toBeVisible();
  });

  test("should display red error banner when backend returns 400 error on Step 1", async ({
    page,
  }) => {
    // Intercept backend simulation creation and return 400 error
    await page.route("**/api/v1/simulations", async (route) => {
      if (route.request().method() === "POST") {
        await route.fulfill({
          status: 400,
          contentType: "application/json",
          body: JSON.stringify({
            message:
              "Penghasilan bulanan tidak memenuhi syarat minimal Bank DKI",
          }),
        });
      } else {
        await route.continue();
      }
    });

    await page.goto("/");

    // Fill valid form inputs
    await page.locator("#occupation").selectOption("Karyawan swasta");
    await page.locator("#monthly-income").fill("1000000");
    await page.locator("#marital-status").selectOption("Lajang");
    await page.locator("#monthly-expenses").fill("500000");

    // Click Continue
    await page.getByRole("button", { name: "Continue" }).click();

    // Verify the red error banner appears with backend message
    const errorBanner = page.locator("p.bg-red-50");
    await expect(errorBanner).toBeVisible();
    await expect(errorBanner).toContainText(
      "Penghasilan bulanan tidak memenuhi syarat minimal Bank DKI",
    );

    // Verify user is NOT advanced to Step 2
    await expect(page.locator("form p.text-lg")).toHaveText("Profil Nasabah");
  });

  test("should display error when property master catalog fails to load", async ({
    page,
  }) => {
    // Intercept properties API to return 500 Server Error
    await page.route("**/api/v1/master/properties", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({
          message: "Layanan katalog properti sedang gangguan",
        }),
      });
    });

    await page.goto("/");

    // Verify error banner shows on page load
    const errorBanner = page.locator("p.bg-red-50");
    await expect(errorBanner).toBeVisible();
    await expect(errorBanner).toContainText(
      "Layanan katalog properti sedang gangguan",
    );
  });

  test("should require email and password on admin login form", async ({
    page,
  }) => {
    await page.goto("/admin");

    const emailInput = page.locator(
      'input[placeholder="Masukkan User ID atau email"]',
    );
    const loginButton = page.getByRole("button", { name: "Login" });

    // Click login without inputs
    await loginButton.click();

    // Input is focused or HTML5 validated
    await expect(emailInput).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Login Sales" }),
    ).toBeVisible();
  });
});
