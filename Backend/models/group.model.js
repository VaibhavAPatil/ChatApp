import mongoose from "mongoose";

const grouSchema = new mongoose.Schema(
  {
    groupName: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  },
  { timestamps: true }
);

export const Group = mongoose.model("Group", groupSchema);
