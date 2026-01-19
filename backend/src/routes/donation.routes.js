const express = require("express");
const router = express.Router();

const donationController = require("../controllers/donation.controller");
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");

// USER: create donation
router.post("/", auth, donationController.createDonation);
router.post("/verify", auth, donationController.updateDonationStatus);

// USER: get own donations
router.get("/my", auth, donationController.getMyDonations);

// ADMIN: get all donations
router.get("/", auth, admin, donationController.getAllDonations);

module.exports = router;
