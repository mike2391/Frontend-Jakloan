import { test, expect } from "@playwright/test";

test.describe("E2E - KPR Loan Simulation Flow", () => {
  test("should successfully navigate through all 5 steps of loan simulation", async ({
    page,
  }) => {
    const fakeSessionId = "e2e-session-uuid-12345";

    // Intercept backend API calls with mock responses for stable, automated E2E testing
    await page.route("**/api/v1/master/properties", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([
          {
            id: 1,
            propertyName: "Griya Harmoni Jakarta",
            propertyTypeName: "Rumah",
            city: "Jakarta Timur",
            province: "DKI Jakarta",
            price: 850_000_000,
            status: "Baru",
            landArea: 120,
            buildingArea: 90,
            propertyYear: 2024,
          },
        ]),
      });
    });

    await page.route("**/api/v1/simulations", async (route) => {
      if (route.request().method() === "POST") {
        await route.fulfill({
          status: 201,
          contentType: "application/json",
          body: JSON.stringify({
            sessionId: fakeSessionId,
            status: "DRAFT",
          }),
        });
      } else {
        await route.continue();
      }
    });

    await page.route(
      `**/api/v1/simulations/${fakeSessionId}/property`,
      async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            sessionId: fakeSessionId,
            status: "DRAFT",
          }),
        });
      },
    );

    await page.route(
      `**/api/v1/simulations/${fakeSessionId}/financing`,
      async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            sessionId: fakeSessionId,
            status: "DRAFT",
          }),
        });
      },
    );

    await page.route(
      `**/api/v1/simulations/${fakeSessionId}/interest`,
      async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            sessionId: fakeSessionId,
            status: "DRAFT",
          }),
        });
      },
    );

    await page.route(
      `**/api/v1/simulations/${fakeSessionId}/calculate`,
      async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            propertyPrice: 850_000_000,
            downPayment: 170_000_000,
            downPaymentPercentage: 20,
            loanAmount: 680_000_000,
            tenorYears: 15,
            interestRate: 5.75,
            monthlyInstallment: 5_645_800,
            combinedIncome: 25_000_000,
            debtToIncomeRatio: 22.58,
            installmentStatus: "AMAN",
          }),
        });
      },
    );

    // 1. Visit Homepage
    await page.goto("/");
    await expect(page.locator("h1")).toContainText(
      "Plan Your Loan, Get Your Own",
    );

    // 2. Step 1: Profil Nasabah
    await page.locator("#occupation").selectOption("Karyawan swasta");
    await page.locator("#monthly-income").fill("25000000");
    await page.locator("#marital-status").selectOption("Lajang");
    await page.locator("#monthly-expenses").fill("1000000");

    // Click Continue to go to Step 2
    await page.getByRole("button", { name: "Continue" }).click();

    // 3. Step 2: Properti
    await expect(page.getByText("Pilih properti")).toBeVisible();
    await expect(page.locator("#property-id")).toBeVisible();
    await page.getByRole("button", { name: "Continue" }).click();

    // 4. Step 3: Pembiayaan
    await expect(page.getByText("DP (Down Payment)")).toBeVisible();
    await page.locator("#tenor").selectOption("15");
    await page.getByRole("button", { name: "Continue" }).click();

    // 5. Step 4: Suku Bunga
    await expect(page.locator("#interest-type")).toBeVisible();
    await page.locator("#interest-type").selectOption("fixed");

    // Submit final step
    await page.getByRole("button", { name: "Lihat Hasil" }).click();

    // 6. Step 5: Verify Result KPR Page
    await page.waitForURL(`**/result-kpr?sessionId=${fakeSessionId}`);
    await expect(
      page.getByRole("heading", { name: "Simulation for Every Plan" }),
    ).toBeVisible();
    await expect(page.getByText("KPR Griya Monas", { exact: true })).toBeVisible();
  });
});
