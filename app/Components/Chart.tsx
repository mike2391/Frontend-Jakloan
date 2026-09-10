import { DonutChart } from "@derpdaderp/chartkit";

type ChartDatum = {
  source: string;
  values: number;
};

const defaultData: ChartDatum[] = [
  { source: "", values: 1 },
  { source: "", values: 1 },
  { source: "", values: 1 },
  { source: "", values: 1 },
];

type ChartProps = {
  data?: ChartDatum[];
  title?: string;
  size?: number;
  description?: string;
  centerContent?: React.ReactNode;
  legendPosition?: "right" | "bottom";
};

export default function Chart({ data = defaultData, title = "", size = 140, description = "", centerContent, legendPosition = "right" }: ChartProps) {
  const totalvalues = data.reduce((total, item) => total + item.values, 0);

  return (
    <section className="w-full max-w-md " aria-labelledby="traffic-sources-title">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 id="traffic-sources-title" className="text-base font-bold text-slate-900">
            {title}
          </h2>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>
      </div>

      <DonutChart
        data={data}
        dataKey="values"
        labelKey="source"
        theme="sunset"
        size={size}
        innerRadius={0.62}
        legendPosition={legendPosition}
        showLegend
        format={(value) => `${value}`}
        centerContent={
          centerContent ?? (
            <div className="text-center">
              <div className="text-2xl font-bold">{totalvalues}</div>
              <div className="text-xs text-slate-500">Total values</div>
            </div>
          )
        }
      />
    </section>
  );
}
