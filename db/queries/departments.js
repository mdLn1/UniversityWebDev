const pool = require('../dbconn');

// Use this function to add a department to the portal
function addDepartment(department, description) {
    pool.query({
        sql: 'insert into Departments (department, description) values (?, ?)',
        timeout: 40000, // 40s
        values: [department, description]
      },
      function (error, results, fields) {
            if (error) throw error;
      }
      );
}

// this is an async function (the connection pool users async/await thanks to the promisify util)
// use callback to retreive the value e.g. -> 
// getAllDepartmentsName((departments) => {
//     console.log(departments);
// })
function getAllDepartmentsName(callback) {
    pool.query({
        sql: 'select department from Departments',
        timeout: 40000, // 40s
    }, function (error, results, fields) {
        departments = [];
        if (error) throw error;
        results.map((department) => {
            departments.push(department.department);
        });
        return callback(departments);
    })
}

module.exports = {
    addDepartment,
    getAllDepartmentsName
}