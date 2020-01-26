const pool = require('../dbconn');

// Use this function to add a role to the portal
function addRole(role, description, selectable) {
    return new Promise((resolve, reject) => (
        pool.query({
            sql: 'insert into Roles (role, description, isSelectable) values (?, ?, ?)',
            timeout: 40000, // 40s
            values: [role, description, selectable]
          },
          (error, result) => {
            if (error) return reject(error);
            return resolve();
          }
        )
    )
)
}

function getAllRoles() {
    return new Promise((resolve, reject) => (
        pool.query({
            sql: 'select role, isSelectable from Roles',
            timeout: 40000, // 40s
          },
          (error, result) => {
            if (error) return reject(error);
            roles =[];
            result.map((role) => {
                roles.push([role.role, role.isSelectable]);
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