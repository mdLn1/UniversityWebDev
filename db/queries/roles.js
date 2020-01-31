const pool = require('../dbconn');

// Use this function to add a role to the portal
function addRole(role, description) {
    return new Promise((resolve, reject) => (
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
function getAllRoles() {
    return new Promise((resolve, reject) => (
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

// @desc If authorized the user(QA Manger) can create a new role
// @param role - Role of the user
// @param description - Description of said role
function createNewRole(role, description, is_selectable=1) {
  return new Promise( (resolve, reject) => {
    pool.query({
      sql: "INSERT into Roles (role, description, isSelectable) values (?, ?, ?)", 
      timeout: 40000,
      values: [role, description, is_selectable]
    }, (err, result) => {
      if (err) { return reject(err) }

      return (resolve(result))
    }
    )
  })
}

module.exports = {
    addRole,
    getAllRoles,
    createNewRole
}