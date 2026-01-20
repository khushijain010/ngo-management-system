const express = require("express");
const router = express.Router();
const donationController = require("../controllers/donation.controller");

// Save donation
router.post("/", donationController.createDonation);

// Admin – all successful
router.get("/success", donationController.getSuccessfulDonations);

// User-specific donations
router.get("/user/:email", donationController.getUserDonations);

module.exports = router;
