"use client";

import { useState } from "react";
import { sendOtp, verifyOtp } from "@/utils/api/auth";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendOtp = async () => {
    try {
      const res = await sendOtp(email);
      setOtpSent(true);
      setMessage(res.message);
    } catch (err) {
      setMessage(err.message || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setVerifying(true);
      const res = await verifyOtp(email, otp);
      setMessage(res.message);
    } catch (err) {
      setMessage(err.message || "Verification failed");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0c4a6e] text-white px-4">
      <div className="bg-white/10 p-6 rounded-2xl shadow-lg backdrop-blur-md w-full max-w-sm text-white">
        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>

        <label className="block mb-2 text-sm">Email</label>
        <input
          type="email"
          className="w-full px-4 py-2 mb-4 rounded-md bg-white/20 text-white focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {!otpSent ? (
          <button
            onClick={handleSendOtp}
            className="w-full bg-white text-blue-800 font-semibold py-2 rounded-md hover:bg-blue-100 transition"
          >
            Send OTP
          </button>
        ) : (
          <>
            <label className="block mt-4 mb-2 text-sm">Enter OTP</label>
            <input
              type="text"
              className="w-full px-4 py-2 mb-4 rounded-md bg-white/20 text-white focus:outline-none"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              onClick={handleVerifyOtp}
              disabled={verifying}
              className="w-full bg-white text-blue-800 font-semibold py-2 rounded-md hover:bg-blue-100 transition"
            >
              {verifying ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        {message && (
          <p className="text-sm mt-4 text-center text-white/80">{message}</p>
        )}
      </div>
    </main>
  );
}
