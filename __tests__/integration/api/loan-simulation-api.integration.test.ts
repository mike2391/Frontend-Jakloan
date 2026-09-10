import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  getProperties,
  createSimulation,
  selectProperty,
  updateFinancing,
  selectInterest,
  calculateSimulation,
  getSimulation,
  type Property,
  type Simulation,
  type SimulationResult,
} from "@/lib/loan-simulation-api";

// Type-safe helper for mocking Response without TS2352 errors
function mockResponse(
  data: unknown,
  init?: { ok?: boolean; status?: number; throwsJsonError?: boolean },
): Response {
  return {
    ok: init?.ok ?? true,
    status: init?.status ?? 200,
    headers: new Headers(),
    json: async () => {
      if (init?.throwsJsonError) {
        throw new Error("Invalid JSON");
      }
      return data;
    },
  } as unknown as Response;
}

describe("Loan Simulation API Integration Tests", () => {
  const fakeSessionId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("Positive Flow (Happy Path)", () => {
    it("should complete the 5-step simulation flow successfully", async () => {
      const mockProperties: Property[] = [
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
      ];

      const mockSimulationStep1: Simulation = {
        sessionId: fakeSessionId,
        status: "DRAFT",
        customerProfile: {
          occupationId: 1,
          monthlyIncome: 25_000_000,
          maritalStatus: "SINGLE",
          spouseOccupationId: null,
          spouseMonthlyIncome: null,
          otherMonthlyInstallment: 0,
        },
        property: null,
        financing: null,
        interest: null,
        result: null,
      };

      const mockSimulationStep2: Simulation = {
        ...mockSimulationStep1,
        property: {
          propertyId: 1,
          propertyPrice: 850_000_000,
          propertyTypeId: 1,
          locationId: 1,
        },
      };

      const mockSimulationStep3: Simulation = {
        ...mockSimulationStep2,
        financing: {
          propertyPrice: 850_000_000,
          downPayment: 170_000_000,
          downPaymentPercentage: 20,
          loanAmount: 680_000_000,
          tenorYears: 15,
        },
      };

      const mockSimulationStep4: Simulation = {
        ...mockSimulationStep3,
        interest: {
          loanProductId: 1,
          interestScheme: "FIXED_FLOATING",
          fixedRate: 5.75,
          fixedPeriodYears: 3,
          floatingRate: 9.5,
          scenarioId: 1,
          scenarioIncreaseRate: 1.5,
        },
      };

      const mockResult: SimulationResult = {
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
        floatingInterestRate: 11.0,
        floatingMonthlyInstallment: 7_120_500,
        outstandingPrincipalFloating: 610_000_000,
        remainingTenorYearsFloating: 12,
      };

      const mockSimulationFinal: Simulation = {
        ...mockSimulationStep4,
        status: "COMPLETED",
        result: mockResult,
      };

      const fetchSpy = vi.spyOn(globalThis, "fetch");

      // 1. Get properties
      fetchSpy.mockResolvedValueOnce(mockResponse(mockProperties));
      const properties = await getProperties();
      expect(properties).toHaveLength(1);
      expect(properties[0].propertyName).toBe("Griya Harmoni Jakarta");

      // 2. Step 1: Create simulation
      fetchSpy.mockResolvedValueOnce(mockResponse(mockSimulationStep1));
      const step1Result = await createSimulation({
        occupationId: 1,
        monthlyIncome: 25_000_000,
        maritalStatus: "SINGLE",
        otherMonthlyInstallment: 0,
      });
      expect(step1Result.sessionId).toBe(fakeSessionId);
      expect(step1Result.status).toBe("DRAFT");

      // 3. Step 2: Select property
      fetchSpy.mockResolvedValueOnce(mockResponse(mockSimulationStep2));
      const step2Result = await selectProperty(fakeSessionId, 1);
      expect(step2Result.property?.propertyPrice).toBe(850_000_000);

      // 4. Step 3: Update financing
      fetchSpy.mockResolvedValueOnce(mockResponse(mockSimulationStep3));
      const step3Result = await updateFinancing(fakeSessionId, 170_000_000, 15);
      expect(step3Result.financing?.loanAmount).toBe(680_000_000);

      // 5. Step 4: Select interest scheme
      fetchSpy.mockResolvedValueOnce(mockResponse(mockSimulationStep4));
      const step4Result = await selectInterest(fakeSessionId, {
        loanProductId: 1,
        interestScheme: "FIXED_FLOATING",
        fixedPeriodYears: 3,
        scenarioId: 1,
      });
      expect(step4Result.interest?.interestScheme).toBe("FIXED_FLOATING");

      // 6. Step 5: Calculate simulation
      fetchSpy.mockResolvedValueOnce(mockResponse(mockResult));
      const calculationResult = await calculateSimulation(fakeSessionId);
      expect(calculationResult.monthlyInstallment).toBe(5_645_800);
      expect(calculationResult.installmentStatus).toBe("AMAN");
      expect(calculationResult.debtToIncomeRatio).toBe(22.58);

      // 7. Hydrate simulation details
      fetchSpy.mockResolvedValueOnce(mockResponse(mockSimulationFinal));
      const hydratedSimulation = await getSimulation(fakeSessionId);
      expect(hydratedSimulation.sessionId).toBe(fakeSessionId);
      expect(hydratedSimulation.status).toBe("COMPLETED");
    });

    it("should handle married customer profile payload correctly", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
        mockResponse({
          sessionId: fakeSessionId,
          status: "DRAFT",
          customerProfile: {
            occupationId: 2,
            monthlyIncome: 30_000_000,
            maritalStatus: "MARRIED",
            spouseOccupationId: 1,
            spouseMonthlyIncome: 15_000_000,
            otherMonthlyInstallment: 3_000_000,
          },
        }),
      );

      const response = await createSimulation({
        occupationId: 2,
        monthlyIncome: 30_000_000,
        maritalStatus: "MARRIED",
        spouseOccupationId: 1,
        spouseMonthlyIncome: 15_000_000,
        otherMonthlyInstallment: 3_000_000,
      });

      expect(response.sessionId).toBe(fakeSessionId);
    });
  });

  describe("Negative Flow (Error Handling & Marital Status Validation)", () => {
    it("should throw error when monthly income is zero or negative (400 Bad Request)", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
        mockResponse(
          { message: "Penghasilan bulanan harus lebih dari Rp 0" },
          { ok: false, status: 400 },
        ),
      );

      await expect(
        createSimulation({
          occupationId: 1,
          monthlyIncome: -5_000_000,
          maritalStatus: "SINGLE",
          otherMonthlyInstallment: 0,
        }),
      ).rejects.toThrow("Penghasilan bulanan harus lebih dari Rp 0");
    });

    it("should throw error when marital status is MARRIED but spouse occupation is missing", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
        mockResponse(
          { message: "Spouse occupation is required for married customer." },
          { ok: false, status: 400 },
        ),
      );

      await expect(
        createSimulation({
          occupationId: 1,
          monthlyIncome: 20_000_000,
          maritalStatus: "MARRIED",
          otherMonthlyInstallment: 0,
        }),
      ).rejects.toThrow("Spouse occupation is required for married customer.");
    });

    it("should throw error when unmarried customer submits spouse data", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
        mockResponse(
          { message: "Spouse fields must remain null for unmarried customer." },
          { ok: false, status: 400 },
        ),
      );

      await expect(
        createSimulation({
          occupationId: 1,
          monthlyIncome: 20_000_000,
          maritalStatus: "SINGLE",
          spouseOccupationId: 1,
          spouseMonthlyIncome: 10_000_000,
          otherMonthlyInstallment: 0,
        }),
      ).rejects.toThrow(
        "Spouse fields must remain null for unmarried customer.",
      );
    });

    it("should throw error when property is not found (404 Not Found)", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
        mockResponse(
          { message: "Properti dengan ID 999 tidak ditemukan" },
          { ok: false, status: 404 },
        ),
      );

      await expect(selectProperty(fakeSessionId, 999)).rejects.toThrow(
        "Properti dengan ID 999 tidak ditemukan",
      );
    });

    it("should throw error when down payment exceeds property price (400 Bad Request)", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
        mockResponse(
          {
            message:
              "Uang muka tidak boleh melebihi atau sama dengan harga properti",
          },
          { ok: false, status: 400 },
        ),
      );

      await expect(
        updateFinancing(fakeSessionId, 900_000_000, 15),
      ).rejects.toThrow(
        "Uang muka tidak boleh melebihi atau sama dengan harga properti",
      );
    });

    it("should throw error when calculation is requested for an invalid or non-existent session (404 Not Found)", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
        mockResponse(
          { message: "Sesi simulasi tidak ditemukan" },
          { ok: false, status: 404 },
        ),
      );

      await expect(calculateSimulation("invalid-session-uuid")).rejects.toThrow(
        "Sesi simulasi tidak ditemukan",
      );
    });

    it("should throw error when calculation is called before required steps are completed (409 Conflict)", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
        mockResponse(
          { message: "Langkah pembiayaan dan suku bunga belum lengkap" },
          { ok: false, status: 409 },
        ),
      );

      await expect(calculateSimulation(fakeSessionId)).rejects.toThrow(
        "Langkah pembiayaan dan suku bunga belum lengkap",
      );
    });

    it("should handle network failure when backend is unreachable", async () => {
      vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(
        new TypeError("Failed to fetch"),
      );

      await expect(getProperties()).rejects.toThrow("Failed to fetch");
    });

    it("should fallback to HTTP status code message when backend response error is not valid JSON", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
        mockResponse(null, {
          ok: false,
          status: 502,
          throwsJsonError: true,
        }),
      );

      await expect(getSimulation("any-session-uuid")).rejects.toThrow(
        "Request failed with status 502",
      );
    });
  });
});
