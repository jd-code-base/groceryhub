"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { sendOtp, verifyOtp } from "@/utils/api/auth";
import GuestRoute from "@/components/GuestRoute";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

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
      setCooldown(60);
      setMessage(res.message);
    } catch (err) {
      setError(err.message || "Failed to send OTP");
    } finally {
      setSending(false);
    }
  };

  const handleResendOtp = async () => {
    if (cooldown > 0) return;

    try {
      setError("");
      setMessage("");
      const res = await sendOtp(email);
      setMessage("OTP resent successfully.");
      setCooldown(60);
    } catch (err) {
      setError(err.message || "Failed to resend OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setError("");
      setMessage("");
      setVerifying(true);
      const res = await verifyOtp(email, otp);
      router.push(`/register/details?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setError(err.message || "Verification failed");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <GuestRoute>
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

              <button
                onClick={handleResendOtp}
                disabled={cooldown > 0}
                className="w-full text-sm text-blue-300 mt-3 hover:underline disabled:opacity-50"
              >
                {cooldown > 0
                  ? `Resend OTP in 00:${cooldown.toString().padStart(2, "0")}`
                  : "Resend OTP"}
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
    </GuestRoute>
  );
}
