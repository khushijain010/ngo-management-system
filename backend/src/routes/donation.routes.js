const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { createDonation } = require("../controllers/donation.controller");
const router = express.Router();

router.post("/", authMiddleware, createDonation);

module.exports = router;
