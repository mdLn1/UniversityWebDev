const express = require("express");
const { check } = require("express-validator");
const router = express.Router({ mergeParams: true });
const errorChecker = require("../middleware/errorCheckerMiddleware");
const auth = require("../middleware/authMiddleware.js");
const exceptionHandler = require("../utils/exceptionHandler");
const {
  createCategoryReq,
  deleteCategoryByIdReq,
  getAllCategoriesReq,
  updateCategoryByIdReq
} = require("../controllers/categoriesController");
const authorize = require("../middleware/authorizeMiddleware");
const config = require("config");
const { admin, coordinator } = config.get("roles");

//@route GET api/categories
//@desc Get all categories
//@access Public
router.get("/", exceptionHandler(getAllCategoriesReq));

//@route POST api/categories
//@desc Create category
//@access Private and restricted
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
    errorChecker,
    auth,
    authorize([admin, coordinator])
  ],
  exceptionHandler(createCategoryReq)
);

//@route DELETE api/categories/:id
//@desc Delete category
//@access Private and restricted
router.delete(
  "/:id",
  [
    check("id", "Id param must be an integer value")
      .exists()
      .isInt(),
    errorChecker,
    auth,
    authorize([admin, coordinator])
  ],
  exceptionHandler(deleteCategoryByIdReq)
);

//@route POST api/categories/:id
//@desc Update category details
//@access Private and restricted
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
    errorChecker,
    auth,
    authorize([admin, coordinator])
  ],
  exceptionHandler(updateCategoryByIdReq)
);

module.exports = router;
