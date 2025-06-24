import connectDB from "@/backend/config/db";
import ApiError from "@/backend/constants/apiError";
import ApiResponse from "@/backend/constants/apiResponse";
import asyncHandler from "@/backend/constants/asyncHandler";
import User from "@/backend/models/user.model";
import bcrypt from "bcryptjs";
import {
  generateAccessToken,
  generateRefreshToken,
} from "@/backend/utils/token";
import { setAccessToken, setRefreshToken } from "@/backend/utils/cookies";
import { validateEmail } from "@/backend/validators/auth.validator";

const handler = asyncHandler(async (req, res) => {
  if (req.method !== "POST") {
    throw ApiError.badRequest("Invalid request method");
  }

  await connectDB();

  const { email, password } = req.body;

  if (!email || !password) {
    throw ApiError.badRequest("Email and password are required");
  }

  if (!validateEmail(email)) {
    throw ApiError.badRequest("Invalid email format");
  }

  const user = await User.findOne({ email });
  if (!user || user.loginMethod !== "manual") {
    throw ApiError.unauthorized("Invalid credentials or login method");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw ApiError.unauthorized("Invalid credentials");
  }

  const accessToken = generateAccessToken(user._id, user.email);
  const refreshToken = generateRefreshToken(user._id, user.email);

  setAccessToken(res, accessToken);
  setRefreshToken(res, refreshToken);

  return res
    .status(200)
    .json(ApiResponse.ok({ userId: user._id }, "Login successful"));
});

export default handler;
