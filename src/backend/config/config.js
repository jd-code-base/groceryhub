import dotenv from "dotenv";
dotenv.config();

const CONFIG = {
  NODE_ENV: process.env.NODE_ENV || "development",
  LOG_REQUEST_BODY: process.env.LOG_REQUEST_BODY === "true",

  MONGO_URI: process.env.MONGO_URI || "",
  MAX_RETRIES: process.env.MAX_RETRIES || 2,
  PORT: process.env.PORT || 5000,
  REDIS_URI: process.env.REDIS_URI || "",

  // EMAIL: {
  //   USERNAME: process.env.USERNAME,
  //   PASSWORD: process.env.PASSWORD,
  // },

  // JWT: {
  //   ACCESS_SECRET: process.env.ACCESS_TOKEN_SECRET || "default_access_secret",
  //   REFRESH_SECRET:
  //     process.env.REFRESH_TOKEN_SECRET || "default_refresh_secret",
  //   ACCESS_EXPIRATION: process.env.ACCESS_TOKEN_EXPIRATION || "15m",
  //   REFRESH_EXPIRATION: process.env.REFRESH_TOKEN_EXPIRATION || "10d",
  // },

  // COOKIE: {
  //   DOMAIN: process.env.COOKIE_DOMAIN || "localhost",
  //   SECURE: process.env.COOKIE_SECURE === "true",
  //   SAME_SITE: process.env.NODE_ENV === "production" ? "None" : "Lax",
  // },

  // GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
};

export default CONFIG;
