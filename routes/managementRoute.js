const express = require("express");
const router = express.Router();
const IsInRole = require("../middleware/authorizeMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const exceptionHandler = require("../utils/exceptionHandler");
const config = require("config");
const { admin, coordinator } = config.get("roles");
const {
  adminUpdateUserDetailsReq,
  adminDisableUserAccountReq
} = require("../controllers/managementController");

// const rolesRouter = require("./rolesRoute");
// const categoriesRouter = require("./categoriesRoute");
// const departmentsRouter = require("./departmentsRoute");

// adding other routes to management router
// router.use("/roles", rolesRouter);
// router.user("/categories", categoriesRouter);
// router.user("/departments", departmentsRouter);

//@route POST api/management/update-user/:id
//@desc Change user details
//@access Private and limited access
router.post(
  "/update-user/:userId",
  [authMiddleware, IsInRole([admin, coordinator])],
  exceptionHandler(adminUpdateUserDetailsReq)
);

router.get(
  "/disable-user/:userId",
  [authMiddleware, IsInRole(admin)],
  exceptionHandler(adminDisableUserAccountReq)
);

router.get(
  "/enable-user/:userId",
  [authMiddleware, IsInRole(admin)],
  exceptionHandler(adminEnableUserAccountReq)
);

module.exports = router;
