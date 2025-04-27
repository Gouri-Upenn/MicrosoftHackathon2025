'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Poppins } from "next/font/google";
import Link from "next/link";

// import { login } from '../../Back_S1/auth_flow'
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });
import logo from "/assets/logo.png"


export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error("Invalid credentials");
      router.push("/profile");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <main className={`relative min-h-screen bg-gradient-to-bl from-[#101828] to-[#101828] text-white flex items-center justify-center ${poppins.className}`}>
      {/* Glowing Background Blobs */}
      <div className="absolute top-[30%] left-[10%] w-[250px] h-[250px] bg-[#05BAF7FF] opacity-60 rounded-full z-0" style={{ filter: "blur(180px)" }} />
      <div className="absolute top-[60%] left-[50%] w-[250px] h-[250px] bg-[#A006D4FF] opacity-50 rounded-full z-0" style={{ filter: "blur(180px)" }} />

      {/* Content */}
      <div className="relative z-10 bg-black/60 rounded-xl shadow-lg flex w-full max-w-5xl overflow-hidden">
        {/* Left side */}
        <div className="w-1/2 p-12 flex flex-col justify-center bg-[#101828]">


          <Link href="/">
            <img src="assets/logo.png" alt="Logo" width={150} height={150} className="cursor-pointer" />
          </Link>

          <h1 className="text-4xl font-extrabold mt-8">HR_APP<span className="text-[#FEE715]">&gt;</span></h1>
          <h2 className="text-2xl font-semibold mt-2">Login OR Register</h2>
          <p className="text-gray-400 mt-4">Your AI-powered HR assistant</p>
        </div>

        {/* Right side - Login form */}
        <div className="w-1/2 p-12 bg-[#101828] flex items-center justify-center">
          <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">
            {error && <p className="text-red-500">{error}</p>}
            <div>
              <label className="block mb-1 text-white font-medium">Username</label>
              <input
                type="text"
                className="w-full p-3 rounded bg-white text-black"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-white font-medium">Password</label>
              <input
                type="password"
                className="w-full p-3 rounded bg-white text-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded bg-[#FEE715] text-[#101820] font-bold hover:bg-[#e4c600] transition duration-300"
            >
              Login
            </button>
            <p className="text-center text-sm text-gray-400">
              New user?{" "}
              <Link href="/register" className="text-[#FEE715] hover:underline">
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}

