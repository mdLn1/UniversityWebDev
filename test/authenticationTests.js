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
        name: "nameonetwo",
        password: "useronetwopassword",
        email: "hello@gre.ac.uk"
      })
      .expect(200)
      .expect(res => {
        expect(res.headers["x-auth-token"]).not.toBeNull();
      })
      .end(done);
  });

  it("should not create a new user", done => {
    request(app)
      .post("/api/auth/register/")
      .send({
        name: "nameone",
        password: "useronepassword",
        email: "hello@gmail.com"
      })
      .expect(400)
      .expect(res => {
        expect(res.headers["x-auth-token"]).toBeUndefined();
      })
      .end(done);
  });
});

// Login Tests
describe("POST /api/auth/login/", () => {
  it("Returns whether or not the user password is at least 6 characters long", done => {
    request(app)
      .post("/api/auth/login")
      .send({ email: "hamza"})
      .expect(400)
      .expect(res => {
        expect(res.body.errors[0]).toEqual(
          "Password is required for login"
        );
      })
      .end(done);
  });

  it("Invalid email", done => {
    request(app)
      .post("/api/auth/login")
      .send({ email: "mcp@gmail.com", password: "Jimenez" })
      .expect(400)
      .expect(res => {
        expect(res.body.errors[0]).toEqual("There is no user registered with this email address");
      })
      .end(done);
  });

  it("Returns user not found error if name/password does not match dummy data", done => {
    request(app)
      .post("/api/auth/login/")
      .send({ email: "mpc23@gre.ac.uk", password: "unsafepassword123" })
      .expect(400)
      .expect(res => {
        expect(res.body.errors[0]).toEqual("User not found, please register");
      })
      .end(done);
  });
});
