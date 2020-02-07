const {
  createDepartmentQuery,
  deleteDepartmentQuery,
  getAllDepartmentsQuery,
  updateDepartmentQuery
} = require("../db/queries/departments");

const getAllDepartmentsReq = async (req, res) => {
  const departments = await getAllDepartmentsQuery();
  res.status(200).json(departments);
};

const createDepartmentReq = async (req, res) => {
  const { department, description, isSelectable } = req.body;
  await createDepartmentQuery(department, description, isSelectable);
  res.status(204).json({ department, description, isSelectable });
};

const updateDepartmentReq = async (req, res) => {
  const { id } = req.params;
  const { newDepartment, newDescription, isSelectable } = req.body;
  await updateDepartmentQuery(newDepartment, newDescription, isSelectable, id);
  res.status(200).json({ success: "Update successful" });
};

const deleteDepartmentReq = async (req, res) => {
  const { id } = req.params;
  await deleteDepartmentQuery(id);
  res.status(204).json({ success: "Successfully deleted" });
};

module.exports = {
  getAllDepartmentsReq,
  createDepartmentReq,
  updateDepartmentReq,
  deleteDepartmentReq
};
