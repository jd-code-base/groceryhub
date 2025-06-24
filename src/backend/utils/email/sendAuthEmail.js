import CONFIG from "@/backend/config/config";
import transporter from "./emailClient";

const subjects = {
  register: "Verify Your Email for Registration",
  forgotPassword: "Reset Your Password",
};

const messages = {
  register: `Your OTP for email verification is: <strong>{{OTP}}</strong>.`,
  forgotPassword: `Your OTP to reset your password is: <strong>{{OTP}}</strong>.`,
};

/**
 * Sends an authentication-related email (e.g., register or forgotPassword).
 *
 * @param {string} email - Recipient's email address
 * @param {string} otp - OTP to send
 * @param {'register' | 'forgotPassword'} type - Email type
 */
export const sendAuthEmail = async (email, otp, type) => {
  const subject = subjects[type];
  const rawMessage = messages[type] || `Your OTP is: <strong>${otp}</strong>.`;
  const message = rawMessage.replace("{{OTP}}", otp);

  const htmlTemplate = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <p>Dear User,</p>
      <p>${message}</p>
      <p>This OTP is valid for <strong>10 minutes</strong>.</p>
      <p>If you did not request this, please ignore this email.</p>
      <br/>
      <p>Thanks,<br/>GroceryHub Team</p>
    </div>
  `;

  const mailOptions = {
    from: CONFIG.EMAIL.USERNAME,
    to: email,
    subject,
    html: htmlTemplate,
  };

  try {
    await transporter.sendMail(mailOptions);

    if (CONFIG.NODE_ENV === "development") {
      console.log(`📧 Email sent to: ${email}`);
      console.log(`🔐 OTP: ${otp}`);
      console.log(`📄 Type: ${type}`);
    }
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
