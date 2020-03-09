const express = require("express");
const router = express.Router();
const exceptionHandler = require("../utils/exceptionHandler");

const { 
    getHighestRatedIdeasReq,
    getMostRecentActiveUsersReq,
    getNumberOfIdeasPerUserReq,
    getMostViewedIdeasReq,
    getMostRecentIdeasReq,
    getUsersWithMostCommentsReq
} = require("../controllers/statsController")

//@desc Returns ideas with highest ratings
//@access Public
router.get("/HighestRatedIdeas", getHighestRatedIdeasReq)

//@desc Returns users that submitted the most recent posts
//@access Public
router.get("/MostRecentActiveUser", getMostRecentActiveUsersReq)

//@desc Returns the number of ideas per user
//@access Public
router.get("/IdeasPerUser", getNumberOfIdeasPerUserReq)

//@desc Returns the most viewed ideas
//@access Public
router.get("/MostViewedIdeas", getMostViewedIdeasReq)

//@desc Returns most recent ideas
//@access Public
router.get("/MostRecentIdeas", getMostRecentIdeasReq)

//@desc Returns users with most comments
//@access Public
router.get("/UserWithMostComments", getUsersWithMostCommentsReq)

module.exports = router;