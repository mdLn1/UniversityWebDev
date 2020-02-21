const expect = require('expect')
const request = require('supertest')
const { app } = require('../server')

describe("GET /api/categories", () => {
    it("Test all categories can be fetched from the categories endpoint", (done) => {
        request(app)
        .get("/api/categories")
        .expect(200)
        .end(done)
    })

    it("Test if JSON response is received", (done) => {
        request(app)
        .get("/api/categories")
        .expect(res => {
            expect(res.body.categories).toBeDefined()
        })
        .end(done)
    })
})

