"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, ChevronDown, CircleAlert, CircleHelp, Info, ClipboardList, Home, RotateCcw, Save, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { LineChart, ProgressRing } from "@derpdaderp/chartkit";
import { Button } from "@/components/ui/button";
import Header from "../Components/Header";
import Chart from "../Components/Chart";
import StressCell, { type StressTheme } from "../Components/StressCell";
import StressScenarioModal from "../Components/StressScenarioModal";

// const data = [
//   { time: "09:00", p50: 1.5, p95: 2.1, p99: 3.2 },
//   { time: "10:00", p50: 1.8, p95: 2.4, p99: 3.8 },
//   { time: "11:00", p50: 1.6, p95: 2.2, p99: 3.5 },
//   // ...more data points
// ];

// const series = [
//   { key: "p50", label: "p50", displayValue: "1.8 ms" },
//   { key: "p95", label: "p95", displayValue: "2.3 ms" },
//   { key: "p99", label: "p99", displayValue: "3.5 ms" },
// ];

function Metric({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return (
    <div className="border-r border-slate-200 px-4 last:border-0">
      <div className="flex items-center gap-1 text-base font-medium text-slate-500">
        {label}
        {/* {Icon && <Icon className="size-3 text-slate-400" />} */}
      </div>
      <p className="mt-1 text-lg font-bold text-slate-900">{value}</p>
      {detail && <p className="text-sm text-slate-500">{detail}</p>}
    </div>
  );
}

function SectionRow({
  index,
  title,
  icon: Icon,
  open,
  onClick,
}: {
  index: number;
  title: string;
  icon: typeof Home;
  open: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between border-b border-slate-200 px-5 py-4 text-left transition-colors hover:bg-slate-50">
      <span className="flex items-center gap-3 text-sm font-semibold text-slate-800">
        <Icon className="size-4 text-[#ef2b1f]" />
        {index}. {title}
      </span>
      <ChevronDown className={cn("size-4 text-slate-400 transition-transform", open && "rotate-180")} />
    </button>
  );
}

export default function ResultKPRPage() {
  const [saved, setSaved] = useState(false);
  const [selectedStressCell, setSelectedStressCell] = useState<StressTheme | null>(null);

  return (
    <main className="min-h-screen w-9/10 mx-auto pb-24 font-poppins text-slate-900 mt-14">
      <Header />

      <section className="mt-20 w-full">
        <div className="flex flex-row">
          <div className="w-3/5">
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">Plan Your Loan, Get Your Own</h1>
            <p className="mt-3 text-xs leading-5 text-slate-500 sm:text-base">
              KPR Griya Monas merupakan jenis pinjaman atau kredit pemilikan rumah yang diberikan <br /> oleh Bank DKI untuk Pembelian dan Non
              Pembelian atas Rumah Tapak (KPR), Rumah Toko (KPR Ruko) <br /> dan/atau Rumah Kantor (KPR Rukan).
            </p>
            <div className="mt-5 flex w-fit items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500 shadow-sm">
              <CircleAlert className="size-3 text-[#ef2b1f]" /> Hasil simulasi bersifat estimasi dan bukan merupakan persetujuan kredit.
            </div>
          </div>

          <div className="w-2/5">
            <Image src="/building.png" alt="Modern home" className=" w-full h-auto" priority width={1920} height={1080} />
          </div>
        </div>
      </section>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm mt-10">
        <div className="flex items-center justify-between bg-slate-950 px-4 py-3 text-white">
          <h2 className="font-bold">Ringkasan Simulasi</h2>
          <button type="button" onClick={() => setSaved(false)} className="flex items-center gap-1 text-[10px] text-slate-300 hover:text-white">
            <RotateCcw className="size-3" /> Reset Simulasi
          </button>
        </div>
        <div className="grid grid-cols-2 divide-x divide-y divide-slate-200 sm:grid-cols-4 sm:divide-y-0 my-5">
          <Metric label="Estimasi Cicilan Bulanan" value="Rp4.873.000" detail="Fixed 3 Tahun" />
          <Metric label="Cicilan Setelah Floating" value="Rp5.612.000" detail="Floating Tahun ke-4" />
          <Metric label="Jumlah Pinjaman" value="Rp900.000.000" />
          <Metric label="Tenor" value="15 Tahun" />
        </div>
      </div>

      <section className="space-y-3 mt-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-base font-bold">Financial Fit Indicator</p>
            <div className="mt-3 flex items-center gap-4">
              <ProgressRing value={72} theme="sunset" size={150} strokeWidth={10} showValue className="shrink-0" />
              <div>
                <p className="text-base font-bold text-emerald-600">Lebih Sesuai</p>
                <p className="mt-1 text-sm leading-4 text-slate-500">
                  Berdasarkan data yang Anda masukkan, estimasi cicilan masih dalam rentang yang relatif sesuai.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm flex flex-row">
            <Chart
              title="Income to Expense Ratio"
              description="Expense and income distribution"
              data={[
                { source: "Expense", visits: 40 },
                { source: "Income", visits: 60 },
              ]}
              centerContent={
                <div className="text-center">
                  <div className="text-lg font-bold">40 / 60</div>
                  <div className="text-xs text-slate-500">Expense / Income</div>
                </div>
              }
            />
            <p className="ml-4 self-center text-slate-500 text-sm">
              Rasio penghasilan dan pengeluaran anda cukup baik. Bila anda mengambil program KPR ini, anda tidak berisiko terkena &quot;Credit
              Default&quot;
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-500">Loan to Income Ratio</h2>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">50%</h1>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-500">Debt to Service Ratio</h2>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">50%</h1>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-500">Dana Awal</h2>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Rp. 56.000.000</h1>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-500">Estimasi Bunga</h2>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">9.5%</h1>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold">Analisis Risiko</h3>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <RiskCard title="Risiko Affordability" status="Rendah" color="emerald" />
            <RiskCard title="Risiko Suku Bunga" status="Menengah" color="orange" />
            <RiskCard title="Risiko Properti" status="Menengah" color="amber" />
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold">Skenario Cicilan Berdasarkan Jenis Risiko</h3>
          </div>
          {/* <div className="mt-3 overflow-hidden rounded-md border border-slate-200 bg-slate-950 p-3">
            <LineChart data={data} series={series} theme="sunset" unit="ms" />
          </div> */}
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            <StressCell
              value="Risiko Rendah"
              themeColor="green"
              description="analisa risiko bila kondisi bunga floating tidak berubah terlalu agresif"
              onClick={() => setSelectedStressCell("green")}
            />
            <StressCell
              value="Risiko Sedang"
              themeColor="yellow"
              description="analisa risiko bila kondisi bunga floating naik secara normal"
              onClick={() => setSelectedStressCell("yellow")}
            />
            <StressCell
              value="Risiko Tinggi"
              themeColor="red"
              description="analisa risiko bila kondisi bunga floating berubah dengan agresif karena kondisi ekonomi negara buruk"
              onClick={() => setSelectedStressCell("red")}
            />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-amber-200 bg-amber-100 px-4 py-3">
          <div className="flex gap-3">
            <div>
              <p className="text-base font-bold">Financial Insight (AI Assistant)</p>
              <p className="mt-1 text-sm text-slate-600">Pertimbangkan menaikkan DP untuk menurunkan cicilan bulanan.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-[0_-4px_16px_rgba(15,23,42,0.08)] backdrop-blur sm:px-8">
        <div className="mx-auto flex max-w-360 items-center justify-between gap-4">
          <div className="hidden items-center gap-8 md:flex">
            <Metric label="Estimasi Cicilan Bulanan (Fixed 3 Tahun)" value="Rp4.873.000" />
            <Metric label="Jumlah Pinjaman" value="Rp900.000.000" />
            <Metric label="Tenor" value="15 Tahun" />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button type="button" variant="outline" onClick={() => setSaved(!saved)} className="h-9 rounded-md px-3 text-xs">
              <Save className="mr-2 size-3" />
              {saved ? "Tersimpan" : "Simpan Simulasi"}
            </Button>
            <Button type="button" className="h-9 rounded-md bg-[#ef2b1f] px-4 text-xs font-semibold hover:bg-[#d92117]">
              Ajukan KPR Griya Monas <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>
      </footer>

      {selectedStressCell && <StressScenarioModal themeColor={selectedStressCell} onClose={() => setSelectedStressCell(null)} />}
    </main>
  );
}

function ReadOnlyField({ label, value, select }: { label: string; value: string; select?: boolean }) {
  return (
    <div>
      <label className="mb-1 flex items-center gap-1 text-[10px] font-medium text-slate-500">
        {label}
        <CircleHelp className="size-3 text-slate-400" />
      </label>
      <div className="flex h-9 items-center justify-between rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700">
        <span>
          {select ? "Rp   " : ""}
          {value}
        </span>
        {select && <ChevronDown className="size-3 text-slate-400" />}
      </div>
    </div>
  );
}

function MiniStat({ label, value, detail, accent }: { label: string; value: string; detail?: string; accent?: boolean }) {
  return (
    <div className="text-center">
      <p className="text-[9px] text-slate-500">{label}</p>
      <p className={cn("mt-1 text-[11px] font-bold", accent ? "text-emerald-600" : "text-slate-800")}>{value}</p>
      {detail && <p className="text-[9px] text-slate-500">{detail}</p>}
    </div>
  );
}

function SummaryCard({ label, value, detail, accent }: { label: string; value: string; detail: string; accent?: boolean }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
      <p className="text-[10px] text-slate-500">{label}</p>
      <p className={cn("mt-2 text-base font-bold", accent ? "text-[#ef2b1f]" : "text-slate-900")}>{value}</p>
      <p className="mt-1 text-[9px] text-slate-400">{detail}</p>
    </div>
  );
}

function RiskCard({ title, status, color }: { title: string; status: string; color: "emerald" | "orange" | "amber" }) {
  const styles = { emerald: "bg-emerald-50 text-emerald-600", orange: "bg-orange-50 text-orange-500", amber: "bg-amber-50 text-amber-500" };
  return (
    <div className="rounded-md border border-slate-200 p-3">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
        <span className={cn("flex size-5 items-center justify-center rounded-full", styles[color])}>
          <CircleAlert className="size-3" />
        </span>
        {title}
      </div>
      <p className={cn("mt-3 text-sm font-bold", styles[color].split(" ")[1])}>{status}</p>
      <p className="mt-1 text-sm leading-4 text-slate-400">Terdapat potensi perubahan yang perlu diperhatikan.</p>
    </div>
  );
}

function UsersIcon() {
  return <ClipboardList className="size-4 text-[#ef2b1f]" />;
}
