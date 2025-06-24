import { verifyToken } from "@/backend/utils/token";
import CONFIG from "@/backend/config/config";

export default function handler(req, res) {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not logged in" });
  }

  try {
    verifyToken(token, CONFIG.JWT.ACCESS_SECRET);
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
}
