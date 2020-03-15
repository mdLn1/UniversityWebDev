const express = require("express");
const router = express.Router();
const IsInRole = require("../middleware/authorizeMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const exceptionHandler = require("../utils/exceptionHandler");
const config = require("config");
const { admin, coordinator } = config.get("roles");
const {
  adminUpdateUserDetailsReq,
  adminDisableUserAccountReq,
  adminEnableUserAccountReq,
  adminHideUserActivityReq,
  adminShowUserActivityReq,
  adminDeleteCommentReq,
  adminDeleteIdeaReq
} = require("../controllers/managementController");

const {
  getReportedProblemsByIdeaIdReq,
  getAllReportedIdeasReq
} = require("../controllers/ideasController");

const {
  getReportedProblemsByCommentIdReq,
  getAllReportedCommentsReq
} = require("../controllers/commentsController");

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

router.get(
  "/hide-user-activity/:userId",
  [authMiddleware, IsInRole(admin)],
  exceptionHandler(adminHideUserActivityReq)
);

router.get(
  "/show-user-activity/:userId",
  [authMiddleware, IsInRole(admin)],
  exceptionHandler(adminShowUserActivityReq)
);

router.delete(
  "/delete-comment/:commentId",
  [authMiddleware, IsInRole(admin)],
  exceptionHandler(adminDeleteCommentReq)
);

router.delete(
  "/delete-idea/:ideaId",
  [authMiddleware, IsInRole(admin)],
  exceptionHandler(adminDeleteIdeaReq)
);

router.get(
  "/reported-ideas",
  [authMiddleware, IsInRole(admin)],
  exceptionHandler(getAllReportedIdeasReq)
);

router.get(
  "/reported-ideas/:id",
  [authMiddleware, IsInRole(admin)],
  exceptionHandler(getReportedProblemsByIdeaIdReq)
);
router.get(
  "/reported-comments",
  [authMiddleware, IsInRole(admin)],
  exceptionHandler(getAllReportedCommentsReq)
);

router.get(
  "/reported-comments/:id",
  [authMiddleware, IsInRole(admin)],
  exceptionHandler(getReportedProblemsByCommentIdReq)
);
module.exports = router;
