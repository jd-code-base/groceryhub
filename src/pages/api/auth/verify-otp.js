import CONFIG from "@/backend/config/config";
import redisClient from "@/backend/config/redis";
import ApiError from "@/backend/constants/apiError";
import ApiResponse from "@/backend/constants/apiResponse";
import asyncHandler from "@/backend/constants/asyncHandler";
import { validateEmail } from "@/backend/validators/auth.validator";
import crypto from "crypto";

const handler = asyncHandler(async (req, res) => {
  if (req.method !== "POST") {
    throw ApiError.badRequest("Invalid request method");
  }

  const { email, otp } = req.body;

  if (!email || !validateEmail(email)) {
    throw ApiError.badRequest("Invalid email");
  }

  if (!otp || otp.length !== 6 || isNaN(otp)) {
    throw ApiError.badRequest("Invalid OTP format");
  }

  const otpKey = `otp:${email}`;
  const storedHashedOtp = await redisClient.get(otpKey);

  if (!storedHashedOtp) {
    throw ApiError.badRequest("OTP expired or not found");
  }

  const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

  if (hashedOtp !== storedHashedOtp) {
    throw ApiError.badRequest("OTP does not match");
  }

  await redisClient.setex(`${otpKey}:verified`, 3600, "true");
  await redisClient.del(otpKey);

  if (CONFIG.NODE_ENV === "development") {
    console.log(`[OTP Verified] ${email}`);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "OTP Verified Successfully"));
});

export default handler;
