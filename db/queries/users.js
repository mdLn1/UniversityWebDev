const pool = require("../dbconn");
const CustomError = require("../../utils/CustomError");
const bcrypt = require("bcryptjs");

// Use this function to add a user to the system if you have the role_id and department_id (do not use the string value)
function createUserQuery(name, password, email, role_id, department_id) {
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql:
          "insert into Users (name, password, email, role_id, department_id) values (?, ?, ?, ?, ?)",
        timeout: 40000,
        values: [name, password, email, role_id, department_id]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve();
      }
    )
  );
}

// Use this function to verify the user login
// email field is unique - so the results array will only contain max 1 result
function userLoginQuery(email, password) {
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql: `select Users.ID, Users.name, Users.email, Users.password, Roles.role, Departments.department from Users left join Roles on 
        Users.role_id=Roles.ID left join Departments on Users.department_id=Departments.ID where email = ?`,
        timeout: 40000,
        values: [email]
      },
      (error, result) => {
        if (error) return reject(error);
        if (result.length === 0)
          return reject(
            new CustomError("User not found, please register", 400)
          );
        const matches = bcrypt.compare(password, result[0].password);

        if (!matches) return reject(new CustomError("Invalid password", 400));
        result[0].id = result[0].ID;
        delete result[0].ID;
        delete result[0].password;
        return resolve(result[0]);
      }
    )
  );
}

function userLastLoginQuery(email) {
  const date = new Date()
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  return new Promise((resolve, reject) =>
  pool.query(
    {
      sql: "update Users set lastLogin = ? where email = ?",
      timeout: 40000,
      values: [date, email]
    },
    (error, result) => {
      if (error) return reject(error);
      return resolve();
    }
  )
);
}

// Use this function to check if user exists
function isEmailRegisteredAlreadyQuery(email) {
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql: "select * from Users where email = ?",
        timeout: 40000,
        values: [email]
      },
      (error, result) => {
        if (error) return reject(error);
        if (result.length === 0) return resolve(false);
        return resolve(true);
      }
    )
  );
}

// Returns all users - Will be used by QA Manager.
function getAllUsersQuery() {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql: "select * from Users",
        timeout: 40000
      },
      (err, result) => {
        if (err) {
          return reject(err);
        }

        users = [];
        result.forEach(user => {
          users.push(user);
        });

        return resolve(users);
      }
    );
  });
}

// Returns user details
function getUserDetailsQuery(id) {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql: `select Users.ID, Users.name, Users.email, Users.password, Roles.role, Departments.department from Users left join Roles on 
        Users.role_id=Roles.ID left join Departments on Users.department_id=Departments.ID where email = ?`,
        timeout: 40000,
        values: [id]
      },
      (err, result) => {
        if (err) return reject(err);
        if (result.length < 1)
          return reject(new CustomError("User not found", 400));
        delete result[0].ID;
        delete result[0].password;
        return resolve(result[0]);
      }
    );
  });
}

// Updates user details
function updateUserDetailsQuery(name, email, id) {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql: "update Users set name = ?, email = ? where id = ?",
        timeout: 40000,
        values: [name, email, id]
      },
      (err, result) => {
        if (err) return reject(err);
        return resolve();
      }
    );
  });
}

// Updates user details
function adminUpdateUserDetailsQuery(
  name,
  email,
  roleId,
  departmentId,
  userId
) {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql:
          "update Users set name = ?, email = ?, role_id = ?, department_id = ? where id = ?",
        timeout: 40000,
        values: [name, email, roleId, departmentId, userId]
      },
      (err, result) => {
        if (err) return reject(err);
        return resolve();
      }
    );
  });
}

function isAccountDisabledQuery(id){
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql: `select disabled from Users where ID = ?`,
        timeout: 40000,
        values: [id]
      },
      (err, result) => {
        if (err) return reject(err);
        return resolve(result[0].disabled);
      }
    );
  });
}

function updateUserPasswordQuery(password, id) {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql: "update Users set password = ? where id = ?",
        timeout: 40000,
        values: [password, id]
      },
      (err, result) => {
        if (err) return reject(err);
        return resolve();
      }
    );
  });
}

module.exports = {
  createUserQuery,
  userLoginQuery,
  isEmailRegisteredAlreadyQuery,
  getAllUsersQuery,
  getUserDetailsQuery,
  adminUpdateUserDetailsQuery,
  updateUserDetailsQuery,
  updateUserPasswordQuery,
  userLastLoginQuery,
  isAccountDisabledQuery
};
