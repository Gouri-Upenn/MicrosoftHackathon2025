 'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
// import { login } from '../../Back_S1/auth_flow'
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
    <div className="flex h-screen bg-black text-white">
      <div className="w-1/2 flex flex-col justify-center px-16">
        <h1 className="text-5xl font-bold mb-4">HR_APP<span className="text-blue-400">&gt;</span></h1>
        <h2 className="text-3xl font-semibold">Login OR <br /> Register</h2>
        <p className="text-gray-400 mt-4">HR app for your company</p>
      </div>

      <div className="w-1/2 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <label className="block mb-1">Username</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-white text-black"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              className="w-full p-2 rounded bg-white text-black"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded bg-[#1995AD] hover:bg-[#15768b] transition-colors"
          >
            Login
          </button>
          <p className="text-center text-sm text-gray-400">
            New user? <a href="/register" className="text-[#A1D6E2]">Register here</a>
          </p>
        </form>
      </div>
    </div>
  )
}

