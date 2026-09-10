"use client";

import Image from "next/image";
import Link from "next/link";
import { use, useState } from "react";
import { ArrowLeft, Check, CheckCircle2, FileText, Mail, MapPin, Phone, Plus, UserRound, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProgressRing } from "@derpdaderp/chartkit";
import Header from "../../dashboard/Components/Header";
import Sidebar from "../../dashboard/Components/Sidebar";

type DetailData = {
  applicationNumber: string;
  name: string;
  nik: string;
  date: string;
  status: "Dalam Review" | "Perlu Dokumen" | "Disetujui" | "Ditolak";
  score: number;
  product: string;
  amount: string;
};

const customerDetails: Record<string, DetailData> = {
  JK302609070013: {
    applicationNumber: "JK202609070012",
    name: "Andi Pratama",
    nik: "317501001900001",
    date: "7 Sep 2026, 09:14 WIB",
    status: "Dalam Review",
    score: 780,
    product: "KPR Rumah Baru",
    amount: "Rp 960.000.000",
  },
};

const fallbackCustomer: DetailData = {
  applicationNumber: "JK202609070012",
  name: "Andi Pratama",
  nik: "317501001900001",
  date: "7 Sep 2026, 09:14 WIB",
  status: "Dalam Review",
  score: 780,
  product: "KPR Rumah Baru",
  amount: "Rp 960.000.000",
};

const statusStyles = {
  "Dalam Review": "bg-yellow-100 text-yellow-700",
  "Perlu Dokumen": "bg-orange-100 text-orange-600",
  Disetujui: "bg-emerald-100 text-emerald-600",
  Ditolak: "bg-red-100 text-red-600",
};

export default function NasabahDetailPage({ params }: { params: Promise<{ nasabahId: string }> }) {
  const { nasabahId } = use(params);
  const customer = customerDetails[nasabahId] ?? fallbackCustomer;
  const [activeNav, setActiveNav] = useState("Daftar Nasabah");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [decision, setDecision] = useState(customer.status);

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
        <div className="mx-auto w-9/10 px-5 py-5 sm:px-8 lg:px-10">
          <Link href="/admin/daftar-nasabah" className="flex items-center gap-1 text-sm font-medium text-[#1769ed] hover:underline">
            <ArrowLeft className="size-3" /> Kembali ke Daftar Pengajuan
          </Link>
          <div className="mt-1 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Detail Pengajuan KPR</h1>
            <div className="flex items-center gap-4 text-sm">
              <span className={cn("rounded-lg px-4 py-2 font-semibold", statusStyles[decision])}>{decision}</span>
              <div>
                <p className="font-bold">No. Aplikasi: {customer.applicationNumber}</p>
                <p className="text-[#8191a8]">Diajukan pada: {customer.date}</p>
              </div>
            </div>
          </div>

          <section className="mt-5 grid gap-5 rounded-xl border border-[#dce5f0] bg-white p-4 shadow-[0_2px_8px_rgba(22,52,91,0.03)] lg:grid-cols-[1.1fr_0.95fr_1.05fr]">
            <div className="flex gap-4 border-b border-[#e6edf5] pb-4 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-5">
              <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-[#dce5df] text-[#23415f]">
                <UserRound className="size-8" />
              </div>
              <div className="space-y-2 text-sm">
                <h2 className="text-lg font-bold">{customer.name}</h2>
                <p className="flex items-center gap-2">
                  <FileText className="size-3.5 text-[#607493]" /> NIK {customer.nik}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="size-3.5 text-[#607493]" /> 0812 3456 7890
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="size-3.5 text-[#607493]" /> andi.pratama@gmail.com
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="size-3.5 text-[#607493]" /> Jakarta Selatan, DKI Jakarta
                </p>
              </div>
            </div>
            <InfoList
              items={[
                ["Tanggal Lahir", "1 Jan 1990 (36 tahun)"],
                ["Status Pernikahan", "Menikah"],
                ["Pekerjaan", "Karyawan Swasta"],
                ["Nama Perusahaan", "PT Maju Bersama"],
              ]}
            />
            <InfoList
              items={[
                ["Penghasilan Bulanan", "Rp 25.000.000"],
                ["Penghasilan Pasangan", "Rp 10.000.000"],
                ["Total Penghasilan", "Rp 35.000.000"],
                ["Cicilan Aktif Lainnya", "Rp 5.000.000"],
              ]}
            />
          </section>

          <div className="mt-3 grid gap-3 lg:grid-cols-[1.05fr_1.7fr_0.95fr]">
            <section className="rounded-xl border border-[#dce5f0] bg-white p-4">
              <h2 className="text-base font-bold">Tujuan KPR</h2>
              <p className="mt-3 text-sm font-bold text-emerald-600">Pembelian Rumah Baru</p>
              <InfoList
                items={[
                  ["Harga Properti", "Rp 1.200.000.000"],
                  ["Uang Muka (DP)", "Rp 240.000.000 (20%)"],
                  ["Jumlah Kredit", customer.amount],
                  ["Tenor", "20 Tahun"],
                  ["Jenis Suku Bunga", "Fixed 3 Tahun (3,75%)"],
                ]}
              />
            </section>
            <section className="rounded-xl border border-[#dce5f0] bg-[#f4f1ff] p-4">
              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-lg bg-violet-600 text-white">AI</span>
                <h2 className="text-base font-bold">Ringkasan AI</h2>
              </div>
              <div className="mt-4 flex gap-3 rounded-lg bg-emerald-100 p-3 text-sm">
                <CheckCircle2 className="size-5 shrink-0 text-emerald-600" />
                <p>
                  Nasabah ini dinilai cocok untuk diberikan fasilitas KPR dengan tetap memperhatikan dokumen pendukung dan hasil verifikasi akhir.
                </p>
              </div>
              <p className="mt-4 text-sm leading-5 text-[#607493]">
                Berdasarkan analisis data penghasilan, rasio cicilan, riwayat kredit, dan stabilitas pekerjaan, nasabah memiliki profil risiko rendah
                dan kemampuan bayar yang baik. Tidak ditemukan indikasi negatif yang signifikan.
              </p>
            </section>
            <section className="rounded-xl border border-[#dce5f0] bg-white p-4">
              <h2 className="text-base font-bold">Faktor Pertimbangan AI</h2>
              <ul className="mt-3 space-y-3 text-sm text-[#607493]">
                {[
                  "Penghasilan stabil dan di atas rata-rata",
                  "Rasio cicilan terhadap penghasilan (DTI) 28% (aman)",
                  "Riwayat kredit baik (tidak ada tunggakan)",
                  "Masa kerja > 3 tahun",
                  "Nilai properti dan DP sesuai ketentuan",
                  "Usia dan tenor masih dalam batas aman",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <Check className="size-4 shrink-0 text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="mt-3 flex flex-row gap-3">
            <section className="rounded-xl border border-[#dce5f0] bg-white p-4 w-3/7">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold">Skor Kredit Nasabah</h2>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-600">Risiko Rendah</span>
              </div>
              <div className="mt-4 flex items-center justify-center gap-4">
                <ProgressRing
                  min={0}
                  max={850}
                  value={customer.score}
                  theme="sunset"
                  color={
                    customer.score >= 760 ? "#1FA955"
                    : customer.score >= 660 ?
                      "#FFBB00"
                    : customer.score >= 560 ?
                      "#F87C28"
                    : "#F02331"
                  }
                  trackColor="#e5e7eb"
                  size={140}
                  strokeWidth={10}
                  className="shrink-0">
                  <div className="text-center">
                    <strong className="text-2xl">{customer.score}</strong>
                    <span className="block text-sm text-[#8191a8]">/850</span>
                  </div>
                </ProgressRing>
                <div className="space-y-2 text-sm text-[#607493]">
                  <p>
                    <span className="mr-2 inline-block size-2 rounded-full bg-[#1FA955]" />
                    760-850 Risiko Rendah
                  </p>
                  <p>
                    <span className="mr-2 inline-block size-2 rounded-full bg-[#FFBB00]" />
                    660-759 Risiko Sedang
                  </p>
                  <p>
                    <span className="mr-2 inline-block size-2 rounded-full bg-[#F87C28]" />
                    560-659 Risiko Tinggi
                  </p>
                  <p>
                    <span className="mr-2 inline-block size-2 rounded-full bg-[#F02331]" />
                    &lt;560 Risiko Sangat Tinggi
                  </p>
                </div>
              </div>
            </section>
            <section className="rounded-xl border border-[#dce5f0] bg-white p-4 w-3/7">
              <h2 className="text-base font-bold">Riwayat Kredit</h2>
              <div className="mt-4 grid gap-y-3 text-sm">
                <DetailRow label="Skor Kredit" value={String(customer.score)} />
                <DetailRow label="Status" value="Lancar" />
                <DetailRow label="Tunggakan" value="Tidak ada" />
                <DetailRow label="Kredit Aktif" value="1 fasilitas" />
                <DetailRow label="Total Limit" value="Rp 100.000.000" />
                <DetailRow label="Total Outstanding" value="Rp 20.000.000" />
              </div>
            </section>
            <section className="overflow-hidden rounded-xl border border-[#dce5f0] bg-white w-4/7">
              <h2 className="p-4 text-base font-bold">Property</h2>
              <div className="p-4">
                <Image
                  src="/client-property.png"
                  alt="Properti nasabah"
                  width={640}
                  height={360}
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="h-auto w-full object-cover"
                />
                <div className="grid gap-2 mt-4 text-sm">
                  <DetailRow label="Jenis Properti" value="Rumah" />
                  <DetailRow label="Lokasi Properti" value="Jakarta" />
                  <DetailRow label="Status Properti" value="Baru" />
                  <DetailRow label="Luas Bangunan" value="2000 × 1000" />
                </div>
              </div>
            </section>
          </div>

          <section className="mt-3 rounded-xl border border-[#dce5f0] bg-white p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold">Catatan Sales</h2>
              <button type="button" className="flex items-center gap-1 text-sm font-semibold text-[#1769ed]">
                <Plus className="size-3" /> Tambah Catatan
              </button>
            </div>
            <div className="mt-3 rounded-lg border border-[#dce5f0] p-4 text-sm leading-5 text-[#526986]">
              Nasabah sangat tertarik dengan program KPR fixed 3 tahun. Sudah menjelaskan simulasi cicilan dan risiko floating rate. Nasabah akan
              melengkapi dokumen penghasilan pasangan paling lambat 2 hari ke depan.
              <p className="mt-3 text-right text-sm text-[#8191a8]">Citra Lestari &nbsp;|&nbsp; 7 Sep 2026, 10:20 WIB</p>
            </div>
          </section>
          <div className="mt-3 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setDecision("Ditolak")}
              className="flex h-10 items-center gap-2 rounded-lg bg-red-100 px-6 text-sm font-bold text-red-600 hover:bg-red-200">
              <X className="size-4" /> Tolak Pengajuan
            </button>
            <button
              type="button"
              onClick={() => setDecision("Disetujui")}
              className="flex h-10 items-center gap-2 rounded-lg bg-emerald-100 px-6 text-sm font-bold text-emerald-600 hover:bg-emerald-200">
              <Check className="size-4" /> Setujui Pengajuan
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoList({ items }: { items: string[][] }) {
  return (
    <div className="space-y-3 text-sm">
      {items.map(([label, value]) => (
        <div key={label}>
          <p className="text-[#8191a8]">{label}</p>
          <p className="font-medium">{value}</p>
        </div>
      ))}
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-[#7183a1]">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}
