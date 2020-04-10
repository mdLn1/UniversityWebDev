const {
  isEmailRegisteredAlreadyQuery,
  updateUserDetailsQuery,
  getUserDetailsQuery,
  updateUserPasswordQuery,
  getAllUsersQuery,
  updateUserLastLoginQuery
} = require("../db/queries/users");
const isEmailValid = require("../utils/isEmailValid");
const isPasswordValid = require("../utils/isPasswordValid");
const bcrypt = require("bcryptjs");

const updateUserLastLoginReq = async (req, res) => {
  if (req.user)
    await updateUserLastLoginQuery(req.user.id);
  res.status(204).send();
}

const updateUserDetailsReq = async (req, res) => {
  const { id } = req.user;
  const { name, email } = req.body;

  if (!isEmailValid)
    throw new CustomError("Invalid email address or wrong email domain", 400);
  const user = await getUserDetailsQuery(id);
  if (user.email !== email)
    if (await isEmailRegisteredAlreadyQuery(email))
      throw new CustomError(
        "The new email address chosen is already in use",
        400
      );
  await updateUserDetailsQuery(name, email, id);
  res.status(200).json({ success: "Details updated successfully" });
};

const updateUserPasswordReq = async (req, res) => {
  const { id } = req.user;
  const { oldPassword, newPassword, newPasswordConfirmed } = req.body;
  if (newPassword !== newPasswordConfirmed) {
    throw new CustomError(
      "New Password and Confirmed password must be the same",
      400
    );
  }
  if (!isPasswordValid(password)) {
    throw new CustomError(
      "Password must contain at least one uppercase letter, one lowercase letter and a digit",
      400
    );
  }
  const { password } = await getUserPasswordQuery(id);
  const matches = bcrypt.compare(oldPassword, password);
  if (!matches)
    throw new CustomError(
      "Your old password does not match with our records",
      400
    );
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  await updateUserPasswordQuery(hashedPassword, id);
  res.status(200).json({ success: "Password updated successfully" });
};

const getAllUsersReq = async (req, res) => {
  const users = await getAllUsersQuery();
  res.status(200).json({ users });
};

const getUserDetailsReq = async (req, res) => {
  const user = await getUserDetailsQuery(req.user.id);
  delete user.password;
  res.status(200).json({ user });
};

module.exports = {
  updateUserDetailsReq,
  updateUserPasswordReq,
  getUserDetailsReq,
  getAllUsersReq,
  updateUserLastLoginReq
};
