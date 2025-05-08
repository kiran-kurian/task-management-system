import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
// import '../styles/globals.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task Manager",
  description: "A modern task management application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
            <header className="px-6 py-4 shadow-md bg-[var(--primary)] text-white">
              <h1 className="text-xl font-bold">Task Manager</h1>
            </header>
            <main className="flex-1 px-6 py-10">{children}</main>
            <footer className="text-center p-4 text-sm text-[var(--muted)] bg-white dark:bg-slate-800">
              © 2025 Task Manager
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
