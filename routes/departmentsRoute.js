const express = require("express");
const { check } = require("express-validator");
const router = express.Router({ mergeParams: true });
const errorChecker = require("../middleware/errorCheckerMiddleware");
const exceptionHandler = require("../utils/exceptionHandler");
const auth = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorizeMiddleware");
const config = require("config");
const { admin, coordinator } = config.get("roles");
const {
  getAllDepartmentsReq,
  createDepartmentReq,
  deleteDepartmentReq,
  updateDepartmentReq
} = require("../controllers/departmentsController");

// @route GET /api/departments
// @desc Returns all the departments
// @access Public
router.get("/", exceptionHandler(getAllDepartmentsReq));

// @route POST /api/departments
// @desc Creates new department
// @access Private and restricted
router.post(
  "/",
  [
    check("department", "Department must be provided")
      .exists()
      .trim()
      .not()
      .isEmpty(),
    check("description", "Description must be at least 5 characters long")
      .exists()
      .trim()
      .isLength({ min: 5 }),
    check("isSelectable", "Is Selectable must be a boolean")
      .exists()
      .isBoolean(),
    errorChecker,
    auth,
    authorize(admin)
  ],
  exceptionHandler(createDepartmentReq)
);

// @route POST /api/departments/:id
// @desc Updates existing department details
// @access Private and restricted
router.post(
  "/:id",
  [
    check("id", "Id param must be an integer value")
      .exists()
      .isInt(),
    check("newDepartment", "New Department must be provided")
      .exists()
      .trim()
      .not()
      .isEmpty(),
    check(
      "newDescription",
      "New Description must be at least 5 characters long"
    )
      .exists()
      .trim()
      .isLength({ min: 5 }),
    check("isSelectable", "Is Selectable must be a boolean")
      .exists()
      .isBoolean(),
    errorChecker,
    auth,
    authorize(admin)
  ],
  exceptionHandler(updateDepartmentReq)
);

// @route DELETE /api/departments/:id
// @desc Delete a department
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
  exceptionHandler(deleteDepartmentReq)
);

module.exports = router;
