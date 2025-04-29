'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!res.ok) throw new Error("Registration failed");

      router.push("/login");
    } catch (err) {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <main className={`relative min-h-screen bg-gradient-to-bl from-[#101828] to-[#101828] text-white flex items-center justify-center ${poppins.className}`}>
      <div className="relative z-10 bg-black/60 rounded-xl shadow-lg flex w-full max-w-5xl overflow-hidden">
        {/* Left Side */}
        <div className="w-1/2 p-12 flex flex-col items-center justify-center bg-[#101828] text-center">
          <Link href="/">
            <img src="assets/logo.png" alt="Logo" width={200} height={150} className="cursor-pointer mb-4" />
          </Link>
          <h2 className="text-2xl font-bold">Create Your Account</h2>
          <p className="text-gray-400 mt-4">Join the future of HR</p>
        </div>

        {/* Right Side - Form */}
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
              <label className="block mb-1 text-white font-medium">Email</label>
              <input
                type="email"
                className="w-full p-3 rounded bg-white text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              Register
            </button>
            <p className="text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="text-[#FEE715] hover:underline">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
