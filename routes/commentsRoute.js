const express = require("express");
const router = express.Router({ mergeParams: true });
const { check } = require("express-validator");
const errorChecker = require("../middleware/errorCheckerMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const exceptionHandler = require("../utils/exceptionHandler");
const {
  getAllCommentsReq,
  createCommentReq,
  deleteCommentReq,
  updateCommentForIdeaReq
} = require("../controllers/commentsController");

// @route GET /api/ideas/:ideaId/comments
// @desc Returns all comments for an idea
// @access Public
router.get(
  "/",
  [
    check("ideaId", "Id param must be an integer value")
      .exists()
      .isInt(),
    errorChecker,
    authMiddleware
  ],
  exceptionHandler(getAllCommentsReq)
);

// @route POST /api/ideas/:ideaId/comments
// @desc Create a comment for an idea
// @access Private
router.post(
  "/",
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
    authMiddleware
  ],
  exceptionHandler(createCommentReq)
);

// @route POST /api/ideas/:ideaId/comments/:commentId
// @desc Update a comment for an idea
// @access Private
router.post(
  "/:commentId",
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
    check("commentId", "Comment Id must be an integer")
      .exists()
      .isInt(),
    errorChecker,
    authMiddleware
  ],
  exceptionHandler(updateCommentForIdeaReq)
);

// @route DELETE /api/ideas/:ideaId/comments/:commentId
// @desc Delete a comment for an idea
// @access Private
router.delete(
  "/:commentId",
  [
    check("ideaId", "Idea Id must be an integer")
      .exists()
      .isInt(),
    check("commentId", "Comment Id must be an integer")
      .exists()
      .isInt(),
    errorChecker,
    authMiddleware
  ],
  exceptionHandler(deleteCommentReq)
);

module.exports = router;
