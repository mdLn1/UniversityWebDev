const express = require("express");
const router = express.Router();
const exceptionHandler = require("../utils/exceptionHandler");
const { getAllIdeasReq, getIdeaByIdReq } = require("../controllers/ideasController");

// @desc Returns all ideas
// @route GET /api/ideas
// @access Private
router.get("/", exceptionHandler(getAllIdeasReq));

// @desc Returns a specific idea based on passed ID
// @route GET /api/ideas/:id
// @access Private
router.get("/:id", exceptionHandler(getIdeaByIdReq));

module.exports = router;
