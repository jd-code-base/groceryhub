"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/utils/api/auth";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        await logoutUser();
      } catch (err) {
        console.error("Logout failed", err);
      } finally {
        router.replace("/login");
      }
    };
    logout();
  }, [router]);

  return (
    <main className="flex items-center justify-center min-h-screen bg-neutral-900 text-white">
      <p className="text-lg">Logging you out...</p>
    </main>
  );
}
