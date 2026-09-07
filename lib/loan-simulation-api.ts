const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

export type Property = {
  id: number;
  propertyName: string;
  propertyTypeName: string;
  city: string;
  province: string;
  price: number;
  status: string;
  landArea: number;
  buildingArea: number;
  propertyYear: number;
};

export type Simulation = {
  sessionId: string;
  status: string;
  customerProfile: {
    occupationId: number;
    monthlyIncome: number;
    maritalStatus: "SINGLE" | "MARRIED";
    spouseOccupationId: number | null;
    spouseMonthlyIncome: number | null;
    otherMonthlyInstallment: number;
  } | null;
  property: {
    propertyId: number;
    propertyPrice: number;
    propertyTypeId: number;
    locationId: number;
  } | null;
  financing: {
    propertyPrice: number;
    downPayment: number;
    downPaymentPercentage: number;
    loanAmount: number;
    tenorYears: number;
  } | null;
  interest: {
    loanProductId: number;
    interestScheme: "FIXED" | "FLOATING" | "FIXED_FLOATING";
    fixedRate: number | null;
    fixedPeriodYears: number | null;
    floatingRate: number | null;
    scenarioId: number | null;
    scenarioIncreaseRate: number | null;
  } | null;
  result: SimulationResult | null;
};

export type SimulationResult = {
  propertyPrice: number;
  downPayment: number;
  downPaymentPercentage: number;
  loanAmount: number;
  tenorYears: number;
  interestRate: number;
  monthlyInstallment: number;
  combinedIncome: number;
  debtToIncomeRatio: number;
  installmentStatus: string;
  floatingInterestRate: number | null;
  floatingMonthlyInstallment: number | null;
  outstandingPrincipalFloating: number | null;
  remainingTenorYearsFloating: number | null;
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(
      error?.message ?? `Request failed with status ${response.status}`,
    );
  }

  return response.json() as Promise<T>;
}

export function getProperties() {
  return request<Property[]>("/api/v1/master/properties");
}

export function createSimulation(body: {
  occupationId: number;
  monthlyIncome: number;
  maritalStatus: "SINGLE" | "MARRIED";
  spouseOccupationId?: number;
  spouseMonthlyIncome?: number;
  otherMonthlyInstallment: number;
}) {
  return request<Simulation>("/api/v1/simulations", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function selectProperty(sessionId: string, propertyId: number) {
  return request<Simulation>(`/api/v1/simulations/${sessionId}/property`, {
    method: "PUT",
    body: JSON.stringify({ propertyId }),
  });
}

export function updateFinancing(
  sessionId: string,
  downPayment: number,
  tenorYears: number,
) {
  return request<Simulation>(`/api/v1/simulations/${sessionId}/financing`, {
    method: "PUT",
    body: JSON.stringify({ downPayment, tenorYears }),
  });
}

export function selectInterest(
  sessionId: string,
  body: {
    loanProductId: number;
    interestScheme: "FIXED" | "FLOATING" | "FIXED_FLOATING";
    fixedPeriodYears?: number;
    scenarioId?: number;
  },
) {
  return request<Simulation>(`/api/v1/simulations/${sessionId}/interest`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export function calculateSimulation(sessionId: string) {
  return request<SimulationResult>(
    `/api/v1/simulations/${sessionId}/calculate`,
    { method: "POST" },
  );
}

export function getSimulation(sessionId: string) {
  return request<Simulation>(`/api/v1/simulations/${sessionId}`);
}
