"use client";

import { Bell, Menu, Search } from "lucide-react";

export default function Header({
  notificationsOpen,
  onMenuOpen,
  onNotificationsToggle,
}: {
  notificationsOpen: boolean;
  onMenuOpen: () => void;
  onNotificationsToggle: () => void;
}) {
  return (
    <header className="flex h-15 items-center justify-between gap-4 border-b border-[#e1e8f1] bg-white px-5 sm:px-8">
      <button type="button" onClick={onMenuOpen} className="text-[#0d1f3c] lg:hidden" aria-label="Buka menu">
        <Menu className="size-5" />
      </button>
      <div className="relative max-w-112.5 flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#7183a1]" />
        <input
          placeholder="Cari nama nasabah / nomor aplikasi / NIK..."
          className="h-9 w-full rounded-lg bg-[#f1f5fa] pl-10 pr-3 text-sm text-[#0d1f3c] outline-none placeholder:text-[#8c9cb3] focus:ring-2 focus:ring-[#dbe8f7]"
        />
      </div>
      <div className="flex items-center justify-between gap-4 sm:min-w-52.5">
        <div className="relative">
          <button
            type="button"
            onClick={onNotificationsToggle}
            aria-label="Notifikasi"
            className="relative flex size-9 items-center justify-center rounded-lg bg-[#f1f5fa] text-[#506884] hover:bg-[#e8eff7]">
            <Bell className="size-4" />
            <span className="absolute right-2 top-2 size-1.5 rounded-full bg-[#ff3b4a]" />
          </button>
          {notificationsOpen && (
            <div className="absolute right-0 top-11 z-20 w-56 rounded-lg border border-[#dce5f0] bg-white p-3 text-sm shadow-xl">
              Anda memiliki 2 notifikasi baru.
            </div>
          )}
        </div>
        <div className="hidden text-right text-sm text-[#7183a1] sm:block">
          <p className="font-medium text-[#405878]">Senin, 7 Sep 2026</p>
          <p>10:24 WIB</p>
        </div>
      </div>
    </header>
  );
}
