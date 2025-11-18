import mongoose from "mongoose";

const messageScheme = new mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    messageType: {
      type: String,
      enum: [
        "text",
        "image",
        "audio",
        "videos",
        "files",
        "location",
        "contact",
        "sticker",
      ],
      default: "text",
    },
    seenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageScheme);
