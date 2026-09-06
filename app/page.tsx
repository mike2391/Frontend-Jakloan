import Stepper03 from "@/components/shadcn-space/stepper/stepper-03";
import Header from "./Components/Header";
import Image from "next/image";

export default function Home() {
  return (
    <div className="mt-14">
      <Header />
      <div className="fixed inset-x-0 top-0 z-[-100] mx-auto flex w-9/10 justify-end">
        <Image src="/building.png" alt="Building" width={1920} height={1080} className="w-[min(42vw,720px)] h-auto object-contain" />
      </div>

      <main className="flex flex-col justify-center h-full pt-20 w-9/10 m-auto font-poppins">
        <div className="mx-20">
          <h1 className="text-7xl font-bold text-jakloan-header">Plan Your Loan, Get Your Own</h1>
          <p className="mt-4 text-lg text-gray-700">
            KPR Griya Monas merupakan jenis pinjaman atau kredit pemilikan rumah yang diberikan <br /> oleh Bank DKI untuk Pembelian dan Non Pembelian
            atas Rumah Tapak (KPR), Rumah Toko (KPR Ruko) <br /> dan/atau Rumah Kantor (KPR Rukan).
          </p>
        </div>

        <Stepper03 />
      </main>
    </div>
  );
}
