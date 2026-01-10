require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const insightRoutes = require("./routes/insight.route");


const healthRoutes = require("./routes/health.route");
const userRoutes = require("./routes/user.route");

const app = express();

// middlewares
app.use(express.json());

// routes
app.use("/api", healthRoutes);
app.use("/api", userRoutes);
app.use("/api/insights", insightRoutes);


// database connection
connectDB();

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
