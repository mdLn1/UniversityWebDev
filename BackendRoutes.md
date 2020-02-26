# All the routes to the backend with the returns

All the requests should be done using header 'Content-Type: application/json'

Also, add the following _"proxy": "http://localhost:5000"_ at the end of the file, before last "}" in package.json inside client directory; make sure no error shows

## Authentication

Register = "/api/auth/register/" (request type = POST )

    request body expects { name, email, password, roleId, departmentId }

    => On success { user = Object, token = String } Status 200

    => On failure { errors = Array } Status 500, 400

Login = "/api/auth/login/" (request type = POST )

    request body expects { email, password }

    => On success { user = Object, token = String } Status 200

    => On failure { errors = Array } Status 500, 400

## Admin management

Users = "/api/management/update-user/:userId" (request type = GET )

    => On success returns { ID, name, password, email, role_id, department_id } Status 200
    => On failure { errors: Array } Status 500

EnableUserAccount = "/api/management/enable-user/:userId" (request type = GET )

    => On success returns { success: String } Status 200
    => On failure { errors: Array } Status 500

DisableUserAccount = "/api/management/disable-user/:userId" (request type = GET )

    => On success returns { success: String } Status 200
    => On failure { errors: Array } Status 500

## Roles

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

## Categories

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

## Departments

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

## Ideas

CreateIdea = "/api/ideas" (request type = POST )

    no request params expected, request body must contain { title, description, categoryId, isAnonymous }

    => On success returns { success: string } Status 201
    => On failure { errors: Array } Status 500

GetAllIdeas = "/api/ideas" (request type = GET ) with query params "/api/ideas?itemsCount=5&pageNo=1"

    no request params, nor request body expected

    request query optional { itemsCount, pageNo }, default values 5 and 1

    => On success returns {ideas: Array, totalIdeas: number} Status 200
    => On failure { errors: Array } Status 500

GetIdeaById = "/api/ideas/:id" (request type = GET )

    request params {id} expected as integer, no request body

    => On success returns {idea: Object} Status 200
    => On failure { errors: Array } Status 500

UpdateIdea = "/api/ideas/:id" (request type = POST )

    req param {id} expected as integer, request body {title, description}

    => On success returns {success: string} Status 200
    => On failure { errors: Array } Status 500, 400

DeleteIdea = "/api/ideas/:id" (request type = DELETE )

    req param {id} expected as integer, no request body expected

    => On success returns {success: string} Status 200
    => On failure { errors: Array } Status 500, 400

IncreaseViewCounter = "/api/ideas/:id/increase-views" (request type = GET )

    req param {id} expected as integer, no request body expected

    => On success returns No content Status 204
    => On failure { errors: Array } Status 500, 400

## Comments

GetAllComments (for an idea) = "/api/ideas/:ideaId/comments" (request type = GET )

    req param {ideaId} expected as integer, no request body expected

    => On success returns {comments: Array} Status 200
    => On failure { errors: Array } Status 500, 400

CreateComment (for an idea) = "/api/ideas/:ideaId/comments" (request type = POST )

    req param {ideaId} expected as integer, request body {comment, isAnonymous}

    => On success returns {success: string} Status 201
    => On failure { errors: Array } Status 500, 400

UpdateComment (for an idea) = "/api/ideas/:ideaId/comments/:commentId" (request type = POST )

    req param {ideaId, commentId} expected as integer, request body {comment, isAnonymous}

    => On success returns {success: string} Status 200
    => On failure { errors: Array } Status 500, 400

DeleteComment (for an idea) = "/api/ideas/:ideaId/comments/:commentId" (request type = DELETE )

    req param {ideaId, commentId} expected as integer, no request body expected

    => On success returns {success: string} Status 200
    => On failure { errors: Array } Status 500, 400

## Uploads

DownloadZippedUploads (for an idea) = "/api/ideas/:ideaId/uploads/download" (request type = GET )

    req param {ideaId} expected as integer, no request body expected

    => On success returns {zipDetails: Object} Status 200
    => On failure { errors: Array } Status 500, 400

GetAllUploads (for an idea) = "/api/ideas/:ideaId/uploads/" (request type = GET )

    req param {ideaId} expected as integer, no request body expected

    => On success returns {uploads: Array} Status 200
    => On failure { errors: Array } Status 500, 400

CreateUploads (for an idea) = "/api/ideas/:ideaId/uploads" (request type = POST )

    req param {ideaId} expected as integer, request body {comment, isAnonymous}

    => On success returns {success: string} Status 201
    => On failure { errors: Array } Status 500, 400

DeleteUpload (for an idea) = "/api/ideas/:ideaId/uploads/:uploadId" (request type = DELETE )

    req param {ideaId, commentId} expected as integer, no request body expected
    => On success returns {success: string} Status 200
    => On failure { errors: Array } Status 500, 400

## User

GetUserDetails = "/api/user/" (request type = GET )

    no req params expected, no request body expected

    => On success returns {user: Object} Status 200
    => On failure { errors: Array } Status 500, 400

UpdateUserPassword = "/api/user/update-password" (request type = POST )

    no req params expected, request body {oldPassword, newPassword, newPasswordConfirmed}

    => On success returns {success: String} Status 200
    => On failure { errors: Array } Status 500, 400

UpdateUserDetails = "/api/user/update-details" (request type = POST )

    no req params expected, request body {name, email}

    => On success returns {success: String} Status 200
    => On failure { errors: Array } Status 500, 400