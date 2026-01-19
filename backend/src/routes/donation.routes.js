const express = require("express");
const router = express.Router();

<<<<<<< HEAD
// Import the controller
const donationController = require("../controllers/donation.controller");
=======
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
>>>>>>> a5e6bea27c57333d9923e43a67b386d89a0a28a4

// Define Routes
// POST http://localhost:5000/api/donation/init
router.post("/init", donationController.initDonation);

// POST http://localhost:5000/api/donation/notify
router.post("/notify", donationController.notify);

// 👇 THIS IS THE MISSING PIECE causing the error
module.exports = router;