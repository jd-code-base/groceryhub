import jwt from "jsonwebtoken";
import ApiError from "../constants/apiError";
import CONFIG from "../config/config";

const generateToken = (userId, email, secret, expiresIn) => {
  if (!userId || !email) {
    throw new ApiError(400, "Missing userId or Email for token generation");
  }

  try {
    return jwt.sign({ userId, email }, secret, { expiresIn });
  } catch (error) {
    console.error(`Error Generating Token: `, error);
    throw new ApiError(500, "Token Generation Failed");
  }
};

export const generateAccessToken = (userId, email) => {
  return generateToken(
    userId,
    email,
    CONFIG.JWT.ACCESS_SECRET,
    CONFIG.JWT.ACCESS_EXPIRATION
  );
};

export const generateRefreshToken = (userId, email) => {
  return generateToken(
    userId,
    email,
    CONFIG.JWT.REFRESH_SECRET,
    CONFIG.JWT.REFRESH_EXPIRATION
  );
};

export const verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new ApiError(401, "Invalid or expired token");
  }
};
