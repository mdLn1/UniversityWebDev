const express = require("express");
const router = express.Router();
const IsInRole = require("../middleware/authorizeMiddleware");
const { check } = require("express-validator");
const errorChecker = require("../middleware/errorCheckerMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const exceptionHandler = require("../utils/exceptionHandler");
const config = require("config");
const { admin, coordinator } = config.get("roles");
const {
  adminUpdateUserDetailsReq,
  adminDisableUserAccountReq,
  adminEnableUserAccountReq,
  adminHideUserActivityReq,
  adminShowUserActivityReq
} = require("../controllers/managementController");

const {
  getReportedProblemsByIdeaIdReq,
  getAllReportedIdeasReq,
  deleteIdeaReq
} = require("../controllers/ideasController");

const {
  getReportedProblemsByCommentIdReq,
  getAllReportedCommentsReq,
  deleteCommentReq
} = require("../controllers/commentsController");

const {
  createDeadlineReq,
  getAllDeadlinesReq,
  updateDeadlineReq
} = require("../controllers/deadlinesController");

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

router.post(
  "/deadlines",
  check(
    "ideasSubmissionEnd",
    "You must provide a submission deadline for ideas"
  ).exists(),
  check(
    "commentsSubmissionEnd",
    "You must provide a submission deadline for comments"
  ).exists(),
  errorChecker,
  [authMiddleware, IsInRole(admin)],
  exceptionHandler(createDeadlineReq)
);

router.post(
  "/deadlines/:id",
  check(
    "ideasSubmissionEnd",
    "You must provide a submission deadline for ideas"
  ).exists(),
  check(
    "commentsSubmissionEnd",
    "You must provide a submission deadline for comments"
  ).exists(),
  errorChecker,
  [authMiddleware, IsInRole(admin)],
  exceptionHandler(updateDeadlineReq)
);

router.get("/deadlines", exceptionHandler(getAllDeadlinesReq));

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
  exceptionHandler(deleteCommentReq)
);

router.delete(
  "/delete-idea/:ideaId",
  [authMiddleware, IsInRole(admin)],
  exceptionHandler(deleteIdeaReq)
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
