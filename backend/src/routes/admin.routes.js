const router = require("express").Router();
const { protect } = require("../middleware/auth.middleware");
const {
  getDashboardStats,
  getAllUsers,
} = require("../controllers/admin.controller");

router.get("/stats", protect(["ADMIN"]), getDashboardStats);
router.get("/users", protect(["ADMIN"]), getAllUsers);

module.exports = router;
