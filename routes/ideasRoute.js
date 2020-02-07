const express = require("express");
const router = express.Router();
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
    check("id")
      .isInt()
      .withMessage("Id param must be an integer value"),
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
    check("id")
      .isInt()
      .withMessage("Id param must be an integer value"),
    check("description")
      .trim()
      .isLength({ min: 20 }),
    check("isAnonymous").isBoolean(),
    check("categoryId").isInt(),
    check("userId").isInt(),
    check("title")
      .trim()
      .isLength({ min: 5 }),
    errorChecker
  ],
  exceptionHandler(increaseIdeaViewsReq)
);
router.delete(
  "/:id",
  [
    check("id")
      .isInt()
      .withMessage("Id param must be an integer value"),
    errorChecker
  ],
  exceptionHandler(deleteIdeaReq)
);
router.post(
  "/:id",
  [
    check("id")
      .isInt()
      .withMessage("Id param must be an integer value"),
    check("title")
      .trim()
      .isLength({ min: 5 }),
    check("description")
      .trim()
      .isLength({ min: 20 }),
    errorChecker
  ],
  exceptionHandler(updateIdeaReq)
);

module.exports = router;
