const expect = require("expect");
const request = require("supertest");

const { app } = require("../server");
const { User } = require("../models/user");

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
});

// Login Tests
describe("POST /api/auth/login/", () => {
  it("Returns whether or not the user password is at least 6 characters long", done => {
    request(app)
      .post("/api/auth/login")
      .send({ email: "hamza", password: "unsaf" })
      .expect(400)
      .expect(res => {
        expect(res.body.errors[0]).toEqual(
          "There is no user registered with this email address"
        );
      })
      .end(done);
  });

  it("Returns parsing error based on whether or not the email field is empty", done => {
    request(app)
      .post("/api/auth/login")
      .send({ email: "", password: "Jimenez" })
      .expect(400)
      .expect(res => {
        expect(res.body.errors[0]).toEqual("Email address is required for login");
      })
      .end(done);
  });
});
