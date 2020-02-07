const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const CustomError = require("../utils/CustomError");
const {
  userLogin,
  isEmailRegisteredAlready,
  createUserQuery
} = require("../db/queries/users");

// authentication specific requests below

const registerUserReq = async (req, res) => {
  const { name, password, email, roleId, departmentId } = req.body;

  const re = new RegExp(
    /^([\w\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})$/
  );
  const validDomain =
    email.endsWith("@gre.ac.uk") || email.endsWith("@greenwich.ac.uk");
  if (!re.test(email) || !validDomain)
    throw new CustomError("Invalid email address or wrong email domain", 400);
  const userExists = await isEmailRegisteredAlready(email);

  // check user exists
  if (userExists) throw new CustomError("User already exists", 400);

  // produce a password hash and save it to user
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

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
  const user = await userLogin(email, password);

  const { name, role_id, department_id } = user;
  const payload = { user: { name, email, role_id, department_id } };
  const token = jwt.sign(payload, config.get("jwtSecret"), {
    expiresIn: 36000
  });

  if (!token) throw new Error("Could not create token, please try again later");

  res.status(200).json({ user: { name, email }, token });
};

module.exports = {
  userLoginReq,
  registerUserReq
};
