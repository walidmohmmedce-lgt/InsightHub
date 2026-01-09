const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

// ✅ SINGLE, CORRECT IMPORT
const { protect, adminOnly } = require("../middleware/auth.middleware");

const router = express.Router();

// ==============================
// REGISTER USER
// ==============================
router.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ==============================
// LOGIN USER + JWT
// ==============================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// ==============================
// PROFILE (PROTECTED)
// ==============================
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

// ==============================
// ADMIN ONLY
// ==============================
router.get("/admin", protect, adminOnly, (req, res) => {
  res.json({
    message: "Welcome Admin 👑",
    user: req.user,
  });
});


module.exports = router;
