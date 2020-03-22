const express = require("express");
const router = express.Router();
const exceptionHandler = require("../utils/exceptionHandler");
const {
  getHighestRatedIdeasReq,
  getMostViewedIdeasReq,
  getMostRecentIdeasReq,
  getOldestIdeasReq,
  getIdeasCommentsStatsReq
} = require("../controllers/statsController");

const paginationMiddleware = require("../utils/paginationMiddleware");

//@desc Returns the most viewed ideas
//@access Public
router.get(
  "/MostViewedIdeas",
  paginationMiddleware,
  exceptionHandler(getMostViewedIdeasReq)
);

//@desc Returns most recent ideas
//@access Public
router.get(
  "/MostRecentIdeas",
  paginationMiddleware,
  exceptionHandler(getMostRecentIdeasReq)
);

//@desc Returns oldest ideas
//@access Public
router.get(
  "/OldestIdeas",
  paginationMiddleware,
  exceptionHandler(getOldestIdeasReq)
);

//@desc Returns ideas with highest ratings
//@access Public F
router.get(
  "/HighestRatedIdeas",
  paginationMiddleware,
  exceptionHandler(getHighestRatedIdeasReq)
);

router.get("/ideas-comments-stats", exceptionHandler(getIdeasCommentsStatsReq));

// Exports routes binded to this routers context.
module.exports = router;
