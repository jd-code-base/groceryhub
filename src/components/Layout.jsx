"use client";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <nav className="bg-neutral-800 px-6 py-4 shadow-md flex justify-between items-center">
        <h1 className="text-xl font-semibold">GroceryHub</h1>
        <div className="space-x-4">
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <Link href="/profile" className="hover:underline">
            Profile
          </Link>
          <Link href="/logout" className="hover:underline">
            Logout
          </Link>
        </div>
      </nav>
      <main className="p-6">{children}</main>
    </div>
  );
}
