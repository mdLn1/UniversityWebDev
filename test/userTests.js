const expect = require("expect");
const request = require("supertest");
const { app } = require("../server");

describe("GET /api/user/all", () => {
    it("Should return all users from the database", (done) => {
        request(app)
        .get("/api/user/all")
        .expect(200)
        .expect(res => {
            expect(res.body)
        }).end(done)
    })
})