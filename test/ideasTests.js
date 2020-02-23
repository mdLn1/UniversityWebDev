const expect = require('expect')
const request = require('supertest')
const { app } = require('../server')

const config = require("config");
const token = config.get("test_token");

describe("GET /api/ideas", () => {

    it("Should return 200 on success", (done) => {
        request(app)
        .get(`/api/ideas`)
        .expect(200)
        .end(done)
    })

    it("Should return a JSON object full of ideas", (done) => {
        request(app)
        .get(`/api/ideas`)
        .expect(200)
        .expect(res => {
            expect(res.body.ideas).toBeDefined()
        })
        .end(done)
    })
})

describe("GET /api/ideas/:id", () => {

    it("Should return 200", (done) => {
        const idToFetch = 6
        request(app)
        .get(`/api/ideas/${idToFetch}`)
        .expect(200)
        .end(done)
    })

    it("Should return a defined JSON object as a result", (done) => {
        const idToFetch = 6
        request(app)
        .get(`/api/ideas/${idToFetch}`)
        .expect(res => {
            expect(res.body[0]).toBeDefined()
        }).end(done)
    })
})

describe("GET /api/ideas/:id/increase-views", () => {

    it("Should return 204 once the view of an idea has been increased", (done) => {
        const ideaToIncrease = 2

        request(app)
        .get(`/api/ideas/${ideaToIncrease}/increase-views`)
        .expect(204)
        .end(done)
    })
})
