const {
  createUserQuery,
  getUserDetailsQuery,
  isEmailRegisteredAlreadyQuery
} = require("../db/queries/users");
const isEmailValid = require("../utils/isEmailValid");

const adminUpdateUserDetailsReq = async (req, res) => {
  const {id} = req.params;
  const {name, email, departmentId, roleId} = req.body;
  if (!isEmailValid)
    throw new CustomError("Invalid email address or wrong email domain", 400);
  const user = await getUserDetailsQuery(id);
  if (user.email !== email)
    if (await isEmailRegisteredAlreadyQuery(email))
      throw new CustomError(
        "The new email address chosen is already in use",
        400
      );
  await adminUpdateUserDetailsQuery(name, email, id);
}
module.exports = { adminUpdateUserDetailsReq };
