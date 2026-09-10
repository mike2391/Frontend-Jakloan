"use client";

import { BarChart3, Bell, LogOut, Settings, UsersRound, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { label: "Dashboard", icon: BarChart3 },
  { label: "Daftar Nasabah", icon: UsersRound },
  { label: "Notifikasi", icon: Bell, count: 2 },
  { label: "Pengaturan", icon: Settings },
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
      <div className="flex items-start justify-between px-1">
        <div>
          <p className="text-xl font-bold tracking-tight">
            JakLoan<span className="text-[#18bd8b]">•</span>
          </p>
          <p className="text-sm tracking-[0.19em] text-[#a9b9cc]">BY BANK JAKARTA</p>
        </div>
        <button type="button" onClick={onClose} className="text-slate-300 lg:hidden" aria-label="Tutup menu">
          <X className="size-5" />
        </button>
      </div>

      <nav className="mt-8 space-y-2" aria-label="Navigasi utama">
        {navigation.map(({ label, icon: Icon, count }) => (
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
            {count && <span className="flex size-4 items-center justify-center rounded-full bg-[#ff464d] text-sm font-bold text-white">{count}</span>}
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
