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
    check("tag")
      .trim()
      .not()
      .isEmpty(),
    check("description")
      .trim()
      .isLength({ min: 10 }),
    check("isSelectable")
      .trim()
      .isBoolean(),
    errorChecker
  ],
  exceptionHandler(createCategoryReq)
);
router.delete(
  "/:id",
  [
    check("id")
      .isInt()
      .withMessage("Id param must be an integer value"),
    errorChecker
  ],
  exceptionHandler(deleteCategoryByIdReq)
);
router.post(
  "/:id",
  [
    check("newTag")
      .trim()
      .not()
      .isEmpty(),
    check("newDescription")
      .trim()
      .not()
      .isEmpty(),
    check("isSelectable").exists(),
    check("id")
      .isInt()
      .withMessage("Id param must be an integer value"),
    errorChecker
  ],
  exceptionHandler(updateCategoryByIdReq)
);

module.exports = router;
