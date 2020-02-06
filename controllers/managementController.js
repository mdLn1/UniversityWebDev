const { getUserDetails, updateUserDetails } = require("../db/queries/users");

const updateUserByIdReq = async (req, res) => {
  const user = await getUserDetails(req.params.id);
  const { name, email, role_id, department_id } = req.body;
  await updateUserDetails(name, email, role_id, department_id, user.email);
  res.status(200).json({ user: { name, email, role_id, department_id } });
};

module.exports = { updateUserByIdReq };
