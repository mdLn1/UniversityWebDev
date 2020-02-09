const express = require("express");
const router = express.Router();
const exceptionHandler = require("../utils/exceptionHandler");
const errorChecker = require("../middleware/errorCheckerMiddleware");
const auth = require("../middleware/authMiddleware");
const { check } = require("express-validator");
const {
  getAllCommentsReq,
  createCommentReq
} = require("../controllers/commentsController");

// @route GET /api/comments/:ideaId
// @desc Returns all comments for an idea
// @access Public
router.get(
  "/:ideaId",
  [
    check("ideaId", "Id param must be an integer value")
      .exists()
      .isInt(),
    errorChecker,
    auth
  ],
  exceptionHandler(getAllCommentsReq)
);

// @route POST /api/comments/:ideaId
// @desc Create a comment for an idea
// @access Private
router.post(
  "/:ideaId",
  [
    check("comment", "Comment must be at least 5 characters long")
      .exists()
      .isLength({ min: 5 }),
    check("isAnonymous", "Is Anonymous must be a boolean")
      .exists()
      .isBoolean(),
    check("ideaId", "Idea Id must be an integer")
      .exists()
      .isInt(),
    errorChecker,
    auth
  ],
  exceptionHandler(createCommentReq)
);

module.exports = router;
