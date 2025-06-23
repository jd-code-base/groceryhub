import connectDB from "@/backend/config/db";
import redisClient from "@/backend/config/redis";
import ApiError from "@/backend/constants/apiError";
import asyncHandler from "@/backend/constants/asyncHandler";
import User from "@/backend/models/user.model";
import { validateEmail } from "@/backend/validators/auth.validator";
import { sendAuthEmail } from "@/utils/email/sendAuthEmail";
import crypto from "crypto";

const handler = asyncHandler(async (req, res) => {
  if (req.method !== "POST") {
    throw ApiError.badRequest("Invalid request method");
  }

  connectDB();

  const { email } = req.body;

  if (!email || !validateEmail(email)) {
    throw ApiError.badRequest("Invalid email");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const msg =
      existingUser.loginMethod === "google"
        ? "This email is registered with Google login. Please continue with Google."
        : existingUser.loginMethod === "github"
          ? "This email is registered with GitHub login. Please continue with GitHub."
          : "This email is already registered. Please log in or use a different email.";

    throw ApiError.badRequest(msg);
  }

  const isRateLimited = await redisClient.get(`otp:${email}:limit`);
  if (isRateLimited) {
    throw ApiError.tooManyRequest(
      "OTP already sent. Please wait before retrying."
    );
  }

  const otp = crypto.randomInt(100000, 999999).toString();
  const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

  // Store hashed OTP and rate limit flag
  await redisClient.setex(`otp:${email}`, 600, hashedOtp); // valid 10 min
  await redisClient.setex(`otp:${email}:limit`, 60, "1"); // resend block for 1 min

  // Send OTP email
  await sendAuthEmail(email, otp, "register");

  return res.status(200).json({
    success: true,
    message: "OTP sent successfully",
  });
});

export default handler;
