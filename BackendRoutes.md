# All the routes to the backend with the returns

All the requests should be done using header 'Content-Type: application/json'

Also, add the following _"proxy": "http://localhost:5000"_ at the end of the file, before last "}" in package.json inside client directory; make sure no error shows

Register = "/api/auth/register/" (request type = POST )

    request body expects { name, email, password, roleId, departmentId }

    => On success { user = Object, token = String } Status 200

    => On failure { errors = Array } Status 500, 400

Login = "/api/auth/login/" (request type = POST )

    request body expects { email, password }

    => On success { user = Object, token = String } Status 200

    => On failure { errors = Array } Status 500, 400

Users = "/api/user/all" (request type = GET )

    => On success returns { ID, name, password, email, role_id, department_id } Status 200
    => On failure { error: Error } Status 500

CreateRole = "/api/roles" (request type = POST )

    no request params expected, request body must contain { role, description }

    => On success returns { success: string, data: {role, description} } Status 201
    => On failure { errors: Array } Status 500

GetAllRoles = "/api/roles" (request type = GET )

    no request params, nor request body expected

    => On success returns {roles: Array} Status 200
    => On failure { errors: Array } Status 500

UpdateRole = "/api/roles/:id" (request type = POST )

    req param {id} expected as integer, request body {newRole, newDescription, isSelectable}

    => On success returns {success: string} Status 200
    => On failure { errors: Array } Status 500, 400

DeleteRole = "/api/roles/:id" (request type = DELETE )

    req param {id} expected as integer, nor request body expected

    => On success returns {success: string} Status 200
    => On failure { errors: Array } Status 500, 400

CreateCategory = "/api/categories" (request type = POST )

    no request params expected, request body must contain { tag, description, isSelectable }

    => On success returns { success: string, data: {role, description} } Status 201
    => On failure { errors: Array } Status 500

GetAllCategories = "/api/categories" (request type = GET )

    no request params, nor request body expected

    => On success returns {categories: Array} Status 200
    => On failure { errors: Array } Status 500

UpdateCategory = "/api/categories/:id" (request type = POST )

    req param {id} expected as integer, request body {newTag, newDescription, isSelectable}

    => On success returns {success: string } Status 200
    => On failure { errors: Array } Status 500, 400

DeleteCategory = "/api/categories/:id" (request type = DELETE )

    req param {id} expected as integer, nor request body expected

    => On success returns {success: string } Status 200
    => On failure { errors: Array } Status 500, 400

CreateDepartment = "/api/departments" (request type = POST )

    no request params expected, request body must contain { department, description, isSelectable }

    => On success returns { success: string } Status 201
    => On failure { errors: Array } Status 500

GetAllDepartments = "/api/departments" (request type = GET )

    no request params, nor request body expected

    => On success returns {departments: Array} Status 200
    => On failure { errors: Array } Status 500

UpdateDepartment = "/api/departments/:id" (request type = POST )

    req param {id} expected as integer, request body {newDepartment, newDescription, isSelectable}

    => On success returns {success: string} Status 200
    => On failure { errors: Array } Status 500, 400

DeleteDepartment = "/api/departments/:id" (request type = DELETE )

    req param {id} expected as integer, nor request body expected

    => On success returns {success: string} Status 200
    => On failure { errors: Array } Status 500, 400