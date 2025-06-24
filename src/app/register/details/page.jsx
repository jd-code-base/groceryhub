"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { completeRegistration } from "@/utils/api/auth";

export default function RegisterDetailsPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [form, setForm] = useState({
    name: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, password, confirmPassword, phone } = form;

    if (!name || !password || !confirmPassword || !phone) {
      return setError("Please fill all fields.");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      setError("");
      setMessage("Submitting...");

      await completeRegistration({ name, email, password, phone });

      setMessage("Registration complete!");
    } catch (err) {
      console.log(err);
      setError("Registration failed. Try again.");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0c4a6e] text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 p-6 rounded-2xl shadow-lg backdrop-blur-md w-full max-w-sm text-white"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">
          Complete Profile
        </h1>

        <div className="mb-3">
          <label htmlFor="name" className="block mb-1 text-sm">
            Name
          </label>
          <input
            name="name"
            type="text"
            onChange={handleChange}
            value={form.name}
            className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none"
            placeholder="Your name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="block mb-1 text-sm">
            Email
          </label>
          <input
            type="email"
            value={email || ""}
            disabled
            className="w-full px-4 py-2 rounded-md bg-white/30 text-white placeholder-white/60 cursor-not-allowed"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="block mb-1 text-sm">
            Phone Number
          </label>
          <input
            name="phone"
            type="tel"
            onChange={handleChange}
            value={form.phone}
            className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none"
            placeholder="Phone number"
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
            placeholder="Password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-9 right-3 text-white/70 focus:outline-none"
          >
            {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
          </button>
        </div>

        <div className="mb-3 relative">
          <label htmlFor="confirmPassword" className="block mb-1 text-sm">
            Confirm Password
          </label>
          <input
            name="confirmPassword"
            type={showConfirm ? "text" : "password"}
            onChange={handleChange}
            value={form.confirmPassword}
            className="w-full px-4 py-2 pr-10 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none"
            placeholder="Confirm Password"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute top-9 right-3 text-white/70 focus:outline-none"
          >
            {showConfirm ? <HiEyeOff size={20} /> : <HiEye size={20} />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-white text-blue-800 font-semibold py-2 mt-2 rounded-md hover:bg-blue-100 transition"
        >
          Submit
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
  );
}
