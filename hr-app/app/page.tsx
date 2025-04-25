// app/page.tsx
import Link from "next/link";
import { Poppins } from "next/font/google";
import logo from "/images/logo.png"

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

export default function Home() {
  return (
    <main className={`relative min-h-screen bg-gradient-to-bl from-[#101828]  to-[#101828] text-white flex flex-col overflow-hidden ${poppins.className}`}>
      {/* Background Glow Circles */}
      <div className="absolute  w-[200px] h-[200px] bg-[#27B4E4FF] opacity-100 rounded-full z-0" style={{ top: "50%", left: "10%", filter: "blur(250px)" }} />
      <div className="absolute  w-[200px] h-[200px] bg-[#B733E3FF] opacity-100 rounded-full z-0" style={{ top: "30%", left: "50%", filter: "blur(250px)" }} />

      {/* Top Nav */}
      <nav className="relative z-10 flex justify-between items-center px-8 py-0 text-md font-medium">
        <div className="flex items-center gap-1">
          <img src="assets/logo.png" alt="Logo" width={150} height={150} />
        </div>

        <div className="flex gap-8">
          <a href="/chat" className="hover:text-[#FEE715] transition font-bold">About</a>
          <a href="#" className="hover:text-[#FEE715] transition font-bold">Features</a>
          <a href="#" className="hover:text-[#FEE715] transition font-bold">Marketplace</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-6 flex-grow">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mt-8 text-center">
          <div>Welcome to <span className="text-[#FEE715]">HR_APP</span>.</div>
          <div className="font-medium">Empower your team with instant</div>
          <div className="font-medium">access to your company’s knowledge.</div>
        </h1>

        <p className="mt-6 text-lg text-gray-400 max-w-2xl">
          No more digging through handbooks — just ask, and get answers. Your AI-powered assistant for employees, managers, and HR teams.
        </p>

        <div>
          <br />
          <Link href="/login" className="flex items-center gap-1 hover:text-indigo-400 transition">
            <button className="px-6 py-3 rounded bg-[#FEE715] hover:bg-[#EADD67FF] transition text-[#101820] font-bold">
              LOGIN
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
