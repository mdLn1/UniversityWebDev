const express = require("express");
const exceptionHandler = require("../utils/exceptionHandler");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");

router.get(
  "/",
  exceptionHandler(async (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(400).json({ loginSucceeded: false });
    }
    try {
      jwt.verify(token, config.get("jwtSecret"));
    } catch (error) {
      return res.status(400).json({ loginSucceeded: false });
    }
    
    res.status(200).json({ loginSucceeded: true });
  })
);

module.exports = router;
