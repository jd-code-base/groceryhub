"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkAuthStatus } from "@/utils/api/auth";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      const isLoggedIn = await checkAuthStatus();
      if (!isLoggedIn) {
        router.replace("/login");
      } else {
        setLoading(false);
      }
    };
    check();
  }, [router]);

  if (loading) {
    return <div className="text-white p-6">Checking authentication...</div>;
  }

  return children;
}
