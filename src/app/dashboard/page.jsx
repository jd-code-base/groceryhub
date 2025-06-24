"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Layout from "@/components/Layout";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Layout>
        <div className="bg-neutral-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Welcome to your Dashboard</h2>
          <p className="text-neutral-300">
            Here you can manage inventory, view reports, and more.
          </p>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
