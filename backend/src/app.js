const express = require("express");
const cors = require("cors");

const donationRoutes = require("./routes/donation.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/donations", donationRoutes);

module.exports = app;
