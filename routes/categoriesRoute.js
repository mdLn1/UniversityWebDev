const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const errorChecker = require("../middleware/errorCheckerMiddleware");
const exceptionHandler = require("../utils/exceptionHandler");
const {
  createCategoryReq,
  deleteCategoryByIdReq,
  getAllCategoriesReq,
  updateCategoryByIdReq
} = require("../controllers/categoriesController");

router.get("/", exceptionHandler(getAllCategoriesReq));
router.post(
  "/",
  [
    check("tag", "Tag must be provided")
      .exists()
      .trim()
      .not()
      .isEmpty(),
    check(
      "description",
      "Description must be provided and have at least 10 characters"
    )
      .exists()
      .isLength({ min: 10 }),
    check("isSelectable", "IsSelectable must be provided")
      .exists()
      .isBoolean(),
    errorChecker
  ],
  exceptionHandler(createCategoryReq)
);
router.delete(
  "/:id",
  [
    check("id", "Id param must be an integer value")
      .exists()
      .isInt(),
    errorChecker
  ],
  exceptionHandler(deleteCategoryByIdReq)
);
router.post(
  "/:id",
  [
    check("newTag", "New Tag must be provided")
      .exists()
      .trim()
      .not()
      .isEmpty(),
    check("newDescription", "New Description must be provided")
      .exists()
      .trim()
      .not()
      .isEmpty(),
    check("isSelectable", "Is Selectable must be provided and be a boolean")
      .exists()
      .isBoolean(),
    check("id", "Id param must be an integer value")
      .exists()
      .isInt(),
    errorChecker
  ],
  exceptionHandler(updateCategoryByIdReq)
);

module.exports = router;
