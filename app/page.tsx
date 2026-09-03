import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen">
      <header className="fixed top-0 left-0 z-50 py-5 bg-white w-full text-center text-black flex items-center">
        <div className="w-4/5 m-auto flex justify-between">
          <Image src="/jakloan-logo.png" width={1920} height={1080} alt="jakloan logo" className="h-10 w-auto" />
          <ul className="flex gap-8 text-black font-semibold items-center">
            <li>Home</li>
            <li>Product</li>
            <li className="text-jakbutton font-bold">Calculator</li>
            <li>Contact Us</li>
          </ul>
          <button className="bg-jakbutton px-4 py-2 rounded-md text-white hover:bg-jakbutton-hover focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Ajukan KPR
          </button>
        </div>
      </header>

      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image className="dark:invert h-5 w-[100px]" src="/next.svg" alt="Next.js logo" width={100} height={20} priority />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the <code className="rounded bg-black/[.06] px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-white/[.08]">page.tsx</code>{" "}
            file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50">
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50">
              Learning
            </a>{" "}
            center.
          </p>
        </div>
      </main>
    </div>
  );
}
