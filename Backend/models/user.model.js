import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullNane: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    mobileNo: {
      type: Number,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
