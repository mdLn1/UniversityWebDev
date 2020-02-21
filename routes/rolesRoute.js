const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const errorChecker = require("../utils/exceptionHandler");
const exceptionHandler = require("../utils/exceptionHandler");
const auth = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorizeMiddleware");
const config = require("config");
const { admin } = config.get("roles");
const {
  createRoleReq,
  deleteRoleReq,
  getAllRolesReq,
  updateRoleReq
} = require("../controllers/rolesController");

// @route GET /api/roles/
// @desc Returns all roles
// @access Public
router.get("/", exceptionHandler(getAllRolesReq));

// @route POST /api/roles
// @desc Adds new role to roles table
// @access Private and restricted
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
    errorChecker,
    auth,
    authorize([admin])
  ],
  exceptionHandler(createRoleReq)
);

// @route POST /api/roles/:id
// @desc Updates a role details
// @access Private and restricted
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
      "New Description must be at least 10 characters long"
    )
      .exists()
      .trim()
      .isLength({ min: 10 }),
    check("isSelectable", "Is Selectable must be a boolean")
      .exists()
      .isBoolean(),
    errorChecker,
    auth,
    authorize([admin])
  ],
  exceptionHandler(updateRoleReq)
);

// @route DELETE /api/roles/:id
// @desc Deletes a role
// @access Private and restricted
router.delete(
  "/:id",
  [
    check("id", "Id param must be an integer value")
      .exists()
      .isInt(),
    errorChecker,
    auth,
    authorize(admin)
  ],
  exceptionHandler(deleteRoleReq)
);

module.exports = router;
