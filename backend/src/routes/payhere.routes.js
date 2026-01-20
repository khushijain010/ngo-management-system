const express = require("express");
const router = express.Router();
const { generateHash } = require("../controllers/payhere.controller");

router.post("/hash", generateHash);

module.exports = router;
