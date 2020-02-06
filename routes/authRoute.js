const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const exceptionHandler = require("../utils/exceptionHandler");
const errorChecker = require("../middleware/errorCheckerMiddleware");
const { userLoginReq, registerUserReq} = require("../controllers/authController");

//@route POST api/register/
//@desc Receive registration details
//@access Public
router.post(
  "/register",
  [
    check("name", "Name must be at least 5 characters long")
      .trim()
      .isLength({ min: 5 }),
    check("email", "Email must be at least 6 charaters long")
      .trim()
      .isLength({ min: 6 }),
    check("password", "Password needs to be at least 6 characters long")
      .trim()
      .isLength({ min: 6 }),
    check("role", "Role must be provided")
      .trim()
      .not()
      .isEmpty(),
    check("department", "Department must be provided")
      .trim()
      .not()
      .isEmpty(),
    errorChecker
  ],
  exceptionHandler(registerUserReq)
);

//@route POST api/login/
//@desc Receive login details
//@access Public
router.post(
  "/login",
  [
    check("email", "Email address is required for login")
      .trim()
      .not()
      .isEmpty(),
    check("password", "Password is required for login")
      .trim()
      .not()
      .isEmpty(),
    errorChecker
  ],
  exceptionHandler(userLoginReq)
);

module.exports = router;
