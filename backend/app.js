const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
const donationRoutes = require("./src/routes/donation.routes");
const payhereRoutes = require("./src/routes/payhere.routes"); // ✅ FIXED PATH

app.use("/api/donations", donationRoutes);
app.use("/api/payhere", payhereRoutes); // ✅ REGISTERED BEFORE listen

// START SERVER (ALWAYS LAST)
app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
