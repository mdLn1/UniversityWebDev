const expect = require("expect");
const request = require("supertest");
const { app } = require("../server");

describe("GET /api/user/", ()=> {
    it("Should return abad request as user is not logged in", (done) => {
        request(app)
        .get("/api/user/")
        .expect(400)
        .expect(res => {
            expect(res.body.firstname)
        }).end(done)
    })
})