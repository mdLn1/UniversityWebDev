const pool = require('../dbconn');

// Use this function to add a role to the portal
function addRole(role, description) {
    pool.query({
        sql: 'insert into Roles (role, description) values (?, ?)',
        timeout: 40000, // 40s
        values: [role, description]
      },
      function (error, results, fields) {
            if (error) throw error;
      }
      );
}

// this is an async function (the connection pool users async/await thanks to the promisify util)
// use callback to retreive the value e.g. -> 
// getAllRoles((roles) => {
//     console.log(departments);
// })
function getAllRoles(callback) {
    pool.query({
        sql: 'select department from Departments',
        timeout: 40000, // 40s
    }, function (error, results, fields) {
        roles = [];
        if (error) throw error;
        results.map((role) => {
            roles.push(department.department);
        });
        return callback(roles);
    })
}

module.exports = {
    addRole,
    getAllRoles
}