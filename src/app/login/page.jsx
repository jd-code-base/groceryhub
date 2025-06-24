"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/utils/api/auth";
import { HiEye, HiEyeOff } from "react-icons/hi";
import GuestRoute from "@/components/GuestRoute";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = form;

    if (!email || !password) {
      return setError("Please fill all fields.");
    }

    try {
      setError("");
      setMessage("Logging in...");

      await loginUser({ email, password });
      router.push("/dashboard");
    } catch (err) {
      setError(err?.message || "Login failed");
      setMessage("");
    }
  };

  return (
    <GuestRoute>
      <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0c4a6e] text-white px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 p-6 rounded-2xl shadow-lg backdrop-blur-md w-full max-w-sm text-white"
        >
          <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

          <div className="mb-3">
            <label htmlFor="email" className="block mb-1 text-sm">
              Email
            </label>
            <input
              name="email"
              type="email"
              onChange={handleChange}
              value={form.email}
              className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-3 relative">
            <label htmlFor="password" className="block mb-1 text-sm">
              Password
            </label>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              onChange={handleChange}
              value={form.password}
              className="w-full px-4 py-2 pr-10 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-9 right-3 text-white/70 focus:outline-none"
            >
              {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-white text-blue-800 font-semibold py-2 mt-2 rounded-md hover:bg-blue-100 transition"
          >
            Login
          </button>

          {(message || error) && (
            <p
              className={`text-sm mt-4 text-center ${error ? "text-red-400" : "text-green-300"}`}
            >
              {error || message}
            </p>
          )}
        </form>
      </main>
    </GuestRoute>
  );
}
