import Message from "../models/message.model.js";
import Chat from "../models.chat.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { chatId, content } = req.body;
    const sender = req.user._id;

    const message = new Message({ chatId, sender, content });

    await message.save();

    // Update last Message in Chat
    await Chat.findByIdAndUpdate(chatId, { LastMessage: message._id });

    res.status(201).json({ message });
  } catch (error) {
    res.status(500).json({ message: "Error sending message" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await Message.find({ chatId }).populate(
      "sender",
      "username"
    );
    res.json({ messages });
  } catch (error) {
    res.status(500).json({ message: "Error getting messages" });
  }
};
