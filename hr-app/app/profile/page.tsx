'use client'; // ✅ This line is mandatory because we use client-side hooks
/* * Profile Page Component * Displays user profile information and redirects to login if not authenticated */
/*app/profile/page.tsx*/
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login'); // Redirect if not logged in
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[#101820] text-white flex items-center justify-center p-8">
      <div className="bg-white/10 rounded-2xl shadow-lg p-8 max-w-md w-full">
        <div className="flex flex-col items-center space-y-4">
          <img
            src="/assets/user.png"
            alt="Profile Picture"
            className="w-24 h-24 rounded-full border-4 border-[#FEE715] object-cover"
          />
          <h2 className="text-2xl font-bold">John Doe</h2>
          <p className="text-gray-400 text-center">HR Manager at XYZ Corporation</p>
        </div>
        <div className="mt-6 space-y-2">
          <div className="flex justify-between text-gray-300">
            <span>Email:</span> <span>john.doe@example.com</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Phone:</span> <span>+1 234 567 890</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Department:</span> <span>Human Resources</span>
          </div>
        </div>
      </div>
    </div>
  );
}
