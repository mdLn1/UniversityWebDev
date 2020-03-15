const {
  createDepartmentQuery,
  deleteDepartmentQuery,
  getAllDepartmentsQuery,
  updateDepartmentQuery,
  isDepartmentUsedQuery
} = require("../db/queries/departments");

const getAllDepartmentsReq = async (req, res) => {
  const departments = await getAllDepartmentsQuery();
  res.status(200).json({ departments });
};

const createDepartmentReq = async (req, res) => {
  const { department, description, isSelectable } = req.body;
  const { insertId } = await createDepartmentQuery(
    department,
    description,
    isSelectable
  );
  res.status(200).json({ department, description, isSelectable, ID: insertId });
};

const updateDepartmentReq = async (req, res) => {
  const { newDepartment, newDescription, isSelectable } = req.body;
  await updateDepartmentQuery(
    newDepartment,
    newDescription,
    isSelectable,
    req.params.id
  );
  res.status(200).json({ success: "Update successful" });
};

const deleteDepartmentReq = async (req, res) => {
  await isDepartmentUsedQuery(req.params.id);
  await deleteDepartmentQuery(req.params.id);
  res.status(204).json({ success: "Successfully deleted" });
};

module.exports = {
  getAllDepartmentsReq,
  createDepartmentReq,
  updateDepartmentReq,
  deleteDepartmentReq
};
