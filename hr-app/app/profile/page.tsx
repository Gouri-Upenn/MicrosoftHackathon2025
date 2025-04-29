'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 890',
    department: 'Human Resources',
  });
  const [profileImage, setProfileImage] = useState<string | null>(null);

//   Token check (hidden for testing)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !['image/jpeg', 'image/png'].includes(file.type)) {
      alert('Please select a valid JPEG or PNG image.');
      return;
    }

    const uploadedUrl = await uploadToAzure(file);
    if (uploadedUrl) {
      setProfileImage(uploadedUrl);
    }
  };

  const uploadToAzure = async (file: File): Promise<string | null> => {
    try {
      const res = await fetch('/api/get-upload-url');
      const { uploadUrl, blobUrl } = await res.json();

      const uploadRes = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'x-ms-blob-type': 'BlockBlob',
          'Content-Type': file.type,
        },
        body: file,
      });

      if (uploadRes.ok) {
        return blobUrl;
      } else {
        alert("Upload failed.");
        return null;
      }
    } catch (err) {
      console.error("Azure upload error:", err);
      alert("Something went wrong.");
      return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#101820] text-white flex items-center justify-center p-8 relative">
      <div className="bg-white/10 rounded-2xl shadow-lg p-8 max-w-md w-full">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <img
              src={profileImage || '/assets/user.png'}
              alt="Profile Picture"
              className="w-24 h-24 rounded-full border-4 border-[#FEE715] object-cover"
            />
            {editMode && (
              <label className="absolute bottom-0 right-0 bg-[#FEE715] text-[#101820] p-1 rounded-full cursor-pointer hover:bg-yellow-400 transition">
                <input
                  type="file"
                  accept=".jpeg,.jpg,.png"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </label>
            )}
          </div>

          {editMode ? (
            <input
              name="name"
              value={profile.name}
              onChange={handleInputChange}
              className="bg-transparent border-b border-gray-500 text-center text-xl font-bold focus:outline-none"
            />
          ) : (
            <h2 className="text-2xl font-bold">{profile.name}</h2>
          )}
          <p className="text-gray-400 text-center">HR Manager at XYZ Corporation</p>
        </div>

        <div className="mt-6 space-y-2">
          <div className="flex justify-between text-gray-300">
            <span>Email:</span>
            {editMode ? (
              <input
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                className="bg-transparent border-b border-gray-500 text-right focus:outline-none"
              />
            ) : (
              <span>{profile.email}</span>
            )}
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Phone:</span>
            {editMode ? (
              <input
                name="phone"
                value={profile.phone}
                onChange={handleInputChange}
                className="bg-transparent border-b border-gray-500 text-right focus:outline-none"
              />
            ) : (
              <span>{profile.phone}</span>
            )}
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Department:</span>
            {editMode ? (
              <input
                name="department"
                value={profile.department}
                onChange={handleInputChange}
                className="bg-transparent border-b border-gray-500 text-right focus:outline-none"
              />
            ) : (
              <span>{profile.department}</span>
            )}
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => setEditMode((prev) => !prev)}
            className="bg-[#FEE715] text-black font-semibold px-4 py-2 rounded hover:bg-yellow-400 transition"
          >
            {editMode ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>
      </div>
    </div>
  );
}
