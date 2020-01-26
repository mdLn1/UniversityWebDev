const pool = require("../dbconn");
const CustomError = require("../../utils/CustomError");

// Use this function to add a user to the system, it requires the role and the department string (do not use the ID)
// e.g. -> if you want to add a user to the department 'Human Resources', pass 'Human Resources' to the function, not its ID
// make sure the password is hashed before passing it to the function
function registerUser(name, password, email, role, department) {
  pool.query(
    {
      sql:
        "insert into Users (name, password, email, role_id, department_id) values (?, ?, ?, (select id from Roles where role=?), (select id from Departments where department=?))",
      timeout: 40000, // 40s
      values: [name, password, email, role, department]
    },
    function(error, results, fields) {
      if (error) throw error;
    }
  );
}

// Use this funcrion to add a user to the system if you have the role_id and department_id (do not use the string value)
function registerUserByID(name, password, email, role_id, department_id) {
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql:
          "insert into Users (name, password, email, role_id, department_id) values (?, ?, ?, ?, ?)",
        timeout: 40000, // 40s
        values: [name, password, email, role_id, department_id]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result[0]);
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
        timeout: 40000, // 40s
        values: [email]
      },
      (error, result) => {
        if (error) return reject(error);
        if (result.length === 0)
          return reject(new CustomError("User not found, please register", 400));
        if (password !== result[0].password)
          return reject(new CustomError("Invalid password", 400));
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
        timeout: 40000, // 40s
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

module.exports = {
  registerUser,
  registerUserByID,
  userLogin,
  isEmailRegisteredAlready
};
