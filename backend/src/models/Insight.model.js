const mongoose = require("mongoose");

const insightSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    value: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["performance", "finance", "engagement", "custom"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Insight = mongoose.model("Insight", insightSchema);

module.exports = Insight;
