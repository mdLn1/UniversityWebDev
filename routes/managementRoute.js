const express = require("express");
const router = express.Router();
const IsInRole = require("../middleware/authorizeMiddleware");
const { check } = require("express-validator");
const cloudinaryConfig = require("../utils/cloudinaryConfig");
const errorChecker = require("../middleware/errorCheckerMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const {
  downloadAllUploadsReq
} = require("../controllers/fileUploadsController.js");
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
  deleteIdeaReq,
  getAllIdeasForCSVExportReq
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
const { getAllUsersReq } = require("../controllers/userController");

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
  [
    authMiddleware,
    IsInRole([admin, coordinator]),
    check("name", "Name must be at least 5 characters long")
      .trim()
      .isLength({ min: 5 }),
    check("email", "Email must be at least 6 characters long")
      .trim()
      .isLength({ min: 6 }),
    check("password", "Password must exist").exists(),
    check("role", "Role must be provided").exists(),
    check("department", "Department must be provided").exists(),
    check("hideActivities", "hide activities must be provided").exists(),
    check("disabled", "disabled must be provided").exists(),
    errorChecker
  ],
  exceptionHandler(adminUpdateUserDetailsReq)
);

router.get(
  "/download-csv-data",
  [authMiddleware, IsInRole(admin)],
  exceptionHandler(getAllIdeasForCSVExportReq)
);

router.get(
  "/download-all-files",
  cloudinaryConfig,
  [authMiddleware, IsInRole(admin)],
  exceptionHandler(downloadAllUploadsReq)
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

router.get(
  "/users",
  [authMiddleware, IsInRole(admin)],
  exceptionHandler(getAllUsersReq)
);
module.exports = router;
