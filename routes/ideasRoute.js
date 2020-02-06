const express = require("express");
const router = express.Router();
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
router.get("/:id", exceptionHandler(getIdeaByIdReq));

router.post("/", exceptionHandler(createIdeaReq));
router.get("/:id", exceptionHandler(increaseIdeaViewsReq));
router.delete("/:id", exceptionHandler(deleteIdeaReq));
router.post("/:id", exceptionHandler(updateIdeaReq));

module.exports = router;
