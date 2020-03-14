const pool = require("../dbconn");

// Use this function to add a department to the portal
function createDepartmentQuery(department, description, selectable) {
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql:
          "insert into Departments (department, description, isSelectable) values (?, ?, ?)",
        timeout: 40000, // 40s
        values: [department, description, selectable]
      },
      error => {
        if (error) return reject(error);
        resolve();
      }
    )
  );
}

// Use this function to update a department to the portal
function updateDepartmentQuery(newDepartment, newDescription, selectable, id) {
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql:
          "update Departments set department = ?, description = ?, isSelectable = ? where (ID = ?)",
        timeout: 40000, // 40s
        values: [newDepartment, newDescription, selectable, id]
      },
      error => {
        if (error) return reject(error);
        resolve();
      }
    )
  );
}

// Use this function to update a department to the portal
function deleteDepartmentQuery(id) {
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql:
          "insert into Departments (department, description, isSelectable) values (?, ?, ?)",
        timeout: 40000, // 40s
        values: [newDepartment, newDescription, selectable]
      },
      error => {
        if (error) return reject(error);
        resolve();
      }
    )
  );
}

// Returns all the departments of the portal
function getAllDepartmentsQuery() {
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql: "select * from Departments",
        timeout: 40000 // 40s
      },
      function(error, result) {
        if (error) return reject(error);
        return resolve(
          result.map(({ description, isSelectable, department }) => ({
            description,
            isSelectable,
            department
          }))
        );
      }
    )
  );
}

function isDepartmentSelectableQuery(role) {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql: "select isSelectable from Roles where role = ?",
        timeout: 40000,
        values: [role]
      },
      (err, result) => {
        if (err) {
          return reject(err);
        }
        if (result.length > 0) if (result[0].isSelectable) return resolve();
        reject(new CustomError("You cannot select this department", 400));
      }
    );
  });
}

function getUserDepartmentIdQuery(userId) {
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql: `select department_id from Users where ID = ?`,
        timeout: 40000, // 40s
        values: [userId]
      },
      function(error, result) {
        if (error) return reject(error);
        return resolve(result[0].department_id);
      }
    )
  );
}

function getDepartmentCoordinatorQuery(departmentId) {
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql: `SELECT Users.ID, Users.name, Users.email from Users left join Roles on Users.role_id = Roles.ID where Users.department_id = ? and Roles.role = ?`,
        timeout: 40000, // 40s
        values: [departmentId, "QA Coordinator"]
      },
      function(error, result) {
        if (error) return reject(error);
        return resolve(result[0]);
      }
    )
  );
}

module.exports = {
  createDepartmentQuery,
  getAllDepartmentsQuery,
  updateDepartmentQuery,
  deleteDepartmentQuery,
  getUserDepartmentIdQuery,
  getDepartmentCoordinatorQuery,
  isDepartmentSelectableQuery
};
