const pool = require('../dbconn');

// Use this function to add a department to the portal
function addDepartment(department, description, selectable) {
    return new Promise((resolve, reject) =>
        pool.query({
            sql: 'insert into Departments (department, description, isSelectable) values (?, ?, ?)',
            timeout: 40000, // 40s
            values: [department, description, selectable]
        },
        (error) => {
            if (error) return reject(error);
            resolve()
        }
        )
    )
}

// Returns all the departments of the portal
function getAllDepartments() {
    return new Promise((resolve, reject) => 
        pool.query({
            sql: 'select department, isSelectable from Departments',
            timeout: 40000, // 40s
        }, function (error, results, fields) {
            if (error) return reject(error);
            departments = [];
            results.map((department) => {
                departments.push([department.department, department.isSelectable]);
            });
            return resolve(departments);
        })
    )
}

module.exports = {
    addDepartment,
    getAllDepartments
}