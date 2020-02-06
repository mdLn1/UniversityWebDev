const express = require("express");
const router = express.Router();
const exceptionHandler = require("../utils/exceptionHandler");
const {
  createNewRoleReq,
  getAllRolesReq
} = require("../controllers/rolesController");

// @desc Adds new role to roles table
// @route POST /api/roles
// @access Private
router.post("/", exceptionHandler(createNewRoleReq));

// @desc Returns all roles
// @route GET /api/roles/
// @access Public
router.get("/", exceptionHandler(getAllRolesReq));

module.exports = router;
