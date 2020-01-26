const pool = require('../dbconn');

// Use this function to add a department to the portal
async function addDepartment(department, description) {
    return await new Promise((resolve, reject) =>
        pool.query({
            sql: 'insert into Departments (department, description) values (?, ?)',
            timeout: 40000, // 40s
            values: [department, description]
        },
        (error) => {
            if (error) return reject(error);
            resolve()
        }
        )
    )
}

// Returns all the departments of the portal
async function getAllDepartmentsName() {
    return await new Promise((resolve, reject) => 
        pool.query({
            sql: 'select department from Departments',
            timeout: 40000, // 40s
        }, function (error, results, fields) {
            if (error) return reject(error);
            departments = [];
            results.map((department) => {
                departments.push(department.department);
            });
            return resolve(departments);
        })
    )
}

module.exports = {
    addDepartment,
    getAllDepartmentsName
}