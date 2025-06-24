"use client";
export const dynamic = "force-dynamic";

import RegisterDetailsForm from "@/components/RegisterDetailsForm";
import { Suspense } from "react";

export default function RegisterDetailsPage() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <RegisterDetailsForm />
    </Suspense>
  );
}
