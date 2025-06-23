"use client";

import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0c4a6e] text-white px-4">
      <h1 className="text-3xl font-semibold mb-8">Choose your path</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-md w-full">
        <div
          onClick={() => router.push("/login")}
          className="cursor-pointer bg-white/10 hover:bg-white/20 p-6 rounded-2xl text-center shadow-md backdrop-blur-md transition"
        >
          <h2 className="text-xl font-bold mb-2">Welcome Back</h2>
          <p className="text-sm text-white/80">
            Already have an account? Log in here.
          </p>
        </div>

        <div
          onClick={() => router.push("/register")}
          className="cursor-pointer bg-white/10 hover:bg-white/20 p-6 rounded-2xl text-center shadow-md backdrop-blur-md transition"
        >
          <h2 className="text-xl font-bold mb-2">New User</h2>
          <p className="text-sm text-white/80">
            Create your account to get started.
          </p>
        </div>
      </div>
    </main>
  );
}
