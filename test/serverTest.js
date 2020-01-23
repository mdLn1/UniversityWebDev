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

// Register tests
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
        expect(res.headers["x-auth-token"]).toBeUndefined();
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

// Login Tests
describe("POST /api/auth/login/", () => {
  it("Returns whether or not the user password is at least 6 characters long", done => {
    request(app)
      .post("/api/auth/login")
      .send({ name: "hamza", password: "unsaf" })
      .expect(400)
      .expect(res => {
        expect(res.body.feedback[0].msg).toEqual(
          "Password needs to be at least 6 characters long"
        );
      })
      .end(done);
  });

  it("Returns parsing error based on whether or not the name key is empty", done => {
    request(app)
      .post("/api/auth/login")
      .send({ name: "", password: "Jimenez" })
      .expect(400)
      .expect(res => {
        expect(res.body.feedback[0].msg).toEqual("Name missing");
      })
      .end(done);
  });

  it("Returns user not found error if name/password does not match dummy data", done => {
    request(app)
      .post("/api/auth/login/")
      .send({ name: "hamza", password: "unsafepassword123" })
      .expect(500)
      .expect(res => {
        expect(res.body.feedback.msg).toEqual("User not found");
      })
      .end(done);
  });
});
