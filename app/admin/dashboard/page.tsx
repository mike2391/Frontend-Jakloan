"use client";

import { useState } from "react";
import { BarChart } from "@derpdaderp/chartkit";
import {
  CalendarDays,
  Check,
  ChevronDown,
  CircleAlert,
  Download,
  FileText,
  Gauge,
  Lightbulb,
  Percent,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  TrendingUp,
  UsersRound,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";

const months = ["September 2026", "August 2026", "July 2026"];

const riskData = [
  { label: "Risiko Rendah", value: 20, color: "bg-emerald-500" },
  { label: "Risiko Sedang", value: 12, color: "bg-yellow-300" },
  { label: "Risiko Tinggi", value: 6, color: "bg-orange-500" },
  { label: "Risiko Sangat Tinggi", value: 5, color: "bg-red-500" },
];

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
  tone: "blue" | "green" | "yellow" | "red";
  down?: boolean;
}) {
  const tones = {
    blue: "bg-sky-100 text-sky-500",
    green: "bg-emerald-100 text-emerald-500",
    yellow: "bg-amber-100 text-amber-500",
    red: "bg-red-100 text-red-500",
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

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

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard icon={UsersRound} label="Total Pengajuan" value="36" change="12%" changeLabel="dari bulan lalu" tone="blue" />
            <StatCard icon={Check} label="Disetujui" value="18" change="20%" changeLabel="dari bulan lalu" tone="green" />
            <StatCard icon={CircleAlert} label="Dalam Review" value="12" change="0%" changeLabel="dari bulan lalu" tone="yellow" />
            <StatCard icon={X} label="Ditolak" value="5" change="11%" changeLabel="dari bulan lalu" tone="red" down />
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-[1.55fr_0.95fr]">
            <section className="rounded-xl border border-[#dce5f0] bg-white p-4 shadow-[0_2px_8px_rgba(22,52,91,0.03)]">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <h2 className="text-sm font-bold">Distribusi Resiko Kredit Nasabah</h2>
                  <p className="mt-1 text-sm text-[#607493]">Jumlah nasabah berdasarkan kategori risiko</p>
                </div>
                <label className="relative">
                  <span className="mr-2 text-sm text-[#8392a8]">Pilih Bulan:</span>
                  <select
                    value={selectedMonth}
                    onChange={(event) => setSelectedMonth(event.target.value)}
                    className="h-8 appearance-none rounded-lg border border-[#d9e3ef] bg-white pl-8 pr-7 text-sm font-medium text-[#172d4d] outline-none">
                    {months.map((month) => (
                      <option key={month}>{month}</option>
                    ))}
                  </select>
                  <CalendarDays className="pointer-events-none absolute left-20.5 top-1/2 size-3.5 -translate-y-1/2 text-[#506884]" />
                  <ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-3 -translate-y-1/2 text-[#506884]" />
                </label>
              </div>
              <div className="mt-5 h-42.5">
                <BarChart
                  data={riskData}
                  dataKey="value"
                  categoryKey="label"
                  theme="midnight"
                  orientation="vertical"
                  showLabels
                  barRadius={4}
                  height={170}
                />
              </div>
            </section>

            <section className="rounded-xl border border-[#dce5f0] bg-white p-4 shadow-[0_2px_8px_rgba(22,52,91,0.03)]">
              <div className="flex items-start gap-3">
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
          </div>

          <section className="mt-4 rounded-xl border border-[#dce5f0] bg-white p-4 shadow-[0_2px_8px_rgba(22,52,91,0.03)]">
            <h2 className="text-sm font-bold">Ringkasan Analisis</h2>
            <p className="mt-1 text-sm text-[#7183a1]">Beberapa poin penting dari hasil analisis periode {selectedMonth}</p>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              <SummaryItem
                icon={TrendingUp}
                value="+12%"
                title="Peningkatan Pengajuan"
                text="Jumlah pengajuan naik 12% dibanding bulan lalu, menunjukkan minat yang terus meningkat."
                color="text-emerald-500"
              />
              <SummaryItem
                icon={ShieldCheck}
                value="56%"
                title="Tingkat Persetujuan"
                text="Lebih dari setengah pengajuan berhasil disetujui, meningkat 3% dari bulan lalu."
                color="text-emerald-500"
              />
              <SummaryItem
                icon={Gauge}
                value="DTI 32%"
                title="Profil Risiko Stabil"
                text="Rata-rata rasio cicilan terhadap penghasilan dalam batas aman."
                color="text-blue-500"
              />
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

function SummaryItem({
  icon: Icon,
  value,
  title,
  text,
  color,
}: {
  icon: typeof TrendingUp;
  value: string;
  title: string;
  text: string;
  color: string;
}) {
  return (
    <div className="rounded-lg border border-[#dce5f0] p-3">
      <div className={cn("flex items-center gap-2", color)}>
        <Icon className="size-4" />
        <span className="text-base font-bold text-[#172d4d]">{value}</span>
      </div>
      <h3 className="mt-2 text-sm font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-4 text-[#607493]">{text}</p>
    </div>
  );
}
