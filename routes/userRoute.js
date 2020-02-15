const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const exceptionHandler = require("../utils/exceptionHandler");
const {
  updateUserDetailsReq,
  updateUserPasswordReq,
  getUserDetailsReq
} = require("../controllers/userController");
const errorChecker = require("../middleware/errorCheckerMiddleware");
const { check } = require("express-validator");

//@route POST api/user/update-details
//@desc Update user details
//@access Private
router.post(
  "/update-details",
  [
    check("name", "Name must be at least 5 characters long")
      .trim()
      .isLength({ min: 5 }),
    check("email", "Email must be at least 6 characters long")
      .trim()
      .isLength({ min: 7 }),
    errorChecker,
    authMiddleware
  ],
  exceptionHandler(updateUserDetailsReq)
);

//@route POST api/user/update-password
//@desc Update user password
//@access Private
router.post(
  "/update-password",
  [authMiddleware],
  exceptionHandler(updateUserPasswordReq)
);

//@route GET api/user/
//@desc Return user details
//@access Private
router.get("/", authMiddleware, exceptionHandler(getUserDetailsReq));

// necessary line for every route
module.exports = router;
