const pool = require('../dbconn');

// Use this function to add a role to the portal
async function addRole(role, description) {
    return await new Promise((resolve, reject) => (
        pool.query({
            sql: 'insert into Roles (role, description) values (?, ?)',
            timeout: 40000, // 40s
            values: [role, description]
          },
          (error, result) => {
            if (error) return reject(error);
            return resolve();
          }
        )
    )
)
}

// this is an async function (the connection pool users async/await thanks to the promisify util)
// use callback to retreive the value e.g. -> 
// getAllRoles((roles) => {
//     console.log(departments);
// })
async function getAllRoles() {
    return await new Promise((resolve, reject) => (
        pool.query({
            sql: 'select role from Roles',
            timeout: 40000, // 40s
          },
          (error, result) => {
            if (error) return reject(error);
            roles =[];
            result.map((role) => {
                roles.push(role.role);
            })
            return resolve(roles);
          }
        )
    )
)
}

module.exports = {
    addRole,
    getAllRoles
}