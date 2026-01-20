const express = require("express");
const router = express.Router();
const controller = require("../controllers/donation.controller");

router.post("/", controller.createDonation);
router.get("/admin", controller.getSuccessfulDonations);
router.get("/user/:email", controller.getUserDonations);


module.exports = router;
