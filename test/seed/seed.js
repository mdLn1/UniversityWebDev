const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');
const config = require('config');
const { User } = require('../../models/user')


const userOneID = new ObjectID();
const userTwoID = new ObjectID();
const users = [{
  _id: userOneID,
  email: "userone@gmail.com",
  name: "nameone",
  password: "useronepassword",
  token: jwt.sign({_id: userOneID, access: 'auth'}, config.get("jwtSecret")).toString()
}, {
  _id: userTwoID,
  email: "usertwo@gmail.com",
  name: "nametwo",
  password: "usertwopassword",
  token: jwt.sign({_id: userOneID, access: 'auth'}, config.get("jwtSecret")).toString()
}]

var populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo])
  }).then(() => done());
};

module.exports = {
  users,
  populateUsers
}