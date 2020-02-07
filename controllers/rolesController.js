const {
  createRoleQuery,
  deleteRoleQuery,
  getAllRolesQuery,
  updateRoleQuery
} = require("../db/queries/roles");

const createRoleReq = async (req, res) => {
  // :todo Add authorization to ensure only priviliged users can add a new role
  const { role, description } = req.body;
  await createRoleQuery(role, description);
  res
    .status(201)
    .json({ Success: "New role created", data: { role, description } });
};

const updateRoleReq = async (req, res) => {
  const { id } = req.params;
  const { newRole, newDescription, isSelectable } = req.body;
  await updateRoleQuery(id, newRole, newDescription, isSelectable);
  res
    .status(200)
    .json({ Success: "Role updated", data: { role, description } });
};

const deleteRoleReq = async (req, res) => {
  const { id } = req.params;
  await deleteRoleQuery(id);
  res.status(200).json({ success: "Successfully deleted" });
};

const getAllRolesReq = async (req, res) => {
  const roles = await getAllRolesQuery();
  res.status(200).json({ roles });
};

module.exports = {
  createRoleReq,
  getAllRolesReq,
  updateRoleReq,
  deleteRoleReq
};
