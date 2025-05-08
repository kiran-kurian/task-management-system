"use client";

import { useRouter } from 'next/navigation';
import NotificationBell from './NotificationBell';
import { logout } from "@/app/auth/logout";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: string;
}

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const router = useRouter();

  const handleLogout = () => {
    console.log("Logout button clicked");
    logout();
    router.push('/login');
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-[#FF7A8C] to-[#4C6EB1] text-white p-6">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">
          {role} Dashboard
        </h1>
        <div className="flex items-center space-x-4">
          <NotificationBell />
          <button
            onClick={handleLogout}
            className="bg-[#FFE600] text-black font-semibold px-4 py-2 rounded hover:bg-yellow-300 transition"
          >
            Logout
          </button>
        </div>
      </header>
      <section className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6 text-black">
        {children}
      </section>
    </main>
  );
}
