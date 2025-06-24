"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkAuthStatus } from "@/utils/api/auth";

export default function GuestRoute({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const verify = async () => {
      const isLoggedIn = await checkAuthStatus();
      if (isLoggedIn) {
        router.replace("/dashboard");
      } else {
        setChecking(false);
      }
    };
    verify();
  }, [router]);

  if (checking) return null;

  return children;
}
