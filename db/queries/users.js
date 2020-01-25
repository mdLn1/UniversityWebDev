const pool = require('../dbconn');

// Use this function to add a user to the system, it requires the role and the department string (do not use the ID)
// e.g. -> if you want to add a user to the department 'Human Resources', pass 'Human Resources' to the function, not its ID
// make sure the password is hashed before passing it to the function
function registerUser(name, password, email, role, department) {
    pool.query({
        sql: 'insert into Users (name, password, email, role_id, department_id) values (?, ?, ?, (select id from Roles where role=?), (select id from Departments where department=?))',
        timeout: 40000, // 40s
        values: [name, password, email, role, department]
    }, function(error, results, fields) {
        if (error) throw error;
    });
}

// Use this funcrion to add a user to the system if you have the role_id and department_id (do not use the string value)
function registerUserByID(name, password, email, role_id, department_id) {
    pool.query({
        sql: 'insert into Users (name, password, email, role_id, department_id) values (?, ?, ?, ?, ?)',
        timeout: 40000, // 40s
        values: [name, password, email, role_id, department_id]
    }, function(error, results, fields) {
        if (error) throw error;
    });
}

// Use this function to verify the user login, this is async therefore you must use callback 
// userLogin('test@gmail.com', 'Test123!', (failed, success) => {
//     console.log(failed, success);
// });
// email field is unique - so the results array will only contain max 1 result
function userLogin(email, password, callback) {
    pool.query({
        sql: 'select * from Users where email = ?',
        timeout: 40000, // 40s
        values: [email]
    }, function(error, results, fields) {
        if (error) throw error;
        if (results.length === 0){
            callback(true, undefined, undefined);
        } else {
            if (password === results[0].password){
                delete results[0].password;
                callback(undefined, undefined, results[0]);
            } else {
                callback(undefined, true, undefined);
            }
        }
    })
}

module.exports = {
    registerUser,
    registerUserByID,
    userLogin
}