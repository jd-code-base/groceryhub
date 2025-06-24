import asyncHandler from "@/backend/constants/asyncHandler";
import ApiResponse from "@/backend/constants/apiResponse";

const handler = asyncHandler(async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  res.setHeader("Set-Cookie", [
    `accessToken=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax`,
    `refreshToken=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax`,
  ]);

  return res.status(200).json(ApiResponse.ok({}, "Logged out successfully"));
});

export default handler;
