const express = require("express");
const router = express.Router();
const exceptionHandler = require("../utils/exceptionHandler");
const errorChecker = require("../middleware/errorCheckerMiddleware");
const { check } = require("express-validator");
const { getAllCommentsReq } = require('../controllers/commentsController')

router.get(
    "/:id",
    [
      check("id", "Id param must be an integer value")
        .exists()
        .isInt(),
      errorChecker
    ],
    exceptionHandler(getAllCommentsReq)
);

module.exports = router;