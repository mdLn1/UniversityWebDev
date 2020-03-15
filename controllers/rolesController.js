const {
  createRoleQuery,
  deleteRoleQuery,
  getAllRolesQuery,
  updateRoleQuery,
  isRoleUsedQuery
} = require("../db/queries/roles");

const createRoleReq = async (req, res) => {
  let { role, description, isSelectable } = req.body;
  isSelectable = isSelectable ? 1 : 0;
  const { insertId } = await createRoleQuery(role, description, isSelectable);
  res.status(200).json({ ID: insertId, role, description, isSelectable });
};

const updateRoleReq = async (req, res) => {
  const { id } = req.params;
  let { newRole, newDescription, isSelectable } = req.body;
  isSelectable = isSelectable ? 1 : 0;
  await updateRoleQuery(id, newRole, newDescription, isSelectable);
  res.status(200).json({ success: "Role successfully updated" });
};

const deleteRoleReq = async (req, res) => {
  const { id } = req.params;
  await isRoleUsedQuery(id);
  await deleteRoleQuery(id);
  res.status(200).json({ success: "Role successfully deleted" });
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
