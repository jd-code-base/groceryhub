"use client";

import GuestRoute from "@/components/GuestRoute";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/onboarding");
  };

  return (
    <GuestRoute>
      <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0c4a6e] text-white px-4">
        <h1 className="text-5xl font-bold mb-6 drop-shadow-lg text-center">
          Welcome to GroceryHub
        </h1>
        <button
          onClick={handleClick}
          className="px-6 py-3 bg-white text-blue-800 font-semibold rounded-2xl text-lg shadow-md hover:bg-blue-100 transition"
        >
          Let's Go →
        </button>
      </section>
    </GuestRoute>
  );
}
