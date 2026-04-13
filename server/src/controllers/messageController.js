const Message = require("../models/Message");
const Chat = require("../models/Chat");

const sendMessage = async (req, res) => {
  const { chatId, message } = req.body;

  const newMessage = await Message.create({
    chatId,
    senderId: req.user._id,
    message,
    readBy: [req.user._id],
  });

  await Chat.findByIdAndUpdate(chatId, {
    lastMessage: message,
  });

  res.json(newMessage);
};

const getMessages = async (req, res) => {
  const messages = await Message.find({
    chatId: req.params.chatId,
  }).sort({ createdAt: 1 });

  res.json(messages);
};

module.exports = { sendMessage, getMessages };