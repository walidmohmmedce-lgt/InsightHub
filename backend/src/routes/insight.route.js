const express = require("express");
const Insight = require("../models/Insight.model");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

// ==============================
// CREATE INSIGHT (PROTECTED)
// ==============================
router.post("/", protect, async (req, res) => {
  try {
    const { title, description, value, category } = req.body;

    const insight = await Insight.create({
      title,
      description,
      value,
      category,
      createdBy: req.user._id,
    });

    res.status(201).json(insight);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// ==============================
// GET MY INSIGHTS (PROTECTED)
// ==============================
router.get("/", protect, async (req, res) => {
  try {
    const insights = await Insight.find({ createdBy: req.user._id })
      .sort({ createdAt: -1 });

    res.json(insights);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch insights" });
  }
});

module.exports = router;
