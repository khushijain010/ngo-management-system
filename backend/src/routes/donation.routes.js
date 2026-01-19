const express = require("express");
const router = express.Router();

// Import the controller
const donationController = require("../controllers/donation.controller");

// Define Routes
// POST http://localhost:5000/api/donation/init
router.post("/init", donationController.initDonation);

// POST http://localhost:5000/api/donation/notify
router.post("/notify", donationController.notify);

// 👇 THIS IS THE MISSING PIECE causing the error
module.exports = router;