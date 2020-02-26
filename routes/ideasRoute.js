const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const userDisabledMiddleware = require("../middleware/userDisabledMiddleware");
const errorChecker = require("../middleware/errorCheckerMiddleware");
const exceptionHandler = require("../utils/exceptionHandler");
const authMiddleware = require("../middleware/authMiddleware");
const cloudinaryConfig = require("../utils/cloudinaryConfig");
const multerUploads = require("../middleware/multerMiddleware");
const uploadFilesMiddleware = require("../middleware/uploadFilesMiddleware");
const uploadRoute = require("./uploadsRoute");
const commentRoute = require("./commentsRoute");
const {
  getAllIdeasReq,
  createIdeaReq,
  deleteIdeaReq,
  increaseIdeaViewsReq,
  updateIdeaReq,
  getIdeaByIdReq
} = require("../controllers/ideasController");

router.use("/:ideaId/uploads", uploadRoute);
router.use("/:ideaId/comments", commentRoute)

// @route GET /api/ideas
// @desc Returns all ideas
// @access Public
router.get("/", exceptionHandler(getAllIdeasReq));

// @route GET /api/ideas/:id
// @desc Returns a specific idea based on passed ID
// @access Public
router.get(
  "/:id",
  [
    check("id", "Id param must be an integer value")
      .exists()
      .isInt(),
    errorChecker
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
    check("categoryId", "Category Id must be an integer")
      .exists()
      .isInt(),
    check("title", "Title must be at least 5 characters long")
      .exists()
      .trim()
      .isLength({ min: 5 }),
    errorChecker,
    authMiddleware,
    userDisabledMiddleware,
    cloudinaryConfig,
    uploadFilesMiddleware
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
