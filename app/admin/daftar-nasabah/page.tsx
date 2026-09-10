"use client";

import { useMemo, useState } from "react";
import { CalendarDays, ChevronDown, ChevronLeft, ChevronRight, Plus, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import Header from "../dashboard/Components/Header";
import Sidebar from "../dashboard/Components/Sidebar";

type Status = "Dalam Review" | "Perlu Dokumen" | "Disetujui" | "Ditolak";
type StatusTab = "Semua" | Status;

type Customer = {
  applicationNumber: string;
  name: string;
  nik: string;
  date: string;
  product: string;
  amount: string;
  score: number;
  status: Status;
};

const customers: Customer[] = [
  {
    applicationNumber: "JK302609070013",
    name: "Andi Pratama",
    nik: "317501001188001",
    date: "7 Sep 2026",
    product: "KPR Rumah Baru",
    amount: "Rp 965.000.000",
    score: 750,
    status: "Dalam Review",
  },
  {
    applicationNumber: "JK302609060011",
    name: "Siti Rahmawati",
    nik: "3175030805930002",
    date: "6 Sep 2026",
    product: "KPR Second",
    amount: "Rp 785.000.000",
    score: 650,
    status: "Perlu Dokumen",
  },
  {
    applicationNumber: "JK302609050010",
    name: "Budi Santoso",
    nik: "3175031708890003",
    date: "5 Sep 2026",
    product: "KPR Rumah Baru",
    amount: "Rp 1.250.000.000",
    score: 820,
    status: "Disetujui",
  },
  {
    applicationNumber: "JK302609040009",
    name: "Rina Oktaviani",
    nik: "3175040906920004",
    date: "4 Sep 2026",
    product: "KPR Refinancing",
    amount: "Rp 585.000.000",
    score: 590,
    status: "Dalam Review",
  },
  {
    applicationNumber: "JK302609030008",
    name: "Dimas Setiawan",
    nik: "3175021010850005",
    date: "3 Sep 2026",
    product: "KPR Rumah Baru",
    amount: "Rp 895.000.000",
    score: 720,
    status: "Dalam Review",
  },
  {
    applicationNumber: "JK302609020007",
    name: "Maya Sari",
    nik: "3175054412950006",
    date: "2 Sep 2026",
    product: "KPR Second",
    amount: "Rp 620.000.000",
    score: 560,
    status: "Ditolak",
  },
  {
    applicationNumber: "JK302609010006",
    name: "Agus Wibowo",
    nik: "3175071109880007",
    date: "1 Sep 2026",
    product: "KPR Rumah Baru",
    amount: "Rp 1.100.000.000",
    score: 800,
    status: "Disetujui",
  },
  {
    applicationNumber: "JK302608310005",
    name: "Putri Ananda",
    nik: "3175086704980008",
    date: "31 Agst 2026",
    product: "KPR Refinancing",
    amount: "Rp 450.000.000",
    score: 610,
    status: "Perlu Dokumen",
  },
  {
    applicationNumber: "JK302608300004",
    name: "Rizky Maulana",
    nik: "3175092002900009",
    date: "30 Agst 2026",
    product: "KPR Rumah Baru",
    amount: "Rp 980.000.000",
    score: 700,
    status: "Dalam Review",
  },
  {
    applicationNumber: "JK302608290003",
    name: "Nadia Kartika",
    nik: "3175101503910010",
    date: "29 Agst 2026",
    product: "KPR Second",
    amount: "Rp 720.000.000",
    score: 640,
    status: "Dalam Review",
  },
];

const tabs: { label: StatusTab; count: number }[] = [
  { label: "Semua", count: 36 },
  { label: "Dalam Review", count: 12 },
  { label: "Disetujui", count: 10 },
  { label: "Ditolak", count: 5 },
  { label: "Perlu Dokumen", count: 9 },
];

const statusStyles: Record<Status, string> = {
  "Dalam Review": "bg-yellow-100 text-yellow-700",
  "Perlu Dokumen": "bg-[#f6e7d2] text-[#a25f22]",
  Disetujui: "bg-emerald-100 text-emerald-600",
  Ditolak: "bg-red-100 text-red-600",
};

const tabActiveStyles: Record<StatusTab, string> = {
  Semua: "border-[#70a2ff] bg-blue-50 text-[#1769ed]",
  "Dalam Review": "border-yellow-300 bg-yellow-50 text-yellow-700",
  Disetujui: "border-emerald-300 bg-emerald-50 text-emerald-700",
  Ditolak: "border-red-300 bg-red-50 text-red-700",
  "Perlu Dokumen": "border-[#e7c69f] bg-[#fdf5ea] text-[#a25f22]",
};

export default function DaftarNasabahPage() {
  const [activeNav, setActiveNav] = useState("Daftar Nasabah");
  const [activeTab, setActiveTab] = useState<StatusTab>("Semua");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua Status");
  const [productFilter, setProductFilter] = useState("Semua Jenis");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const filteredCustomers = useMemo(
    () =>
      customers.filter((customer) => {
        const matchesTab = activeTab === "Semua" || customer.status === activeTab;
        const matchesStatus = statusFilter === "Semua Status" || customer.status === statusFilter;
        const matchesProduct = productFilter === "Semua Jenis" || customer.product === productFilter;
        const query = search.toLowerCase();
        const matchesSearch =
          !query ||
          customer.name.toLowerCase().includes(query) ||
          customer.nik.includes(query) ||
          customer.applicationNumber.toLowerCase().includes(query);
        return matchesTab && matchesStatus && matchesProduct && matchesSearch;
      }),
    [activeTab, productFilter, search, statusFilter],
  );

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
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Daftar Nasabah Pengajuan KPR</h1>
              <p className="mt-1 text-sm text-[#607493]">Kelola dan pantau seluruh pengajuan KPR dari nasabah Anda di Bank Jakarta</p>
            </div>
            <button
              type="button"
              className="flex h-10 items-center justify-center gap-2 rounded-full bg-[#1769ed] px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#0e58cc]">
              <Plus className="size-4" /> Tambah Pengajuan
            </button>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            {tabs.map(({ label, count }) => (
              <button
                key={label}
                type="button"
                onClick={() => setActiveTab(label)}
                className={cn(
                  "flex h-9 items-center justify-between gap-4 rounded-lg border px-3 text-sm font-semibold transition-colors sm:min-w-36",
                  activeTab === label ? tabActiveStyles[label] : "border-[#dce5f0] bg-white text-[#7183a1] hover:border-[#9abcf0]",
                )}>
                <span>{label}</span>
                <span
                  className={cn(
                    "rounded-md px-2 py-0.5 text-sm",
                    activeTab === label && label !== "Semua" ? statusStyles[label]
                    : activeTab === label ? "bg-[#1769ed] text-white"
                    : "bg-[#f1f5fa] text-[#7183a1]",
                  )}>
                  {count}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-4 grid gap-4 rounded-xl border border-[#dce5f0] bg-white p-4 sm:grid-cols-2 lg:grid-cols-4">
            <FilterSelect
              label="Tanggal Pengajuan"
              icon={<CalendarDays className="size-4" />}
              value="Pilih tanggal"
              options={["Pilih tanggal", "1 Sep 2026", "7 Sep 2026"]}
            />
            <FilterSelect
              label="Status"
              value={statusFilter}
              options={["Semua Status", "Dalam Review", "Perlu Dokumen", "Disetujui", "Ditolak"]}
              onChange={setStatusFilter}
            />
            <FilterSelect
              label="Jenis KPR"
              value={productFilter}
              options={["Semua Jenis", "KPR Rumah Baru", "KPR Second", "KPR Refinancing"]}
              onChange={setProductFilter}
            />
            <label className="relative block lg:col-span-1">
              <span className="mb-2 block text-sm font-medium text-[#7183a1]">Cari Data</span>
              <Search className="absolute left-3 top-10 size-4 text-[#8191a8]" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Cari nama, NIK, atau nomor aplikasi..."
                className="h-9 w-full rounded-lg bg-[#f1f5fa] pl-9 pr-3 text-sm outline-none placeholder:text-[#9aa8ba] focus:ring-2 focus:ring-[#dbe8f7]"
              />
            </label>
          </div>

          <div className="mt-4 overflow-hidden rounded-xl border border-[#dce5f0] bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-265 border-collapse text-left">
                <thead>
                  <tr className="border-b border-[#dce5f0] bg-[#fbfcfe] text-sm font-semibold text-[#61748f]">
                    {[
                      "No",
                      "No. Aplikasi",
                      "Nama Nasabah",
                      "NIK",
                      "Tgl Pengajuan",
                      "Jenis KPR",
                      "Nilai Pengajuan",
                      "Skor Kredit",
                      "Status",
                      "Aksi",
                    ].map((heading) => (
                      <th key={heading} className="px-4 py-4">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer, index) => (
                    <tr key={customer.applicationNumber} className="border-b border-[#e7edf4] text-sm last:border-0 hover:bg-[#f8fbff]">
                      <td className="px-4 py-4 text-[#8191a8]">{index + 1}</td>
                      <td className="px-4 py-4 font-bold text-[#2d405e]">{customer.applicationNumber}</td>
                      <td className="px-4 py-4 font-semibold">{customer.name}</td>
                      <td className="px-4 py-4 text-[#8191a8]">{customer.nik}</td>
                      <td className="whitespace-nowrap px-4 py-4">{customer.date}</td>
                      <td className="max-w-28 px-4 py-4 leading-4">{customer.product}</td>
                      <td className="whitespace-nowrap px-4 py-4 font-bold">{customer.amount}</td>
                      <td className="px-4 py-4 font-bold">{customer.score}</td>
                      <td className="px-4 py-4">
                        <span className={cn("whitespace-nowrap rounded-md px-2 py-1 text-sm font-semibold", statusStyles[customer.status])}>
                          {customer.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4">
                        <button type="button" className="text-sm font-bold text-[#1769ed] hover:underline">
                          Lihat Detail &gt;
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col justify-between gap-3 px-4 py-4 text-sm text-[#8191a8] sm:flex-row sm:items-center">
              <span>Menampilkan 1 - {filteredCustomers.length} dari 36 data</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Halaman sebelumnya"
                  className="flex size-7 items-center justify-center rounded-md border border-[#dce5f0] hover:bg-[#f1f5fa]">
                  <ChevronLeft className="size-4" />
                </button>
                <button type="button" className="flex size-7 items-center justify-center rounded-md bg-[#1769ed] text-sm font-semibold text-white">
                  1
                </button>
                <button
                  type="button"
                  className="flex size-7 items-center justify-center rounded-md border border-[#dce5f0] text-sm hover:bg-[#f1f5fa]">
                  2
                </button>
                <button
                  type="button"
                  className="flex size-7 items-center justify-center rounded-md border border-[#dce5f0] text-sm hover:bg-[#f1f5fa]">
                  3
                </button>
                <button
                  type="button"
                  aria-label="Halaman berikutnya"
                  className="flex size-7 items-center justify-center rounded-md border border-[#dce5f0] hover:bg-[#f1f5fa]">
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function FilterSelect({
  label,
  value,
  options,
  icon,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  icon?: React.ReactNode;
  onChange?: (value: string) => void;
}) {
  return (
    <label className="relative block">
      <span className="mb-2 block text-sm font-medium text-[#7183a1]">{label}</span>
      {icon && <span className="pointer-events-none absolute left-3 top-10 text-[#7183a1]">{icon}</span>}
      <select
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        className={cn(
          "h-9 w-full cursor-pointer appearance-none rounded-lg border border-[#dce5f0] bg-white pr-8 text-sm text-[#526986] outline-none focus:border-[#70a2ff]",
          icon ? "pl-9" : "pl-3",
        )}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-10 size-4 text-[#7183a1]" />
    </label>
  );
}
