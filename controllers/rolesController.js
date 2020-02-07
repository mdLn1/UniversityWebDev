const { createNewRole, getAllRoles } = require("../db/queries/roles");

const createNewRoleReq = async (req, res) => {
  // :todo Add authorization to ensure only priviliged users can add a new role
  const { role, description } = req.body;
  await createNewRole(role, description);
  res.status(201).json({ Success: "New role added", data: req.body });
};

const getAllRolesReq = async (req, res) => {
  const roles = await getAllRoles();
  res.status(200).json(roles);
};

module.exports = {
  createNewRoleReq,
  getAllRolesReq
};
