import { DonutChart } from "@derpdaderp/chartkit";

type ChartDatum = {
  source: string;
  visits: number;
};

const defaultData: ChartDatum[] = [
  { source: "Organic", visits: 42 },
  { source: "Referral", visits: 28 },
  { source: "Social", visits: 18 },
  { source: "Other", visits: 12 },
];

type ChartProps = {
  data?: ChartDatum[];
  title?: string;
  description?: string;
  centerContent?: React.ReactNode;
};

export default function Chart({
  data = defaultData,
  title = "Traffic Sources",
  description = "Visitor distribution by source",
  centerContent,
}: ChartProps) {
  const totalVisits = data.reduce((total, item) => total + item.visits, 0);

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
        dataKey="visits"
        labelKey="source"
        theme="sunset"
        size={140}
        innerRadius={0.62}
        legendPosition="right"
        showLegend
        format={(value) => `${value}%`}
        centerContent={
          centerContent ?? (
            <div className="text-center">
              <div className="text-2xl font-bold">{totalVisits}</div>
              <div className="text-xs text-slate-500">Total visits</div>
            </div>
          )
        }
      />
    </section>
  );
}
