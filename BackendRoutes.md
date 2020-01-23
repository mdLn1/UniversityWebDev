# All the routes to the backend with the returns

All the requests should be done using header 'Content-Type: application/json'

Register = http://localhost:5000/api/auth/register/ (request type = POST ) 
    request parameters expected {name, password}
    => On success { user, feedback } Status 200
    => On failure { feedback } Status 500, 401
