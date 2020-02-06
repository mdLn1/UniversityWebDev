const { getAllDepartments } = require("../db/queries/departments");

const getAllDepartmentsReq = async (req, res) => {
  const departments = await getAllDepartments();
  res.status(200).json(departments);
};

module.exports = {
    getAllDepartmentsReq
}