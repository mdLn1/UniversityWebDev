const { getAllRoles } = require('./queries/roles');
const { isEmailRegisteredAlready } = require('./queries/users')
const { getAllDepartments } = require('./queries/departments')

test = async () => {
    const dpt = await getAllDepartments();
    console.log(dpt);
}
test()
