const router = require("express").Router();
const controller = require("../controllers/donation.controller");

router.post("/", controller.createDonation);

module.exports = router;
