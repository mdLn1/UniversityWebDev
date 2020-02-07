const pool = require("../dbconn");
const CustomError = require("../../utils/CustomError");
const bcrypt = require("bcryptjs");

// Use this function to add a user to the system, it requires the role and the department string (do not use the ID)
// e.g. -> if you want to add a user to the department 'Human Resources', pass 'Human Resources' to the function, not its ID
// make sure the password is hashed before passing it to the function
function createUserQuery(name, password, email, role, department) {
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql:
          "insert into Users (name, password, email, role_id, department_id) values (?, ?, ?, (select id from Roles where role=?), (select id from Departments where department=?))",
        timeout: 40000, // 40s
        values: [name, password, email, role, department]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve();
      }
    )
  );
}

// Use this funcrion to add a user to the system if you have the role_id and department_id (do not use the string value)
function createUserWithIdParamsQuery(name, password, email, role_id, department_id) {
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
function userLogin(email, password) {
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql: "select * from Users where email = ?",
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
        delete result[0].password;
        return resolve(result[0]);
      }
    )
  );
}

// Use this function to check if user exists
function isEmailRegisteredAlready(email) {
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
function getAllUsers() {
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
function getUserDetails(id) {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql: "select * from Users where id = ?",
        timeout: 40000,
        values: [id]
      },
      (err, result) => {
        if (err) return reject(err);
        if (result.length < 1)
          return reject(new CustomError("User not found", 400));

        return resolve(result[0]);
      }
    );
  });
}

// Updates user details
function updateUserDetails(name, newEmail, role, department, oldEmail) {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql:
          "update Users set name = ?, email = ?, role_id = ?, department_id = ? where email = ?",
        timeout: 40000,
        values: [name, newEmail, role, department, oldEmail]
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
  createUserWithIdParamsQuery,
  userLogin,
  isEmailRegisteredAlready,
  getAllUsers,
  getUserDetails,
  updateUserDetails
};
