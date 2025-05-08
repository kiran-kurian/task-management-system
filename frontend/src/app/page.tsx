export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#FF7A8C] to-[#4C6EB1] text-white px-4 py-8">
      <h1 className="text-5xl font-extrabold mb-6 text-center sm:text-6xl">
        Welcome to <span className="text-[#FFE600]">Task Manager</span>
      </h1>
      <p className="text-lg mb-8 text-center sm:text-xl">
        Organize your tasks, boost your productivity, and collaborate with your team in a seamless way.
      </p>
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
        <a
          href="/login"
          className="px-6 py-3 bg-[#FF7A8C] text-white rounded-lg text-lg font-semibold transition-colors hover:bg-[#D1576B] focus:outline-none focus:ring-2 focus:ring-[#FF7A8C]"
        >
          Login
        </a>
        <a
          href="/register"
          className="px-6 py-3 bg-[#4C6EB1] text-white rounded-lg text-lg font-semibold transition-colors hover:bg-[#365D94] focus:outline-none focus:ring-2 focus:ring-[#4C6EB1]"
        >
          Register
        </a>
      </div>
    </main>
  );
}
