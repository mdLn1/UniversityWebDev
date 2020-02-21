const expect = require('expect')
const request = require('supertest')
const { app } = require('../server')

describe("GET /api/roles", () => {
    it("Should return all roles", (done) => {
        request(app)
        .get("/api/roles")
        .expect(200)
        .expect(res => {
            expect(res.body)
        }).end(done)
    })
})

describe("POST /api/roles", () => {
    it("Should create a new role", (done) => {
  
        request(app)
        .post("/api/roles")
        .send({
            role: "QA Manager",
            description: "Lab assistant in test",
            isSelectable: 1
        })
        .expect(201)
        .expect(res => {
            expect(res.body)
        }).end(done)
    })
})