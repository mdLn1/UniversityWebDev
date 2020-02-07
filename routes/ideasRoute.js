const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const errorChecker = require("../middleware/errorCheckerMiddleware");
const exceptionHandler = require("../utils/exceptionHandler");
const {
  getAllIdeasReq,
  createIdeaReq,
  deleteIdeaReq,
  increaseIdeaViewsReq,
  updateIdeaReq,
  getIdeaByIdReq
} = require("../controllers/ideasController");

// @desc Returns all ideas
// @route GET /api/ideas
// @access Private
router.get("/", exceptionHandler(getAllIdeasReq));

// @desc Returns a specific idea based on passed ID
// @route GET /api/ideas/:id
// @access Private
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

// @desc Creates a new idea
// @route POST /api/ideas/:id
// @access Public
router.post("/", exceptionHandler(createIdeaReq));
router.get(
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
    errorChecker
  ],
  exceptionHandler(increaseIdeaViewsReq)
);
router.delete(
  "/:id",
  [
    check("id", "Id param must be an integer value")
      .exists()
      .isInt(),
    errorChecker
  ],
  exceptionHandler(deleteIdeaReq)
);
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
    errorChecker
  ],
  exceptionHandler(updateIdeaReq)
);

module.exports = router;
