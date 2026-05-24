const express = require("express");
const protect = require("../middleware/authMiddleware");
const { searchUsers } = require("../controllers/userController");

const router = express.Router();

router.get("/search", protect, searchUsers);

router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

module.exports = router;