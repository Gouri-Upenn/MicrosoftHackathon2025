'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DocumentsPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const documents = [
    { name: "Employee Handbook.pdf", uploadedAt: "2023-09-15", status: "Verified" },
    { name: "NDA Agreement.pdf", uploadedAt: "2023-10-01", status: "Pending" },
    { name: "Resume_JohnDoe.docx", uploadedAt: "2023-08-21", status: "Rejected" },
  ];

  return (
    <div className="min-h-screen bg-[#101820] text-white flex flex-col p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">My Documents</h1>
      <div className="overflow-x-auto max-w-4xl mx-auto">
        <table className="min-w-full bg-white/10 rounded-lg shadow overflow-hidden">
          <thead className="bg-white/5">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Document Name</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Uploaded At</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Status</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, idx) => (
              <tr key={idx} className="hover:bg-white/5 transition">
                <td className="px-6 py-4">{doc.name}</td>
                <td className="px-6 py-4">{doc.uploadedAt}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      doc.status === "Verified"
                        ? "bg-green-500/20 text-green-400"
                        : doc.status === "Pending"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {doc.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
