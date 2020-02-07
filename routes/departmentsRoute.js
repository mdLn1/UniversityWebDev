const express = require("express");
const router = express.Router();
const errorChecker = require("../middleware/errorCheckerMiddleware");
const exceptionHandler = require("../utils/exceptionHandler");
const {
  getAllDepartmentsReq,
  createDepartmentReq,
  deleteDepartmentReq,
  updateDepartmentReq
} = require("../controllers/departmentsController");

// @desc Returns all the departments
// @route GET /api/departments
// @access Private
router.get("/", exceptionHandler(getAllDepartmentsReq));
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
    errorChecker
  ],
  exceptionHandler(createDepartmentReq)
);
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
      " New Description must be at least 5 characters long"
    )
      .exists()
      .trim()
      .isLength({ min: 5 }),
    check("isSelectable", "Is Selectable must be a boolean")
      .exists()
      .isBoolean(),
    errorChecker
  ],
  exceptionHandler(updateDepartmentReq)
);
// @desc Delete a department
// @route DELETE /api/departments/:id
// @access Private
router.delete(
  "/:id",
  [
    check("id", "Id param must be an integer value")
      .exists()
      .isInt(),
    errorChecker
  ],
  exceptionHandler(deleteDepartmentReq)
);

module.exports = router;
