const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const CustomError = require("../utils/CustomError");
const {
  userLoginQuery,
  isEmailRegisteredAlreadyQuery,
  createUserQuery
} = require("../db/queries/users");

const { isRoleSelectableQuery } = require("../db/queries/roles");
const isEmailValid = require("../utils/isEmailValid");
const isPasswordValid = require("../utils/isPasswordValid");

const registerUserReq = async (req, res) => {
  const { name, password, email, roleId, departmentId } = req.body;
  if (!isEmailValid(email))
    throw new CustomError("Invalid email address or wrong email domain", 400);

  if (!isPasswordValid(password)) {
    throw new CustomError(
      "Password must contain at least one uppercase letter, one lowercase letter and a digit", 400
    );
  }

  // check user exists
  const userExists = await isEmailRegisteredAlreadyQuery(email);
  if (userExists) throw new CustomError("User already exists", 400);

  // produce a password hash and save it to user
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  await isRoleSelectableQuery(id);
  // perform user registration
  await createUserQuery(name, hashedPassword, email, roleId, departmentId);

  const payload = { user: { name, email } };
  const token = jwt.sign(payload, config.get("jwtSecret"), {
    expiresIn: 36000
  });

  if (!token) throw new Error("Could not create token, please try again later");

  res.status(200).json({ user: { name, email }, token });
};

const userLoginReq = async (req, res) => {
  const { email, password } = req.body;

  if (!(email.endsWith("@gre.ac.uk") || email.endsWith("@greenwich.ac.uk")))
    throw new CustomError(
      "There is no user registered with this email address",
      400
    );
  const user = await userLoginQuery(email, password);

  const payload = { user };
  const token = jwt.sign(payload, config.get("jwtSecret"), {
    expiresIn: 36000
  });

  if (!token) throw new Error("Could not create token, please try again later");

  res.status(200).json({ user: { email, name: user.name }, token });
};

module.exports = {
  userLoginReq,
  registerUserReq
};
