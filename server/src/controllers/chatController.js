const Chat = require("../models/Chat");

const createOrGetChat = async (req, res) => {
  const { userId } = req.body;

  let chat = await Chat.findOne({
    participants: { $all: [req.user._id, userId] },
    isGroup: false,
  });

  if (!chat) {
    chat = await Chat.create({
      participants: [req.user._id, userId],
    });
  }

  res.json(chat);
};

const getUserChats = async (req, res) => {
  const chats = await Chat.find({
    participants: req.user._id,
  }).sort({ updatedAt: -1 });

  res.json(chats);
};

module.exports = { createOrGetChat, getUserChats };