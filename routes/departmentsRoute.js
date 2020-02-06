const express = require("express");
const router = express.Router();
const exceptionHandler = require("../utils/exceptionHandler");
const {
  getAllDepartmentsReq
} = require("../controllers/departmentsController");

// @desc Returns all the departments
// @access Public
router.get("/", exceptionHandler(getAllDepartmentsReq));

module.exports = router;
