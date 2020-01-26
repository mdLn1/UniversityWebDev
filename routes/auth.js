const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const writeFeedback = require("../utils/writeFeedback");
const CustomError = require("../utils/CustomError");
const { userLogin, isAlreadyRegistered, registerUserByID, registerUser } = require("../db/queries/users");
//const users = require("../testObjects/users");

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
    check("role", "Role must be provided").exists(),
    check("department", "Department must be provided").exists()
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

      // check user exists
      await isAlreadyRegistered(email);
      
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
        throw new CustomError("Could not create token, please try again later");

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
      
      // query to the DB - async and it returns a promise
      const user = await userLogin(email, password);

      const name = user.name;
      const payload = { user: { name, email } };
      const token = jwt.sign(payload, config.get("jwtSecret"), {
        expiresIn: 36000
      });

      if (!token)
        throw new CustomError("Could not create token, please try again later", 400);

      res.status(200).json({ user: { name, email }, token });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
