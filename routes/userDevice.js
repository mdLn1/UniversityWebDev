const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const errorChecker = require("../utils/exceptionHandler");
const {
  createUserDevice,
  browserUsage,
  osUsage
} = require("../controllers/userDevice");
const auth = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorizeMiddleware");
const config = require("config");
const { admin } = config.get("roles");

// @route POST /api/userDevice/
// @desc Create new user device row
// @access Public
router.post(
  "/",
  [
    check("browser", "no browser")
      .trim()
      .not()
      .isEmpty(),
    check("os", "no os")
      .trim()
      .not()
      .isEmpty()
  ],
  exceptionHandler(createUserDevice)
);

// @route Get /api/userDevice/
// @desc Get all the browser usage stats
// @access Public
router.get("/browser", exceptionHandler(browserUsage));

// @route Get /api/userDevice/
// @desc Get all the browser usage stats
// @access Public
router.get("/os", exceptionHandler(osUsage));

// necessary line for every route
module.exports = router;
