import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";

export const createChat = async (req, res) => {
  try {
    const { userId } = req.body;
    const existingChat = await Chat.findOne({
      participants: { $all: [req.user._id, userId] },
      isGroupChat: false,
    });

    if (existingChat) return res.json({ existingChat });

    const newChat = new Chat({
      participants: [req.user._id, userId],
    });
    await newChat.save();
    res.status(201).json({ newChat });
  } catch (error) {
    res.status(500).json({ message: "Error creating chat" });
  }
};

export const getChats = async (req, res) => {
  try {
    const chats = await Chat.find({ participants: req.user._id }).populate(
      "participants",
      "username"
    );
  } catch (error) {
    res.status(500).json({ message: "Error getting chats" });
  }
};
