// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <h1 className="text-5xl font-bold mb-4 text-blue-700">Welcome to Infonite HR</h1>
      <p className="text-lg mb-8 text-gray-700">Your AI-powered assistant for employees, managers, and HR teams.</p>
      <Link href="/login">
        <button className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Go to Login
        </button>
      </Link>
    </main>
  );
}
