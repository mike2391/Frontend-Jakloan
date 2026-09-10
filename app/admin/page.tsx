"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, BarChart3, Eye, EyeOff, Headphones, LockKeyhole, Mail, ShieldCheck, UsersRound } from "lucide-react";

const benefits = [
  {
    icon: UsersRound,
    title: "Kelola Pengajuan",
    description: "Pantau dan proses pengajuan nasabah secara real time.",
  },
  {
    icon: BarChart3,
    title: "Analisis Data",
    description: "Dapatkan insight untuk meningkatkan konversi penjualan.",
  },
  {
    icon: ShieldCheck,
    title: "Keamanan Terjamin",
    description: "Data nasabah dilindungi dengan standar keamanan Bank Jakarta.",
  },
];

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-white font-poppins text-[#0b2346]">
      <div className="grid min-h-screen lg:grid-cols-[1.08fr_0.92fr]">
        <section className="relative min-h-170 overflow-hidden px-6 py-5 sm:px-10 lg:min-h-screen lg:px-12 xl:px-16">
          <Image src="/house-admin.png" alt="Rumah modern dengan latar Monas" fill priority className="object-cover object-center" />
          <div className="absolute inset-0 bg-linear-to-b from-white/45 via-sky-100/10 to-[#08234a]/35" />

          <div className="relative z-10 flex h-full min-h-157.5 flex-col">
            <Image src="/jakloan-logo.png" alt="JakLoan" width={180} height={48} className="h-9 w-auto object-contain object-left" priority />
            <span className="-mt-0.75 text-[9px] font-medium tracking-[0.24em] text-[#607693]">FOR INTERNAL</span>

            <div className="mt-10 max-w-110 sm:mt-12">
              <h1 className="text-4xl font-bold leading-[1.02] tracking-[-0.04em] sm:text-5xl">
                Bersama Anda
                <br />
                Mewujudkan Rumah
                <br />
                Impian
              </h1>
              <p className="mt-4 max-w-102.5 text-sm font-medium leading-5 text-[#536b8f] sm:text-base">
                Platform internal untuk mendukung tim sales dalam memproses pengajuan KPR dengan lebih cepat, akurat, dan mudah.
              </p>
            </div>

            <div className="mt-10 space-y-5 sm:mt-12">
              {benefits.map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex max-w-110 items-center gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-white/85 text-[#0b2346] shadow-sm backdrop-blur-sm">
                    <Icon className="size-6" strokeWidth={1.8} />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold sm:text-base">{title}</h2>
                    <p className="mt-1 text-xs font-medium leading-4 text-[#536b8f] sm:text-sm">{description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto max-w-102.5 rounded-lg bg-[#071d3d]/90 p-4 text-white shadow-xl backdrop-blur-sm sm:p-5">
              <p className="text-base italic leading-6 sm:text-lg">
                “Rumah bukan sekadar tempat tinggal, tapi awal dari masa depan yang lebih baik.”
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm font-medium">
                <span className="h-0.5 w-5 bg-jakbutton" />
                Bank Jakarta
              </div>
            </div>
          </div>
        </section>

        <section className="flex min-h-170 items-center justify-center bg-white px-6 py-12 sm:px-12 lg:min-h-screen lg:px-16 xl:px-24">
          <div className="w-full max-w-115.5">
            <div className="mb-7">
              <h2 className="text-3xl font-bold tracking-[-0.03em] sm:text-4xl">Login Sales</h2>
              <p className="mt-2 text-sm font-medium text-[#536b8f] sm:text-base">Masuk ke sistem JakLoan untuk mengelola pengajuan KPR</p>
            </div>

            <form className="space-y-5" onSubmit={(event) => event.preventDefault()}>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold">User ID / Email</span>
                <span className="flex h-12 items-center gap-3 rounded-md border border-[#cbd6e7] px-3 focus-within:border-[#214b83] focus-within:ring-2 focus-within:ring-[#dbe8f8]">
                  <Mail className="size-5 text-[#536b8f]" strokeWidth={1.6} />
                  <input
                    type="email"
                    placeholder="Masukkan User ID atau email"
                    className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#94a3b8]"
                  />
                </span>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold">Password</span>
                <span className="flex h-12 items-center gap-3 rounded-md border border-[#cbd6e7] px-3 focus-within:border-[#214b83] focus-within:ring-2 focus-within:ring-[#dbe8f8]">
                  <LockKeyhole className="size-5 text-[#536b8f]" strokeWidth={1.6} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#94a3b8]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                    className="text-[#536b8f] hover:text-[#0b2346]">
                    {showPassword ?
                      <EyeOff className="size-5" strokeWidth={1.6} />
                    : <Eye className="size-5" strokeWidth={1.6} />}
                  </button>
                </span>
              </label>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-[#233858]">
                  <input type="checkbox" className="size-4 accent-[#0b2346]" />
                  Ingat saya
                </label>
                <button type="button" className="font-semibold text-[#0067e8] hover:underline">
                  Lupa password?
                </button>
              </div>

              <button
                type="submit"
                className="flex h-11 w-full items-center justify-center gap-3 rounded-md bg-[#ff3037] text-sm font-semibold text-white transition-colors hover:bg-[#e6242c]">
                Login <ArrowRight className="size-4" />
              </button>
            </form>

            <div className="my-6 flex items-center gap-3 text-xs text-[#8a98ad]">
              <span className="h-px flex-1 bg-[#dbe2ec]" />
              atau
              <span className="h-px flex-1 bg-[#dbe2ec]" />
            </div>

            <div className="mt-6 flex items-center gap-4 rounded-lg bg-[#f3f6fa] px-4 py-4 text-[#536b8f]">
              <Headphones className="size-6 shrink-0" strokeWidth={1.5} />
              <div className="text-xs">
                <p className="font-medium text-[#172b4d]">Butuh bantuan?</p>
                <p className="mt-1 text-[10px]">Hubungi IT Support: 1500 123 atau support@bankjakarta.co.id</p>
              </div>
            </div>

            <div className="mt-20 flex items-center justify-between text-[10px] text-[#536b8f] sm:mt-24">
              <span>© 2026 Bank Jakarta. All rights reserved.</span>
              <span className="flex gap-3">
                <button type="button">Kebijakan Privasi</button>
                <span>|</span>
                <button type="button">Syarat &amp; Ketentuan</button>
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
