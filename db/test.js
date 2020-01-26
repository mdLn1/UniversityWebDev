const { getAllRoles } = require('./queries/roles');

async function test() {
    //await addDepartment('Student Ambassadors', 'University Student Ambassadors')
    console.log(await getAllRoles());
}

test()