import bcrypt from "bcryptjs";

import connectDB from "@/backend/config/db";
import redisClient from "@/backend/config/redis";
import asyncHandler from "@/backend/constants/asyncHandler";
import ApiError from "@/backend/constants/apiError";
import ApiResponse from "@/backend/constants/apiResponse";
import User from "@/backend/models/user.model";
import {
  validateEmail,
  validatePassword,
  validatePhone,
} from "@/backend/validators/auth.validator";
import {
  generateAccessToken,
  generateRefreshToken,
} from "@/backend/utils/token";
import { setAccessToken, setRefreshToken } from "@/backend/utils/cookies";

const handler = asyncHandler(async (req, res) => {
  if (req.method !== "POST") {
    throw ApiError.badRequest("Invalid request method. Use POST.");
  }

  await connectDB();

  const { name, email, password, phone } = req.body;

  if (!name?.trim() || !email?.trim() || !password?.trim() || !phone?.trim()) {
    throw ApiError.badRequest("All fields are required.");
  }

  if (!validateEmail(email)) {
    throw ApiError.badRequest("Invalid email address.");
  }

  if (!validatePhone(phone)) {
    throw ApiError.badRequest(
      "Phone number must be a valid 10-digit Indian number."
    );
  }

  if (!validatePassword(password)) {
    throw ApiError.badRequest(
      "Password must be 8+ chars, contain uppercase, lowercase, number, and special character."
    );
  }

  const isVerified = await redisClient.get(`otp:${email}:verified`);
  if (!isVerified) {
    throw ApiError.forbidden("Please verify your email first.");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw ApiError.badRequest("A user with this email already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email: email.toLowerCase(),
    phoneNumber: phone,
    password: hashedPassword,
    loginMethod: "manual",
    isEmailVerified: true,
  });

  await redisClient.del(`otp:${email}:verified`);

  const [accessToken, refreshToken] = await Promise.all([
    generateAccessToken(newUser._id, newUser.email),
    generateRefreshToken(newUser._id, newUser.email),
  ]);

  setAccessToken(res, accessToken);
  setRefreshToken(res, refreshToken);

  return res.status(201).json(
    ApiResponse.created(
      {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phoneNumber,
        createdAt: newUser.createdAt,
      },
      "User registered successfully"
    )
  );
});

export default handler;
