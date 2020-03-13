const expect = require('expect')
const request = require('supertest')
const { app } = require('../server')

const config = require("config");
const token = config.get("test_token");

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

describe("POST /api/categories", () => {
    it("Test if a category can be created by an authorised user", (done) => {
        testCategory = {
            tag : "Unit Test Tag",
            description : "This is a local test tag being submitted",
            isSelectable : 0
        }

        request(app)
        .post("/api/categories")
        .set({"x-auth-token" : token})
        .send(testCategory)
        .expect(201)
    })
})

describe("POST /api/categories", () => {
    it("Test if a category can be updated by an authorised user", (done) => {
        newTestCategory = {
            newTag : "Unit Test Tag",
            newDescription : "This is a local test tag being submitted",
            isSelectable : 0
        }

        request(app)
        .post(`/api/categories/${9}`)
        .set({"x-auth-token" : token})
        .send(newTestCategory)
        .expect(200)
    })
})

describe("POST /api/categories", () => {
    it("Test if a category can be deleted by an authorised user", (done) => {
   
        request(app)
        .delete(`/api/categories/${12}`)
        .set({"x-auth-token" : token})
        .expect(200)
    })
})