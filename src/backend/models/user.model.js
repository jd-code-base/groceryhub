import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
      required: function () {
        return this.loginMethod === "manual";
      },
    },
    password: {
      type: String,
      required: function () {
        return this.loginMethod === "manual";
      },
    },
    loginMethod: {
      type: String,
      enum: ["manual", "google", "github"],
      default: "manual",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["active", "blocked", "deleted"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Prevent OverwriteModelError in Next.js
const User = mongoose.models.User || model("User", userSchema);

export default User;
