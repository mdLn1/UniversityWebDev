const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const writeFeedback = require("../utils/writeFeedback");
const CustomError = require("../utils/CustomError");
const {
  userLogin,
  isEmailRegisteredAlready,
  registerUser
} = require("../db/queries/users");

//@route POST api/register/
//@desc Receive registration details
//@access Public
router.post(
  "/register",
  [
    check("name", "Name must be at least 5 characters long")
      .trim()
      .isLength({ min: 5 }),
    check("email", "Email must be at least 6 charaters long")
      .trim()
      .isLength({ min: 6 }),
    check("password", "Password needs to be at least 6 characters long")
      .trim()
      .isLength({ min: 6 }),
    check("role", "Role must be provided").trim().not().isEmpty(),
    check("department", "Department must be provided").trim().not().isEmpty()
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json(writeFeedback(errors.array().map(el => el.msg)));
      }

      const { name, password, email, role, department } = req.body;

      const re = new RegExp(
        /^([\w\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})$/
      );
      const validDomain =
        email.endsWith("@gre.ac.uk") || email.endsWith("@greenwich.ac.uk");
      if (!re.test(email) || !validDomain)
        throw new CustomError(
          "Invalid email address or wrong email domain",
          400
        );
      const userExists = await isEmailRegisteredAlready(email);

      // check user exists
      if (userExists) throw new CustomError("User already exists", 400);

      // produce a password hash and save it to user
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // perform user registration
      await registerUser(name, hashedPassword, email, role, department);

      const payload = { user: { name, email } };
      const token = jwt.sign(payload, config.get("jwtSecret"), {
        expiresIn: 36000
      });

      if (!token)
        throw new Error("Could not create token, please try again later");

      res.status(200).json({ user: { name, email }, token });
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
    check("email", "Email address is required for login")
      .trim()
      .not()
      .isEmpty(),
    check("password", "Password is required for login")
      .trim()
      .not()
      .isEmpty()
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json(writeFeedback(errors.array().map(el => el.msg)));
      }

      const { email, password } = req.body;

      if (!(email.endsWith("@gre.ac.uk") || email.endsWith("@greenwich.ac.uk")))
        throw new CustomError(
          "There is no user registered with this email address",
          400
        );
      const user = await userLogin(email, password);

      const {name, role_id, department_id } = user;
      const payload = { user: { name, email, role_id, department_id } };
      const token = jwt.sign(payload, config.get("jwtSecret"), {
        expiresIn: 36000
      });

      if (!token)
        throw new Error("Could not create token, please try again later");

      res.status(200).json({ user: { name, email }, token });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
