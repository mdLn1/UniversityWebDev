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
    errorChecker
  ],
  exceptionHandler(createCategoryReq)
);
router.delete("/:id", exceptionHandler(deleteCategoryByIdReq));
router.post("/:id", exceptionHandler(updateCategoryByIdReq));

module.exports = router;
