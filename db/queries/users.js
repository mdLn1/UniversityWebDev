const pool = require('../dbconn');
const CustomError = require('../../utils/CustomError');

// Use this function to add a user to the system, it requires the role and the department string (do not use the ID)
// e.g. -> if you want to add a user to the department 'Human Resources', pass 'Human Resources' to the function, not its ID
// make sure the password is hashed before passing it to the function
async function registerUser(name, password, email, role_id, department_id) {
    return await new Promise((resolve, reject) =>
        pool.query(
            {
                sql: 'insert into Users (name, password, email, role_id, department_id) values (?, ?, ?, (select id from Roles where role=?), (select id from Departments where department=?))',
                timeout: 40000, // 40s
                values: [name, password, email, role_id, department_id]
            }, 
            (error, result) => {
                if (error) return reject(error);
                return resolve(result[0]);
            }
        )
    )
}

// Use this function to add a user to the system if you have the role_id and department_id (do not use the string value)
async function registerUserByID(name, password, email, role_id, department_id) {
    return await new Promise((resolve, reject) =>
        pool.query(
            {
                sql: 'insert into Users (name, password, email, role_id, department_id) values (?, ?, ?, ?, ?)',
                timeout: 40000, // 40s
                values: [name, password, email, role_id, department_id]
            }, 
            (error, result) => {
                if (error) return reject(error);
                return resolve(result[0]);
            }
        )
    )
}

// Check if user exists
async function isAlreadyRegistered(email) {
    return await new Promise((resolve, reject) => 
        pool.query({
            sql: 'select email from Users where email =?',
            timeout: 40000,
            values: [email]
        },
        (error, result) => {
            if (error) return reject(error);
            if (result.length !== 0) return reject(new CustomError("User already registered", 400));
            return resolve();
        }))
}

// Use this function to verify the user login
// email field is unique - so the results array will only contain max 1 result
async function userLogin(email, password) {
    return await new Promise((resolve, reject) =>
      pool.query(
        {
          sql: "select * from Users where email = ?",
          timeout: 40000, // 40s
          values: [email]
        },
        (error, result) => {
            if (error) return reject(error);
            if (result.length === 0) return reject(new CustomError("No results found", 400));
            if (password !== result[0].password) return reject(new CustomError("Invalid password", 400))
            delete result[0].password;
            return resolve(result[0]);
        }
      )
    );
  }

module.exports = {
    registerUser,
    registerUserByID,
    userLogin,
    isAlreadyRegistered
}