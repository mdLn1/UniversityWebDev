const pool = require("../dbconn");

// Use this function to add a role to the portal
function addRole(role, description, selectable) {
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql:
          "insert into Roles (role, description, isSelectable) values (?, ?, ?)",
        timeout: 40000, // 40s
        values: [role, description, selectable]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve();
      }
    )
  );
}

function getAllRoles() {
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql: "select role, isSelectable from Roles",
        timeout: 40000 // 40s
      },
      (error, result) => {
        if (error) return reject(error);

        return resolve(
          result.map(({ role, isSelectable }) => ({ role, isSelectable }))
        );
      }
    )
  );
}

// @desc If authorized the user(QA Manger) can create a new role
// @param role - Role of the user
// @param description - Description of said role
function createNewRole(role, description, is_selectable = 1) {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql:
          "INSERT into Roles (role, description, isSelectable) values (?, ?, ?)",
        timeout: 40000,
        values: [role, description, is_selectable]
      },
      (err, result) => {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      }
    );
  });
}

module.exports = {
  addRole,
  getAllRoles,
  createNewRole
};
