'use client'
import { Poppins } from "next/font/google";
import Link from 'next/link';

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

export default function AboutPage() {
  return (
    <main className={`min-h-screen pt-[72px] bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white ${poppins.className}`}>
      {/* Hero Section */}
      <section className="text-center py-10 px-2">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-[#FEE715]">About Us</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
          Empowering HR teams with AI-driven solutions to make hiring, onboarding, and people management smarter and simpler.
        </p>
      </section>
      {/* Features */}
      <section className="py-15 px-4 ">
        <h2 className="text-3xl font-bold text-center text-[#FEE715] mb-10">What Makes Us Different</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { title: 'AI Automation', desc: 'Automate repetitive HR tasks like screening and scheduling.' },
            { title: 'Employee Insights', desc: 'Get real-time analytics and feedback for better HR strategies.' },
            { title: 'Smart Onboarding', desc: 'Streamline onboarding with AI-based workflows and learning paths.' },
          ].map((item, idx) => (
            <div key={idx} className="bg-[#1f2937] p-6 rounded-xl shadow-md hover:scale-105 transition">
              <h3 className="text-xl font-semibold text-[#FEE715] mb-2">{item.title}</h3>
              <p className="text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-20 px-4 ">
        <h2 className="text-3xl font-bold mb-4">Ready to upgrade your HR experience?</h2>
        <Link href="/register">
          <button className="mt-4 px-8 py-3 bg-[#FEE715] text-[#101820] font-semibold rounded-lg hover:bg-yellow-400 transition">
            Get Started
          </button>
        </Link>
      </section>
    </main>
  );
}
