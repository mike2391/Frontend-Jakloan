"use client";

import { useState } from "react";
import { CategoryScale, Chart as ChartJS, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from "chart.js";
import { Line } from "react-chartjs-2";
import {
  CalendarDays,
  Check,
  ChevronDown,
  CircleAlert,
  Download,
  FileText,
  House,
  Lightbulb,
  Percent,
  Sparkles,
  TrendingDown,
  TrendingUp,
  UsersRound,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Chart from "../../Components/Chart";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const months = ["September 2026", "August 2026", "July 2026"];
type TrendPeriod = "daily" | "weekly" | "monthly";

const chartSeries = [
  {
    label: "KPR Griya Monas",
    borderColor: "#2384f2",
    backgroundColor: "#2384f2",
    values: [28, 31, 34, 36, 42, 39, 36],
  },
  {
    label: "KPR iB Bank Jakarta",
    borderColor: "#16bf91",
    backgroundColor: "#16bf91",
    values: [14, 15, 17, 18, 21, 20, 18],
  },
  {
    label: "KPRS FLPP",
    borderColor: "#8b5cf6",
    backgroundColor: "#8b5cf6",
    values: [6, 8, 7, 9, 11, 10, 9],
  },
];

function getWeekLabel(date: Date): string {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const week = Math.ceil((date.getDate() + firstDayOfMonth.getDay()) / 7);
  return `${date.toLocaleString("en-US", { month: "short" })}-week ${week}`;
}

function getTrendLabels(period: TrendPeriod, serverDate = new Date()): string[] {
  if (period === "daily") {
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(serverDate);
      date.setDate(serverDate.getDate() - (6 - index));
      return date.toLocaleDateString("en-US", { day: "numeric", month: "short" });
    });
  }

  if (period === "weekly") {
    const currentWeekStart = new Date(serverDate);
    currentWeekStart.setDate(serverDate.getDate() - serverDate.getDay());
    return Array.from({ length: 7 }, (_, index) => {
      const weekStart = new Date(currentWeekStart);
      weekStart.setDate(currentWeekStart.getDate() + (index - 3) * 7);
      return getWeekLabel(weekStart);
    });
  }

  return Array.from({ length: 6 }, (_, index) => {
    const month = new Date(serverDate.getFullYear(), serverDate.getMonth() + index, 1);
    return month.toLocaleString("en-US", { month: "short", year: "numeric" });
  });
}

function getTrendChartData(period: TrendPeriod) {
  const labels = getTrendLabels(period);
  return {
    labels,
    datasets: [
      ...chartSeries.map((series) => ({
        label: series.label,
        data: series.values.slice(0, labels.length),
        fill: false,
        borderColor: series.borderColor,
        backgroundColor: series.backgroundColor,
        borderWidth: 2,
        tension: 0.1,
        pointRadius: 2,
        pointHoverRadius: 4,
      })),
    ],
  };
}

const riskChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "top" as const,
      align: "end" as const,
      labels: { color: "#526986", boxWidth: 8, usePointStyle: true, pointStyle: "rect", font: { size: 12 } },
    },
    title: { display: false },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: "#526986", font: { size: 12 } },
    },
    y: {
      beginAtZero: true,
      suggestedMax: 60,
      ticks: { color: "#8091ab", stepSize: 10, font: { size: 12 } },
      grid: { color: "#dae4ef" },
    },
  },
};

const insights = [
  {
    icon: TrendingUp,
    title: "Performa Meningkat",
    badge: "Tren Positif",
    badgeClass: "bg-emerald-100 text-emerald-600",
    iconClass: "bg-emerald-100 text-emerald-500",
    description:
      "Jumlah pengajuan meningkat 12% dibanding bulan lalu, dengan tingkat persetujuan naik 5%. Hal ini menunjukkan kualitas pengajuan semakin baik.",
  },
  {
    icon: Check,
    title: "Mayoritas disetujui",
    iconClass: "bg-sky-100 text-sky-500",
    description: "56% dari total pengajuan pada September 2026 berhasil disetujui.",
  },
  {
    icon: Percent,
    title: "Rasio penolakan menurun",
    iconClass: "bg-amber-100 text-amber-500",
    description: "Tingkat penolakan turun dari 20% menjadi 14% dibanding bulan lalu.",
  },
  {
    icon: FileText,
    title: "Profil nasabah semakin baik",
    iconClass: "bg-sky-100 text-sky-500",
    description: "Rata-rata rasio cicilan terhadap penghasilan (DTI) pada pengajuan berhasil disetujui adalah 32%, masih dalam batas aman (< 40%).",
  },
];

function StatCard({
  icon: Icon,
  label,
  value,
  change,
  changeLabel,
  tone,
  down,
}: {
  icon: typeof UsersRound;
  label: string;
  value: string;
  change: string;
  changeLabel: string;
  tone: "blue" | "green" | "yellow" | "red" | "purple";
  down?: boolean;
}) {
  const tones = {
    blue: "bg-sky-100 text-sky-500",
    green: "bg-emerald-100 text-emerald-500",
    yellow: "bg-amber-100 text-amber-500",
    red: "bg-red-100 text-red-500",
    purple: "bg-purple-100 text-purple-500",
  };

  return (
    <div className="rounded-xl border border-[#dce5f0] bg-white p-4 shadow-[0_2px_8px_rgba(22,52,91,0.03)]">
      <div className="flex items-start gap-3">
        <div className={cn("flex size-10 shrink-0 items-center justify-center rounded-lg", tones[tone])}>
          <Icon className="size-5" strokeWidth={1.8} />
        </div>
        <div className="min-w-0">
          <p className="text-sm text-[#7183a1]">{label}</p>
          <p className="mt-1 text-2xl font-bold leading-none text-[#0d1f3c]">{value}</p>
          <p className={cn("mt-2 flex items-center gap-1 text-sm", down ? "text-red-500" : "text-emerald-500")}>
            {down ?
              <TrendingDown className="size-3" />
            : <TrendingUp className="size-3" />}
            <span className="font-semibold">{change}</span>
            <span className="text-[#8190a8]">{changeLabel}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AdminHomePage() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const [trendPeriod, setTrendPeriod] = useState<TrendPeriod>("daily");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const trendChartData = getTrendChartData(trendPeriod);

  return (
    <main className="min-h-screen bg-[#f8fafd] font-poppins text-[#0d1f3c]">
      <Sidebar
        activeNav={activeNav}
        mobileMenuOpen={mobileMenuOpen}
        onNavigate={(label) => {
          setActiveNav(label);
          setMobileMenuOpen(false);
        }}
        onClose={() => setMobileMenuOpen(false)}
      />

      {mobileMenuOpen && (
        <button
          type="button"
          aria-label="Tutup menu"
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
        />
      )}

      <section className="min-h-screen lg:ml-52.5">
        <Header
          notificationsOpen={notificationsOpen}
          onMenuOpen={() => setMobileMenuOpen(true)}
          onNotificationsToggle={() => setNotificationsOpen(!notificationsOpen)}
        />

        <div className="mx-auto w-9/10 px-5 py-6 sm:px-8 lg:px-10">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Analisis &amp; laporan</h1>
              <p className="mt-1 text-sm text-[#607493]">Ringkasan data pengajuan KPR dan analisis risiko nasabah</p>
            </div>
            <div className="flex gap-2">
              <label className="relative">
                <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-[#506884]" />
                <select
                  value={selectedMonth}
                  onChange={(event) => setSelectedMonth(event.target.value)}
                  className="h-9 appearance-none rounded-lg border border-[#d9e3ef] bg-white pl-9 pr-8 text-sm font-medium text-[#172d4d] outline-none">
                  {months.map((month) => (
                    <option key={month}>{month}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-[#506884]" />
              </label>
              <button
                type="button"
                className="flex h-9 items-center gap-2 rounded-lg border border-[#d9e3ef] bg-white px-3 text-sm font-semibold text-[#172d4d] hover:bg-[#f1f5fa]">
                <Download className="size-3.5" /> Ekspor Laporan
              </button>
            </div>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
            <StatCard icon={UsersRound} label="Total Pengajuan" value="36" change="12%" changeLabel="dari bulan lalu" tone="blue" />
            <StatCard icon={Check} label="Disetujui" value="18" change="20%" changeLabel="dari bulan lalu" tone="green" />
            <StatCard icon={CircleAlert} label="Dalam Review" value="12" change="0%" changeLabel="dari bulan lalu" tone="yellow" />
            <StatCard icon={X} label="Ditolak" value="5" change="11%" changeLabel="dari bulan lalu" tone="red" down />
            <StatCard icon={House} label="Total Nilai Kredit" value="Rp. 385,8M" change="11%" changeLabel="dari bulan lalu" tone="purple" down />
          </div>

          <div className="mt-4 flex flex-col gap-3 xl:flex-row">
            <div className="flex w-full flex-col gap-3 xl:w-3/5">
              <section className="rounded-xl border border-[#dce5f0] bg-white p-4 shadow-[0_2px_8px_rgba(22,52,91,0.03)]">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div>
                    <h2 className="text-sm font-bold">Tren Pengajuan Kredit</h2>
                    <p className="mt-1 text-sm text-[#607493]">Perbandingan jumlah pengajuan berdasarkan jenis produk</p>
                  </div>
                  <div className="flex rounded-lg border border-[#d9e3ef] bg-white p-1">
                    {(
                      [
                        ["daily", "Harian"],
                        ["weekly", "Mingguan"],
                        ["monthly", "Bulanan"],
                      ] as const
                    ).map(([period, label]) => (
                      <button
                        key={period}
                        type="button"
                        onClick={() => setTrendPeriod(period)}
                        className={cn(
                          "cursor-pointer rounded-md px-3 py-1 text-sm font-medium transition-colors",
                          trendPeriod === period ? "bg-[#2384f2] text-white" : "text-[#526986] hover:bg-[#eef5fc]",
                        )}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="relative mt-5 h-auto w-full">
                  <Line className="h-full w-full" data={trendChartData} options={riskChartOptions} />
                </div>
              </section>

              <div className="grid gap-3 md:grid-cols-3">
                <ApplicationTypeCard />
                <ProductDistributionCard />
                <RiskFactorCard />
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 xl:w-2/5">
              <section className="rounded-xl border border-[#dce5f0] bg-white p-4 shadow-[0_2px_8px_rgba(22,52,91,0.03)]">
                <div className="flex items-start">
                  <Sparkles className="mt-0.5 size-5 text-violet-600" />
                  <div>
                    <h2 className="text-sm font-bold">AI Insight</h2>
                    <p className="mt-1 text-sm text-[#7183a1]">Analisis berdasarkan data pengajuan KPR periode {selectedMonth}</p>
                  </div>
                </div>
                <div className="mt-4 space-y-4">
                  {insights.map(({ icon: Icon, title, badge, badgeClass, iconClass, description }) => (
                    <div key={title} className="flex gap-3">
                      <div className={cn("flex size-8 shrink-0 items-center justify-center rounded-lg", iconClass)}>
                        <Icon className="size-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-sm font-bold">{title}</h3>
                          {badge && <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-sm font-semibold", badgeClass)}>{badge}</span>}
                        </div>
                        <p className="mt-1 text-sm text-[#607493]">{description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-lg bg-sky-100 p-3">
                  <div className="flex items-center gap-2 text-sm font-bold">
                    <Lightbulb className="size-4 text-blue-500" /> Rekomendasi AI
                  </div>
                  <p className="mt-2 text-sm leading-4 text-[#607493]">
                    Pertahankan strategi pemasaran pada segmen risiko rendah dan sedang, serta tingkatkan edukasi untuk nasabah dengan DTI tinggi.
                  </p>
                </div>
              </section>
              <ProductListCard />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ApplicationTypeCard() {
  return (
    <section className="rounded-xl border border-[#dce5f0] bg-white p-3 shadow-[0_2px_8px_rgba(22,52,91,0.03)]">
      <h2 className="text-sm font-bold">Jenis Pengajuan KPR Bank DKI</h2>
      <p className="mt-1 text-sm text-[#7183a1]">Perbandingan jumlah pengajuan per jenis</p>
      <div className="mt-4 space-y-3">
        {[
          { label: "KPR Griya Monas", value: "18", percent: "50%", color: "bg-blue-500", icon: "⌂" },
          { label: "KPR iB Bank Jakarta Syariah", value: "12", percent: "33%", color: "bg-emerald-400", icon: "⌂" },
          { label: "KPRS FLPP", value: "6", percent: "17%", color: "bg-violet-500", icon: "⌂" },
        ].map((item) => (
          <div key={item.label} className="rounded-lg bg-[#f7faff] p-2">
            <div className="flex items-center gap-2">
              <span className={cn("flex size-7 items-center justify-center rounded-md bg-white text-base", item.color.replace("bg-", "text-"))}>
                {item.icon}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{item.label}</p>
                <p className="text-sm text-[#7183a1]">{item.value} pengajuan</p>
              </div>
              <span className="text-sm font-bold text-[#526986]">{item.percent}</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-[#e5edf7]">
              <div className={cn("h-full rounded-full", item.color)} style={{ width: item.percent }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProductDistributionCard() {
  return (
    <section className="rounded-xl border border-[#dce5f0] bg-white p-3 shadow-[0_2px_8px_rgba(22,52,91,0.03)]">
      <Chart
        title="Distribusi Jenis Produk"
        description="Proporsi pengajuan berdasarkan jenis produk"
        size={180}
        data={[
          { source: "KPR Griya Monas", values: 18 },
          { source: "KPR iB Bank Jakarta", values: 12 },
          { source: "KPRS FLPP", values: 6 },
        ]}
        centerContent={
          <div className="text-center">
            <div className="text-xl font-bold">36</div>
            <div className="text-sm text-slate-500">pengajuan</div>
          </div>
        }
        legendPosition="bottom"
      />
    </section>
  );
}

function RiskFactorCard() {
  const factors = [
    ["DTI > 40%", "8 (22%)", "bg-red-500", "45%"],
    ["Tenor > 15 tahun", "6 (17%)", "bg-orange-400", "35%"],
    ["Penghasilan tidak tetap", "4 (11%)", "bg-amber-400", "25%"],
    ["DP < 20%", "3 (8%)", "bg-emerald-500", "18%"],
  ];

  return (
    <section className="rounded-xl border border-[#dce5f0] bg-white p-3 shadow-[0_2px_8px_rgba(22,52,91,0.03)]">
      <h2 className="text-sm font-bold">Faktor Risiko Teratas</h2>
      <p className="mt-1 text-sm text-[#7183a1]">Berdasarkan analisis data nasabah</p>
      <div className="mt-5 space-y-4">
        {factors.map(([label, value, color, width]) => (
          <div key={label}>
            <div className="flex justify-between text-sm">
              <span className="font-semibold">{label}</span>
              <span className="text-[#7183a1]">{value}</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-[#e5edf7]">
              <div className={cn("h-full rounded-full", color)} style={{ width }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProductListCard() {
  const products = [
    ["KPR Griya Monas", "Fasilitas pembiayaan konvensional untuk pembelian rumah baru, bekas, take over, atau multiguna.", "18"],
    ["KPR iB Bank Jakarta Syariah", "Pembiayaan rumah dengan prinsip syariah menggunakan akad Murabahah.", "12"],
    ["KPRS FLPP", "Kredit Kepemilikan Rumah Sejahtera dengan fasilitas likuiditas pembiayaan perumahan.", "6"],
  ];

  return (
    <section className="rounded-xl border border-[#dce5f0] bg-white p-4 shadow-[0_2px_8px_rgba(22,52,91,0.03)]">
      <h2 className="text-sm font-bold">Jenis Produk KPR Bank DKI</h2>
      <div className="mt-3 space-y-3">
        {products.map(([title, description, count], index) => (
          <div key={title} className="flex gap-3 rounded-lg bg-[#f7faff] p-3">
            <div
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-lg text-lg",
                index === 0 ? "bg-blue-100 text-blue-500"
                : index === 1 ? "bg-emerald-100 text-emerald-500"
                : "bg-violet-100 text-violet-500",
              )}>
              ⌂
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex justify-between gap-2">
                <h3 className="text-sm font-bold">{title}</h3>
                <span className="text-sm text-[#7183a1]">{count}</span>
              </div>
              <p className="mt-1 text-sm leading-4 text-[#607493]">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
