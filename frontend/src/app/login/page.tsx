"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(email, password);
    } catch (error) {
      console.error("Invalid credentials. Please try again.");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#FF7A8C] to-[#4C6EB1] text-white px-4 py-8">
      <h1 className="text-5xl font-extrabold mb-6 text-center sm:text-6xl">
        Login to <span className="text-[#FFE600]">Task Manager</span>
      </h1>
      <form onSubmit={handleSubmit} className="w-full sm:w-96 bg-white bg-opacity-80 rounded-lg shadow-lg p-6">
        <div className="mb-4">
          <label htmlFor="email" className="block text-lg font-medium text-gray-800">Email Address</label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 mt-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7A8C]"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-lg font-medium text-gray-800">Password</label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-2 mt-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7A8C]"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-6 py-3 bg-[#FF7A8C] text-white rounded-lg text-lg font-semibold transition-colors hover:bg-[#D1576B] focus:outline-none focus:ring-2 focus:ring-[#FF7A8C]"
        >
          Login
        </button>
      </form>
    </main>
  );
}
