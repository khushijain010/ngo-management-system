const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin.controller");
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");

router.get("/stats", auth, admin, adminController.getStats);
router.get("/users", auth, admin, adminController.getAllUsers);
router.get("/donations", auth, admin, adminController.getAllDonations);

module.exports = router;
