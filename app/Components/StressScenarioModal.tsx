"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { stressThemeStyles, type StressTheme } from "./StressCell";

export default function StressScenarioModal({ themeColor, onClose }: { themeColor: StressTheme; onClose: () => void }) {
  const theme = stressThemeStyles[themeColor];
  const tenors = [5, 10, 15, 20, 25];
  const [selectedTenor, setSelectedTenor] = useState(5);

  const paymentScenarios = [
    {
      title: "cicilan tahun 1-3 (fixed rate)",
      amount: "Rp. 160.000.000/3 tahun",
      rate: "5.75%",
    },
    ...Array.from({ length: selectedTenor - 3 }, (_, index) => {
      const year = index + 4;
      const isFinalYear = year === selectedTenor;

      return {
        title: `cicilan tahun ke-${year}${isFinalYear ? " (Final)" : ""}`,
        amount:
          isFinalYear && selectedTenor === 5 ? "Rp. 80.000.000/tahun"
          : year === 4 && selectedTenor === 5 ? "Rp. 180.000.000/tahun"
          : "Rp. ....",
        rate: "9.1%",
      };
    }),
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4" role="dialog" aria-modal="true">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-5 shadow-xl">
        <div className={cn("flex items-start justify-between gap-4 rounded-md border p-4", theme.modal)}>
          <h1 className={cn("text-base font-bold", theme.heading)}>{theme.scenarioTitle}</h1>
          <button type="button" onClick={onClose} aria-label="Tutup modal" className="text-slate-500 hover:text-slate-900">
            <X className="size-4" />
          </button>
        </div>

        <hr className="my-5 border-slate-200" />

        <div className="space-y-4">
          <h1 className="text-lg font-bold text-slate-900">Skenario Cicilan Fixed Rate 3 tahun (Tenor {selectedTenor} tahun)</h1>

          <div className="flex flex-wrap gap-2" aria-label="Pilihan tenor">
            {tenors.map((tenor) => (
              <button
                key={tenor}
                type="button"
                onClick={() => setSelectedTenor(tenor)}
                className={cn(
                  "rounded-md border px-3 py-2 text-xs font-semibold transition-colors",
                  selectedTenor === tenor ? cn(theme.modal, theme.heading) : "border-slate-200 text-slate-500 hover:bg-slate-50",
                )}>
                {tenor} tahun
              </button>
            ))}
          </div>

          {paymentScenarios.map((scenario) => (
            <section key={scenario.title}>
              <h2 className={cn("text-base font-bold", theme.heading)}>{scenario.title}</h2>
              <div className="mt-2 flex items-center justify-between gap-4 rounded-md border border-slate-200 p-3">
                <div>
                  <p className="text-xs text-slate-500">{scenario.title.includes("fixed") ? "cicilan fix" : "cicilan"}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">{scenario.amount}</p>
                </div>
                <p className={cn("shrink-0 text-sm font-bold", theme.heading)}>{scenario.rate}</p>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
