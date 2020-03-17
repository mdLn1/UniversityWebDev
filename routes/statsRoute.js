const express = require("express");
const router = express.Router();
const exceptionHandler = require("../utils/exceptionHandler");
const {
  getHighestRatedIdeasReq,
  getMostRecentActiveUsersReq,
  getNumberOfIdeasPerUserReq,
  getMostViewedIdeasReq,
  getMostRecentIdeasReq,
  getUsersWithMostCommentsReq,
  getOldestIdeasReq
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
//@access Public
router.get(
  "/HighestRatedIdeas",
  paginationMiddleware,
  exceptionHandler(getHighestRatedIdeasReq)
);

//@desc Returns users that submitted the most recent posts
//@access Public
router.get(
  "/MostRecentActiveUser",
  paginationMiddleware,
  getMostRecentActiveUsersReq
);

//@desc Returns the number of ideas per user
//@access Public
router.get("/IdeasPerUser", paginationMiddleware, getNumberOfIdeasPerUserReq);

//@desc Returns users with most comments
//@access Public
router.get(
  "/UserWithMostComments",
  paginationMiddleware,
  getUsersWithMostCommentsReq
);

// Exports routes binded to this routers context.
module.exports = router;
