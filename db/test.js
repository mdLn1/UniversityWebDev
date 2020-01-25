const { registerUserByID } = require('./queries/users');

userLogin('test@gmail.com', 'Test1d23!', (nouser, nopassword, success) => {
    console.log(nouser);
    console.log(nopassword);
    console.log(success);
})