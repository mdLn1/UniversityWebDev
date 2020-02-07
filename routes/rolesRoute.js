const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const errorChecker = require("express-validator");
const exceptionHandler = require("../utils/exceptionHandler");
const {
  createRoleReq,
  deleteRoleReq,
  getAllRolesReq,
  updateRoleReq
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
    check("isSelectable", "Is Selectable must be a boolean")
      .exists()
      .isBoolean(),
    errorChecker
  ],
  exceptionHandler(createRoleReq)
);

router.post(
  "/:id",
  [
    check("id", "Id param must be an integer value")
      .exists()
      .isInt(),
    check("newRole", "New Role must be at least 3 characters long")
      .exists()
      .trim()
      .isLength({ min: 3 }),
    check(
      "newDescription",
      "New Description must be at least 20 characters long"
    )
      .exists()
      .trim()
      .isLength({ min: 20 }),
    check("isSelectable", "Is Selectable must be a boolean")
      .exists()
      .isBoolean(),
    errorChecker
  ],
  exceptionHandler(updateRoleReq)
);

router.delete(
  "/:id",
  [
    check("id", "Id param must be an integer value")
      .exists()
      .isInt(),
    errorChecker
  ],
  exceptionHandler(deleteRoleReq)
);

// @desc Returns all roles
// @route GET /api/roles/
// @access Public
router.get("/", exceptionHandler(getAllRolesReq));

module.exports = router;
