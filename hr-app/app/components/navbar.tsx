'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname,useRouter } from 'next/navigation';

export default function Navbar() {
  const [mode, setMode] = useState<'guest' | 'auth' | 'none'>('none');
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
//************************HIDDEN FOR TESTING *************************** */
useEffect(() => {
  const updateMode = () => {
    const token = localStorage.getItem('token');
    const isLoggedIn = !!token;

    const isLandingPage = pathname === '/';
    const isChat = pathname === '/chat';
    const isAbout = pathname === '/about';
    const isHidden = ['/login', '/register'].includes(pathname);
    const isProfileRelated = ['/profile', '/documents', '/tickets'].includes(pathname);

    if (isHidden) {
      setMode('none');
    } else if (isLandingPage || isChat || isAbout) {
      setMode(isLoggedIn ? 'auth' : 'guest');
    } else if (isProfileRelated && isLoggedIn) {
      setMode('auth');
    } else {
      setMode('none');
    }
  };

  updateMode(); // Initial run
  window.addEventListener('auth-change', updateMode); // Listen for login/logout

  return () => window.removeEventListener('auth-change', updateMode); // Cleanup
}, [pathname]);
//******************************************************** */

/*********************************REMOVE AFTER TESTING************* */
// useEffect(() => {
//   const isLandingPage = pathname === '/';
//   const isChat = pathname === '/chat';
//   const isAbout = pathname === '/about'; // Include About page
//   const isHidden = ['/login', '/register'].includes(pathname);
//   const isProfileRelated = ['/profile', '/documents', '/tickets'].includes(pathname);

//   if (isHidden) {
//     setMode('none');
//   } else if (isLandingPage || isChat || isAbout) {
//     setMode('guest');
//   } else if (isProfileRelated) {
//     setMode('auth');
//   } else {
//     setMode('none');
//   }
// }, [pathname]);

/******************************************************************* */

  const handleLogout = () => {
    localStorage.removeItem('token');
    setMode('guest');
    window.location.href = '/';
  };

  if (mode === 'none') return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 text-md font-medium bg-[#101820]/5 backdrop-blur-md min-h-[72px]">
      
      {/* Left Section: Logo or Back Button */}
      <div className="flex items-center gap-4">
        {mode === 'guest' && (
          <Link href="/" className="flex items-center">
            <img src="/assets/logo.png" alt="Logo" width={100} height={50} />
            <span className="ml-2 font-extrabold text-sm">ASK_HR</span>
          </Link>
        )}
        {mode === 'auth' && ['/profile', '/documents', '/tickets'].includes(pathname) && (
          <button
            onClick={() => router.push('/chat')}
            className="text-[#FEE715] hover:underline"
          >
            ← Back to Chat
          </button>
        )}
      </div>

      {/* Guest Mode Right Section */}
      {mode === 'guest' && (
        <div className="flex gap-8 items-center">
          <Link href="/about" className="text-white hover:text-[#FEE715] font-bold transition">About</Link>
          <Link href="/login" className="px-4 py-2 bg-[#FEE715] text-[#101820] rounded-full font-bold hover:bg-yellow-400 transition">
            Login
          </Link>
        </div>
      )}

      {/* Authenticated Profile Dropdown */}
      {mode === 'auth' && (
        <div className="flex items-center gap-2 relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 text-gray-300 hover:text-[#FEE715] transition focus:outline-none"
          >
            <img
              src="/assets/user.png"
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
            />
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-12 mt-2 w-40 bg-[#101828] border border-white/10 rounded-md shadow-lg overflow-hidden animate-dropdown z-50">
              <Link href="/profile" onClick={() => setMenuOpen(false)}>
                <div className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#1f2937] hover:text-[#FEE715] cursor-pointer">My Profile</div>
              </Link>
              <Link href="/documents" onClick={() => setMenuOpen(false)}>
                <div className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#1f2937] hover:text-[#FEE715] cursor-pointer">Documents</div>
              </Link>
              <Link href="/tickets" onClick={() => setMenuOpen(false)}>
                <div className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#1f2937] hover:text-[#FEE715] cursor-pointer">Tickets</div>
              </Link>
              <div
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="block px-4 py-2 text-sm text-red-400 hover:bg-[#1f2937] hover:text-red-500 cursor-pointer"
              >
                Logout
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}