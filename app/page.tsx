"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Stepper03 from "@/components/shadcn-space/stepper/stepper-03";

export default function Home() {
  return (
    <div className=" mt-14">
      <header className="fixed top-0 left-0 z-50 py-5 bg-white w-full text-center text-black flex items-center">
        <div className="w-9/10 m-auto flex justify-between">
          <Image src="/jakloan-logo.png" width={1920} height={1080} alt="jakloan logo" className="h-10 w-auto" />
          <ul className="flex gap-8 text-black font-semibold items-center font-poppins">
            <li>Home</li>
            <li>Product</li>
            <li className="text-jakbutton font-bold">Calculator</li>
            <li>Contact Us</li>
          </ul>
          <Button className="bg-jakbutton font-poppins hover:bg-jakbutton-hover" type="button">
            Ajukan KPR
          </Button>
        </div>
      </header>

      <main className="flex flex-col justify-center h-full pt-20 bg-blue-100 w-9/10 m-auto font-poppins">
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
