const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const errorChecker = require("../middleware/errorCheckerMiddleware");
const exceptionHandler = require("../utils/exceptionHandler");
const auth = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorizeMiddleware");
const config = require("config");
const { admin, coordinator } = config.get("roles");
const {
  getAllIdeasReq,
  createIdeaReq,
  deleteIdeaReq,
  increaseIdeaViewsReq,
  updateIdeaReq,
  getIdeaByIdReq
} = require("../controllers/ideasController");

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
  "/:id",
  [
    check("id", "Id param must be an integer value")
      .exists()
      .isInt(),
    check("description", "Description must contain at least 20 characters")
      .exists()
      .trim()
      .isLength({ min: 20 }),
    check("isAnonymous", "Is Anonymous does not exist")
      .exists()
      .isBoolean(),
    check("categoryId", "Category Id must be an integer")
      .exists()
      .isInt(),
    check("userId", "User Id must be an integer")
      .exists()
      .isInt(),
    check("title", "Title must be at least 5 characters long")
      .exists()
      .trim()
      .isLength({ min: 5 }),
    errorChecker,
    auth
  ],
  exceptionHandler(createIdeaReq)
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
    auth,
    authorize([admin, coordinator])
  ],
  exceptionHandler(deleteIdeaReq)
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
    auth
  ],
  exceptionHandler(updateIdeaReq)
);

module.exports = router;
