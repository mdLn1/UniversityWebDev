const express = require("express");
const router = express.Router({ mergeParams: true });
const { check } = require("express-validator");
const errorChecker = require("../utils/exceptionHandler");
const exceptionHandler = require("../utils/exceptionHandler");
const cloudinaryConfig = require("../utils/cloudinaryConfig");
const authMiddleware = require("../middleware/authMiddleware");
const multerUploads = require("../middleware/multerMiddleware");
const {
  deleteUploadReq,
  uploadFilesReq,
  downloadUploadsReq,
  getAllUploadsReq
} = require("../controllers/fileUploadsController.js");

// @route POST /api/ideas/:id/uploads
// @desc Create upload files for idea
// @access Private
router.post(
  "/",
  [
    multerUploads.any(),
    authMiddleware,
    cloudinaryConfig
  ],
  exceptionHandler(uploadFilesReq)
);

// @route DELETE /api/ideas/:ideaId/uploads/:uploadId
// @desc Deletes an upload
// @access Private
router.delete(
  "/:uploadId",
  [
    check("ideaId", "Id param must be an integer value")
      .exists()
      .isInt(),
    check("uploadId", "Id param must be an integer value")
      .exists()
      .isInt(),
    errorChecker,
    authMiddleware,
    cloudinaryConfig
  ],
  exceptionHandler(deleteUploadReq)
);

// @route GET /api/ideas/:ideaId/uploads
// @desc Get all uploads details from database
// @access Public
router.get("/",cloudinaryConfig, exceptionHandler(getAllUploadsReq));

// @route GET /api/ideas/:ideaId/uploads
// @desc Download zipped uploads
// @access Public
router.get("/download",cloudinaryConfig, exceptionHandler(downloadUploadsReq));

module.exports = router;
