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
          "update Departments department = ?, description = ?, isSelectable = ? where (ID = ?)",
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
        sql: "select department, isSelectable, description from Departments",
        timeout: 40000 // 40s
      },
      function(error, results) {
        if (error) return reject(error);
        return resolve(
          results.map(({ department, isSelectable, description }) => ({
            department,
            isSelectable,
            description
          }))
        );
      }
    )
  );
}

module.exports = {
  createDepartmentQuery,
  getAllDepartmentsQuery,
  updateDepartmentQuery,
  deleteDepartmentQuery
};
