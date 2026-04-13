const express = require("express");
const protect = require("../middleware/authMiddleware");
const { createOrGetChat, getUserChats } = require("../controllers/chatController");

const router = express.Router();

router.post("/", protect, createOrGetChat);
router.get("/", protect, getUserChats);

module.exports = router;