import { test, expect } from "@playwright/test";

test.describe("E2E - Admin / Sales Login Flow", () => {
  test("should render login form and allow user credentials input", async ({
    page,
  }) => {
    // 1. Visit Admin Login page
    await page.goto("/admin");

    // 2. Verify branding and title
    await expect(page.getByText("FOR INTERNAL")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Login Sales" }),
    ).toBeVisible();
    await expect(
      page.getByText("Masuk ke sistem JakLoan untuk mengelola pengajuan KPR"),
    ).toBeVisible();

    // 3. Fill User ID / Email
    const emailInput = page.locator(
      'input[placeholder="Masukkan User ID atau email"]',
    );
    await expect(emailInput).toBeVisible();
    await emailInput.fill("sales01@bankdki.co.id");
    await expect(emailInput).toHaveValue("sales01@bankdki.co.id");

    // 4. Fill Password and test password visibility toggle
    const passwordInput = page.locator(
      'input[placeholder="Masukkan password"]',
    );
    await expect(passwordInput).toBeVisible();
    await expect(passwordInput).toHaveAttribute("type", "password");
    await passwordInput.fill("BankDKI2026!");

    // Toggle show password
    const toggleButton = page.getByRole("button", {
      name: /tampilkan password|sembunyikan password/i,
    });
    await toggleButton.click();
    await expect(passwordInput).toHaveAttribute("type", "text");

    // Toggle back to hidden
    await toggleButton.click();
    await expect(passwordInput).toHaveAttribute("type", "password");

    // 5. Test "Ingat saya" checkbox
    const rememberCheckbox = page.locator('input[type="checkbox"]');
    await expect(rememberCheckbox).not.toBeChecked();
    await rememberCheckbox.check();
    await expect(rememberCheckbox).toBeChecked();

    // 6. Test Login button
    const loginButton = page.getByRole("button", { name: "Login" });
    await expect(loginButton).toBeVisible();
    await loginButton.click();
  });
});
