const User = require("../models/User");

const searchUsers = async (req, res) => {
  const query = req.query.query;

  const users = await User.find({
    username: { $regex: query, $options: "i" },
  }).select("-password");

  res.json(users);
};

module.exports = { searchUsers };