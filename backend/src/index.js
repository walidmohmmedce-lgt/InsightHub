require("dotenv").config();
const connectDB = require("./config/db");
const express = require("express");
const healthRoutes = require("./routes/health.route");

const app = express();

app.use(express.json());

// routes
app.use("/api", healthRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
connectDB();
