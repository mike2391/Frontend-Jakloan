import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 py-5 bg-white w-full text-center text-black flex items-center">
      <div className="w-9/10 m-auto flex justify-between">
        <Image src="/jakloan-logo.png" width={1920} height={1080} alt="jakloan logo" className="h-10 w-auto" />
        <ul className="flex gap-8 text-black font-semibold items-center font-poppins">
          <li>Home</li>
          <li>Product</li>
          <li className="text-jakbutton font-bold">Calculator</li>
          <li>Contact Us</li>
        </ul>
        <Button type="button">Ajukan KPR</Button>
      </div>
    </header>
  );
}
