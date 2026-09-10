"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  CircleAlert,
  CircleHelp,
  ClipboardList,
  Home,
  Info,
  RotateCcw,
  Save,
  TrendingUp,
  WalletCards,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import StressScenarioModal from "../Components/StressScenarioModal";
import type { StressTheme } from "../Components/StressCell";

function Metric({
  label,
  value,
  detail,
  icon: Icon,
}: {
  label: string;
  value: string;
  detail?: string;
  icon?: typeof WalletCards;
}) {
  return (
    <div className="border-r border-slate-200 px-4 last:border-0">
      <div className="flex items-center gap-1 text-[10px] font-medium text-slate-500">
        {label}
        {Icon && <Icon className="size-3 text-slate-400" />}
      </div>
      <p className="mt-1 text-sm font-bold text-slate-900">{value}</p>
      {detail && <p className="text-[10px] text-slate-500">{detail}</p>}
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
      className="flex w-full items-center justify-between border-b border-slate-200 px-5 py-4 text-left transition-colors hover:bg-slate-50"
    >
      <span className="flex items-center gap-3 text-sm font-semibold text-slate-800">
        <Icon className="size-4 text-[#ef2b1f]" />
        {index}. {title}
      </span>
      <ChevronDown
        className={cn(
          "size-4 text-slate-400 transition-transform",
          open && "rotate-180",
        )}
      />
    </button>
  );
}

export default function ResultKPRPage() {
  const [openSection, setOpenSection] = useState(1);
  const [saved, setSaved] = useState(false);
  const [selectedStressCell, setSelectedStressCell] =
    useState<StressTheme | null>(null);

  const toggleSection = (section: number) =>
    setOpenSection((current) => (current === section ? 0 : section));

  return (
    <main className="min-h-screen bg-[#f7f9fb] pb-24 font-poppins text-slate-900">
      <header className="border-b border-slate-200 bg-white px-5 py-4 sm:px-8">
        <div className="mx-auto flex max-w-360 items-center justify-between gap-6">
          <Image
            src="/jakloan-logo.png"
            alt="Jakloan"
            width={260}
            height={80}
            className="h-8 w-auto object-contain sm:h-10"
          />
          <div className="hidden items-center gap-7 text-xs font-semibold text-slate-500 md:flex">
            <span>Home</span>
            <span>Product</span>
            <span className="text-[#ef2b1f]">Calculator</span>
            <span>Contact Us</span>
          </div>
          <Button className="h-9 rounded-md bg-[#ef2b1f] px-4 text-xs font-semibold hover:bg-[#d92117]">
            Ajukan KPR
          </Button>
        </div>
      </header>

      <section className="relative isolate overflow-hidden border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-360 items-center gap-5 px-5 pt-8 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pt-10">
          <div className="relative z-10 pb-8 lg:pb-12">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ef2b1f]">
              KPR Griya Monas
            </p>
            <h1 className="max-w-xl text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Simulation for Every Plan
            </h1>
            <p className="mt-3 max-w-lg text-xs leading-5 text-slate-500 sm:text-sm">
              Simulasi KPR Griya Monas untuk membantu Anda merencanakan
              pembiayaan rumah dengan lebih percaya diri.
            </p>
            <div className="mt-5 flex w-fit items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[10px] text-slate-500 shadow-sm">
              <CircleAlert className="size-3 text-[#ef2b1f]" /> Hasil simulasi
              bersifat estimasi dan bukan merupakan persetujuan kredit.
            </div>
          </div>
          <div className="relative hidden h-48 lg:block lg:h-60">
            <Image
              src="/building.png"
              alt="Modern home"
              fill
              className="object-contain object-bottom-right"
              priority
            />
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-360 gap-4 px-3 py-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.18fr)]">
        <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4">
            <div className="flex items-center gap-2 text-sm font-bold">
              <UsersIcon /> 1. Profil Finansial
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <ReadOnlyField
                label="Penghasilan Bulanan (Anda)"
                value="15.000.000"
              />
              <ReadOnlyField
                label="Penghasilan Bulanan (Pasangan)"
                value="7.000.000"
              />
              <ReadOnlyField
                label="Cicilan / Utang Berjalan per Bulan"
                value="2.000.000"
              />
              <ReadOnlyField
                label="Status Pekerjaan"
                value="Karyawan Swasta"
                select
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 rounded-md bg-slate-50 p-3 sm:grid-cols-4">
              <MiniStat label="Total Penghasilan" value="Rp22.000.000" />
              <MiniStat label="Total Kewajiban" value="Rp2.000.000" />
              <MiniStat label="DSR Saat Ini" value="9,1%" accent />
              <MiniStat
                label="Sisa Kapasitas Cicilan"
                value="Rp5.333.333"
                detail="(24,2%)"
              />
            </div>
            <div className="mt-4 flex justify-end">
              <Button className="h-9 rounded-md bg-[#ef2b1f] px-5 text-xs font-semibold hover:bg-[#d92117]">
                Selanjutnya <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>
          </div>

          <SectionRow
            index={2}
            title="Properti"
            icon={Home}
            open={openSection === 2}
            onClick={() => toggleSection(2)}
          />
          {openSection === 2 && (
            <div className="grid gap-3 bg-slate-50 px-5 py-4 sm:grid-cols-2">
              <ReadOnlyField label="Jenis Properti" value="Rumah" />
              <ReadOnlyField label="Lokasi" value="Jakarta Selatan" />
              <ReadOnlyField label="Harga Properti" value="900.000.000" />
              <ReadOnlyField label="Status" value="Baru" />
            </div>
          )}

          <SectionRow
            index={3}
            title="Pembiayaan"
            icon={WalletCards}
            open={openSection === 3}
            onClick={() => toggleSection(3)}
          />
          {openSection === 3 && (
            <div className="grid gap-3 bg-slate-50 px-5 py-4 sm:grid-cols-2">
              <ReadOnlyField label="Uang Muka" value="90.000.000" />
              <ReadOnlyField label="Jumlah Pinjaman" value="810.000.000" />
              <ReadOnlyField label="Tenor" value="15 Tahun" />
            </div>
          )}

          <SectionRow
            index={4}
            title="Suku Bunga"
            icon={TrendingUp}
            open={openSection === 4}
            onClick={() => toggleSection(4)}
          />
          {openSection === 4 && (
            <div className="grid gap-3 bg-slate-50 px-5 py-4 sm:grid-cols-2">
              <ReadOnlyField
                label="Jenis Suku Bunga"
                value="Fixed → Floating"
              />
              <ReadOnlyField label="Suku Bunga" value="5,25%" />
              <ReadOnlyField label="Masa Fixed Rate" value="3 Tahun" />
            </div>
          )}
        </section>

        <section className="space-y-3">
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between bg-slate-950 px-4 py-3 text-white">
              <h2 className="text-xs font-bold">Ringkasan Simulasi</h2>
              <button
                type="button"
                onClick={() => setSaved(false)}
                className="flex items-center gap-1 text-[10px] text-slate-300 hover:text-white"
              >
                <RotateCcw className="size-3" /> Reset Simulasi
              </button>
            </div>
            <div className="grid grid-cols-2 divide-x divide-y divide-slate-200 sm:grid-cols-4 sm:divide-y-0">
              <Metric
                label="Estimasi Cicilan Bulanan"
                value="Rp4.873.000"
                detail="Fixed 3 Tahun"
                icon={CircleHelp}
              />
              <Metric
                label="Cicilan Setelah Floating"
                value="Rp5.612.000"
                detail="Floating Tahun ke-4"
                icon={CircleHelp}
              />
              <Metric
                label="Jumlah Pinjaman"
                value="Rp900.000.000"
                icon={Info}
              />
              <Metric label="Tenor" value="15 Tahun" icon={CalendarDays} />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-[1.05fr_1fr]">
            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-[11px] font-bold">
                Financial Fit Indicator (Simulasi)
              </p>
              <div className="mt-3 flex items-center gap-4">
                <div className="flex size-20 shrink-0 flex-col items-center justify-center rounded-full border-4 border-emerald-500 text-center">
                  <strong className="text-2xl text-emerald-600">78</strong>
                  <span className="text-[9px] text-slate-400">/100</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-emerald-600">
                    Lebih Sesuai
                  </p>
                  <p className="mt-1 text-[10px] leading-4 text-slate-500">
                    Berdasarkan data yang Anda masukkan, estimasi cicilan masih
                    dalam rentang yang relatif sesuai.
                  </p>
                  <button
                    type="button"
                    className="mt-2 text-[10px] font-semibold text-slate-700 underline"
                  >
                    Lihat Rekomendasi →
                  </button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <SummaryCard
                label="DSR (Total)"
                value="31,2%"
                detail="Acuan simulasi ≤ 33%"
                accent
              />
              <SummaryCard
                label="LTV"
                value="90%"
                detail="Batas maks. simulasi: 90%"
                accent
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <SummaryCard
              label="Dana Awal"
              value="Rp108.850.000"
              detail="5 Komponen"
            />
            <SummaryCard
              label="Total Bunga (Estimasi)"
              value="Rp478.509.000"
              detail="Selama tenor"
            />
            <SummaryCard
              label="Status"
              value="Layak"
              detail="Dengan catatan"
              accent
            />
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-500">
              Estimasi Bunga
            </h2>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">9.5%</h1>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold">Analisis Risiko</h3>
              <CircleHelp className="size-3 text-slate-400" />
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <RiskCard
                title="Risiko Affordability"
                status="Rendah"
                color="emerald"
              />
              <RiskCard
                title="Risiko Suku Bunga"
                status="Menengah"
                color="orange"
              />
              <RiskCard
                title="Risiko Properti"
                status="Menengah"
                color="amber"
              />
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold">
                Stress Test Suku Bunga (Setelah Masa Fixed)
              </h3>
              <button
                type="button"
                className="text-[10px] font-bold text-[#ef2b1f]"
                onClick={() => setSelectedStressCell("green")}
              >
                Lihat Proyeksi Per Tahun →
              </button>
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-4">
              <StressCell label="Skenario" value="Fixed (3 Tahun)" />
              <StressCell label="Suku Bunga" value="5,25%" />
              <StressCell label="Floating +1%" value="9,50%" />
              <StressCell label="Floating +2%" value="10,50%" />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-amber-100 bg-amber-50 px-4 py-3">
            <div className="flex gap-3">
              <Info className="mt-0.5 size-4 text-amber-500" />
              <div>
                <p className="text-xs font-bold">Financial Insight</p>
                <p className="mt-1 text-[10px] text-slate-600">
                  Pertimbangkan menaikkan DP untuk menurunkan cicilan bulanan.
                </p>
                <p className="text-[10px] text-slate-600">
                  Pastikan dana darurat minimal 6x cicilan untuk menghadapi
                  kondisi tak terduga.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-[0_-4px_16px_rgba(15,23,42,0.08)] backdrop-blur sm:px-8">
        <div className="mx-auto flex max-w-360 items-center justify-between gap-4">
          <div className="hidden items-center gap-8 md:flex">
            <Metric
              label="Estimasi Cicilan Bulanan (Fixed 3 Tahun)"
              value="Rp4.873.000"
            />
            <Metric label="Jumlah Pinjaman" value="Rp900.000.000" />
            <Metric label="Tenor" value="15 Tahun" />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setSaved(!saved)}
              className="h-9 rounded-md px-3 text-xs"
            >
              <Save className="mr-2 size-3" />
              {saved ? "Tersimpan" : "Simpan Simulasi"}
            </Button>
            <Button
              type="button"
              className="h-9 rounded-md bg-[#ef2b1f] px-4 text-xs font-semibold hover:bg-[#d92117]"
            >
              Ajukan KPR Griya Monas <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>
      </footer>

      {selectedStressCell && (
        <StressScenarioModal
          themeColor={selectedStressCell}
          onClose={() => setSelectedStressCell(null)}
        />
      )}
    </main>
  );
}

function ReadOnlyField({
  label,
  value,
  select,
}: {
  label: string;
  value: string;
  select?: boolean;
}) {
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

function MiniStat({
  label,
  value,
  detail,
  accent,
}: {
  label: string;
  value: string;
  detail?: string;
  accent?: boolean;
}) {
  return (
    <div className="text-center">
      <p className="text-[9px] text-slate-500">{label}</p>
      <p
        className={cn(
          "mt-1 text-[11px] font-bold",
          accent ? "text-emerald-600" : "text-slate-800",
        )}
      >
        {value}
      </p>
      {detail && <p className="text-[9px] text-slate-500">{detail}</p>}
    </div>
  );
}

function SummaryCard({
  label,
  value,
  detail,
  accent,
}: {
  label: string;
  value: string;
  detail: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
      <p className="text-[10px] text-slate-500">{label}</p>
      <p
        className={cn(
          "mt-2 text-base font-bold",
          accent ? "text-[#ef2b1f]" : "text-slate-900",
        )}
      >
        {value}
      </p>
      <p className="mt-1 text-[9px] text-slate-400">{detail}</p>
    </div>
  );
}

function RiskCard({
  title,
  status,
  color,
}: {
  title: string;
  status: string;
  color: "emerald" | "orange" | "amber";
}) {
  const styles = {
    emerald: "bg-emerald-50 text-emerald-600",
    orange: "bg-orange-50 text-orange-500",
    amber: "bg-amber-50 text-amber-500",
  };

  return (
    <div className="rounded-md border border-slate-100 p-3">
      <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-600">
        <span
          className={cn(
            "flex size-5 items-center justify-center rounded-full",
            styles[color],
          )}
        >
          <CircleAlert className="size-3" />
        </span>
        {title}
      </div>
      <p className={cn("mt-3 text-xs font-bold", styles[color].split(" ")[1])}>
        {status}
      </p>
      <p className="mt-1 text-[9px] leading-4 text-slate-400">
        Terdapat potensi perubahan yang perlu diperhatikan.
      </p>
    </div>
  );
}

function StressCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-slate-50 p-3">
      <p className="text-[9px] text-slate-400">{label}</p>
      <p className="mt-2 text-[11px] font-bold text-slate-700">{value}</p>
    </div>
  );
}

function UsersIcon() {
  return <ClipboardList className="size-4 text-[#ef2b1f]" />;
}
