const express = require("express");
const router = express.Router();
const writeFeedback = require("../utils/writeFeedback");
const CustomError = require("../utils/CustomError");
const IsInRole = require("../middleware/authorizeMiddleware");
const exceptionHandler = require("../utils/exceptionHandler");
const { updateUserByIdReq } = require("../controllers/managementController");

//@route POST api/management/:id/update-user
//@desc Change user details
//@access Private and limited access
router.post(
  "/:id/update-user",
  [auth, IsInRole(["Admin", "Manager"])],
  exceptionHandler()
);

module.exports = router;
