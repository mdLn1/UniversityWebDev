const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const errorChecker = require("express-validator");
const exceptionHandler = require("../utils/exceptionHandler");
const {
  createNewRoleReq,
  getAllRolesReq
} = require("../controllers/rolesController");

// @desc Adds new role to roles table
// @route POST /api/roles
// @access Private
router.post(
  "/",
  [
    check("role", "Role must be at least 3 characters long")
      .exists()
      .trim()
      .isLength({ min: 3 }),
    check("description", "Description must be at least 20 characters long")
      .exists()
      .trim()
      .isLength({ min: 20 }),
      errorChecker
  ],
  exceptionHandler(createNewRoleReq)
);

// @desc Returns all roles
// @route GET /api/roles/
// @access Public
router.get("/", exceptionHandler(getAllRolesReq));

module.exports = router;
