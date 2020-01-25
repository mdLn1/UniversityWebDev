# All the routes to the backend with the returns

All the requests should be done using header 'Content-Type: application/json'

Also, add the following *"proxy": "http://localhost:5000"* at the end of the file, before last "}" in package.json inside client directory; make sure no error shows

Register = "/api/auth/register/" (request type = POST ) 

    request parameters expected { name, email, password }
    
    => On success { user = Object, token = String } Status 200
    
    => On failure { errors = Array } Status 500, 400
    

Login = "/api/auth/login/" (request type = POST ) 

    request parameters expected { email, password }
    
    => On success { user = Object, token = String } Status 200
    
    => On failure { errors = Array } Status 500, 400
