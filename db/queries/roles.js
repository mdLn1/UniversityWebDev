const pool = require("../dbconn");

// desc Returns all roles
function getAllRolesQuery() {
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql: "select role, isSelectable, description from Roles",
        timeout: 40000 // 40s
      },
      (error, result) => {
        if (error) return reject(error);

        return resolve(
          result.map(({ role, isSelectable, description }) => ({
            role,
            isSelectable,
            description
          }))
        );
      }
    )
  );
}

// @desc If authorized the user(QA Manger) can create a new role
// @param role - Role of the user
// @param description - Description of said role
function createRoleQuery(role, description, isSelectable = 1) {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql:
          "INSERT into Roles (role, description, isSelectable) values (?, ?, ?)",
        timeout: 40000,
        values: [role, description, isSelectable]
      },
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve();
      }
    );
  });
}

function updateRoleQuery(id, role, description, isSelectable = 1) {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql:
          "update Roles role = ?, description = ?, isSelectable = ? where (id = ?)",
        timeout: 40000,
        values: [role, description, isSelectable, id]
      },
      (err, result) => {
        if (err) {
          return reject(err);
        }

        return resolve();
      }
    );
  });
}

function deleteRoleQuery(id) {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql: "delete from Categories where (id = ?)",
        timeout: 40000,
        values: [id]
      },
      (err, result) => {
        if (err) {
          return reject(err);
        }

        return resolve();
      }
    );
  });
}

module.exports = {
  createRoleQuery,
  getAllRolesQuery,
  updateRoleQuery,
  deleteRoleQuery
};
