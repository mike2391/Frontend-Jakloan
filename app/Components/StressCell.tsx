import { cn } from "@/lib/utils";

export type StressTheme = "green" | "yellow" | "red";

export const stressThemeStyles: Record<StressTheme, { cell: string; modal: string; heading: string; scenarioTitle: string }> = {
  green: {
    cell: "bg-green-100 text-green-700",
    modal: "border-green-200 bg-green-50",
    heading: "text-green-700",
    scenarioTitle: "skenario ini mensimulasikan bila bunga naik dan turun secara stabil dan bertahap.",
  },
  yellow: {
    cell: "bg-yellow-100 text-yellow-700",
    modal: "border-yellow-200 bg-yellow-50",
    heading: "text-yellow-700",
    scenarioTitle: "skenario ini mensimulasikan bila bunga naik secara bertahap.",
  },
  red: {
    cell: "bg-red-100 text-red-700",
    modal: "border-red-200 bg-red-50",
    heading: "text-red-700",
    scenarioTitle: "skenario ini mensimulasikan bila bunga naik secara agresif karena kondisi ekonomi negara kurang baik.",
  },
};

export default function StressCell({
  value,
  themeColor,
  description,
  onClick,
}: {
  value: string;
  themeColor: StressTheme;
  description: string;
  onClick: () => void;
}) {
  const theme = stressThemeStyles[themeColor];

  return (
    <div className={cn("flex items-start justify-between gap-4 rounded-md p-3", theme.cell)}>
      <div>
        <p className="text-base font-bold">{value}</p>
        <p className="mt-1 text-sm leading-4 text-slate-600">{description}</p>
      </div>
      <button
        type="button"
        onClick={onClick}
        className="shrink-0 text-right text-xs font-bold underline underline-offset-2 transition-opacity hover:opacity-70">
        lihat skenario cicilan
      </button>
    </div>
  );
}
