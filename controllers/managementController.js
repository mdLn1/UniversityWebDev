const {
  createUserQuery,
  getUserDetailsQuery,
  isEmailRegisteredAlreadyQuery,
  adminUpdateUserDetailsQuery
} = require("../db/queries/users");
const isEmailValid = require("../utils/isEmailValid");

const adminUpdateUserDetailsReq = async (req, res) => {
  const { userId } = req.params;
  const { name, email, departmentId, roleId } = req.body;
  if (!isEmailValid)
    throw new CustomError("Invalid email address or wrong email domain", 400);
  const user = await getUserDetailsQuery(id);
  if (user.email !== email)
    if (await isEmailRegisteredAlreadyQuery(email))
      throw new CustomError(
        "The new email address chosen is already in use",
        400
      );
  await adminUpdateUserDetailsQuery(name, email, roleId, departmentId, userId);
  res.status(200).json({ success: "User details successfully updated" });
};

module.exports = { adminUpdateUserDetailsReq };
