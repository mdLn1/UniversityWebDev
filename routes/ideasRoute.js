const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const userDisabledMiddleware = require("../middleware/userDisabledMiddleware");
const errorChecker = require("../middleware/errorCheckerMiddleware");
const exceptionHandler = require("../utils/exceptionHandler");
const middlewareExceptionHandler = require("../utils/middlewareExceptionHandler");
const authMiddleware = require("../middleware/authMiddleware");
const cloudinaryConfig = require("../utils/cloudinaryConfig");
const multerUploads = require("../middleware/multerMiddleware");
const uploadFilesMiddleware = require("../middleware/uploadFilesMiddleware");
const checkIfLoggedInMiddleware = require("../middleware/checkIfLoggedInMiddleware");
const uploadRoute = require("./uploadsRoute");
const commentRoute = require("./commentsRoute");
const {
  getAllIdeasReq,
  createIdeaReq,
  deleteIdeaReq,
  increaseIdeaViewsReq,
  updateIdeaReq,
  getIdeaByIdReq,
  reportIdeaReq,
  rateIdeaReq
} = require("../controllers/ideasController");
const paginationMiddleware = require("../utils/paginationMiddleware");

router.use("/:ideaId/uploads", uploadRoute);
router.use("/:ideaId/comments", commentRoute);

// @route GET /api/ideas
// @desc Returns all ideas
// @access Public
router.get(
  "/",
  checkIfLoggedInMiddleware,
  paginationMiddleware,
  exceptionHandler(getAllIdeasReq)
);

// @route GET /api/ideas/:id
// @desc Returns a specific idea based on passed ID
// @access Public
router.get(
  "/:id",
  [
    check("id", "Id param must be an integer value")
      .exists()
      .isInt(),
    errorChecker,
    checkIfLoggedInMiddleware
  ],
  exceptionHandler(getIdeaByIdReq)
);

// @route GET /api/ideas/:id/increase-views
// @desc Increase views counter for idea
// @access Public
router.get("/:id/increase-views", exceptionHandler(increaseIdeaViewsReq));

// @route POST /api/ideas/:id
// @desc Creates a new idea
// @access Private
router.post(
  "/",
  [
    multerUploads.any(),
    check("description", "Description must contain at least 15 characters")
      .exists()
      .trim()
      .isLength({ min: 15 }),
    check("isAnonymous", "Is Anonymous does not exist")
      .exists()
      .isBoolean(),
    check("title", "Title must be at least 5 characters long")
      .exists()
      .trim()
      .isLength({ min: 5 }),
    errorChecker,
    authMiddleware,
    userDisabledMiddleware,
    cloudinaryConfig,
    middlewareExceptionHandler(uploadFilesMiddleware)
  ],
  exceptionHandler(createIdeaReq)
);

// @route POST /api/ideas/:id
// @desc Updates information for an idea
// @access Private
router.post(
  "/:id",
  [
    check("id", "Id param must be an integer value")
      .exists()
      .isInt(),
    check("title", "Title must be at least 5 characters long")
      .exists()
      .trim()
      .isLength({ min: 5 }),
    check("description", "Description must contain at least 20 characters")
      .exists()
      .trim()
      .isLength({ min: 20 }),
    errorChecker,
    authMiddleware
  ],
  exceptionHandler(updateIdeaReq)
);

// @route POST /api/ideas/:ideaId/report
// @desc Reports an idea
// @access Private
router.post(
  "/:ideaId/report",
  [
    check("ideaId", "Idea id param must be an integer value")
      .exists()
      .isInt(),
    check("problem", "Problem must be between 10 characters and 200")
      .exists()
      .isLength({ min: 10, max: 200 }),
    errorChecker,
    authMiddleware
  ],
  exceptionHandler(reportIdeaReq)
);

// @route GET /api/ideas/:ideaId/rate?vote={1 or 0}
// @desc Deals with rating ideas
// @access Private
router.get(
  "/:ideaId/rate",
  [
    check("ideaId", "Idea id param must be an integer value")
      .exists()
      .isInt(),
    errorChecker,
    authMiddleware
  ],
  exceptionHandler(rateIdeaReq)
);

// @route DELETE /api/ideas/:id
// @desc Deletes an idea
// @access Private and restricted
router.delete(
  "/:id",
  [
    check("id", "Id param must be an integer value")
      .exists()
      .isInt(),
    errorChecker,
    authMiddleware,
    cloudinaryConfig
  ],
  exceptionHandler(deleteIdeaReq)
);

module.exports = router;
