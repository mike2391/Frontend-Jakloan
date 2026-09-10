"use client";

import { BarChart3, House, LogOut, UsersRound, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navigation = [
  { label: "Dashboard", icon: BarChart3 },
  { label: "Daftar Nasabah", icon: UsersRound },
  { label: "Daftar Properti", icon: House },
];

export default function Sidebar({
  activeNav,
  mobileMenuOpen,
  onNavigate,
  onClose,
}: {
  activeNav: string;
  mobileMenuOpen: boolean;
  onNavigate: (label: string) => void;
  onClose: () => void;
}) {
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex w-52.5 flex-col bg-[#09223d] px-4 py-5 text-white transition-transform lg:translate-x-0",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
      )}>
      <div className="relative items-start px-1">
        <Image
          src="/jakloan-logo.png"
          alt="JakLoan"
          width={180}
          height={48}
          sizes="180px"
          className="bg-white p-2 h-auto w-full object-contain object-left"
          priority
        />
        <div className="-mt-5 ml-2 text-[9px] font-medium tracking-[0.24em] text-black">FOR INTERNAL</div>
        <button type="button" onClick={onClose} className="text-slate-300 lg:hidden" aria-label="Tutup menu">
          <X className="size-5" />
        </button>
      </div>

      <nav className="mt-8 space-y-2" aria-label="Navigasi utama">
        {navigation.map(({ label, icon: Icon }) => (
          <button
            key={label}
            type="button"
            onClick={() => onNavigate(label)}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left text-sm transition-colors",
              activeNav === label ? "bg-[#284b70] text-white" : "text-[#9eb0c7] hover:bg-[#173957] hover:text-white",
            )}>
            <Icon className="size-4" strokeWidth={1.8} />
            <span className="flex-1">{label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto">
        <div className="mb-4 flex items-center gap-3 rounded-xl bg-[#284d73] p-2.5">
          <div className="flex size-8 items-center justify-center rounded-full bg-[#d7b387] text-sm font-bold text-[#18304d]">CL</div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">Citra Lestari</p>
            <p className="text-sm text-[#b9c9da]">Sales Officer</p>
          </div>
        </div>
        <button type="button" className="flex items-center gap-3 px-2 text-sm text-[#b9c9da] hover:text-white">
          <LogOut className="size-4" strokeWidth={1.8} /> Logout
        </button>
      </div>
    </aside>
  );
}
