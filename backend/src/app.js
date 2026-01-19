const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const donationRoutes = require("./routes/donation.routes");

const app = express();
const adminRoutes = require("./routes/admin.routes");

app.use("/api/admin", adminRoutes);


// Middleware
app.use(cors());
app.use(express.json());

// 🔐 Auth
app.use("/api/auth", authRoutes);

// 👤 User APIs
app.use("/api/users", userRoutes);

// Routes
app.use("/api/donations", donationRoutes);

app.get("/", (req, res) => {
  res.send("NGO Backend Running");
});

module.exports = app;
