"use client";

import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, role }),
    });

    if (response.ok) {
      window.location.href = "/login";
    } else {
      const data = await response.json();
      setError(data.message || "An error occurred during registration.");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#FF7A8C] to-[#4C6EB1] text-white px-4 py-8">
      <h1 className="text-5xl font-extrabold mb-6 text-center sm:text-6xl">
        Create an Account for <span className="text-[#FFE600]">Task Manager</span>
      </h1>
      <form onSubmit={handleSubmit} className="w-full sm:w-96 bg-white bg-opacity-80 rounded-lg shadow-lg p-6">
        {error && <p className="text-red-600 text-center">{error}</p>}
        <div className="mb-4">
          <label htmlFor="name" className="block text-lg font-medium text-gray-800">Name</label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-2 mt-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7A8C]"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-lg font-medium text-gray-800">Email Address</label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 mt-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7A8C]"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-lg font-medium text-gray-800">Password</label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-2 mt-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7A8C]"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="role" className="block text-lg font-medium text-gray-800">Role</label>
          <select
            id="role"
            className="w-full px-4 py-2 mt-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7A8C]"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="USER">User</option>
            <option value="MANAGER">Manager</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full px-6 py-3 bg-[#FF7A8C] text-white rounded-lg text-lg font-semibold transition-colors hover:bg-[#D1576B] focus:outline-none focus:ring-2 focus:ring-[#FF7A8C]"
        >
          Register
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-300">
        Already have an account?{" "}
        <a href="/login" className="text-[#FFE600] hover:underline">Login</a>
      </p>
    </main>
  );
}
