const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const donationRoutes = require("./src/routes/donation.routes");

// 🔍 DEBUGGING CHECK (Prevents the crash if route is missing)
if (!donationRoutes || typeof donationRoutes !== "function") {
  console.error("❌ CRITICAL ERROR: 'donationRoutes' is not a valid middleware function.");
  console.error("👉 Check src/routes/donation.routes.js and ensure it ends with: module.exports = router;");
  // Don't crash, just skip the route so you can see the log
} else {
  app.use("/api/donation", donationRoutes);
  console.log("✅ Donation routes loaded successfully");
}

// Basic Health Check
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
const cors = require("cors");
app.use(cors());