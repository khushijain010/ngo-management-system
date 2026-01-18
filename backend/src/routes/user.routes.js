const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getMe,
  getMyDonations
} = require("../controllers/user.controller");

const router = express.Router();

router.get("/me", authMiddleware, getMe);
router.get("/donations", authMiddleware, getMyDonations);

module.exports = router;
