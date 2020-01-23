const expect = require("expect");
const request = require("supertest");
const { ObjectID } = require("mongodb");

const { app } = require("../server");
const { User } = require("../models/user");
const { users, populateUsers } = require("./seed/seed");

// Simple Test Example
describe("POST /hello", () => {
  it("should return OK status", done => {
    var text = "Hello World";

    request(app)
      .get("/hello")
      .expect(200)
      .expect(res => {
        expect(res.body.msg).toBe(text);
      })
      .end(done);
  });
});

describe("POST /api/auth/register/", () => {
  // await beforeEach(populateUsers);
  it("should return validation errors if request is invaild", done => {
    request(app)
      .post("/api/auth/register/")
      .send({
        name: "mdln",
        password: "56756fhg"
      })
      .expect(400)
      .expect(res => {
        expect(res.headers["x-auth-token"]).toBeUndefined()
      })
      .end(done);
  });
  
  it("should create a new user", done => {
    request(app)
      .post("/api/auth/register/")
      .send({
        name: "nameone",
        password: "useronepassword",
        email: "hello@gmail.com"
      })
      .expect(200)
      .expect(res => {
        expect(res.headers["x-auth-token"]).not.toBeNull();
      })
      .end(done);
  });

 
});
