// app/page.tsx
import Link from "next/link";
import { Poppins } from "next/font/google";
import logo from "/images/logo.png"

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

export default function Home() {
  return (
    <main className={`relative bg-gradient-to-bl from-[#101828]  to-[#101828] text-white flex flex-col overflow-hidden ${poppins.className}`}>
      {/* Background Glow Circles */}
      {/* <div className="absolute  w-[200px] h-[200px] bg-[#27B4E4FF] opacity-100 rounded-full z-0" style={{ top: "50%", left: "10%", filter: "blur(250px)" }} /> 
      <div className="absolute  w-[200px] h-[200px] bg-[#B733E3FF] opacity-100 rounded-full z-0" style={{ top: "30%", left: "50%", filter: "blur(250px)" }} /> */}

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-6 flex-grow min-h-screen">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-center">
          <div>Welcome to <span className="text-[#FEE715]">ASK_HR</span>.</div>
          <div className="font-medium">Empower your team with knowledge.</div>
        </h1>

        <p className="mt-6 text-lg text-gray-400 max-w-2xl">
          No more digging through handbooks — just ask, and get answers.
        </p>
      </section>
    </main>
  );
}
