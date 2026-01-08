const express = require("express");
const User = require("../models/User.model");

const router = express.Router();

// CREATE USER
router.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

module.exports = router;
