const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const writeFeedback = require("../utils/writeFeedback");

const users = require("../testObjects/users");

//@route POST api/register/
//@desc Receive registration details
//@access Public
router.post(
  "/register",
  [
    check("name", "Name missing")
      .trim()
      .not()
      .isEmpty(),
    check("password", "Password needs to be at least 6 characters long")
      .trim()
      .isLength({ min: 6 })
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          feedback: errors.array().map(obj => {
            return {
              msg: obj.msg
            };
          })
        });
      }

      const { name, password } = req.body;
      const newUser = {};

      // check user exists
      const err1 = users.find(el => el.name === name)
        ? "User already exists"
        : "";
      if (err1)
        return res
          .status(400)
          .json({ feedback: writeFeedback("User already exists") });
      newUser.name = name;
      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(password, salt);
      newUser.password = hashedPassword;
      const payload = { user: { name: newUser.name }, token: null };
      const token = jwt.sign(payload, config.get("jwtSecret"), {
        expiresIn: 36000
      });

      res
        .status(200)
        .json({
          user: payload.user,
          token,
          feedback: writeFeedback("All good", "success")
        });
    } catch (err) {
      next(err);
    }
  }
);

//@route POST api/login/
//@desc Receive login details
//@access Public
router.post(
  "/login",
  [
    check("name", "Name missing")
      .trim()
      .not()
      .isEmpty(),
    check("password", "Password needs to be at least 6 characters long")
      .trim()
      .isLength({ min: 6 })
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          feedback: errors.array().map(obj => {
            return {
              msg: obj.msg
            };
          })
        });
      }

      const { name, password } = req.body;
      const userFound = users.find(el => el.name === name);
      if (!userFound) throw new Error("User not found");

      const isMatch = await bcrypt.compare(password, userFound.password);
      if (!isMatch) {
        throw new Error("Password does not match");
      }

      const payload = { user: { name }, token: null };
      const token = jwt.sign(payload, config.get("jwtSecret"), {
        expiresIn: 36000
      });

      res
        .status(200)
        .json({
          user: payload.user,
          token,
          feedback: writeFeedback("All good", "success")
        });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
