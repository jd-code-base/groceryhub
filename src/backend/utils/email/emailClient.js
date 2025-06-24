import CONFIG from "@/backend/config/config";
import nodemailer from "nodemailer";

const { USERNAME, PASSWORD } = CONFIG.EMAIL || {};

if (!USERNAME || !PASSWORD) {
  throw new Error("Email credentials are missing in CONFIG.EMAIL");
}

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: USERNAME,
    pass: PASSWORD,
  },
});

if (CONFIG.NODE_ENV === "development") {
  transporter.verify((err, success) => {
    if (err) {
      console.error("Nodemailer verification failed:", err);
    } else {
      console.log("Nodemailer is ready to send emails");
    }
  });
}

export default transporter;
