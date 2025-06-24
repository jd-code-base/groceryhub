"use client";

import { useState } from "react";
import { sendOtp, verifyOtp } from "@/utils/api/auth";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSendOtp = async () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setError("");
      setMessage("");
      setSending(true);
      const res = await sendOtp(email);
      setOtpSent(true);
      setMessage(res.message);
    } catch (err) {
      setError(err.message || "Failed to send OTP");
    } finally {
      setSending(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setError("");
      setMessage("");
      setVerifying(true);
      const res = await verifyOtp(email, otp);
      setMessage(res.message);
    } catch (err) {
      setError(err.message || "Verification failed");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0c4a6e] text-white px-4">
      <div className="bg-white/10 p-6 rounded-2xl shadow-lg backdrop-blur-md w-full max-w-sm text-white">
        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 text-sm">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        {!otpSent ? (
          <button
            onClick={handleSendOtp}
            disabled={sending}
            className="w-full bg-white text-blue-800 font-semibold py-2 rounded-md hover:bg-blue-100 transition disabled:opacity-50"
          >
            {sending ? "Sending OTP..." : "Send OTP"}
          </button>
        ) : (
          <>
            <div className="mt-4 mb-2">
              <label htmlFor="otp" className="block mb-1 text-sm">
                Enter OTP
              </label>
              <input
                id="otp"
                type="text"
                className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter the OTP sent to your email"
              />
            </div>
            <button
              onClick={handleVerifyOtp}
              disabled={verifying}
              className="w-full bg-white text-blue-800 font-semibold py-2 mt-2 rounded-md hover:bg-blue-100 transition disabled:opacity-50"
            >
              {verifying ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        {(message || error) && (
          <p
            className={`text-sm mt-4 text-center ${
              error ? "text-red-400" : "text-green-300"
            }`}
          >
            {error || message}
          </p>
        )}
      </div>
    </main>
  );
}
